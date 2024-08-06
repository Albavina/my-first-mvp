var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET collaborators listing: */
router.get('/', async function(req, res, next) {
  const sql = `SELECT * FROM collaborators;`;
  try{
    const result = await db(sql);
    res.send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//GET a collaborator by id:

router.get("/:id", async function (req, res){
  const {id} = req.params;
  const sql = `SELECT * FROM collaborators WHERE id = ${id};`;
  
  try{
    const result = await db(sql);
    if(result.data.length === 1){
      res.send(result.data)
    }else{
      res.status(404).send({message: "Collaborator not found"});
    }
  }catch (err) {
    res.status(500).send ({error : err.message})
  }
});

//CREATE a collaborator:
router.post("/", async function (req, res){
const {firstName, lastName, email, phoneNumber, age, kindOfCollaboration} = req.body;
const sql = `INSERT INTO collaborators (firstName, lastName, email, phoneNumber, age, kindOfCollaboration) VALUES ("${firstName}", "${lastName}", "${email}", ${phoneNumber}, ${age}, "${kindOfCollaboration}");`;
try{
  await db(sql);
  const result = await db(`SELECT * FROM collaborators`);
  res.send(result.data)
}catch (err) {
  res.status(500).send ({error : err.message})
}
});

//UPDATE A COLLABORATOR:
router.put("/:id", async function (req, res){
  const {id} = req.params;

  const {firstName, lastName, email, phoneNumber, age, kindOfCollaboration} = req.body;

  const sql = `UPDATE collaborators SET firstName = "${firstName}", lastName = "${lastName}", email = "${email}",  phoneNumber = ${phoneNumber}, age = ${age}, kindOfCollaboration = "${kindOfCollaboration}" WHERE id = ${id};`
  try{
    //Check if the Id exists:
    const result = await db(`SELECT * FROM collaborators WHERE id = ${id};`)
    if(result.data.length > 0){
      //If it does, execute the put method:
      await db(sql)
    //And return the whole list again      
      const collaboratorUpdated = await db(`SELECT * FROM collaborators`);
      res.send(collaboratorUpdated.data)       
    } else {
      res.send({message: "Id not found"})
   
  res.send (result.data) }
  }catch (err) {
    res.status(500).send ({error : err.message})
  }
});

//DELETE a collaborator:
router.delete("/:id", async function (req, res){
const {id} = req.params;
const sql = `DELETE FROM collaborators WHERE id = ${id};`;
try{
  //Check if the Id exists:
  const result = await db(`SELECT * FROM collaborators WHERE id = ${id};`)
  if(result.data.length > 0){
    await db(sql)
    const collaborators = await db(`SELECT * FROM collaborators`);
    res.send(collaborators.data)     
  } else {
    res.send({message: "Id not found"})
 
res.send (result.data) }
}catch (err) {
    res.status(500).send ({error : err.message})
  }

});

module.exports = router;
