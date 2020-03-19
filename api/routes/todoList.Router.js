const express = require('express');
const router = express.Router();

const fs = require('fs');
const arrList = require('../../dataList.json')
const arrTakes = require('../../dataTasks.json')



console.log(arrTakes);




router.get('/', (req, res, next) => {
    res.status(200).json(
        arrList
    );
})

router.get('/:idList', (req, res, next) => {
    const id = req.params.idList;
    const todoList = arrList.find(x=>x.id == id);
    res.status(200).json({todoList});
})
router.get('/:idTasks/tasks/update', (req, res, next) => {
    const id = req.params.idTasks;
    const todoList = arrTakes.find(x=>x.id == id);
    res.status(200).json({todoList});
})
router.get('/:idList/tasks',(req,res,next)=>{
    const id = req.params.idList;
    const listTasks = arrTakes.filter(x=>x.listId == id);
    res.status(200).json(listTasks);
})

router.patch('/:idList',(req,res, next)=>{
    res.status(201).json({});
})

router.patch('/:idTasks/update',(req,res,next)=>{
    const take = {  
        id : req.body.id, 
        listId : req.body.listId,
        createdAt :req.body.createdAt,
        title : req.body.title,
        desc : req.body.desc,
        order :req.body.order
    }
    arrTakes.forEach((element, index) => {
        if(element.id == req.body.id) {
            arrTakes[index] = take;
        }
    });
    res.status(201).send("update thanh cong");
})

router.delete('/:idTasks',(req,res,next)=>{
    for(var i = arrTakes.length - 1; i >= 0; i--) {
        if(arrTakes[i].id === req.params.idTasks) {
           arrTakes.splice(i, 1);
        }
    }
    res.send('delete thanh cong');
    
    
})

router.post('/:idList/tasks',(req,res,next)=>{
    
    const take = {
        id : req.body.id ,
        listId : req.params.idList,
        createdAt :req.body.createdAt,
        title : req.body.title,
       // desc : req.body.desc,
        order : Math.floor(Math.random() * 101)
    }
    arrTakes.push(take);
    res.status(201).json(take);
})

module.exports = router;
