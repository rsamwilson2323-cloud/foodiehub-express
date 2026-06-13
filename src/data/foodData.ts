export type Food = {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  veg: boolean;
  image: string;
  restaurantId: string;
};

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  deliveryTime: string;
  rating: number;
  location: string;
  open: boolean;
  image: string;
};

export type Category = {
  id: string;
  name: string;
  emoji: string;
  subcategories: string[];
  image: string;
};

type FoodSeed = {
  name: string;
  search: string;
  veg?: boolean;
  description?: string;
};

type CategorySeed = {
  id: string;
  name: string;
  emoji: string;
  coverSearch: string;
  items: FoodSeed[];
};

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const searchThumb = (query: string, width = 600, height = 400, key = "") => {
  const foodSafeQuery = `${slug(query)} ${key} food dish close up menu plate -people -animal -pet`;
  return `https://tse4.mm.bing.net/th?q=${encodeURIComponent(foodSafeQuery)}&w=${width}&h=${height}&c=7&rs=1&p=0&o=5&pid=1.7`;
};

const categoryPhoto = (name: string, search: string, key: number) => searchThumb(`${name} ${search} food category`, 600, 400, `c${key}`);

const foodPhoto = (category: string, name: string, search: string, key: number) =>
  searchThumb(`${name} ${category} ${search} plated food only`, 600, 400, `f${key}`);

const restaurantPhotoCounters: Record<string, number> = {};

const restaurantFoodPhoto = (categoryId: string) => {
  const safeFoodCategory =
    categoryId === "pizza" ? "pizza" :
    categoryId === "burgers" ? "burger" :
    categoryId === "south-indian" ? "dosa" :
    categoryId === "italian" ? "pasta" :
    categoryId === "desserts" || categoryId === "chocolates" ? "dessert" :
    categoryId === "indian" || categoryId === "north-indian" ? "biryani" :
    categoryId === "chicken" ? "butter-chicken" :
    categoryId === "chinese" || categoryId === "healthy" || categoryId === "mexican" ? "rice" :
    categoryId === "momos" || categoryId === "fast-food" ? "samosa" :
    "dessert";
  const imageCounts: Record<string, number> = {
    pizza: 95,
    burger: 87,
    biryani: 81,
    "butter-chicken": 22,
    dessert: 36,
    dosa: 83,
    idly: 77,
    pasta: 34,
    rice: 35,
    samosa: 22,
  };
  const next = restaurantPhotoCounters[safeFoodCategory] ?? 0;
  restaurantPhotoCounters[safeFoodCategory] = next + 1;

  return `https://foodish-api.com/images/${safeFoodCategory}/${safeFoodCategory}${(next % imageCounts[safeFoodCategory]) + 1}.jpg`;
};

const descriptions = [
  "Freshly prepared with restaurant-style seasoning and premium ingredients.",
  "A crowd favorite made hot, flavorful, and ready for fast delivery.",
  "Chef-selected comfort food with balanced spices and rich texture.",
  "Made to order with bold flavors, fresh garnish, and generous portions.",
  "A classic FoodieHub pick, packed carefully so it arrives delicious.",
  "Perfect for cravings — satisfying, aromatic, and beautifully plated.",
];

const categorySeeds: CategorySeed[] = [
  {
    id: "pizza",
    name: "Pizza",
    emoji: "🍕",
    coverSearch: "pizza margherita food",
    items: [
      { name: "Margherita Pizza", search: "margherita pizza", veg: true },
      { name: "Pepperoni Pizza", search: "pepperoni pizza", veg: false },
      { name: "Farmhouse Pizza", search: "vegetable pizza", veg: true },
      { name: "Veggie Supreme Pizza", search: "vegetarian pizza", veg: true },
      { name: "Cheese Burst Pizza", search: "cheese pizza", veg: true },
      { name: "BBQ Chicken Pizza", search: "bbq chicken pizza", veg: false },
      { name: "Hawaiian Pizza", search: "hawaiian pizza", veg: false },
      { name: "Four Cheese Pizza", search: "four cheese pizza", veg: true },
      { name: "Truffle Mushroom Pizza", search: "mushroom pizza", veg: true },
      { name: "Pesto Garden Pizza", search: "pesto pizza", veg: true },
      { name: "Peri Peri Paneer Pizza", search: "paneer pizza", veg: true },
      { name: "Chicken Sausage Pizza", search: "sausage pizza", veg: false },
    ],
  },
  {
    id: "burgers",
    name: "Burgers",
    emoji: "🍔",
    coverSearch: "burger food",
    items: [
      { name: "Classic Chicken Burger", search: "chicken burger", veg: false },
      { name: "Veggie Burger", search: "veggie burger", veg: true },
      { name: "Double Patty Burger", search: "double burger", veg: false },
      { name: "Cheese Burger", search: "cheeseburger", veg: false },
      { name: "Bacon Burger", search: "bacon burger", veg: false },
      { name: "Mushroom Swiss Burger", search: "mushroom burger", veg: true },
      { name: "Spicy Chicken Burger", search: "spicy chicken burger", veg: false },
      { name: "BBQ Burger", search: "bbq burger", veg: false },
      { name: "Fish Burger", search: "fish burger", veg: false },
      { name: "Mini Sliders", search: "burger sliders", veg: false },
      { name: "Crispy Paneer Burger", search: "paneer burger", veg: true },
      { name: "Avocado Burger", search: "avocado burger", veg: true },
    ],
  },
  {
    id: "indian",
    name: "Indian Food",
    emoji: "🍛",
    coverSearch: "indian curry food",
    items: [
      { name: "Chicken Biryani", search: "chicken biryani", veg: false },
      { name: "Butter Chicken", search: "butter chicken curry", veg: false },
      { name: "Paneer Butter Masala", search: "paneer curry", veg: true },
      { name: "Tandoori Chicken", search: "tandoori chicken", veg: false },
      { name: "Garlic Naan Combo", search: "garlic naan curry", veg: true },
      { name: "Dal Makhani", search: "dal makhani", veg: true },
      { name: "Mutton Rogan Josh", search: "rogan josh curry", veg: false },
      { name: "Chole Bhature", search: "chole bhature", veg: true },
      { name: "Chicken Korma", search: "chicken korma", veg: false },
      { name: "Seekh Kebabs", search: "seekh kebab", veg: false },
      { name: "Palak Paneer", search: "palak paneer", veg: true },
      { name: "Hyderabadi Veg Biryani", search: "vegetable biryani", veg: true },
    ],
  },
  {
    id: "chinese",
    name: "Chinese Food",
    emoji: "🥡",
    coverSearch: "chinese noodles food",
    items: [
      { name: "Hakka Noodles", search: "hakka noodles", veg: true },
      { name: "Veg Fried Rice", search: "fried rice", veg: true },
      { name: "Gobi Manchurian", search: "manchurian cauliflower", veg: true },
      { name: "Chicken Dim Sum", search: "dim sum dumplings", veg: false },
      { name: "Spring Rolls", search: "spring rolls", veg: true },
      { name: "Schezwan Noodles", search: "schezwan noodles", veg: true },
      { name: "Sweet & Sour Chicken", search: "sweet sour chicken", veg: false },
      { name: "Kung Pao Chicken", search: "kung pao chicken", veg: false },
      { name: "Chow Mein", search: "chow mein noodles", veg: true },
      { name: "Hot & Sour Soup", search: "hot sour soup", veg: true },
      { name: "Chilli Paneer", search: "chilli paneer", veg: true },
      { name: "Honey Chilli Potato", search: "chilli potato", veg: true },
    ],
  },
  {
    id: "south-indian",
    name: "South Indian",
    emoji: "🥞",
    coverSearch: "dosa south indian food",
    items: [
      { name: "Masala Dosa", search: "masala dosa", veg: true },
      { name: "Plain Dosa", search: "plain dosa", veg: true },
      { name: "Idli Sambar", search: "idli sambar", veg: true },
      { name: "Medu Vada", search: "medu vada", veg: true },
      { name: "Ven Pongal", search: "pongal food", veg: true },
      { name: "Onion Uttapam", search: "uttapam", veg: true },
      { name: "Sambar Rice", search: "sambar rice", veg: true },
      { name: "Rava Dosa", search: "rava dosa", veg: true },
      { name: "Appam Stew", search: "appam stew", veg: true },
      { name: "Podi Idli", search: "idli indian", veg: true },
      { name: "Mysore Masala Dosa", search: "mysore masala dosa", veg: true },
      { name: "Filter Coffee", search: "filter coffee", veg: true },
    ],
  },
  {
    id: "north-indian",
    name: "North Indian",
    emoji: "🫓",
    coverSearch: "north indian thali",
    items: [
      { name: "Aloo Paratha", search: "aloo paratha", veg: true },
      { name: "Rajma Chawal", search: "rajma chawal", veg: true },
      { name: "Kadhai Paneer", search: "kadhai paneer", veg: true },
      { name: "Shahi Paneer", search: "shahi paneer", veg: true },
      { name: "Aloo Gobi", search: "aloo gobi", veg: true },
      { name: "Veg Pulao", search: "veg pulao", veg: true },
      { name: "Sweet Lassi", search: "sweet lassi", veg: true },
      { name: "Chicken Tikka", search: "chicken tikka", veg: false },
      { name: "Soya Chaap", search: "soya chaap", veg: true },
      { name: "Veg Thali", search: "indian veg thali", veg: true },
      { name: "Paneer Tikka", search: "paneer tikka", veg: true },
      { name: "Amritsari Kulcha", search: "kulcha indian bread", veg: true },
    ],
  },
  {
    id: "fast-food",
    name: "Fast Food",
    emoji: "🌭",
    coverSearch: "fast food fries",
    items: [
      { name: "French Fries", search: "french fries", veg: true },
      { name: "Loaded Cheese Fries", search: "cheese fries", veg: true },
      { name: "Hot Dog", search: "hot dog", veg: false },
      { name: "Chicken Wrap", search: "chicken wrap", veg: false },
      { name: "Club Sandwich", search: "club sandwich", veg: false },
      { name: "Chicken Nuggets", search: "chicken nuggets", veg: false },
      { name: "Onion Rings", search: "onion rings", veg: true },
      { name: "Quesadilla", search: "quesadilla", veg: true },
      { name: "Footlong Sub", search: "sub sandwich", veg: false },
      { name: "Buffalo Wings", search: "buffalo wings", veg: false },
      { name: "Garlic Breadsticks", search: "garlic breadsticks", veg: true },
      { name: "Mozzarella Sticks", search: "mozzarella sticks", veg: true },
    ],
  },
  {
    id: "momos",
    name: "Momos",
    emoji: "🥟",
    coverSearch: "momos dumplings",
    items: [
      { name: "Steamed Veg Momos", search: "steamed dumplings", veg: true },
      { name: "Steamed Chicken Momos", search: "chicken dumplings", veg: false },
      { name: "Fried Veg Momos", search: "fried momos", veg: true },
      { name: "Tandoori Momos", search: "spicy dumplings", veg: true },
      { name: "Kurkure Momos", search: "crispy momos", veg: true },
      { name: "Paneer Momos", search: "cheese dumplings", veg: true },
      { name: "Cheese Corn Momos", search: "cheese dumplings", veg: true },
      { name: "Schezwan Momos", search: "spicy dumplings", veg: true },
      { name: "Afghani Momos", search: "creamy dumplings", veg: false },
      { name: "Prawn Momos", search: "shrimp dumplings", veg: false },
      { name: "Momo Platter", search: "dumpling platter", veg: false },
      { name: "Soup Momos", search: "momos soup", veg: true },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    emoji: "🍰",
    coverSearch: "dessert cake",
    items: [
      { name: "New York Cheesecake", search: "new york cheesecake", veg: true },
      { name: "Chocolate Brownie", search: "chocolate brownie", veg: true },
      { name: "Vanilla Ice Cream", search: "vanilla ice cream", veg: true },
      { name: "Glazed Donuts", search: "glazed donuts", veg: true },
      { name: "Strawberry Pastry", search: "strawberry pastry", veg: true },
      { name: "Classic Tiramisu", search: "tiramisu dessert", veg: true },
      { name: "Gulab Jamun", search: "gulab jamun", veg: true },
      { name: "Belgian Waffles", search: "belgian waffles", veg: true },
      { name: "Red Velvet Cupcake", search: "red velvet cupcake", veg: true },
      { name: "Chocolate Mousse", search: "chocolate mousse", veg: true },
      { name: "Macarons", search: "macarons", veg: true },
      { name: "Apple Pie", search: "apple pie", veg: true },
      { name: "Rasmalai", search: "rasmalai dessert", veg: true },
      { name: "Kunafa", search: "kunafa dessert", veg: true },
    ],
  },
  {
    id: "chocolates",
    name: "Chocolates",
    emoji: "🍫",
    coverSearch: "chocolate dessert",
    items: [
      { name: "Dark Chocolate Truffles", search: "dark chocolate truffles", veg: true },
      { name: "Milk Chocolate Bar", search: "milk chocolate bar", veg: true },
      { name: "Hazelnut Praline", search: "hazelnut praline chocolate", veg: true },
      { name: "Chocolate Lava Cake", search: "chocolate lava cake", veg: true },
      { name: "Chocolate Fudge", search: "chocolate fudge", veg: true },
      { name: "White Chocolate Mousse", search: "white chocolate mousse", veg: true },
      { name: "Chocolate Éclair", search: "chocolate eclair", veg: true },
      { name: "Chocolate Chip Cookie", search: "chocolate chip cookie", veg: true },
      { name: "Nutella Crepe", search: "nutella crepe", veg: true },
      { name: "Chocolate Sundae", search: "chocolate sundae", veg: true },
      { name: "Cocoa Brownie Bite", search: "brownie bites", veg: true },
      { name: "Chocolate Donut", search: "chocolate donut", veg: true },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    emoji: "🥤",
    coverSearch: "coffee beverage",
    items: [
      { name: "Cappuccino", search: "cappuccino coffee", veg: true },
      { name: "Masala Chai", search: "masala chai", veg: true },
      { name: "Mango Smoothie", search: "mango smoothie", veg: true },
      { name: "Chocolate Shake", search: "chocolate milkshake", veg: true },
      { name: "Mojito Mocktail", search: "mojito mocktail", veg: true },
      { name: "Cold Brew", search: "cold brew coffee", veg: true },
      { name: "Strawberry Lemonade", search: "strawberry lemonade", veg: true },
      { name: "Bubble Tea", search: "bubble tea", veg: true },
      { name: "Iced Latte", search: "iced latte", veg: true },
      { name: "Hot Chocolate", search: "hot chocolate", veg: true },
      { name: "Rose Milk", search: "rose milk drink", veg: true },
      { name: "Tender Coconut Water", search: "coconut water", veg: true },
    ],
  },
  {
    id: "juices",
    name: "Fresh Juices",
    emoji: "🧃",
    coverSearch: "fresh orange juice",
    items: [
      { name: "Fresh Orange Juice", search: "orange juice", veg: true },
      { name: "Watermelon Juice", search: "watermelon juice", veg: true },
      { name: "Apple Juice", search: "apple juice", veg: true },
      { name: "Pomegranate Juice", search: "pomegranate juice", veg: true },
      { name: "Pineapple Juice", search: "pineapple juice", veg: true },
      { name: "Carrot Ginger Juice", search: "carrot juice", veg: true },
      { name: "Beetroot Juice", search: "beetroot juice", veg: true },
      { name: "Green Detox Juice", search: "green juice", veg: true },
      { name: "Mixed Berry Juice", search: "berry juice", veg: true },
      { name: "Sugarcane Juice", search: "sugarcane juice", veg: true },
      { name: "Mosambi Juice", search: "sweet lime juice", veg: true },
      { name: "Kiwi Mint Juice", search: "kiwi juice", veg: true },
      { name: "Grape Juice", search: "grape juice", veg: true },
      { name: "Mango Juice", search: "mango juice", veg: true },
    ],
  },
  {
    id: "healthy",
    name: "Healthy Food",
    emoji: "🥗",
    coverSearch: "healthy salad bowl",
    items: [
      { name: "Caesar Salad", search: "caesar salad", veg: true },
      { name: "Greek Salad", search: "greek salad", veg: true },
      { name: "Buddha Bowl", search: "buddha bowl", veg: true },
      { name: "Quinoa Bowl", search: "quinoa bowl", veg: true },
      { name: "Sprouts Salad", search: "sprouts salad", veg: true },
      { name: "Tomato Soup", search: "tomato soup", veg: true },
      { name: "Grilled Veggies", search: "grilled vegetables", veg: true },
      { name: "Protein Power Bowl", search: "protein bowl", veg: true },
      { name: "Acai Bowl", search: "acai bowl", veg: true },
      { name: "Avocado Toast", search: "avocado toast", veg: true },
      { name: "Oats Porridge", search: "oatmeal porridge", veg: true },
      { name: "Fruit Bowl", search: "fruit bowl", veg: true },
      { name: "Hummus Veggie Plate", search: "hummus vegetables", veg: true },
      { name: "Grilled Chicken Salad", search: "grilled chicken salad", veg: false },
    ],
  },
  {
    id: "seafood",
    name: "Seafood",
    emoji: "🦐",
    coverSearch: "seafood prawns",
    items: [
      { name: "Garlic Prawns", search: "garlic prawns", veg: false },
      { name: "Goan Fish Curry", search: "fish curry", veg: false },
      { name: "Grilled Salmon", search: "grilled salmon", veg: false },
      { name: "Crab Masala", search: "crab curry", veg: false },
      { name: "Butter Lobster", search: "lobster dish", veg: false },
      { name: "Salmon Sushi", search: "salmon sushi", veg: false },
      { name: "Calamari Rings", search: "calamari rings", veg: false },
      { name: "Fish Tacos", search: "fish tacos", veg: false },
      { name: "Shrimp Pasta", search: "shrimp pasta", veg: false },
      { name: "Fresh Oysters", search: "oysters seafood", veg: false },
      { name: "Fish Fry", search: "fried fish", veg: false },
      { name: "Prawn Biryani", search: "prawn biryani", veg: false },
    ],
  },
  {
    id: "chicken",
    name: "Chicken Specials",
    emoji: "🍗",
    coverSearch: "fried chicken",
    items: [
      { name: "Crispy Fried Chicken", search: "fried chicken", veg: false },
      { name: "Grilled Chicken", search: "grilled chicken", veg: false },
      { name: "Buffalo Chicken Wings", search: "chicken wings", veg: false },
      { name: "Chicken Tikka Boti", search: "chicken tikka", veg: false },
      { name: "Roast Chicken", search: "roast chicken", veg: false },
      { name: "Popcorn Chicken", search: "popcorn chicken", veg: false },
      { name: "Chicken Drumsticks", search: "chicken drumsticks", veg: false },
      { name: "Chicken Nuggets Box", search: "chicken nuggets", veg: false },
      { name: "Tandoori Half Chicken", search: "tandoori chicken", veg: false },
      { name: "BBQ Chicken Platter", search: "bbq chicken platter", veg: false },
      { name: "Chicken Shawarma", search: "chicken shawarma", veg: false },
      { name: "Chicken 65", search: "chicken 65", veg: false },
    ],
  },
  {
    id: "breakfast",
    name: "Breakfast",
    emoji: "🥐",
    coverSearch: "breakfast pancakes",
    items: [
      { name: "Pancake Stack", search: "pancake stack", veg: true },
      { name: "Eggs Benedict", search: "eggs benedict", veg: false },
      { name: "French Toast", search: "french toast", veg: true },
      { name: "Breakfast Burrito", search: "breakfast burrito", veg: false },
      { name: "Granola Yogurt", search: "granola yogurt", veg: true },
      { name: "Bagel & Cream Cheese", search: "bagel cream cheese", veg: true },
      { name: "Veggie Omelette", search: "vegetable omelette", veg: false },
      { name: "Butter Croissant", search: "croissant", veg: true },
      { name: "Poha", search: "poha breakfast", veg: true },
      { name: "Upma", search: "upma breakfast", veg: true },
      { name: "English Breakfast", search: "english breakfast", veg: false },
      { name: "Breakfast Sandwich", search: "breakfast sandwich", veg: false },
    ],
  },
  {
    id: "italian",
    name: "Italian",
    emoji: "🍝",
    coverSearch: "italian pasta",
    items: [
      { name: "Spaghetti Carbonara", search: "spaghetti carbonara", veg: false },
      { name: "Penne Arrabiata", search: "penne arrabiata", veg: true },
      { name: "Classic Lasagna", search: "lasagna", veg: false },
      { name: "Mushroom Risotto", search: "mushroom risotto", veg: true },
      { name: "Tomato Bruschetta", search: "bruschetta", veg: true },
      { name: "Fettuccine Alfredo", search: "fettuccine alfredo", veg: true },
      { name: "Pesto Pasta", search: "pesto pasta", veg: true },
      { name: "Ravioli", search: "ravioli", veg: true },
      { name: "Gnocchi", search: "gnocchi", veg: true },
      { name: "Caprese Salad", search: "caprese salad", veg: true },
      { name: "Chicken Parmesan", search: "chicken parmesan", veg: false },
      { name: "Minestrone Soup", search: "minestrone soup", veg: true },
    ],
  },
  {
    id: "mexican",
    name: "Mexican",
    emoji: "🌮",
    coverSearch: "mexican tacos",
    items: [
      { name: "Beef Tacos", search: "beef tacos", veg: false },
      { name: "Beef Burrito", search: "beef burrito", veg: false },
      { name: "Loaded Nachos", search: "mexican nachos", veg: true },
      { name: "Chicken Enchiladas", search: "chicken enchiladas", veg: false },
      { name: "Guacamole & Chips", search: "guacamole chips", veg: true },
      { name: "Chimichanga", search: "chimichanga", veg: false },
      { name: "Mexican Rice Bowl", search: "mexican rice bowl", veg: true },
      { name: "Chicken Fajitas", search: "chicken fajitas", veg: false },
      { name: "Veggie Tacos", search: "veggie tacos", veg: true },
      { name: "Queso Dip", search: "queso dip", veg: true },
      { name: "Elote Corn", search: "elote corn", veg: true },
      { name: "Churros", search: "churros", veg: true },
    ],
  },
];

export const categories: Category[] = categorySeeds.map((category, index) => ({
  id: category.id,
  name: category.name,
  emoji: category.emoji,
  subcategories: category.items.map((item) => item.name),
  image: categoryPhoto(category.name, category.coverSearch, index),
}));

const restaurantNames = [
  "Spice Symphony","Urban Tandoor","The Burger Joint","Pizza Forno","Dragon Wok","Coastal Catch",
  "Green Bowl","Sweet Cravings","Brew & Bite","Royal Biryani House","Cluck Republic","Curry Leaf",
  "Slice of Italy","Hot Chimney","Saffron Plate","Tandoor Tales","Bombay Bistro","Wok This Way",
  "Patty Palace","Crust & Co","South Express","Naan Stop","Sushi Sora","Cafe Mocha",
  "Fryday's","Lassi Lane","Grill Master","Veggie Vault","Smokehouse","Maharaja Kitchen",
  "Tokyo Table","Punjabi Tadka","Frostbite Desserts","Tropical Sips","Olive & Oregano",
  "Chimney Charcoal","Bao Bun Bro","Falafel Hub","Pasta Per Te","Hot Stone BBQ",
  "Pho Real","Taco Fiesta","Berry Blend","Espresso Edge","Crispy Cravings",
  "Royal Rasoi","Charcoal Theory","Noodle Nation","Sea Breeze","Garden Greens",
  "Momo Mania","Chocolate Room","Juice Junction","Healthy Harvest","Dosa Darbar","Biryani Bay",
  "Nawab Kitchen","Burger Barn","Pizzeria Roma","Waffle Works","Sea Salt Grill","Morning Table",
  "Taco Temple","Rice Bowl Co","Tandoori Trails","Schezwan Street","Dessert District","Fresh Press",
  "Paneer Palace","Chicken County","The Salad Studio","Cocoa Cartel","Dumpling Den","The Pasta Project"
];

const locations = ["Downtown","Bandra West","Connaught Place","Indiranagar","HSR Layout","Powai","Koramangala","Sector 29","Andheri","Salt Lake","Anna Nagar","Jubilee Hills"];

const restaurantCategoryFor = (name: string, index: number) => {
  const n = name.toLowerCase();
  const categoryId =
    /pizza|pizzeria|crust/.test(n) ? "pizza" :
    /burger|patty/.test(n) ? "burgers" :
    /dosa|south/.test(n) ? "south-indian" :
    /tandoor|tandoori|nawab|rasoi|maharaja|biryani|spice|saffron|punjabi|naan|paneer|curry|bombay|royal/.test(n) ? "indian" :
    /wok|dragon|noodle|schezwan|bao|pho|dumpling/.test(n) ? "chinese" :
    /momo/.test(n) ? "momos" :
    /sweet|dessert|frostbite|waffle/.test(n) ? "desserts" :
    /chocolate|cocoa/.test(n) ? "chocolates" :
    /juice|fresh|tropical|berry|sip|lassi/.test(n) ? "juices" :
    /green|garden|healthy|salad|veggie/.test(n) ? "healthy" :
    /sea|coastal|sushi/.test(n) ? "seafood" :
    /cluck|chicken|charcoal|grill|bbq|smoke/.test(n) ? "chicken" :
    /morning|breakfast|brew|cafe|espresso|mocha/.test(n) ? "breakfast" :
    /pasta|italy|italian|olive|oregano/.test(n) ? "italian" :
    /taco|mexican|fiesta|falafel/.test(n) ? "mexican" :
    categorySeeds[index % categorySeeds.length].id;

  return categorySeeds.find((category) => category.id === categoryId) ?? categorySeeds[index % categorySeeds.length];
};

const seeded = (i: number, salt: number) => {
  const x = Math.sin(i * 9301 + salt * 49297) * 233280;
  return x - Math.floor(x);
};

const sRand = (i: number, salt: number, min: number, max: number) =>
  min + seeded(i, salt) * (max - min);

export const restaurants: Restaurant[] = restaurantNames.map((name, i) => {
  const cuisineSeed = restaurantCategoryFor(name, i);

  return {
    id: `r${i + 1}`,
    name,
    cuisine: cuisineSeed.name,
    deliveryTime: `${20 + Math.floor(seeded(i, 1) * 20)}-${35 + Math.floor(seeded(i, 2) * 25)} min`,
    rating: +sRand(i, 3, 3.7, 4.9).toFixed(1),
    location: locations[i % locations.length],
    open: seeded(i, 4) > 0.12,
    image: restaurantFoodPhoto(cuisineSeed.id),
  };
});

export const foods: Food[] = categorySeeds.flatMap((cat, ci) =>
  cat.items.map((item, si) => {
    const idx = ci * 50 + si;
    return {
      id: `${cat.id}-${si}`,
      name: item.name,
      category: cat.name,
      subcategory: item.name,
      description: item.description ?? descriptions[(ci + si) % descriptions.length],
      price: Math.floor(sRand(idx, 8, 79, 649)),
      rating: Math.min(5, Math.max(3.5, +sRand(idx, 9, 3.6, 5).toFixed(1))),
      reviews: Math.floor(sRand(idx, 10, 65, 4200)),
      veg: item.veg ?? true,
      image: foodPhoto(cat.name, item.name, item.search, idx),
      restaurantId: restaurants[(ci * 9 + si) % restaurants.length].id,
    };
  })
);

export const offers = [
  { id: "o1", title: "50% OFF", subtitle: "On your first 3 orders", code: "WELCOME50", tint: "from-orange-500 to-red-500" },
  { id: "o2", title: "Free Delivery", subtitle: "Orders above $20", code: "FREEDEL", tint: "from-amber-500 to-orange-600" },
  { id: "o3", title: "Buy 1 Get 1", subtitle: "On all pizzas this weekend", code: "PIZZABOGO", tint: "from-red-500 to-pink-600" },
];

export const testimonials = [
  { name: "Aarav Mehta", role: "Foodie", quote: "FoodieHub is my go-to. Beautiful UI and crazy fast delivery!", avatar: "https://i.pravatar.cc/100?img=12" },
  { name: "Sara Khan", role: "Designer", quote: "The curation is amazing. I discover a new restaurant every week.", avatar: "https://i.pravatar.cc/100?img=47" },
  { name: "Diego Alvarez", role: "Engineer", quote: "Smoothest food app experience I've used. The animations feel premium.", avatar: "https://i.pravatar.cc/100?img=33" },
];
