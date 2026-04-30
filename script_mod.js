const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 1. Nav Links reorder
content = content.replace(
    '<li><a href="#about" class="hover:text-white transition-colors">About Me</a></li>\n                <li><a href="#tech" class="hover:text-white transition-colors">Tech & Projects</a></li>',
    '<li><a href="#tech" class="hover:text-white transition-colors">Tech & Projects</a></li>\n                <li><a href="#about" class="hover:text-white transition-colors">About Me</a></li>'
);

content = content.replace(
    '<a href="#about" class="mobile-nav-link hover:text-amkBlue transition-colors">About Me</a>\n        <a href="#tech" class="mobile-nav-link hover:text-amkBlue transition-colors">Tech & Projects</a>',
    '<a href="#tech" class="mobile-nav-link hover:text-amkBlue transition-colors">Tech & Projects</a>\n        <a href="#about" class="mobile-nav-link hover:text-amkBlue transition-colors">About Me</a>'
);

// 2. Robot Hand modifications
const oldHand = 'class="absolute -bottom-10 -right-10 w-[500px] md:w-[800px] object-contain mix-blend-screen pointer-events-none z-[5] transition-transform duration-100 ease-out origin-bottom-right opacity-80"';
const newHand = 'class="absolute -bottom-24 -right-24 w-[350px] md:w-[500px] object-contain mix-blend-screen pointer-events-none z-[5] transition-transform duration-100 ease-out origin-bottom-right opacity-30"';
content = content.replace(oldHand, newHand);

// 3. Reorder Sections
const aboutMatch = content.match(/<!-- \[Step 3\] About Me Section -->[\s\S]*?<\/section>\n/);
const techMatch = content.match(/<!-- \[Step 4\] Tech Skills Section -->[\s\S]*?<\/section>\n/);
const projectsMatch = content.match(/        <!-- \[Step 4\.5\] Projects Section -->[\s\S]*?<\/section>\n/);

if (aboutMatch && techMatch && projectsMatch) {
    const aboutText = aboutMatch[0];
    const techText = techMatch[0];
    const projText = projectsMatch[0];
    
    content = content.replace(techText, '');
    content = content.replace(projText, '');
    content = content.replace(aboutText, techText + projText + aboutText);
}

// 4. Modify Global Section (Instagram style)
const globalSecMatch = content.match(/<!-- \[Step 4\.7\] Global Experience Section -->[\s\S]*?<\/section>\n/);
if (globalSecMatch) {
    let gText = globalSecMatch[0];
    
    gText = gText.replace('<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">', '<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">');
    gText = gText.replace('</div>\n\n                <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">', '');
    
    gText = gText.replace(/h-80/g, 'h-48');
    gText = gText.replace(/text-2xl font-bold/g, 'text-lg font-bold');
    gText = gText.replace(/bottom-6 left-6/g, 'bottom-4 left-4');
    gText = gText.replace(/text-\[10px\]/g, 'text-[8px]');
    gText = gText.replace(/mt-2 opacity-0/g, 'mt-1 opacity-0 text-[10px]');
    
    content = content.replace(globalSecMatch[0], gText);
}

fs.writeFileSync('index.html', content);
console.log('Modifications completed.');
