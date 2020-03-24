const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const veryfyToken = require('./api/middlewares/veryfyToken.middleware');
const mongoose = require('mongoose');



//connect databass
mongoose.connect(
    'mongodb+srv://admin:admin@todo-app-mpwyl.mongodb.net/test?retryWrites=true&w=majority',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,  
        useFindAndModify: false        
    },
  
);


//khai báo router
const todoListRouter = require('./api/routes/todoList.Router');
const loginRouter = require('./api/routes/login.Router');

// khai báo middleware
const bodyParser = require('body-parser');

// cấp quyền cho clien sử dụng api
const cors = require('cors');

app.get('/',(req,res,next)=>{
    res.status(200).json({
        message : 'hello'
    })
})

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



// add routes
app.use('/api/v1/login',loginRouter);


//add middleware để check đăng nhập;

// app.use(veryfyToken);

app.use('/api/v1/todolists',todoListRouter);




//app.listen(port,()=> console.log(`server running on port: ${port}`));


const server = app.listen(port, () => console.log(`server running on port: ${port}`));

