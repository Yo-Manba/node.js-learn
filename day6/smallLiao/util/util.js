/**
 * 全局存放用户信息
 * @type {*[]}
 */
exports.users = [];

/**
 * 验证用户是否已经注册
 * @param userObj
 * @param usersArr
 */
exports.isReg = (userObj, usersArr)=>{
    for (let i = 0; i < usersArr.length; i++) {
        if(usersArr[i].userName === userObj.userName){
            return usersArr[i];
        }
    }
}