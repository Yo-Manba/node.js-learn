// const express = require('express');
import express from 'express';
const app = express();

app.get('/', (req,res)=>{
    res.end('<h1>hello lambert</h1>')
})


app.listen(3000, ()=>{
    console.log('server is running');
})