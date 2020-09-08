const url = require('url');

// 方式一
//把字符串转为URL对象
const myUrl = url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
console.log(myUrl);


// 方式二(更加精细化)
//把字符串转为URL对象
const myUrl2 =  new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
console.log(myUrl2);