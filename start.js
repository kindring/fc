const { execSync } = require('child_process');
const fs = require('fs');

// 检查 node_modules 是否存在
if (!fs.existsSync('node_modules')) {
    console.log('node_modules 不存在，正在安装依赖...');
    execSync('npm install', { stdio: 'inherit' });
}

// 启动应用
execSync('node build/app.js', { stdio: 'inherit' });
