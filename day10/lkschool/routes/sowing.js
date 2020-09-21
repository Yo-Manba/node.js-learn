import express from 'express'
import Sowing from "../models/Sowing";

const router = express.Router({});

// ************************************************* 接口API ***********************************************************
// 往数据库中添加一条记录
router.post('/sowing/api/add', (req, res)=>{
    // 1. 获取数据
    const body = req.body;

    // 操作数据库
    const sowing = new Sowing({
        // 图片名称
        image_title: body.image_title,
        // 图片地址
        image_url: body.image_url,
        // 图片跳转链接
        image_link: body.image_link,
        // 图片上架时间
        s_time: body.s_time,
        // 图片下架时间
        e_time: body.e_time
    });

    sowing.save((err, result)=>{
        if(err) throw err;
        res.json({
            status: 200,
            result: '添加轮播图成功'
        })
    });
})

export default router;