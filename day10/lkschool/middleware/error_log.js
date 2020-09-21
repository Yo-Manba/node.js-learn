
import Error from "../models/Error";

export default (err, req, res, next)=>{
    const error = new Error({
        // 错误名称
        error_name: err.name,
        // 错误消息
        error_message: err.message,
        // 错误堆栈
        error_stack: err.stack
    });

    error.save((err, result)=>{
        res.json({
            status: 500,
            result: '服务器内部错误',
            message: err.message
        });
    });
}
