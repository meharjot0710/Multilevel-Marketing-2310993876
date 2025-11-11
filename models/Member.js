const bcrypt = require('bcrypt');
const db = require('../database/db');

class Member {
  // Create new member with validation and spill logic
  static async create(memberData) {
    const { name, email, mobile, sponsorCode, position, password } = memberData;

    // Check if email already exists
    const existingMember = db.findMemberByEmail(email);
    if (existingMember) {
      throw new Error('Email already registered');
    }

    // Verify sponsor exists
    const sponsor = db.findMemberByCode(sponsorCode);
    if (!sponsor) {
      throw new Error('Invalid Sponsor Code');
    }

    // Find available position using spill logic
    const availablePosition = this.findAvailablePosition(sponsorCode, position);
    
    if (!availablePosition) {
      throw new Error('Unable to find available position');
    }

    // Generate unique member code
    const memberCode = db.generateMemberCode();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new member object
    const newMember = {
      memberCode,
      name,
      email,
      mobile,
      password: hashedPassword,
      sponsorCode: availablePosition.sponsorCode,
      position: availablePosition.position,
      leftMember: null,
      rightMember: null,
      leftCount: 0,
      rightCount: 0,
      createdAt: new Date().toISOString()
    };

    // Add member to database
    db.addMember(newMember);

    // Update sponsor's left/right member reference
    const updateField = availablePosition.position === 'left' ? 
      { leftMember: memberCode } : 
      { rightMember: memberCode };
    
    db.updateMember(availablePosition.sponsorCode, updateField);

    // Update counts recursively upward
    this.updateCountsUpward(availablePosition.sponsorCode, availablePosition.position);

    return newMember;
  }

  // Find available position with spill logic
  static findAvailablePosition(sponsorCode, preferredPosition) {
    const sponsor = db.findMemberByCode(sponsorCode);
    if (!sponsor) return null;

    // Check if preferred position is available
    if (preferredPosition === 'left' && !sponsor.leftMember) {
      return { sponsorCode, position: 'left' };
    }
    if (preferredPosition === 'right' && !sponsor.rightMember) {
      return { sponsorCode, position: 'right' };
    }

    // Position is filled, apply spill logic
    return this.spillLogic(sponsorCode, preferredPosition);
  }

  // Recursive spill logic to find next available slot
  static spillLogic(sponsorCode, position) {
    const sponsor = db.findMemberByCode(sponsorCode);
    if (!sponsor) return null;

    // Get the child in the preferred direction
    const childCode = position === 'left' ? sponsor.leftMember : sponsor.rightMember;
    
    if (!childCode) {
      return { sponsorCode, position };
    }

    const child = db.findMemberByCode(childCode);
    if (!child) {
      return { sponsorCode, position };
    }

    // Check if child has available position on the same side
    if (position === 'left' && !child.leftMember) {
      return { sponsorCode: childCode, position: 'left' };
    }
    if (position === 'right' && !child.rightMember) {
      return { sponsorCode: childCode, position: 'right' };
    }

    // Recursively traverse down the tree
    return this.spillLogic(childCode, position);
  }

  // Update counts recursively upward through the tree
  static updateCountsUpward(memberCode, position) {
    const member = db.findMemberByCode(memberCode);
    if (!member) return;

    // Increment the count based on position
    if (position === 'left') {
      member.leftCount++;
    } else {
      member.rightCount++;
    }

    db.updateMember(memberCode, {
      leftCount: member.leftCount,
      rightCount: member.rightCount
    });

    // Continue upward if this member has a sponsor
    if (member.sponsorCode) {
      this.updateCountsUpward(member.sponsorCode, member.position);
    }
  }

  // Authenticate member
  static async authenticate(email, password) {
    const member = db.findMemberByEmail(email);
    if (!member) {
      throw new Error('Invalid email or password');
    }

    const isValid = await bcrypt.compare(password, member.password);
    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    return member;
  }

  // Get member profile
  static getProfile(memberCode) {
    return db.findMemberByCode(memberCode);
  }

  // Get downline members
  static getDownline(memberCode) {
    const member = db.findMemberByCode(memberCode);
    if (!member) return null;

    const leftDownline = db.getDownlineMembers(memberCode, 'left');
    const rightDownline = db.getDownlineMembers(memberCode, 'right');

    return {
      member,
      leftCount: member.leftCount,
      rightCount: member.rightCount,
      leftMembers: leftDownline,
      rightMembers: rightDownline
    };
  }
}

module.exports = Member;
