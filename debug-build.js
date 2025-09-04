const fs = require('fs');
const path = require('path');

console.log('🔍 Systematic search for empty string errors...\n');

// Функція для пошуку проблем у файлі
function analyzeFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File missing: ${filePath}`);
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  console.log(`\n📁 Analyzing: ${filePath}`);

  let hasIssues = false;

  // Пошук порожніх рядків у різних контекстах
  const patterns = [
    { regex: /title:\s*['"`]\s*['"`]/g, name: 'Empty title' },
    { regex: /description:\s*['"`]\s*['"`]/g, name: 'Empty description' },
    { regex: /url:\s*['"`]\s*['"`]/g, name: 'Empty URL' },
    { regex: /href:\s*['"`]\s*['"`]/g, name: 'Empty href' },
    { regex: /src:\s*['"`]\s*['"`]/g, name: 'Empty src' },
    { regex: /alt:\s*['"`]\s*['"`]/g, name: 'Empty alt' },
    { regex: /name:\s*['"`]\s*['"`]/g, name: 'Empty name' },
    { regex: /import.*from\s*['"`]\s*['"`]/g, name: 'Empty import' },
    {
      regex: /new\s+URL\s*\(\s*['"`]\s*['"`]\s*\)/g,
      name: 'Empty URL constructor',
    },
    {
      regex: /\.slice\(\d+,?\s*\d*\)\s*\|\|\s*['"`]\s*['"`]/g,
      name: 'Empty fallback after slice',
    },
  ];

  patterns.forEach(({ regex, name }) => {
    const matches = content.match(regex);
    if (matches) {
      hasIssues = true;
      console.log(`🚨 ${name}:`, matches);

      // Показуємо контекст
      matches.forEach((match) => {
        const index = content.indexOf(match);
        const start = Math.max(0, index - 50);
        const end = Math.min(content.length, index + match.length + 50);
        const context = content.substring(start, end);
        console.log(`   Context: ...${context}...`);
      });
    }
  });

  // Пошук інших підозрілих патернів
  const suspiciousPatterns = [
    /\?\?\s*['"`]\s*['"`]/g, // ?? ''
    /\|\|\s*['"`]\s*['"`]/g, // || ''
    /=\s*['"`]\s*['"`]/g, // = ''
  ];

  suspiciousPatterns.forEach((pattern) => {
    const matches = content.match(pattern);
    if (matches) {
      console.log('⚠️  Suspicious empty string:', matches);
    }
  });

  if (!hasIssues) {
    console.log('✅ No obvious issues found');
  }

  return !hasIssues;
}

// Перевірити всі важливі файли
const criticalFiles = [
  'app/layout.tsx',
  'app/layout.js',
  'app/page.tsx',
  'app/page.js',
  'app/not-found.tsx',
  'app/not-found.js',
  'next.config.js',
  'next.config.mjs',
];

let allGood = true;
criticalFiles.forEach((file) => {
  const result = analyzeFile(file);
  if (!result) allGood = false;
});

// Пошук у всій папці app
console.log('\n🔍 Scanning entire app directory...');
function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !file.startsWith('.')) {
      scanDirectory(fullPath);
    } else if (file.match(/\.(tsx?|jsx?)$/)) {
      analyzeFile(fullPath);
    }
  });
}

scanDirectory('app');

console.log(allGood ? '\n✅ All files look good!' : '\n❌ Issues found above');
