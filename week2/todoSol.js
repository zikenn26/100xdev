const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')
const port = 3000
const path = require('path')
const app = express()
const cors = require('cors')
app.use(bodyParser.json())
app.use(cors())
// module.exports = app;
let index=1


app.get('/todo',(req,res)=>{
    fs.readFile('todo.json',"utf-8",(err,data)=>{
        if(err) throw err
        res.json(JSON.parse(data))
    })
})

app.post('/todo',(req,res)=>{
    const newTodo = {
    id:index++,
    title: req.body.title,
    description:req.body.description
    };
    fs.readFile('todo.json','utf-8',(err,data) => {
        if(err) throw err
        const todos = JSON.parse(data)
        todos.push(newTodo)
        fs.writeFile('todo.json',JSON.stringify(todos),(err) => {
            if(err) throw err
            res.status(201).json(newTodo)
        });
    });
});

function findIndex(arr, id) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) return i;
    }
    return -1;
}

function removeAtIndex(arr,index){
    let newArray = []
    for (let i=0;i<=arr.length;i++){
        if(i!==index){
            newArray.push(arr[i])
        }
        else continue
    }
    console.log(newArray)
    return newArray
}

app.delete('/todo/:id',(req,res)=>{
    fs.readFile('todo.json','utf-8',(err,data)=>{
        const todo = JSON.parse(data)
        const todoIndex = findIndex(todo,parseInt(req.params.id))
        if (todoIndex===-1){
            res.status(404).send("Not Found!")
        }
        else{
            const todos = removeAtIndex(todo,todoIndex)
            fs.writeFile('todo.json',JSON.stringify(todos),(err)=>{
                if(err) throw err
                res.status(200).send()
            })
        }
    })  
})
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})
// app.use((req,res)=>{
//     res.status(400).send()
// })

app.listen(port)
