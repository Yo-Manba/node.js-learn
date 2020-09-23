import express from 'express'
import Sowing from "../models/Sowing"
const router = express.Router({});


//后端页面路由**********************************************************************************************************
router.get('/back', (req, res)=>{
   res.render('back/index.html');
});

//前端页面路由**********************************************************************************************************
router.get('/', (req, res)=>{
    res.redirect('/web');
});

router.get('/web', (req, res)=>{
    res.render('web/index.html');
});

router.get('/web/res', (req, res)=>{
    //查询所有数据
    Sowing.find({}, {_id: 0, e_time: 0, s_time: 0},(err, sowings, next)=>{
        if(err){
            return next(err);
        };
        // 追加一个字段
        let tag = ['one', 'two', 'three', 'four'];
        for (let i = 0; i < tag.length; i++) {
            let sowing = sowings[i];
            sowing.image_tag = tag[i];
        };
        res.render('web/resources.html', {sowings});
    });
});

router.get('/web/res_c', (req, res)=>{
    res.render('web/resources_content.html');
});

export default router;