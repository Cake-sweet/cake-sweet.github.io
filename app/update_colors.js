const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        if(file === 'node_modules' || file === 'dist') return;
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.css') || file.endsWith('.ts') || file.endsWith('.js')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('/home/cake/Portfolio/app/src');
files.push('/home/cake/Portfolio/app/tailwind.config.js');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content
        // Background replacements mapping to the dark purples
        .replace(/#050505/g, '#181124') // dark bg
        .replace(/#0B0B0C/g, '#1E162D') // slightly lighter bg
        .replace(/#0a0a0a/g, '#291e3d') // elevated cards
        
        // Brand replacements (Indigo -> Orange)
        .replace(/#7B61FF/g, '#ED5D1A')
        .replace(/rgba\(123,\s*97,\s*255/g, 'rgba(237, 93, 26')
        .replace(/123,97,255/g, '237,93,26');
        
    if(content !== newContent) {
        fs.writeFileSync(file, newContent);
        console.log("Updated:", file);
    }
});
