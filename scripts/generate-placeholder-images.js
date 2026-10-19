/**
 * Generate SVG placeholder images for cafe menu
 * Run with: node scripts/generate-placeholder-images.js
 */

const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/cafe-images');

// Create directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Color palette for different food categories
const colors = {
  beverages: { bg: '#FFF7ED', accent: '#FB923C', text: '#7C2D12' }, // Orange tones
  breakfast: { bg: '#FEF3C7', accent: '#F59E0B', text: '#78350F' }, // Yellow tones
  lunch: { bg: '#ECFCCB', accent: '#84CC16', text: '#365314' },     // Green tones
  snacks: { bg: '#FCE7F3', accent: '#EC4899', text: '#831843' },    // Pink tones
  desserts: { bg: '#E0E7FF', accent: '#818CF8', text: '#312E81' },  // Purple tones
};

// Menu items with their categories
const menuItems = [
  // Breakfast
  { name: 'chai', label: 'Masala Chai', emoji: '☕', category: 'breakfast' },
  { name: 'coffee', label: 'Filter Coffee', emoji: '☕', category: 'breakfast' },
  { name: 'poha', label: 'Poha', emoji: '🍚', category: 'breakfast' },
  { name: 'omelette', label: 'Omelette', emoji: '🍳', category: 'breakfast' },
  { name: 'paratha', label: 'Paratha', emoji: '🫓', category: 'breakfast' },
  { name: 'toast', label: 'French Toast', emoji: '🍞', category: 'breakfast' },

  // Lunch & Dinner
  { name: 'paneer-masala', label: 'Paneer Masala', emoji: '🍛', category: 'lunch' },
  { name: 'dal', label: 'Dal Tadka', emoji: '🥘', category: 'lunch' },
  { name: 'chicken-curry', label: 'Chicken Curry', emoji: '🍗', category: 'lunch' },
  { name: 'veg-biryani', label: 'Veg Biryani', emoji: '🍚', category: 'lunch' },
  { name: 'chicken-biryani', label: 'Chicken Biryani', emoji: '🍛', category: 'lunch' },
  { name: 'rice', label: 'Jeera Rice', emoji: '🍚', category: 'lunch' },

  // Snacks
  { name: 'pakora', label: 'Pakora', emoji: '🥟', category: 'snacks' },
  { name: 'bhel', label: 'Corn Bhel', emoji: '🌽', category: 'snacks' },
  { name: 'maggi', label: 'Maggi', emoji: '🍜', category: 'snacks' },
  { name: 'sandwich', label: 'Sandwich', emoji: '🥪', category: 'snacks' },
  { name: 'vada-pav', label: 'Vada Pav', emoji: '🍔', category: 'snacks' },

  // Beverages
  { name: 'cold-coffee', label: 'Cold Coffee', emoji: '🥤', category: 'beverages' },
  { name: 'lime-soda', label: 'Lime Soda', emoji: '🍋', category: 'beverages' },
  { name: 'mango-shake', label: 'Mango Shake', emoji: '🥭', category: 'beverages' },
  { name: 'buttermilk', label: 'Buttermilk', emoji: '🥛', category: 'beverages' },
  { name: 'coconut', label: 'Coconut Water', emoji: '🥥', category: 'beverages' },

  // Desserts
  { name: 'gulab-jamun', label: 'Gulab Jamun', emoji: '🍮', category: 'desserts' },
  { name: 'ice-cream', label: 'Ice Cream', emoji: '🍨', category: 'desserts' },
];

// Generate SVG for each item
menuItems.forEach(item => {
  const color = colors[item.category];

  const svg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <!-- Background gradient -->
  <defs>
    <linearGradient id="grad-${item.name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color.bg};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color.accent}15;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="800" height="600" fill="url(#grad-${item.name})"/>

  <!-- Pattern overlay -->
  <circle cx="100" cy="100" r="80" fill="${color.accent}" opacity="0.05"/>
  <circle cx="700" cy="500" r="120" fill="${color.accent}" opacity="0.05"/>
  <circle cx="650" cy="150" r="60" fill="${color.accent}" opacity="0.05"/>

  <!-- Center content -->
  <g transform="translate(400, 300)">
    <!-- Emoji (using text) -->
    <text
      x="0"
      y="0"
      font-size="120"
      text-anchor="middle"
      alignment-baseline="middle"
      opacity="0.9"
    >${item.emoji}</text>

    <!-- Label -->
    <text
      x="0"
      y="100"
      font-size="32"
      font-weight="600"
      text-anchor="middle"
      fill="${color.text}"
      font-family="system-ui, -apple-system, sans-serif"
    >${item.label}</text>

    <!-- Decorative line -->
    <line
      x1="-60"
      y1="130"
      x2="60"
      y2="130"
      stroke="${color.accent}"
      stroke-width="3"
      opacity="0.5"
    />
  </g>

  <!-- Corner accent -->
  <circle cx="40" cy="560" r="20" fill="${color.accent}" opacity="0.3"/>
  <circle cx="760" cy="40" r="25" fill="${color.accent}" opacity="0.3"/>
</svg>`;

  // Write SVG file
  const filePath = path.join(outputDir, `${item.name}.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`✅ Created: ${item.name}.svg`);
});

// Also create JPG versions with canvas (if sharp is available)
console.log('\n📝 SVG placeholders created!');
console.log('\n💡 To use real images:');
console.log('   1. Download food photos from Pexels.com');
console.log('   2. Save as .jpg files in public/cafe-images/');
console.log('   3. Use the same names as above');
console.log('   4. Restart your dev server\n');

console.log('✨ Done! Restart dev server to see images.');
