
const fs = require('fs');
const path = require('path');

let readFile = (...args) => {
    return new Promise((resolve, reject) => {
        fs.readFile(...args, (err, data) => {
            if(err) reject(err);
            resolve(data);
        })
    })
}

readFile(path.join(__dirname, 'data/a.txt')).then((data)=>{
    console.log(data.toString());
    return readFile(path.join(__dirname, 'data/b.txt'));
}).then((data)=>{
    console.log(data.toString());
    return readFile(path.join(__dirname, 'data/c.txt'));
}).then((data)=>{
    console.log(data.toString());
}).catch((err)=>{
    console.log(err)
});
