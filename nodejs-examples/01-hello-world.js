// ============================================
// 01 - Hello World in Node.js
// Run with: node 01-hello-world.js
// ============================================

console.log("🟢 Hello from Node.js!");
console.log("");

// Basic JavaScript works the same
const name = "Workshop Participant";
const date = new Date().toLocaleDateString('tr-TR');

console.log(`Welcome, ${name}!`);
console.log(`Today's date: ${date}`);
console.log("");

// Math operations
const price = 100;
const discount = 20;
const finalPrice = price - (price * discount / 100);
console.log(`Original price: ${price} TL`);
console.log(`Discount: ${discount}%`);
console.log(`Final price: ${finalPrice} TL`);
console.log("");

// Arrays and objects
const products = [
    { name: "T-Shirt", price: 99 },
    { name: "Jeans", price: 199 },
    { name: "Shoes", price: 299 }
];

console.log("Products:");
products.forEach((product, index) => {
    console.log(`  ${index + 1}. ${product.name} - ${product.price} TL`);
});
console.log("");

// Node.js specific - process information
console.log("📊 Node.js Information:");
console.log(`  Node version: ${process.version}`);
console.log(`  Platform: ${process.platform}`);
console.log(`  Current directory: ${process.cwd()}`);
console.log("");

console.log("✅ Script completed successfully!");

