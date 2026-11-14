/**
 * Lakeora Café — official menu card (source of truth for the Sanity import).
 * Each item: [name, price, isVeg, description, searchQueries[], flags?]
 * `q` = Wikimedia Commons search queries tried in order to find an accurate photo.
 */

const S = (name, price, isVeg, description, q, extra = {}) => ({ name, price, isVeg, description, q, ...extra });

const sections = [
  { category: 'Soups', items: [
    S('Veg Manchow Soup', 140, true, 'Spicy, hearty Indo-Chinese soup of mixed vegetables topped with crispy fried noodles.', ['manchow soup', 'veg manchow soup']),
    S('Veg Tomato Soup', 130, true, 'Silky roasted tomato soup finished with cream and herbs.', ['tomato soup bowl', 'cream of tomato soup']),
    S('Veg Mushroom Soup', 150, true, 'Creamy, earthy mushroom soup simmered with garlic and pepper.', ['cream of mushroom soup', 'mushroom soup bowl']),
    S('Veg Hot & Sour Soup', 140, true, 'Tangy and peppery vegetable soup with a classic hot-and-sour kick.', ['hot and sour soup', 'vegetable hot and sour soup']),
    S('Chicken Manchow Soup', 180, false, 'Bold chicken manchow soup with ginger, garlic and crunchy fried noodles.', ['chicken manchow soup', 'manchow soup chicken']),
    S('Chicken Hot & Sour Soup', 180, false, 'Shredded chicken in a spicy, tangy broth — warming and comforting.', ['chicken hot and sour soup', 'hot and sour soup']),
    S('Chicken Lung Fung Soup', 190, false, 'Indo-Chinese chicken soup with vegetables and egg ribbons, light and flavourful.', ['chicken lung fung soup', 'lung fung soup', 'chicken sweet corn soup']),
  ]},
  { category: 'Starters', items: [
    S('Veg Manchurian Dry', 210, true, 'Crisp vegetable dumplings tossed in a spicy garlic-soy Manchurian sauce.', ['vegetable manchurian dry', 'gobi manchurian dry', 'veg manchurian']),
    S('Paneer Manchurian Dry', 240, true, 'Golden paneer cubes wok-tossed in tangy Manchurian sauce.', ['paneer manchurian', 'paneer manchurian dry']),
    S('Paneer Chilli Dry', 240, true, 'Paneer stir-fried with capsicum, onions and fiery chilli-soy sauce.', ['chilli paneer', 'chilly paneer dry']),
    S('Paneer Crispy', 250, true, 'Crunchy battered paneer strips tossed in a sweet-spicy glaze.', ['crispy paneer', 'paneer crispy starter', 'paneer fingers']),
    S('Paneer 65', 240, true, 'South-Indian style spicy fried paneer with curry leaves and red chilli.', ['paneer 65', 'paneer 65 starter']),
    S('Veg 65 Dry', 210, true, 'Crispy spiced vegetable fritters in the famous 65 style.', ['gobi 65', 'veg 65', 'cauliflower 65']),
    S('Veg Spring Roll', 190, true, 'Crispy golden rolls stuffed with seasoned vegetables, served with chilli sauce.', ['vegetable spring rolls', 'spring rolls fried']),
    S('Chicken Chilli', 270, false, 'Juicy chicken pieces stir-fried with peppers and a spicy chilli-soy glaze.', ['chilli chicken', 'chilli chicken dry']),
    S('Chicken Manchurian', 270, false, 'Crispy chicken tossed in a tangy, garlicky Manchurian sauce.', ['chicken manchurian', 'chicken manchurian dry']),
    S('Chicken Crispy', 280, false, 'Golden crunchy chicken strips in a sweet-spicy sauce.', ['crispy chicken strips', 'crispy chilli chicken', 'fried chicken strips']),
    S('Chicken Dry', 270, false, 'Spiced, wok-tossed dry chicken starter with onions and capsicum.', ['dry chicken starter indo chinese', 'chicken lollipop', 'chilli chicken dry']),
    S('Chicken Spring Roll', 250, false, 'Crispy rolls filled with seasoned chicken and vegetables.', ['chicken spring rolls', 'spring rolls fried']),
  ]},
  { category: 'Rice', items: [
    S('Veg Fried Rice', 190, true, 'Wok-tossed rice with fresh vegetables and soy.', ['vegetable fried rice', 'veg fried rice']),
    S('Veg Schezwan Rice', 210, true, 'Fiery schezwan-sauce fried rice with crunchy vegetables.', ['schezwan fried rice', 'szechuan fried rice vegetable']),
    S('Mushroom Fried Rice', 220, true, 'Fried rice with sautéed mushrooms and spring onions.', ['mushroom fried rice']),
    S('Veg Triple Fried Rice', 299, true, 'Loaded triple-style rice with noodles, gravy and crispy toppings.', ['triple schezwan rice', 'triple fried rice', 'vegetable fried rice']),
    S('Chicken Fried Rice', 250, false, 'Classic wok-fried rice with tender chicken, egg and vegetables.', ['chicken fried rice']),
    S('Egg Fried Rice', 220, false, 'Egg fried rice with spring onions and a hint of soy.', ['egg fried rice']),
    S('Chicken Schezwan Rice', 270, false, 'Spicy schezwan fried rice with juicy chicken pieces.', ['chicken schezwan fried rice', 'schezwan chicken fried rice', 'chicken fried rice']),
    S('Egg Schezwan Rice', 240, false, 'Egg fried rice tossed in fiery schezwan sauce.', ['egg schezwan fried rice', 'egg fried rice']),
    S('Chicken Triple Rice', 349, false, 'Indulgent triple-style chicken rice with noodles, gravy and toppings.', ['triple schezwan rice', 'chicken fried rice']),
    S('Chicken Singapore Rice', 280, false, 'Curry-spiced Singapore-style fried rice with chicken and vegetables.', ['singapore fried rice', 'singapore rice chicken', 'chicken fried rice']),
    S('Chicken Manchurian Rice', 290, false, 'Fried rice served with saucy chicken Manchurian.', ['chicken manchurian rice', 'chicken manchurian fried rice', 'chicken fried rice manchurian']),
    S('Chicken Chilli Rice', 290, false, 'Fried rice paired with spicy chilli chicken.', ['chilli chicken fried rice', 'chicken chilli rice', 'chicken fried rice']),
  ]},
  { category: 'Noodles', items: [
    S('Veg Noodles', 190, true, 'Stir-fried noodles with crunchy vegetables — ask for Hakka or Schezwan.', ['vegetable hakka noodles', 'veg hakka noodles']),
    S('Egg Noodles', 220, false, 'Stir-fried noodles with scrambled egg and vegetables — Hakka or Schezwan.', ['egg noodles stir fried', 'egg hakka noodles']),
    S('Chicken Noodles', 250, false, 'Wok-tossed noodles with chicken and vegetables — Hakka or Schezwan.', ['chicken hakka noodles', 'chicken noodles stir fried']),
  ]},
  { category: 'Tea & Coffee', items: [
    S('Hot Coffee', 90, true, 'Freshly brewed hot milk coffee.', ['cup of hot coffee with milk', 'cup of coffee']),
    S('Black Coffee', 90, true, 'Strong, aromatic black coffee served hot.', ['black coffee cup', 'cup of black coffee']),
    S('Tea', 50, true, 'Classic Indian masala chai brewed with milk.', ['masala chai cup', 'indian chai tea cup']),
    S('Black Tea', 60, true, 'Simple, refreshing black tea.', ['black tea cup', 'cup of black tea']),
    S('Lemon Tea', 70, true, 'Light black tea brightened with fresh lemon.', ['lemon tea', 'tea with lemon slice']),
  ]},
  { category: 'Fresh Juices', items: [
    S('Mosambi Juice', 130, true, 'Fresh-pressed sweet lime (mosambi) juice.', ['mosambi juice', 'sweet lime juice glass']),
    S('Orange Juice', 140, true, 'Freshly squeezed orange juice, served chilled.', ['glass of orange juice', 'orange juice']),
    S('Watermelon Juice', 120, true, 'Cool, hydrating fresh watermelon juice.', ['watermelon juice glass', 'watermelon juice']),
    S('Pineapple Juice', 140, true, 'Sweet and tangy fresh pineapple juice.', ['glass of pineapple juice', 'pineapple juice']),
    S('Orange & Jamun Juice', 150, true, 'A refreshing blend of orange and Indian jamun.', ['jamun juice', 'java plum juice', 'jamun drink']),
    S('Mango Mast', 160, true, 'Thick, luscious mango drink — a Pawna summer favourite.', ['mango juice glass', 'mango drink glass']),
    S('Lakeora Special Juice', 180, true, 'The house special: a fresh signature fruit blend, made to order.', ['mixed fruit juice glass', 'fruit punch drink glass'], { isSpecial: true }),
  ]},
  { category: 'Milkshakes', items: [
    S('Chocolate Milkshake', 180, true, 'Rich, thick chocolate milkshake topped with chocolate drizzle.', ['chocolate milkshake', 'chocolate milkshake glass']),
    S('Pineapple Milkshake', 170, true, 'Creamy pineapple milkshake with a tropical tang.', ['pineapple milkshake', 'pineapple smoothie']),
    S('Butterscotch Milkshake', 180, true, 'Creamy shake with sweet, buttery butterscotch.', ['butterscotch milkshake', 'caramel milkshake', 'milkshake glass']),
    S('Sitaphal Milkshake', 190, true, 'Seasonal custard-apple (sitaphal) milkshake, naturally sweet and creamy.', ['custard apple milkshake', 'sitaphal shake', 'custard apple']),
    S('Strawberry Milkshake', 180, true, 'Classic strawberry milkshake made with real strawberry flavour.', ['strawberry milkshake', 'strawberry milkshake glass']),
    S('Green Apple Milkshake', 180, true, 'A fresh, zingy green-apple milkshake.', ['green apple milkshake', 'green apple smoothie', 'milkshake glass']),
    S('Mango Milkshake', 190, true, 'Thick mango milkshake made with ripe mango.', ['mango milkshake', 'mango shake glass']),
  ]},
  { category: 'Mojitos & Coolers', items: [
    S('Blueberry Mojito', 160, true, 'Sparkling mint-lime mojito with sweet blueberry.', ['blueberry mojito', 'blue mojito mocktail']),
    S('Blackcurrant Mojito', 160, true, 'Chilled mojito with mint, lime and tangy blackcurrant.', ['blackcurrant mojito', 'purple mojito mocktail', 'mojito mocktail']),
    S('Kala Khatta Mojito', 150, true, 'Desi twist on a mojito with tangy-sweet kala khatta.', ['kala khatta drink', 'kala khatta gola', 'mojito mocktail']),
    S('Masala Jeera Cooler', 140, true, 'Spiced cumin-lime cooler — digestive and refreshing.', ['jaljeera', 'jal jeera drink', 'jeera soda']),
  ]},
  { category: 'Cold Coffee', items: [
    S('Cold Coffee', 170, true, 'Thick, creamy iced coffee blended with milk and ice cream.', ['cold coffee glass', 'iced coffee glass']),
    S('Chocolate Cold Coffee', 190, true, 'Cold coffee blended with rich chocolate and topped with chocolate syrup.', ['chocolate cold coffee', 'iced mocha', 'frappe chocolate coffee']),
  ]},
  { category: 'Sandwiches', items: [
    S('Veg Cheese Sandwich', 169, true, 'Grilled sandwich with vegetables and melted cheese.', ['grilled vegetable cheese sandwich', 'veg cheese sandwich', 'grilled cheese sandwich']),
    S('Corn Sandwich', 179, true, 'Toasted sandwich loaded with sweet corn and cheese.', ['corn sandwich', 'corn cheese sandwich', 'grilled sandwich india']),
    S('Paneer Tikka Sandwich', 199, true, 'Grilled sandwich stuffed with smoky paneer tikka.', ['paneer tikka sandwich', 'paneer sandwich']),
    S('Russian Sandwich', 189, true, 'Creamy Russian-salad filling grilled between toasted bread.', ['russian salad sandwich', 'russian sandwich', 'grilled sandwich india']),
    S('Cheese Chilli Sandwich', 189, true, 'Grilled sandwich with green chilli and gooey cheese.', ['cheese chilli sandwich', 'chilli cheese toast sandwich', 'grilled cheese sandwich']),
    S('Club Sandwich', 209, true, 'Triple-decker sandwich layered with vegetables, cheese and sauces.', ['club sandwich vegetarian', 'club sandwich']),
    S('Veg Jungli Sandwich', 199, true, 'Loaded jungli-style sandwich with spicy chutney, veggies and cheese.', ['jungli sandwich', 'bombay masala sandwich', 'vegetable sandwich india']),
    S('Chicken Cheese Sandwich', 229, false, 'Grilled sandwich stuffed with chicken and melted cheese.', ['chicken cheese sandwich', 'grilled chicken sandwich']),
    S('Chicken Tikka Sandwich', 239, false, 'Smoky chicken tikka grilled in toasted bread.', ['chicken tikka sandwich', 'grilled chicken sandwich']),
    S('Chicken Russian Sandwich', 239, false, 'Chicken with creamy Russian salad, grilled to golden.', ['chicken salad sandwich', 'chicken mayo sandwich', 'grilled chicken sandwich']),
    S('Chicken Club Sandwich', 259, false, 'Classic triple-decker club with chicken, egg and fresh veggies.', ['chicken club sandwich', 'club sandwich']),
  ]},
  { category: 'Toast & Breads', items: [
    S('Bread Butter', 99, true, 'Soft bread slices served with butter.', ['bread and butter', 'bread slices with butter']),
    S('Butter Toast', 109, true, 'Golden toasted bread slathered in butter.', ['buttered toast', 'toast with butter']),
    S('Bread Jam & Butter', 119, true, 'Toasted bread with butter and sweet fruit jam.', ['bread butter jam', 'toast with jam']),
    S('Mayonnaise Bread', 129, true, 'Toasted bread with creamy mayonnaise spread.', ['mayonnaise toast', 'bread with mayonnaise', 'toast']),
    S('Garlic Cheese Bread', 179, true, 'Crispy garlic bread baked with melted cheese.', ['garlic cheese bread', 'cheesy garlic bread']),
  ]},
  { category: 'Burgers', items: [
    S('Veg Cheese Burger', 189, true, 'Crispy veg patty with cheese, lettuce and sauces in a toasted bun.', ['veggie burger', 'vegetable burger cheese']),
    S('Jumbo Veg Burger', 229, true, 'Extra-large veg burger with double patty, cheese and fresh veggies.', ['veggie burger', 'vegetable burger']),
    S('Chicken Tikka Burger', 249, false, 'Spicy chicken tikka patty burger with mint mayo.', ['chicken burger', 'chicken burger crispy']),
    S('Jumbo Chicken Burger', 279, false, 'Double-stacked chicken burger with cheese and crunchy lettuce.', ['chicken burger', 'double chicken burger']),
  ]},
  { category: 'Pizza', items: [
    S('Veg Cheese Pizza', 259, true, 'Cheese-loaded pizza with fresh vegetables.', ['vegetable pizza cheese', 'cheese pizza']),
    S('Veg Corn Pizza', 269, true, 'Pizza topped with sweet corn, capsicum and mozzarella.', ['corn pizza', 'sweet corn pizza']),
    S('Paneer Tikka Pizza', 299, true, 'Paneer tikka chunks, onions and capsicum on a cheesy base.', ['paneer tikka pizza', 'paneer pizza']),
    S('Paneer Pizza', 289, true, 'Soft paneer cubes with cheese on a crispy base.', ['paneer pizza', 'paneer tikka pizza']),
    S('Russian Pizza', 299, true, 'Creamy Russian-salad topped pizza with melted cheese.', ['russian salad pizza', 'vegetable pizza cheese']),
    S('Margherita Pizza', 239, true, 'Classic margherita with tomato sauce, mozzarella and basil.', ['pizza margherita', 'margherita pizza']),
    S('Lakeora Veg Special Pizza', 339, true, 'House special veg pizza loaded with premium toppings and extra cheese.', ['loaded vegetable pizza', 'vegetarian pizza supreme', 'vegetable pizza cheese'], { isSpecial: true }),
    S('Chicken Pizza', 309, false, 'Juicy chicken pieces with onions and mozzarella.', ['chicken pizza', 'chicken pizza slice']),
    S('Chicken Tikka Pizza', 339, false, 'Smoky chicken tikka with capsicum and cheese.', ['chicken tikka pizza']),
    S('Chicken Russian Pizza', 339, false, 'Chicken with creamy Russian salad and cheese.', ['chicken pizza', 'chicken pizza white sauce']),
    S('Chicken Mangalore Pizza', 349, false, 'Mangalorean-spiced chicken topping on a cheesy base.', ['chicken pizza spicy', 'chicken pizza']),
    S('Chicken BBQ Pizza', 359, false, 'Tangy barbecue chicken pizza with onions and cheese.', ['bbq chicken pizza', 'barbecue chicken pizza']),
    S('Lakeora Café Special Pizza', 389, false, 'The café’s signature non-veg pizza with premium chicken and loads of cheese.', ['loaded chicken pizza', 'meat pizza supreme', 'chicken pizza'], { isSpecial: true }),
  ]},
  { category: 'French Fries', items: [
    S('Classic French Fries', 149, true, 'Golden, crispy salted fries.', ['french fries', 'french fries plate']),
    S('Peri-Peri French Fries', 169, true, 'Crispy fries dusted with fiery peri-peri seasoning.', ['peri peri fries', 'spicy french fries seasoned']),
    S('Cheese French Fries', 189, true, 'Hot fries smothered in melted cheese sauce.', ['cheese fries', 'cheesy french fries']),
    S('Lakeora Special Fries', 209, true, 'Signature loaded fries with cheese, sauces and seasoning.', ['loaded fries', 'loaded french fries cheese'], { isSpecial: true }),
  ]},
  { category: 'Pasta', items: [
    S('Classic Pasta', 219, true, 'Penne in a rich red tomato sauce with herbs.', ['penne pasta tomato sauce', 'pasta red sauce', 'penne arrabbiata']),
    S('Cheese Pasta', 249, true, 'Creamy white-sauce pasta baked with cheese.', ['white sauce pasta', 'penne alfredo', 'macaroni and cheese']),
    S('Masala Pasta', 229, true, 'Desi-style pasta tossed in Indian spices and vegetables.', ['masala pasta', 'indian style pasta', 'pasta red sauce']),
  ]},
  { category: 'Momos', items: [
    S('Fried Veg Momos', 189, true, 'Crispy fried dumplings stuffed with spiced vegetables, with red chutney.', ['fried momo vegetable', 'fried momos', 'momo fried']),
    S('Fried Chicken Momos', 229, false, 'Golden fried dumplings with a juicy chicken filling.', ['fried chicken momo', 'fried momos', 'momo fried']),
  ]},
  { category: 'Frankies', items: [
    S('Veg Frankie', 159, true, 'Spiced vegetable filling rolled in a soft roti with tangy sauces.', ['veg kathi roll', 'vegetable frankie', 'veg roll indian']),
    S('Chicken Frankie', 199, false, 'Juicy chicken tikka wrapped in a soft roti with onions and sauces.', ['chicken kathi roll', 'chicken frankie', 'chicken tikka roll']),
  ]},
];

const items = [];
let order = 1;
for (const sec of sections) {
  for (const it of sec.items) {
    const slug = it.name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    items.push({ ...it, category: sec.category, slug, order: order++, isSpecial: !!it.isSpecial });
  }
}

module.exports = { items, categories: sections.map((s) => s.category) };
