import express from 'express'
import Sowing from "../models/Sowing"
import formidable from 'formidable'
import { basename } from 'path'
import config from './../src/config'

const router = express.Router({});

// ************************************************* 接口API ***********************************************************
/*
 * 往数据库中添加一条记录
 */
router.post('/sowing/api/add', (req, res, next)=>{

    // 普通方式上传数据 **************************************************
    // // 1. 获取数据
    // const body = req.body;
    // // 操作数据库
    // const sowing = new Sowing({
    //     // 图片名称
    //     image_title: body.image_title,
    //     // 图片地址
    //     image_url: body.image_url,
    //     // 图片跳转链接
    //     image_link: body.image_link,
    //     // 图片上架时间
    //     s_time: body.s_time,
    //     // 图片下架时间
    //     e_time: body.e_time
    // });
    //
    // sowing.save((err, result)=>{
    //     if(err){
    //         return next(err);
    //     };
    //     res.json({
    //         status: 200,
    //         result: '添加轮播图成功'
    //     })
    // });

    // formidable 方式上传数据 **************************************************
    // 1. 创建实例
    const form = formidable({ multiples: true });
    // 2. 指定文件上传的目录
    form.uploadDir = config.uploadPath;
    // 3. 指定文件的后缀
    form.keepExtensions = true;

    // 解析 request 发送过来的数据
    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(err);
        };
        console.log(fields);
        console.log(files);

        //  1. 获取数据
        let body = fields;
        // 2. 解析上传的文件路径，取出文件名保存到数据库
        body.image_url = basename(files.image_url.path);

        // 3. 操作数据库
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
            if(err){
                return next(err);
            };
            res.json({
                status: 200,
                result: '添加轮播图成功'
            })
        });
    });
});

/**
 * 获取所有的轮播图列表
 */
router.get('/sowing/api/list', (req, res, next)=>{
    Sowing.find({}, { l_edit:0, c_time:0 },(err, docs)=>{
        if(err){
            return next(err);
        };
        res.json({
            status: 200,
            result: docs
        });
    });
});

/**
 * 获取一条轮播图数据
 */
router.get('/sowing/api/single/:sowingId', (req, res, next)=>{
    Sowing.find({}, { l_edit:0, c_time:0 },(err, docs)=>{
        Sowing.findById(req.params.sowingId, { l_edit:0, c_time:0 }, (err, docs)=>{
            if(err){
                return next(err);
            };
            res.json({
                status: 200,
                result: docs
            });
        });
    });
});

/**
 * 根据id去修改一条轮播图数据
 */
router.post('/sowing/api/edit', (req, res)=>{
    // 1. 根据id查询数据
    Sowing.findById(req.body.id, (err, sowing)=>{
        if (err){
            return next(err);
        };

        // 2. 修改内容
        const body = req.body;
        sowing.image_title = body.image_title;
        sowing.image_url = body.image_url;
        sowing.image_link = body.image_link;
        sowing.s_time = body.s_time;
        sowing.e_time = body.e_time;

        // 3. 保存
        /**
         * _id 如果是一样的，就不会新增数据，而是更新已有的数据
         */
        sowing.save((err, result)=>{
            if (err){
                return next(err);
            };
            res.json({
                status: 200,
                result: '修改数据成功'
            });
        })
    });
});

/**
 * 根据id去删除一条轮播图数据
 */
router.get('/sowing/api/deleteOne/:sowingId', (req, res, next)=>{
    Sowing.deleteOne({_id: req.params.sowingId}, (err, result)=>{
        if(err){
            return next(err);
        };
        console.log(result);
        res.json({
            status: 200,
            result: '删除数据成功'
        });
    });
});

// ************************************************* 页面路由 ***********************************************************
/**
 * 加载轮播图列表页面
 */
router.get('/back/s_list', (req, res, next)=>{
    //查询所有数据
    Sowing.find((err, sowings, next)=>{
        if(err){
            return next(err);
        };
        res.render('back/sowing_list.html', {sowings});
    });
});

/**
 * 加载添加轮播图页面
 */
router.get('/back/s_add', (req, res, next)=>{
    res.render('back/sowing_add.html');
});

export default router;