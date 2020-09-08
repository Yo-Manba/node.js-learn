
// 引入
const express = require('express');
const path = require('path');

// 创建web服务器
const app = express();



//中间件访问静态资源
// app.use(express.static(path.join(__dirname, 'public')));

//注册模板引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res)=>{
    let dataJson = {
        "lists":[
            {"title": "撩课学院1周年庆倒计时", "count": 675593, "up": 1},
            {"title": "女演员全美善自杀", "count": 634434, "up": 1},
            {"title": "哈登骑电动车被抓", "count": 623323, "up": 0},
            {"title": "吃酸辣粉被罚款", "count": 546767, "up": 0},
            {"title": "蔚来汽车庄莉离职", "count": 536237, "up": 1},
            {"title": "父母抓阄陪女儿", "count": 525193, "up": 0},
            {"title": "宋仲基爸爸短信", "count": 475593, "up": 0},
            {"title": "宋仲基爸爸短信", "count": 375593, "up": 1},
            {"title": "今天天气很好", "count": 275593, "up": 1}
        ],
        "source": "撩课风云榜 - itLike.com"
    };
    res.render('list', dataJson);
})

// 开启监听
app.listen(3000, '127.0.0.1', ()=>{
    console.log('服务器开启成功');
})

