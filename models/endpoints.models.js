const fs = require('fs/promises');


exports.selectEndpoints = () => {
    return fs.readFile('./endpoints.json', 'utf-8').then((data) => {
    const parsedData = JSON.parse(data) 
    return parsedData;
   
    })
};