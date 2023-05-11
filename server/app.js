const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config(); //cherche explication

const dbService = require("./dbService");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//create 
app.post("/insert", (req, res) => {
const{name}=req.body;
console.log("req.body: ", req.body);
const db = dbService.getDbServiceInstance();
const result = db.insertNewName(name)

result
.then((data) => res.json({data:data}))
.catch(err=> console.log(err));


});

//read
app.get("/getAll", (request, response) => {
  const db = dbService.getDbServiceInstance();
const result =db.getAllData();

result
.then((data) => response.json({data:data}))
.catch(err=> console.log(err));


  
});

//update

//delete
app.delete('/delete/:id', (req, res) => {
  console.log(req.params);
const {id}= req.params;

const db = dbService.getDbServiceInstance();
const result =db.deleteRowById(id);

result
.then((data) => response.json({success:true}))
.catch(err=> console.log(err));
})






app.listen(process.env.PORT, () => {
  console.log("app is running");
});
