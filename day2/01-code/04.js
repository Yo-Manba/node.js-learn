

// console.log(arguments.callee + '')
// console.log(module);
console.log(__filename);
console.log(__dirname);

/*
* exports： 用来导出当前的模块
* require: 用来引入外部的模块
* module：代表的是当前模块本身， exports就是module的属性，我们既可以使用exports导出，也可以使用module.exports导出
* __filename: 当前模块的完成路径
* __dirname: 当前模块所在文件夹的完成路径
*
* (function (exports, require, module, __filename, __dirname) {
*   exports = module.exports = {};
*
*   return module.exports;
* })
* */