
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

Promise.all([
    readFile(path.join(__dirname, 'data/a.txt')),
    readFile(path.join(__dirname, 'data/b.txt')),
    readFile(path.join(__dirname, 'data/c.txt'))
]).then(([data1, data2, data3])=>{
    console.log(data1.toString());
    console.log(data2.toString());
    console.log(data3.toString());
}).catch((err)=>{
    console.log(err);
})
