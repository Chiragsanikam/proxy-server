//so we are creating a backend for todos
//get todo will just show all the todos in json format
//post todo will post them ,, take inputs from body
//delete todo will delete them from the array for that we have used TWO functions


// writing to json file use json.stringify(nameofthething)
//reading from json file use json.parse(data)


const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const port = 4000
const fs=require('fs')
const cors=require('cors')
app.use(cors())
app.use(bodyParser.json())

let todos=[]
//loading data from json file


// function loadTodosFromFile(){
//   try{
//     fs.readFileSync('app.json','utf8')
//     return JSON.parse(data)||[]
//   }
//   catch(err){
//     return []
//   }
// }

// function saveTodoToFile(){
//   fs.writeFileSync('app.json', JSON.stringify(todos),'utf8')
// }


//^^^^ function which are used to read and write fro a json file mocking a database



//functions
function findIndex(arr,id){
  for(i=0;i<arr.length;i++){
    if(arr[i].id===id){
      return i
    }
  }
  return -1
}

function removeAtIndex(arr,index){
let newarray=[]
for(i=0;i<arr.length;i++){
  if(i!==index){
    newarray.push(arr[i])
  }

}
return newarray;


}

//

//getting the todos
app.get('/todos', (req, res) => {
  fs.readFile("app.json", "utf8", (err,data)=>{
    if(err){
      return []
    }
    res.json(JSON.parse(data))
  })
})

count =1 
//posting the todos
app.post('/todos', (req,res)=>{
  let newTodo={
    id: count, //unique random id
    title : req.body.title,
    description : req.body.description
  }
  count=count+1
  fs.readFile("app.json", "utf8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    todos.push(newTodo);
    fs.writeFile("app.json", JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(201).json(newTodo);
    });
  });
});

//deleting the todos
app.delete('/todos/:id',(req,res)=>{
  fs.readFile("app.json", "utf8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    let todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send();
    } else {
      todos = removeAtIndex(todos, todoIndex);
      fs.writeFile("app.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).send();
      });
    }
  });
});






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})