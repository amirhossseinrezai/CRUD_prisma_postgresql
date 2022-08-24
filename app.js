const express = require('express');
const winston = require('winston');
const  app = express();

const router = require('./src/routes/router');


require('./src/handler/exceptionHandler')();


app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use('/api/postgres_prisma', router);


port = process.env.PORT || 3000;
app.listen(port, ()=>{
    winston.log("info", `This app is started at port ${port}`);
});