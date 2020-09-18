import express from 'express'
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
    res.render('web/resources.html');
});

router.get('/web/res_c', (req, res)=>{
    res.render('web/resources_content.html');
});

export default router;