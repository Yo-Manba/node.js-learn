import express from 'express'
import formidable from 'formidable'
import { basename } from 'path'
import config from './../src/config'
import Source from "../models/Source"

const router = express.Router({});

// ************************************************* 后端接口API - start ***********************************************************
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
                result: '添加文章成功'
            })
        });
    });
});

/**
 * 加载文章资源列表（自制分页器）
 */
// router.get('/back/source_list', (req, res, next)=>{
//     //查询所有数据
//     Source.find((err, sources, next)=>{
//         if(err){
//             return next(err);
//         };
//         res.render('back/source_list.html', {sources});
//     });
// });

/**
 * 加载文章资源列表（自制分页器）
 */
// router.get('/back/source_list', (req, res, next)=>{
//     // 接收两个参数
//     let page = Number.parseInt(req.query.page, 10) || 1;
//     let pageSize = Number.parseInt(req.query.pageSize, 10) || 2;
//
//     /**
//      * 查询公式推理
//      * page=1 -- pageSize=3
//      *  1  0-2
//      *  2  3-5
//      *  3  6-8
//      *  数据库查询的初始位置 = (page-1) * pageSize
//      */
//
//     //查询所有对应数据
//     Source.find().skip((page-1) * pageSize).limit(pageSize).exec((err, sources)=>{
//         if(err){
//             return next(err);
//         };
//
//         // 返回总页码和当前页码
//         Source.countDocuments((err, count)=>{
//             if(err){
//                 return next(err);
//             };
//             let totalPage = Math.ceil(count / pageSize);
//             res.render('back/source_list.html', {sources, totalPage, page});
//         });
//     });
// });

/**
 * 获取文章总数量 (集成三方分页器)
 */
router.get('/back/source/api/count', (req, res, next)=>{
    // 返回总页码
    Source.countDocuments((err, count)=>{
        if(err){
            return next(err);
        };
        res.json({
            status: 200,
            result: count
        });
    });
});

/**
 * 加载文章资源列表 (集成三方分页器)
 */
router.get('/back/source/api/list', (req, res, next)=>{
    // 接收两个参数
    let page = Number.parseInt(req.query.page, 10) || 1;
    let pageSize = Number.parseInt(req.query.pageSize, 10) || 2;

    //查询所有对应数据
    Source.find().skip((page-1) * pageSize).limit(pageSize).exec((err, sources)=>{
        if(err){
            return next(err);
        };

        res.json({
            status: 200,
            result: sources
        });
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

// ************************************************* 后端接口API - end ***********************************************************



// ************************************************* 前端接口API - start ***********************************************************
/**
 * 获取文章总数量
 */
router.get('/web/source/api/count', (req, res, next)=>{
    // 返回总页码
    Source.countDocuments((err, count)=>{
        if(err){
            return next(err);
        };
        res.json({
            status: 200,
            result: count
        });
    });
});

/**
 * 获取文章列表
 */
router.get('/web/source/api/list', (req, res, next)=>{
    // 接收客户端传递的参数
    let {page, pageSize, sortBy} = req.query;
    page = Number.parseInt(page, 10) || 1;
    pageSize = Number.parseInt(pageSize, 10) || 20;

    // 数据查询规则
    let sortObj;
    if (sortBy === 'price'){
        sortObj = {'price': -1};
    }else {
        sortObj = {'read_count': -1};
    }

    //查询所有对应数据
    Source.find({}, 'title small_img price is_store').skip((page-1) * pageSize).sort(sortObj).limit(pageSize).exec((err, sources)=>{
        if(err){
            return next(err);
        };

        res.json({
            status: 200,
            result: sources
        });
    });
});

/**
 * 获取文章详情
 */
router.get('/web/source/api/content/:id', (req, res, next)=>{
    //查询所有对应数据
    Source.findById(req.params.id, (err, data)=>{
        if(err){
            return next(err);
        };

        res.json({
            status: 200,
            result: data
        });
    });
});

/**
 * 详情页面阅读量处理
 */
router.get('/web/source/api/content/read_count/:id', (req, res, next)=>{
    //查询所有对应数据
    Source.findById(req.params.id, 'read_count', (err, data)=>{
        if(err){
            return next(err);
        };

        // 取出要修改的数据
        data.read_count += 1;

        // 保存
        data.save((err, result)=>{
            if(err){
                return next(err);
            };

            res.json({
                status: 200,
                result: result
            });
        });
    });
});

// ************************************************* 前端接口API - end ***********************************************************



// ************************************************* 后端页面路由 - start ***********************************************************
/**
 * 加载文章列表页面
 */
router.get('/back/source_list', (req, res, next)=>{
    res.render('back/source_list.html');
});

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

// ************************************************* 后端页面路由 - end ***********************************************************


export default router;