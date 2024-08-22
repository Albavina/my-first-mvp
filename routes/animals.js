var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET animals listing. */
router.get('/', async function(req, res, next) {
  try{
    const result = await db("SELECT * FROM animals;")
  res.send (result.data) 
  } catch(err) {
    res.status(500).send(err)};
});

//GET ONE ANIMAL:

router.get("/:id", async function (req, res) {
  const {id} = req.params;
  const sql = `SELECT * FROM animals WHERE id = ${id};`;

  try{
    const result = await db (sql);
    const animal = result.data;
    //Check if the Id exists:
    if (animal.length === 1){
      res.json (animal[0])
    }else{
      res.status(404).send({message: "Animal not found"});
    }
  } catch (err) {
    res.status(500).send ({error : err.message})
  }
});

//POST AN ANIMAL:
//{"animalType": "dog", "name":"Kyra", "age":"15", "size":"medium-size", "admissionDate": "2010-03-01", "picture":"https://cdn.pixabay.com/photo/2019/12/11/19/55/dog-4689169_960_720.jpg", "description":"cute"}

router.post("/", async function (req, res){
  const {animalType, name, age, size, admissionDate, picture, description} = req.body;

  const sql = `INSERT INTO animals (animalType, name, age, size, admissionDate, picture, description) VALUES ("${animalType}", "${name}", ${age}, "${size}", "${admissionDate}", "${picture}", "${description}");`

  try {
    //Send the request:
    await db(sql);
  //Return the whole list of animals including the new one:
    const result = await db("SELECT * FROM animals;")
  res.send (result.data) 
  } catch (err) {
    res.status(500).send ({error : err.message})
  }
});

//UPDATE AN ANIMAL:
router.put("/:id", async function (req, res){
  const {id} = req.params;

  const {animalType, name, age, size, admissionDate, adoptionDate, picture, description} = req.body;

  const sql = `UPDATE animals SET animalType = "${animalType}", name = "${name}", age = ${age}, size = "${size}", admissionDate = "${admissionDate}", adoptionDate = "${adoptionDate}", picture = "${picture}", description = "${description}" WHERE id = ${id};`
  try{
    //Check if the Id exists:
    const result = await db(`SELECT * FROM animals WHERE id = ${id};`)
    if(result.data.length > 0){
      await db(sql)
      const animalUpdated = await db(`SELECT * FROM animals`);
      res.send(animalUpdated.data)       
    } else {
      res.send({message: "Id not found"})
   
  res.send (result.data) }
  }catch (err) {
    res.status(500).send ({error : err.message})
  }
});


//DELETE AN ANIMAL:
router.delete("/:id", async function (req, res){
  const {id} = req.params;
  const sql = `DELETE FROM animals WHERE id = ${id}`;
  try{
    //Check if the Id exists:
    const result = await db(`SELECT * FROM animals WHERE id = ${id};`)
    if(result.data.length > 0){
      await db(sql)
      const animals = await db(`SELECT * FROM animals`);
      res.send(animals.data)     
    } else {
      res.send({message: "Id not found"})
   
  res.send (result.data) }
  }catch (err) {
    res.status(500).send ({error : err.message})
  }

});

module.exports = router;
