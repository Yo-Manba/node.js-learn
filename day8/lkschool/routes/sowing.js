import express from 'express'
import Sowing from "../models/Sowing";

const router = express.Router({});

// ************************************************* 接口API ***********************************************************
// 往数据库中添加一条记录
router.get('/sowing/api/add', (req, res)=>{

    // 操作数据库
    const sowing = new Sowing({
        // 图片名称
        image_title: '我是轮播图',

        // 图片地址
        image_url: 'like.com/images/11.png',

        // 图片跳转链接
        image_link: 'www.tileke.com',

        // 图片上架时间
        s_time: '2020-07-07',

        // 图片下架时间
        e_time: '2021-10-10'
    });

    sowing.save((err, result)=>{
        if(err) throw err;
        res.json({
            status: 200,
            result: '添加轮播图成功'
        })
    })
})

export default router;