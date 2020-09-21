const querystring = require("querystring");

// 处理 post 请求
export default (req, res, next)=>{

    // 1. 过滤 get 请求
    if (req.method.toLowerCase() === 'get') {
        return next();
    };

    // 2. 如果有文件（图片，音频，视频。。）, 表单头 multipart/form-data, 就不要处理，
    if (req.headers['content-type'].startsWith('multipart/form-data')){
        return next();
    };

    // 3. 如果是普通的表单提交, 表单头 application/x-www-form-urlencoded, 要处理, 数据流的拼接
    let data = '';
    req.on('data', (chunk)=>{
        data += chunk;
    });

    req.on('end', ()=>{
        // console.log(data);
        req.body = querystring.parse(data);
        next();
    });
}