const bcrypt = require('bcrypt');
const db = require('./database/db');

async function createRootMember() {
  console.log('\n🌱 Creating Root Member...\n');

  // Check if root member already exists
  const existingMember = db.findMemberByCode('MEM1001');
  if (existingMember) {
    console.log('❌ Root member already exists!');
    console.log('\n📋 Root Member Details:');
    console.log('   Member Code: MEM1001');
    console.log('   Email: admin@mlm.com');
    console.log('   Password: admin123');
    console.log('\n✅ Use these credentials to login\n');
    return;
  }

  // Create root member
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const rootMember = {
    memberCode: 'MEM1001',
    name: 'Admin Root',
    email: 'admin@mlm.com',
    mobile: '1234567890',
    password: hashedPassword,
    sponsorCode: null,
    position: null,
    leftMember: null,
    rightMember: null,
    leftCount: 0,
    rightCount: 0,
    createdAt: new Date().toISOString()
  };

  db.addMember(rootMember);

  console.log('✅ Root member created successfully!');
  console.log('\n📋 Root Member Details:');
  console.log('   Member Code: MEM1001');
  console.log('   Name: Admin Root');
  console.log('   Email: admin@mlm.com');
  console.log('   Password: admin123');
  console.log('\n🎯 Next Steps:');
  console.log('   1. Run: npm start');
  console.log('   2. Open: http://localhost:3000');
  console.log('   3. Login with the above credentials');
  console.log('   4. Start adding members!\n');
}

createRootMember().catch(error => {
  console.error('Error creating root member:', error);
});
