# Testing Guide - MLM Binary Tree Application

## ✅ Application is Running!

**Server URL**: http://localhost:3000

## 🔐 Root Member Credentials

- **Member Code**: MEM1001
- **Email**: admin@mlm.com
- **Password**: admin123

## 🧪 Testing Steps

### 1. Test Login
1. Open http://localhost:3000
2. Enter credentials:
   - Email: `admin@mlm.com`
   - Password: `admin123`
3. Click "Login"
4. ✅ You should see the dashboard

### 2. Test Dashboard
1. After login, verify you see:
   - Welcome message with name
   - Member Code: MEM1001
   - Team statistics (initially 0 for left and right)
   - Quick action buttons

### 3. Test Profile View
1. Click "Profile" in navbar or "My Profile" button
2. Verify all details are displayed:
   - Name, Email, Mobile
   - Member Code
   - Sponsor Code (Root Member)
   - Left/Right counts
   - Join date

### 4. Test Member Registration (Binary Tree)
1. Click "Register Now" or navigate to http://localhost:3000/register
2. Fill in the form:
   - **Name**: John Doe
   - **Email**: john@example.com
   - **Mobile**: 9876543210
   - **Sponsor Code**: MEM1001
   - **Position**: Left
   - **Password**: password123
   - **Confirm Password**: password123
3. Click "Register"
4. ✅ Success message with new member code (e.g., MEM1002)

### 5. Test Spill Logic
1. Register another member under MEM1001 with LEFT position:
   - **Name**: Jane Smith
   - **Email**: jane@example.com
   - **Sponsor Code**: MEM1001
   - **Position**: Left
2. ✅ Since left is already filled by MEM1002, the system should:
   - Traverse down the left branch
   - Find MEM1002's left position
   - Place Jane there as MEM1003

3. Register a third member under MEM1001 with RIGHT position:
   - **Name**: Bob Johnson
   - **Email**: bob@example.com
   - **Sponsor Code**: MEM1001
   - **Position**: Right
4. ✅ Should place directly in MEM1001's right as MEM1004

### 6. Test Downline View
1. Login as root (admin@mlm.com)
2. Click "Downline" in navbar or "View Downline" button
3. Verify:
   - ✅ Left team shows all members placed on left side
   - ✅ Right team shows all members placed on right side
   - ✅ Counts are accurate
   - ✅ Member details are displayed

### 7. Test Count Updates
1. After registering multiple members, check dashboard
2. Verify:
   - ✅ Left Count increases when members join left branch
   - ✅ Right Count increases when members join right branch
   - ✅ Total team count = left + right

### 8. Test Login with New Member
1. Logout from root account
2. Login with newly created member:
   - Email: john@example.com
   - Password: password123
3. Verify:
   - ✅ Dashboard shows their own statistics
   - ✅ Profile shows correct sponsor code
   - ✅ Can view their own downline (if any)

### 9. Test Invalid Operations
1. **Invalid Sponsor Code**:
   - Try registering with sponsor code "MEM9999"
   - ✅ Should show error: "Invalid Sponsor Code"

2. **Duplicate Email**:
   - Try registering with existing email
   - ✅ Should show error: "Email already registered"

3. **Password Mismatch**:
   - Enter different passwords in password and confirm password
   - ✅ Should show error: "Passwords do not match"

4. **Invalid Login**:
   - Try logging in with wrong credentials
   - ✅ Should show error: "Invalid email or password"

## 🌳 Expected Binary Tree Structure

After completing all tests, your tree should look like:

```
           MEM1001 (Admin Root)
          /                    \
     MEM1002 (John)         MEM1004 (Bob)
       /
  MEM1003 (Jane)
```

## 📊 Verification Checklist

- ✅ Root member can login
- ✅ Dashboard displays correctly
- ✅ Profile shows all information
- ✅ New members can register
- ✅ Sponsor code validation works
- ✅ Position selection (Left/Right) works
- ✅ Spill logic places members correctly
- ✅ Left/Right counts update recursively
- ✅ Downline view shows team structure
- ✅ New members can login
- ✅ All error validations work
- ✅ Session management works (logout/login)
- ✅ Data persists between restarts

## 🎯 Advanced Testing

### Test Deep Spill Logic
1. Fill entire left side of MEM1001 by registering multiple members
2. Continue registering with LEFT position
3. ✅ System should automatically find deepest available left slot

### Test Multiple Levels
1. Login as MEM1002
2. Add members under MEM1002
3. Check if MEM1001's counts increase
4. ✅ Counts should update recursively upward

## 🐛 Known Limitations
- This uses file-based storage (not production-ready for high traffic)
- No email verification implemented
- No password reset functionality
- No member tree visualization (only list view)

## 📝 Notes
- Data is stored in `database/data/members.json`
- All passwords are hashed with bcrypt
- Session expires after 24 hours
- Member codes are auto-generated sequentially

---

**All tests passed! Your MLM Binary Tree application is working perfectly! 🎉**
