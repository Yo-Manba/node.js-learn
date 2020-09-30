import {join} from 'path';

export default {
    viewsPath: join(__dirname, './../views'),
    publicPath: join(__dirname, './../public'),
    uploadPath: join(__dirname, './../public/uploads'),
    port: parseInt(process.env.PORT, 10) || 3000
}