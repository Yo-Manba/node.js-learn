import express from 'express'
import formidable from 'formidable'
import { basename } from 'path'
import config from './../src/config'
import Sowing from "../models/Sowing"

const router = express.Router({});

// ************************************************* 接口API ***********************************************************
/*
 * 往数据库中添加一条记录
 */
router.post('/back/sowing/api/add', (req, res, next)=>{

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
router.get('/back/sowing/api/list', (req, res, next)=>{
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
router.get('/back/sowing/api/single/:sowingId', (req, res, next)=>{
    Sowing.find({}, { l_edit:0, c_time:0 },(err, docs)=>{
        Sowing.findById(req.params.sowingId, { l_edit:0, c_time:0 }, (err, data)=>{
            if(err){
                return next(err);
            };
            res.json({
                status: 200,
                result: data
            });
        });
    });
});

/**
 * 根据id去修改一条轮播图数据
 */
router.post('/back/sowing/api/edit', (req, res)=>{
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
        console.log(files.image_url.path);

        //  1. 获取普通数据
        let body = fields;
        //  2. 根据id查询文档
        Sowing.findById(body.id, (err, sowing)=>{
            if(err){
                return next(err);
            };

            // 修改文档的内容
            sowing.image_title = body.image_title;
            sowing.image_url = body.image_url || basename(files.image_url.path);
            sowing.image_link = body.image_link;
            sowing.s_time = body.s_time;
            sowing.e_time = body.e_time;
            sowing.l_edit = Date.now();

            sowing.save((err, result)=>{
                if(err){
                    return next(err);
                };
                res.json({
                    status: 200,
                    result: '修改轮播图成功'
                })
            });
        });
    });
});

/**
 * 根据id去删除一条轮播图数据
 */
router.get('/back/sowing/api/deleteOne/:sowingId', (req, res, next)=>{
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

/**
 * 加载修改轮播图页面
 */
router.get('/back/s_edit', (req, res, next)=>{
    res.render('back/sowing_edit.html');
});

export default router;