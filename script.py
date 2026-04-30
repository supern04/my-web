import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Nav Links reorder
content = content.replace(
    '<li><a href="#about" class="hover:text-white transition-colors">About Me</a></li>\n                <li><a href="#tech" class="hover:text-white transition-colors">Tech & Projects</a></li>',
    '<li><a href="#tech" class="hover:text-white transition-colors">Tech & Projects</a></li>\n                <li><a href="#about" class="hover:text-white transition-colors">About Me</a></li>'
)

content = content.replace(
    '<a href="#about" class="mobile-nav-link hover:text-amkBlue transition-colors">About Me</a>\n        <a href="#tech" class="mobile-nav-link hover:text-amkBlue transition-colors">Tech & Projects</a>',
    '<a href="#tech" class="mobile-nav-link hover:text-amkBlue transition-colors">Tech & Projects</a>\n        <a href="#about" class="mobile-nav-link hover:text-amkBlue transition-colors">About Me</a>'
)

# 2. Robot Hand modifications
old_hand = 'class="absolute -bottom-10 -right-10 w-[500px] md:w-[800px] object-contain mix-blend-screen pointer-events-none z-[5] transition-transform duration-100 ease-out origin-bottom-right opacity-80"'
new_hand = 'class="absolute -bottom-24 -right-24 w-[350px] md:w-[500px] object-contain mix-blend-screen pointer-events-none z-[5] transition-transform duration-100 ease-out origin-bottom-right opacity-30"'
content = content.replace(old_hand, new_hand)

# 3. Reorder Sections
about_match = re.search(r'<!-- \[Step 3\] About Me Section -->.*?<\/section>\n', content, re.DOTALL)
tech_match = re.search(r'<!-- \[Step 4\] Tech Skills Section -->.*?<\/section>\n', content, re.DOTALL)
projects_match = re.search(r'        <!-- \[Step 4\.5\] Projects Section -->.*?<\/section>\n', content, re.DOTALL)

if about_match and tech_match and projects_match:
    about_text = about_match.group(0)
    tech_text = tech_match.group(0)
    proj_text = projects_match.group(0)
    
    content = content.replace(tech_text, '')
    content = content.replace(proj_text, '')
    content = content.replace(about_text, tech_text + proj_text + about_text)

# 4. Modify Global Section (Instagram style)
global_sec = re.search(r'<!-- \[Step 4\.7\] Global Experience Section -->.*?<\/section>\n', content, re.DOTALL)
if global_sec:
    g_text = global_sec.group(0)
    
    g_text = g_text.replace('<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">', '<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">')
    g_text = g_text.replace('</div>\n\n                <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">', '')
    
    g_text = g_text.replace('h-80', 'h-48')
    g_text = g_text.replace('text-2xl font-bold', 'text-lg font-bold')
    g_text = g_text.replace('bottom-6 left-6', 'bottom-4 left-4')
    g_text = g_text.replace('text-[10px]', 'text-[8px]')
    g_text = g_text.replace('mt-2 opacity-0', 'mt-1 opacity-0 text-[10px]')
    
    content = content.replace(global_sec.group(0), g_text)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Changes applied successfully!")
