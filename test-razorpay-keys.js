// Quick test script to verify Razorpay keys
// Run with: node test-razorpay-keys.js

require('dotenv').config({ path: '.env.local' });

console.log('\n🔍 Checking Razorpay Environment Variables...\n');

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;
const publicKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

console.log('RAZORPAY_KEY_ID:', keyId ? '✅ Set (' + keyId.substring(0, 15) + '...)' : '❌ Missing');
console.log('RAZORPAY_KEY_SECRET:', keySecret ? '✅ Set (hidden for security)' : '❌ Missing');
console.log('NEXT_PUBLIC_RAZORPAY_KEY_ID:', publicKeyId ? '✅ Set (' + publicKeyId.substring(0, 15) + '...)' : '❌ Missing');

if (keyId && keySecret && publicKeyId) {
  console.log('\n✅ All Razorpay keys are configured!\n');

  if (keyId === publicKeyId) {
    console.log('✅ Key IDs match (correct setup)\n');
  } else {
    console.log('⚠️  Warning: RAZORPAY_KEY_ID and NEXT_PUBLIC_RAZORPAY_KEY_ID should be the same!\n');
  }

  if (keyId.startsWith('rzp_test_')) {
    console.log('🧪 Using TEST mode keys (safe for development)\n');
  } else if (keyId.startsWith('rzp_live_')) {
    console.log('🚀 Using LIVE mode keys (production)\n');
  }
} else {
  console.log('\n❌ Missing Razorpay keys! Please add them to .env.local\n');
  console.log('Get your keys from: https://dashboard.razorpay.com/app/keys\n');
}
