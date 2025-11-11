const fs = require('fs');
const path = require('path');

class Database {
  constructor() {
    this.dataDir = path.join(__dirname, 'data');
    this.membersFile = path.join(this.dataDir, 'members.json');
    this.counterFile = path.join(this.dataDir, 'counter.json');
    this.init();
  }

  init() {
    // Create data directory if it doesn't exist
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }

    // Initialize members file
    if (!fs.existsSync(this.membersFile)) {
      fs.writeFileSync(this.membersFile, JSON.stringify([], null, 2));
    }

    // Initialize counter file
    if (!fs.existsSync(this.counterFile)) {
      fs.writeFileSync(this.counterFile, JSON.stringify({ lastMemberId: 1000 }, null, 2));
    }
  }

  // Read all members
  getAllMembers() {
    try {
      const data = fs.readFileSync(this.membersFile, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading members:', error);
      return [];
    }
  }

  // Save all members
  saveMembers(members) {
    try {
      fs.writeFileSync(this.membersFile, JSON.stringify(members, null, 2));
      return true;
    } catch (error) {
      console.error('Error saving members:', error);
      return false;
    }
  }

  // Find member by email
  findMemberByEmail(email) {
    const members = this.getAllMembers();
    return members.find(m => m.email.toLowerCase() === email.toLowerCase());
  }

  // Find member by member code
  findMemberByCode(memberCode) {
    const members = this.getAllMembers();
    return members.find(m => m.memberCode === memberCode);
  }

  // Generate next member code
  generateMemberCode() {
    try {
      const data = fs.readFileSync(this.counterFile, 'utf-8');
      const counter = JSON.parse(data);
      counter.lastMemberId++;
      fs.writeFileSync(this.counterFile, JSON.stringify(counter, null, 2));
      return `MEM${counter.lastMemberId}`;
    } catch (error) {
      console.error('Error generating member code:', error);
      return `MEM${Date.now()}`;
    }
  }

  // Add new member
  addMember(memberData) {
    const members = this.getAllMembers();
    members.push(memberData);
    return this.saveMembers(members);
  }

  // Update member
  updateMember(memberCode, updateData) {
    const members = this.getAllMembers();
    const index = members.findIndex(m => m.memberCode === memberCode);
    
    if (index !== -1) {
      members[index] = { ...members[index], ...updateData };
      return this.saveMembers(members);
    }
    return false;
  }

  // Get all downline members (for counting)
  getDownlineMembers(memberCode, position) {
    const members = this.getAllMembers();
    const member = members.find(m => m.memberCode === memberCode);
    
    if (!member) return [];

    const childCode = position === 'left' ? member.leftMember : member.rightMember;
    if (!childCode) return [];

    const downline = [];
    const queue = [childCode];

    while (queue.length > 0) {
      const currentCode = queue.shift();
      const currentMember = members.find(m => m.memberCode === currentCode);
      
      if (currentMember) {
        downline.push(currentMember);
        if (currentMember.leftMember) queue.push(currentMember.leftMember);
        if (currentMember.rightMember) queue.push(currentMember.rightMember);
      }
    }

    return downline;
  }
}

module.exports = new Database();
