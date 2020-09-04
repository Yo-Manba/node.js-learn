

// 引入
const fs = require('fs');

let copy = (src, target, callback)=>{
    fs.readFile(src, (err, data)=>{
        if(!err){
            fs.writeFile(target, data, ()=>{
                if(!err){
                    callback && callback(err, data);
                }else {
                    throw err;
                }
            });
        };
    })
}

copy(__dirname + '/source/b.txt', __dirname + '/source/d.txt', (err)=>{
    if(!err){
        console.log('copy succ!')
    }
})