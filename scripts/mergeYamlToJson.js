const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const inputDir = path.join(__dirname, '../app/views/data');
const outputFilePath = path.join(__dirname, '../.pugrc');

const getFiles = function (dir) {
  return fs.readdirSync(dir).filter(file => fs.statSync(`${dir}/${file}`).isFile());
};

const files = getFiles(inputDir);

const mergedData = files.reduce((acc, file) => {
  const filePath = path.join(inputDir, file);
  const yamlContent = fs.readFileSync(filePath, 'utf8');
  const jsonContent = yaml.load(yamlContent);
  return { ...acc, ...jsonContent };
}, {});

fs.writeFileSync(outputFilePath, JSON.stringify({ locals: mergedData }, null, 2));

console.log('YAML files merged into a single JSON file successfully.');
