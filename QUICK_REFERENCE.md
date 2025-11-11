# 🌟 MLM Binary Tree - Quick Reference

## 🚀 Quick Start Commands

```powershell
# Install dependencies
npm install

# Create root member (first time only)
node createRootMember.js

# Start application
npm start
```

## 🔗 URLs

- **Application**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Register**: http://localhost:3000/register
- **Dashboard**: http://localhost:3000/member/dashboard
- **Profile**: http://localhost:3000/member/profile
- **Downline**: http://localhost:3000/member/downline

## 🔐 Default Credentials

```
Email: admin@mlm.com
Password: admin123
Member Code: MEM1001
```

## 📁 File Structure

```
├── database/
│   ├── db.js              # Database operations
│   └── data/
│       ├── members.json   # Member storage
│       └── counter.json   # ID counter
├── models/
│   └── Member.js          # Member model & business logic
├── routes/
│   ├── auth.js            # Login/register routes
│   └── member.js          # Dashboard routes
├── views/
│   ├── login.ejs          # Login page
│   ├── register.ejs       # Registration form
│   ├── dashboard.ejs      # Dashboard
│   ├── profile.ejs        # Profile view
│   └── downline.ejs       # Downline view
└── server.js              # Main server
```

## 🎯 Key Features

### ✅ Implemented

1. **Member Registration**
   - Name, Email, Mobile, Password
   - Sponsor Code validation
   - Position selection (Left/Right)
   - Auto member code generation

2. **Binary Tree Structure**
   - Each member has Left & Right positions
   - Automatic spill logic
   - Recursive tree traversal

3. **Spill Logic**
   - When position is filled
   - Traverse down the branch
   - Find next available slot
   - Place member automatically

4. **Count Tracking**
   - Left team count
   - Right team count
   - Total team count
   - Updates recursively upward

5. **Authentication**
   - Secure login with bcrypt
   - Session management
   - Password hashing
   - Protected routes

6. **Dashboard**
   - Team statistics
   - Quick action buttons
   - Member information

7. **Profile View**
   - Personal details
   - Sponsor information
   - Team counts
   - Join date

8. **Downline View**
   - Left team members
   - Right team members
   - Member details
   - Team structure

## 🔄 Binary Tree Example

```
            MEM1001 (Root)
           /              \
      MEM1002          MEM1003
      /     \          /     \
  MEM1004 MEM1005  MEM1006 MEM1007
```

## 📊 Database Schema

```javascript
{
  memberCode: "MEM1001",        // Auto-generated
  name: "John Doe",
  email: "john@example.com",
  mobile: "1234567890",
  password: "hashed_password",   // Bcrypt hashed
  sponsorCode: "MEM1000",        // Parent member
  position: "left",              // "left" or "right"
  leftMember: "MEM1002",         // Left child code
  rightMember: "MEM1003",        // Right child code
  leftCount: 5,                  // Total left downline
  rightCount: 3,                 // Total right downline
  createdAt: "2025-11-05T..."
}
```

## 🛠️ Common Operations

### Add New Member
1. Login to application
2. Go to Register page
3. Enter sponsor code (e.g., MEM1001)
4. Choose position (Left/Right)
5. Fill details and submit

### View Team
1. Login to your account
2. Click "Downline" in navbar
3. See left and right teams

### Check Counts
1. Go to Dashboard
2. View team statistics
3. Left Count + Right Count = Total Team

## 🔒 Security Features

- ✅ Password hashing with bcrypt (salt rounds: 10)
- ✅ Session-based authentication
- ✅ Protected routes with middleware
- ✅ Input validation
- ✅ Error handling

## 💾 Data Storage

- **Type**: File-based JSON
- **Location**: `database/data/`
- **Persistence**: Yes (survives restarts)
- **Backup**: Manual (copy `database/data/` folder)

## 📝 Important Notes

1. **Member Code Format**: MEM + sequence number
2. **Password**: Minimum length not enforced (add as needed)
3. **Root Member**: Has no sponsor (sponsorCode: null)
4. **Session**: Expires after 24 hours
5. **Port**: Default 3000 (change in server.js)

## 🎨 UI Pages

1. **Login** - Clean gradient design
2. **Register** - Multi-field form with info box
3. **Dashboard** - Statistics cards & action buttons
4. **Profile** - Detailed member information
5. **Downline** - Split view (Left/Right teams)

## 🧪 Test Scenarios

1. ✅ Register members on both sides
2. ✅ Test spill logic (fill positions)
3. ✅ Verify count updates
4. ✅ Check recursive placement
5. ✅ Test multi-level structure
6. ✅ Validate error handling

## 🚨 Error Messages

- "Invalid Sponsor Code"
- "Email already registered"
- "Passwords do not match"
- "Invalid email or password"
- "Unable to find available position"

## 🎯 Next Steps (Optional Enhancements)

- [ ] Tree visualization (diagram)
- [ ] Admin panel
- [ ] Member search
- [ ] Commission tracking
- [ ] Email notifications
- [ ] Export reports
- [ ] Mobile responsive improvements
- [ ] Password reset
- [ ] Profile editing

---

**Application Status**: ✅ Running on http://localhost:3000

**Documentation**: See README.md and TESTING.md for details
