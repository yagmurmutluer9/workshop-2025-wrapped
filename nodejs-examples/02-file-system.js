// ============================================
// 02 - File System Operations
// Run with: node 02-file-system.js
// ============================================

const fs = require('fs');
const path = require('path');

console.log("🟢 File System Example\n");

// ===== WRITING FILES =====

// Create some sample data
const userData = {
    name: "Yağmur",
    role: "Developer",
    skills: ["JavaScript", "React", "Node.js"],
    createdAt: new Date().toISOString()
};

// Write JSON file
const jsonPath = path.join(__dirname, 'output', 'user-data.json');

// Make sure output directory exists
const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
    console.log("📁 Created 'output' directory\n");
}

// Write JSON file
fs.writeFileSync(jsonPath, JSON.stringify(userData, null, 2));
console.log("✅ Written: user-data.json");

// Write a text file
const textContent = `
=================================
  Workshop Notes
=================================
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

Topics Covered:
- Node.js basics
- File system operations
- Creating servers
- Express.js

Next Steps:
1. Practice more examples
2. Build a small project
3. Learn about databases

=================================
`;

const textPath = path.join(__dirname, 'output', 'notes.txt');
fs.writeFileSync(textPath, textContent);
console.log("✅ Written: notes.txt");

// ===== READING FILES =====

console.log("\n📖 Reading files back:\n");

// Read JSON file
const readJsonData = fs.readFileSync(jsonPath, 'utf8');
const parsedData = JSON.parse(readJsonData);
console.log("User data from JSON:");
console.log(`  Name: ${parsedData.name}`);
console.log(`  Role: ${parsedData.role}`);
console.log(`  Skills: ${parsedData.skills.join(', ')}`);

// ===== APPENDING TO FILES =====

const logPath = path.join(__dirname, 'output', 'activity.log');

function logActivity(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logPath, logEntry);
}

console.log("\n📝 Creating activity log...");
logActivity("Application started");
logActivity("User data loaded");
logActivity("Processing completed");
console.log("✅ Written: activity.log");

// ===== LISTING DIRECTORY CONTENTS =====

console.log("\n📂 Contents of 'output' directory:");
const files = fs.readdirSync(outputDir);
files.forEach(file => {
    const filePath = path.join(outputDir, file);
    const stats = fs.statSync(filePath);
    const size = stats.size;
    console.log(`  - ${file} (${size} bytes)`);
});

// ===== CHECKING IF FILE EXISTS =====

console.log("\n🔍 File existence checks:");
console.log(`  user-data.json exists: ${fs.existsSync(jsonPath)}`);
console.log(`  random-file.txt exists: ${fs.existsSync('random-file.txt')}`);

console.log("\n✅ File system example completed!");
console.log(`📁 Check the 'output' folder to see the created files.`);

