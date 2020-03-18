const express = require('express');
const router = express.Router();
const arrTake= require('../models/take.Model');


let arrList = [
    {
        id: "1",
        createdAt: "2020-03-05T05:19:23.654Z",
        name: "TODO"
    },
    {
        id: "2",
        createdAt: "2020-03-05T18:35:01.269Z",
        name: "DOING"
    },
    {
        id: "3",
        createdAt: "2020-03-05T11:30:11.819Z",
        name: "DONE"
    }
];

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
    const todoList = arrTake.find(x=>x.id == id);
    res.status(200).json({todoList});
})
router.get('/:idList/tasks',(req,res,next)=>{
    const id = req.params.idList;
    const listTasks = arrTake.filter(x=>x.listId == id);
    res.status(200).json(listTasks);
})

router.patch('/:idList',(req,res, next)=>{
    res.status(201).json({});
})

router.delete('/:idTasks',(req,res,next)=>{
    for(var i = arrTake.length - 1; i >= 0; i--) {
        if(arrTake[i].id === req.params.idTasks) {
           arrTake.splice(i, 1);
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
    arrTake.push(take);
    res.status(201).json(take);
})
module.exports = router;