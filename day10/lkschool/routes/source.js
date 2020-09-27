import express from 'express'
import formidable from 'formidable'
import { basename } from 'path'
import config from './../src/config'
import Source from "../models/Source"
import Sowing from "../models/Sowing";

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

// ************************************************* 接口API - end ***********************************************************


// ************************************************* 页面路由 - start ***********************************************************
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
 * 加载添加资源文章页面
 */
router.get('/back/source_add', (req, res, next)=>{
    res.render('back/source_add.html');
});


// ************************************************* 页面路由 - end ***********************************************************

export default router;