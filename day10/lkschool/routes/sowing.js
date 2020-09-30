import express from 'express'
import SowingController from './../controller/sowing/SowingController'

const router = express.Router({});

// ************************************************* 接口API ***********************************************************
/*
 * 往数据库中添加一条记录
 */
router.post('/back/sowing/api/add', SowingController.insertOneSowing);

/**
 * 获取所有的轮播图列表
 */
router.get('/back/sowing/api/list', SowingController.getAllSowings);

/**
 * 获取一条轮播图数据
 */
router.get('/back/sowing/api/single/:sowingId', SowingController.getOneSowingInfo);

/**
 * 根据id去修改一条轮播图数据
 */
router.post('/back/sowing/api/edit', SowingController.editOneSowingInfo);

/**
 * 根据id去删除一条轮播图数据
 */
router.get('/back/sowing/api/deleteOne/:sowingId', SowingController.deleteOneSowing);

// ************************************************* 页面路由 ***********************************************************
/**
 * 加载轮播图列表页面
 */
router.get('/back/s_list', SowingController.loadSowingListPage);

/**
 * 加载添加轮播图页面
 */
router.get('/back/s_add', SowingController.loadAddSowingPage);

/**
 * 加载修改轮播图页面
 */
router.get('/back/s_edit', SowingController.loadEditSowingPage);

export default router;