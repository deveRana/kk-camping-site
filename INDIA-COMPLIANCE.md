# India Compliance & Business Operations Audit

**For:** Lakeora Camping & Stays  
**Date:** October 29, 2026  
**Business Type:** E-Commerce / Hospitality Booking Platform

---

## 🇮🇳 INDIA COMPLIANCE

### 1. DPDP Act 2023 (Digital Personal Data Protection Act)

#### ✅ **Consent Collection - DONE**
**Status:** IMPLEMENTED ✅  
**Location:** `app/booking/BookingView.tsx` lines 419-436

**What's implemented:**
```typescript
// Explicit opt-in checkbox
<input 
  type="checkbox" 
  checked={formData.dataConsent}
  required
/>
"I consent to Lakeora collecting and processing my personal data 
(name, email, phone, city) for booking and communication purposes only. 
Your data will be stored securely and used only for legitimate business 
purposes as per India's Digital Personal Data Protection Act (DPDPA), 2023."
```

**Validation in API:**
- `app/api/bookings/route.ts` lines 54-60
- Validates consent before processing booking
- Returns error if consent not provided
- Stores consent timestamp and IP address

**Compliance level:** ✅ **GOOD**

#### ⚠️ **Notice - PARTIALLY DONE**
**Status:** NEEDS IMPROVEMENT

**What exists:**
- ✅ Privacy Policy page (`/privacy`)
- ✅ Terms & Conditions page (`/terms`)
- ✅ Consent checkbox with clear language

**What's missing:**
- ❌ Privacy Policy doesn't explicitly mention DPDP Act 2023
- ❌ No clear "Purpose of Data Collection" notice
- ❌ No mention of data retention period

**Action Required:**
Update Privacy Policy to include:
1. Reference to DPDP Act 2023
2. List specific purposes: "booking confirmation, payment processing, communication"
3. Data retention: "retained until booking completion + 2 years for tax purposes"
4. Children's data: "Our services are for adults 18+ only"

**Priority:** HIGH

#### ❌ **Data Deletion/Withdrawal - NOT IMPLEMENTED**
**Status:** MISSING ❌  
**Priority:** MUST (DPDP Requirement)

**What's required:**
Users must be able to:
1. Request deletion of their personal data
2. Withdraw consent
3. Get response within 30 days

**Implementation needed:**

1. Create `/data-deletion` page with form
2. Add "Delete My Data" link in footer
3. Process: User requests → Admin reviews → Data deleted (except legal retention)

**Code to add:**
```typescript
// app/data-deletion/page.tsx
// Form to request data deletion
// Fields: email, booking reference, reason
// Submit → Email to admin
```

**Action Required:** Create data deletion request form  
**Priority:** HIGH (DPDP compliance)

#### ❌ **Breach Handling - NOT IMPLEMENTED**
**Status:** MISSING ❌  
**Priority:** MUST

**Requirements:**
- Notify affected users within 72 hours of data breach
- Report to Data Protection Board if breach affects >1000 users
- Document all breaches

**Action Required:**
1. Create breach notification email template
2. Document breach response process
3. Keep incident log

**Priority:** MEDIUM (setup before launch)

---

### 2. GST-Compliant Invoices

#### ❌ **GST Details Missing - NOT IMPLEMENTED**
**Status:** MISSING ❌  
**Priority:** MUST (if revenue > ₹20 lakhs/year)

**Current invoice:** `app/booking/invoice/page.tsx`  
**What's missing:**
- ❌ Business GSTIN (GST Registration Number)
- ❌ HSN/SAC code (Services: 9996 - Hotel/Accommodation)
- ❌ GST breakdown (CGST + SGST or IGST)
- ❌ Place of Supply
- ❌ Invoice numbering (FY-based: LKO/2024-25/001)

**GST Requirements for Hospitality:**
- Service: Accommodation Services
- HSN/SAC Code: **9963** (Short-term accommodation services)
- GST Rate: **12%** (for rooms < ₹7,500/night) or **18%** (for rooms ≥ ₹7,500/night)
- Your packages: ₹1,000-₹2,500/person → **12% GST**

**GST Calculation Example:**
```
Base Price: ₹2,000/person × 4 guests = ₹8,000
CGST (6%): ₹480
SGST (6%): ₹480
Total GST: ₹960
Final Amount: ₹8,960
```

**Action Required:**

1. **Get GST Registration** (if not already)
   - Register at: https://www.gst.gov.in
   - Required if annual revenue > ₹20 lakhs
   - For Maharashtra: GSTIN format: 27XXXXX

2. **Update Invoice Template:**
```typescript
// Add to invoice
Business Name: Lakeora Stays
GSTIN: 27XXXXXXXXXXXXXX (your actual GSTIN)
Place of Supply: Maharashtra
HSN/SAC Code: 9963

// Price breakdown
Accommodation Charges: ₹8,000
CGST @ 6%: ₹480
SGST @ 6%: ₹480
Total Amount: ₹8,960
```

3. **Update Booking Flow:**
   - Calculate GST automatically
   - Show GST breakdown before payment
   - Store GST amount in booking record

**Priority:** HIGH (legal requirement if GST-registered)

---

### 3. Grievance Officer Details

#### ❌ **Grievance Officer Not Listed - NOT IMPLEMENTED**
**Status:** MISSING ❌  
**Priority:** MUST (Required for e-commerce under IT Rules 2021)

**Legal Requirement:**
Every e-commerce operator must:
1. Appoint a Grievance Officer (can be owner/manager)
2. Display details on website
3. Acknowledge complaints within 48 hours
4. Resolve within 1 month

**What to include:**
```
Grievance Officer Details:
Name: [Your Name or Manager Name]
Designation: Grievance Officer
Email: grievance@lakeorastay.com
Phone: +91 74997 57607
Address: Lakeora, Pawna Lake, Lonavala, Maharashtra 410406
Response Time: Complaints acknowledged within 48 hours
```

**Action Required:**

1. **Create `/grievance` page** with:
   - Officer details
   - Complaint submission form
   - Expected response timeline

2. **Add to footer:**
   - Link to Grievance Officer page
   - Under "Customer Care" section

3. **Email setup:**
   - Create grievance@lakeorastay.com
   - Forward to main support email
   - Auto-reply: "Received, will respond in 48 hours"

**Priority:** HIGH (IT Rules 2021 compliance)

---

### 4. CERT-In Incident Reporting

#### ⚠️ **Not Yet Required - DOCUMENTATION NEEDED**
**Status:** PREPARE DOCS  
**Priority:** MEDIUM

**When required:**
Certain cyber security incidents must be reported to CERT-In within 6 hours:
- Data breach affecting users
- Unauthorized access to server
- Website defacement
- Malware attack
- DDoS attack

**Your risk level:** LOW (using managed services)
- Vercel handles infrastructure security
- Sanity handles database security
- Razorpay handles payment security

**Action Required:**
1. Document CERT-In reporting process
2. Keep CERT-In contact ready: https://www.cert-in.org.in
3. If breach occurs: Report within 6 hours

**Priority:** LOW (document and keep ready)

---

### 5. Payment Testing (Razorpay/UPI)

#### ⚠️ **Needs Real Flow Testing - PARTIALLY DONE**
**Status:** CODE READY, TESTING NEEDED  
**Priority:** MUST before launch

**What to test:**

1. **Successful Payment:**
   - ✅ Create order in Razorpay
   - ✅ Open Razorpay checkout
   - ✅ Complete payment
   - ✅ Verify signature
   - ✅ Save booking
   - ✅ Send confirmation email

2. **Failed Payment Scenarios:**
   - ❌ Payment declined by bank
   - ❌ Insufficient balance
   - ❌ User closes payment window
   - ❌ Network timeout
   - ❌ Razorpay service down

3. **INR-Specific:**
   - ✅ Currency: INR
   - ✅ Amount in paise (multiply by 100)
   - ❌ Test with Indian cards (RuPay, Visa, Mastercard)
   - ❌ Test UPI payments
   - ❌ Test Net Banking

**Test Checklist:**
```
☐ Test successful payment with test card
☐ Test payment failure scenarios
☐ Test UPI payment (PhonePe, Google Pay, Paytm)
☐ Test Net Banking
☐ Test payment < ₹1 (should fail - Razorpay minimum)
☐ Test payment > ₹5,00,000 (might need special approval)
☐ Verify email sent on success
☐ Verify email sent on failure
☐ Verify booking created only after payment
☐ Test refund flow (if cancellation allowed)
```

**Action Required:**
1. Switch Razorpay to **Test Mode**
2. Use test API keys
3. Complete all test scenarios above
4. Document any issues found
5. Only then switch to **Live Mode**

**Priority:** MUST (before accepting real bookings)

---

## 💼 BUSINESS & OPERATIONS

### 6. Refund & Cancellation Enforcement

#### ⚠️ **Policy Exists, Enforcement Partial**
**Status:** POLICY DONE, CODE PARTIAL  
**Priority:** SHOULD

**Current status:**
- ✅ Cancellation policy page exists (`/cancellation`)
- ✅ Policy linked in footer
- ❌ No automatic refund processing
- ❌ No cancellation button in booking

**What's in your policy:**
- Cancellation >7 days before: 100% refund
- Cancellation 3-7 days before: 50% refund
- Cancellation <3 days before: No refund
- Cancellation due to weather: Full refund

**Code enforcement needed:**
```typescript
// Calculate refund based on policy
function calculateRefund(bookingDate, checkInDate, amount) {
  const daysUntilCheckIn = getDaysDifference(bookingDate, checkInDate);
  
  if (daysUntilCheckIn > 7) return amount; // 100%
  if (daysUntilCheckIn >= 3) return amount * 0.5; // 50%
  return 0; // No refund
}
```

**Action Required:**
1. Add "Request Cancellation" button on booking confirmation page
2. Implement refund calculation based on policy
3. Process refund via Razorpay API
4. Send cancellation confirmation email

**Priority:** SHOULD (before launch)

---

### 7. Support Channel

#### ⚠️ **Contact Methods Exist, Response Time Not Documented**
**Status:** PARTIAL  
**Priority:** SHOULD

**Current support:**
- ✅ Contact page with form
- ✅ Phone number: +91 74997 57607
- ✅ Email: info@lakeorastay.com
- ❌ No WhatsApp Business number listed
- ❌ No live chat
- ❌ No response time promise

**Action Required:**

1. **Set up WhatsApp Business:**
   - Use same number: +91 74997 57607
   - Add WhatsApp link to website
   - Add to contact page

2. **Document Response Times:**
   - Phone: 9 AM - 9 PM daily
   - Email: Within 24 hours
   - WhatsApp: Within 4 hours (9 AM - 9 PM)

3. **Add to footer:**
```html
<a href="https://wa.me/917499757607">
  <WhatsAppIcon /> Chat on WhatsApp
</a>
```

**Priority:** SHOULD (improves customer trust)

---

### 8. Changelog

#### ❌ **No Changelog - NOT IMPLEMENTED**
**Status:** MISSING  
**Priority:** NICE TO HAVE

**Purpose:**
- Track feature releases
- Communicate updates to users
- Internal team reference

**Action Required:**
1. Create `CHANGELOG.md` file
2. Format:
```markdown
# Changelog

## [1.1.0] - 2026-11-01
### Added
- Maitri Camping property
- Veg/Non-veg food preferences
- 50% advance payment system

### Fixed
- Mobile menu navigation
- Email template formatting

## [1.0.0] - 2026-10-29
### Added
- Initial launch
- Booking system
- Payment integration
```

**Priority:** LOW (nice to have, not critical)

---

### 9. Documentation & Handover

#### ⚠️ **Partial Documentation**
**Status:** NEEDS IMPROVEMENT  
**Priority:** SHOULD

**What exists:**
- ✅ Code is on GitHub
- ✅ README.md (basic)
- ✅ Audit checklists created today

**What's missing:**
- ❌ Complete setup documentation
- ❌ Environment variables list
- ❌ Deployment guide
- ❌ Troubleshooting guide
- ❌ Where credentials are stored

**Action Required:**

Create `SETUP.md`:
```markdown
# Lakeora - Setup & Deployment Guide

## Environment Variables
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=xxx
RAZORPAY_KEY_ID=xxx
RAZORPAY_KEY_SECRET=xxx
RESEND_API_KEY=xxx
ADMIN_EMAIL=xxx

## Accounts & Credentials
- Vercel: [email] - owner@lakeorastay.com
- Sanity: [email] - same
- Razorpay: [email] - same
- Domain: [registrar] - GoDaddy/Namecheap
- GitHub: [repo] - github.com/deveRana/kk-camping-site

## Deployment
git push origin main → Auto-deploys to Vercel

## Support Contacts
- Developer: [your contact]
- Domain support: [registrar support]
- Payment issues: Razorpay support
```

**Priority:** SHOULD (critical for handover)

---

### 10. Code Backup (Outside One Platform)

#### ⚠️ **Single Platform Risk**
**Status:** NEEDS BACKUP  
**Priority:** NICE TO HAVE

**Current:**
- ✅ Code on GitHub
- ❌ No secondary backup

**Risk:** If GitHub account compromised, code lost

**Action Required:**

**Option 1: GitLab Mirror (Free)**
```bash
# Add GitLab as second remote
git remote add gitlab https://gitlab.com/your-username/kk-camping-site.git
git push gitlab main
```

**Option 2: Local Backup**
```bash
# Monthly backup
cd ~/backups
git clone https://github.com/deveRana/kk-camping-site.git lakeora-$(date +%Y-%m)
```

**Option 3: Automated Sync**
- Use GitHub Actions to sync to GitLab
- Runs on every push

**Priority:** LOW (GitHub is very reliable)

---

### 11. Bus Factor (Two People Access)

#### ❌ **Single Person Risk - NOT IMPLEMENTED**
**Status:** CRITICAL BUSINESS RISK ❌  
**Priority:** MUST

**Current status:**
- ❌ Only one person has access to everything
- ❌ If you're unavailable, site can't be managed

**What needs shared access:**

1. **Domain Registration:**
   - Add second admin email
   - Share login credentials (use password manager)

2. **Vercel (Hosting):**
   - Invite team member: Settings → Team → Invite
   - Role: Member (can deploy)

3. **Sanity (CMS):**
   - Add team member: Project Settings → Team
   - Role: Administrator

4. **Razorpay (Payments):**
   - Add team member: Settings → Team
   - Role: Admin or Manager

5. **Email Account:**
   - Share credentials with trusted person
   - Or forward to backup email

6. **GitHub (Code):**
   - Add collaborator: Repo Settings → Collaborators
   - Or transfer repo to organization account

**Action Required:**

**CRITICAL - Do this before launch:**
1. Identify trusted second person (business partner, family member, or developer)
2. Use password manager (1Password, LastPass, Bitwarden) to share credentials
3. Add them to all platforms listed above
4. Document: "If I'm unavailable, contact [Person] - [Phone] - [Email]"

**Priority:** MUST (business continuity)

---

## 📊 COMPLIANCE SUMMARY

### ✅ DONE (4 items)
1. DPDP Consent collection
2. Privacy Policy & Terms pages
3. Contact information visible
4. Refund policy documented

### ❌ MISSING - CRITICAL (4 items)
1. **Data deletion request form** (DPDP requirement)
2. **GST details in invoices** (if GST-registered)
3. **Grievance Officer page** (IT Rules 2021)
4. **Two-person access** (business continuity)

### ⚠️ NEEDS IMPROVEMENT (7 items)
1. Privacy Policy - mention DPDP Act explicitly
2. Payment testing - test all failure scenarios
3. Refund enforcement - add cancellation feature
4. Support channel - add WhatsApp, document response times
5. Documentation - create complete setup guide
6. Code backup - mirror to second platform
7. CERT-In - document incident reporting process

### 📋 NICE TO HAVE (2 items)
1. Changelog file
2. Automated backups

---

## 🚨 PRIORITY ACTION ITEMS

### **BEFORE LAUNCH** (Must Do)
1. ✅ Create Grievance Officer page (IT Rules)
2. ✅ Create Data Deletion request form (DPDP)
3. ✅ Add second person access to all platforms (Bus Factor)
4. ✅ Test all payment failure scenarios
5. ✅ Update Privacy Policy with DPDP references
6. ✅ Add GST details to invoices (if registered)

### **WEEK 1 AFTER LAUNCH**
7. Set up WhatsApp Business
8. Document response time promises
9. Add cancellation button to bookings
10. Create complete setup documentation

### **MONTH 1**
11. Review GDPR/DPDP compliance
12. Set up code mirror backup
13. Create changelog
14. Document CERT-In process

---

## 💰 COSTS

**GST Registration:** Free (but need CA for filing: ~₹5,000-₹10,000/year)  
**WhatsApp Business:** Free  
**Password Manager:** ₹0-₹500/month (LastPass/1Password)  
**Code Backup:** ₹0 (GitLab/Bitbucket free)  
**Documentation:** ₹0 (your time)

**Total Additional Cost:** ~₹10,000/year for CA/GST compliance

---

## ✅ NEXT STEPS

1. Read this document fully
2. Create missing pages (grievance, data-deletion)
3. Add second person to all platforms
4. Test payment flows thoroughly
5. Launch with confidence! 🚀
