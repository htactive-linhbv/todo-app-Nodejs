const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const todoListRouter = require('./api/routes/todoList.Router');
const bodyParser = require('body-parser');

app.get('/',(req,res,next)=>{
    res.status(200).json({
        message : 'hello'
    })
})

//middleware

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// add routes

app.use('/api/v1/todolists',todoListRouter);



app.listen(port,()=> console.log(`server running on port: ${port}`));
