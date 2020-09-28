import express from 'express'
import formidable from 'formidable'
import { basename } from 'path'
import config from './../src/config'
import Source from "../models/Source"

const router = express.Router({});

// ************************************************* 接口API - start ***********************************************************
/**
 * 图片上传到 uploads 文件夹
 */
router.post('/back/source/api/add_img', (req, res, next)=>{
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

        if(files.image_url){
            let image_url = 'http://localhost:3000/uploads/' + basename(files.image_url.path);
            res.json({
                status: 200,
                result: image_url
            });
        }else {
            res.json({
                status: 1,
                result: '上传图片路径不存在'
            });
        };
    });
});

/*
 * 往数据库中添加一条记录
 */
router.post('/back/source/api/add', (req, res, next)=>{
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
        body.small_img = basename(files.small_img.path);

        // 3. 操作数据库
        const source = new Source({
            title: body.title,
            author: body.author,
            small_img: body.small_img,
            price: body.price,
            content: body.content
        });

        source.save((err, result)=>{
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
 * 加载文章列表页面
 */
router.get('/back/source_list', (req, res, next)=>{
    //查询所有数据
    Source.find((err, sources, next)=>{
        if(err){
            return next(err);
        };
        res.render('back/source_list.html', {sources});
    });
});

/**
 * 获取一条文章数据
 */
router.get('/back/source/api/single/:id', (req, res, next)=>{
    // Source.find({}, { l_edit:0, c_time:0 },(err, docs)=>{
        Source.findById(req.params.id, (err, data)=>{
            if(err){
                return next(err);
            };
            res.json({
                status: 200,
                result: data
            });
        });
    // });
});


/**
 * 根据id去修改一条文章数据
 */
router.post('/back/source/api/edit', (req, res)=>{
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

        //  1. 获取普通数据
        let body = fields;
        //  2. 根据id查询文档
        Source.findById(body.id, (err, data)=>{
            if(err){
                return next(err);
            };

            // 修改文档的内容
            data.title = body.title;
            data.author = body.author;
            data.small_img = body.small_img || basename(files.small_img.path);
            data.price = body.price;
            data.content = body.content;
            data.l_edit = Date.now();

            data.save((err, result)=>{
                if(err){
                    return next(err);
                };
                res.json({
                    status: 200,
                    result: '修改文章数据成功'
                })
            });
        });
    });
});

/**
 * 根据id去删除一条轮播图数据
 */
router.get('/back/source/api/deleteOne/:id', (req, res, next)=>{
    Source.deleteOne({_id: req.params.id}, (err, result)=>{
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

// ************************************************* 接口API - end ***********************************************************


// ************************************************* 页面路由 - start ***********************************************************


/**
 * 加载添加资源文章页面
 */
router.get('/back/source_add', (req, res, next)=>{
    res.render('back/source_add.html');
});

/**
 * 加载修改轮播图页面
 */
router.get('/back/source_edit', (req, res, next)=>{
    res.render('back/source_edit.html');
});

// ************************************************* 页面路由 - end ***********************************************************

export default router;