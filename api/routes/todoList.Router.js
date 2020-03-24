const express = require('express');
const router = express.Router();
const arrList = require('../../dataList.json')
const arrTakes = require('../../dataTasks.json')
const validateTask = require('../middlewares/validator.Middleware');
const mongoose = require('mongoose');

const Tasks = require('../models/take.Model');

router.get('/', (req, res, next) => {
    console.log(req.user);
    
    res.status(200).json(
        arrList
    );
})

router.get('/:idList', (req, res, next) => {
    const id = req.params.idList;
    const todoList = arrList.find(x=>x.id == id);
    res.status(200).json({todoList});
})
router.get('/:idTasks/tasks/update', (req, res) => {
    const id = req.params.idTasks;
   // const todoList = arrTakes.find(x=>x.id == id);
 //   res.status(200).json({todoList});
     Tasks.findById(id,(err,todoList)=>{
         if(todoList){
            res.status(200).json({todoList});
         }
         
     })
})
router.get('/:idList/tasks',(req,res,next)=>{
    const id = req.params.idList;
  //  const listTasks = arrTakes.filter(x=>x.listId == id);
    Tasks.find({listId:id}).then(task=>{
        //console.log(task);
        res.status(200).json(task)
    })
   // res.status(200).json(listTasks);
})

router.patch('/:idList',(req,res, next)=>{
    res.status(201).json({});
})

router.patch('/:idTasks/update',(req,res)=>{
    // const take = {  
        // id : req.body.id, 
        // listId : req.body.listId,
        // createdAt :req.body.createdAt,
        // title : req.body.title,
        // desc : req.body.desc,
        // order :req.body.order
    // }
    // arrTakes.forEach((element, index) => {
    //     if(element.id == req.body.id) {
    //         arrTakes[index] = take;
    //     }
    // });
    const id= req.params.idTasks;
    const take= {     
        listId : req.body.listId,
        createdAt :req.body.createdAt,
        title : req.body.title,
        desc : req.body.desc,
        order :Number(req.body.order) 
    }  
    Tasks.findByIdAndUpdate(id,take,(err,Response)=>{
        if(Response){
            console.log('update success');
            //console.log(Response);
            res.status(201).send("update thanh cong");
        }

    })
    
  
    //res.status(201).send("update thanh cong");
})

router.delete('/:idTasks',(req,res)=>{
    // for(var i = arrTakes.length - 1; i >= 0; i--) {
    //     if(arrTakes[i].id === req.params.idTasks) {
    //        arrTakes.splice(i, 1);
    //     }
    // }
    const idTask = req.params.idTasks;
    Tasks.findByIdAndRemove({ _id : idTask}).then(Response=>{
        res.status(201).json({
            mess:"xoa thanh cong"
        });
        console.log('delete success');
        
    })
})
    

router.post('/:idList/tasks',validateTask,(req,res)=>{
    
    // const take = {
    //     id : req.body.id ,
    //     listId : req.params.idList,
    //     createdAt :req.body.createdAt,
    //     title : req.body.title,
    //    // desc : req.body.desc,
    //     order : Math.floor(Math.random() * 101)
    // }
    
    const take = new Tasks({
        _id : new mongoose.Types.ObjectId(),
        listId : req.params.idList,
        createdAt :req.body.createdAt,
        title : req.body.title,
       // desc : req.body.desc,
        order : Math.floor(Math.random() * 101)
    })
   
    
    take.save().then((data)=>{
        console.log('save success');
        res.status(201).json(data);
        
    }).catch(err=>{
        res.status(401)
    })
        
    //arrTakes.push(take);
   // res.status(201).json(take);
})

module.exports = router;
