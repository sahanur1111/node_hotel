const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');



// Post route to add a person

router.post('/', async (req, res) =>{    
    try{
      const data = req.body; // Assuming the request body contains the person data
    //create a new Person document using the Mongoose model
    const newPerson = new Person(data);
    // save the new person to the database
  
    const response  =  await newPerson.save();
    console.log('data saved');
    res.json({
      post : response,
    });
    
    }catch(err){
       console.log(err);
       res.status(500).json({error: 'Internal Server Error'});  
    }
    
  })


  // Get method to get the person
router.get('/', async (req, res) =>{
    try{
        const data = await Person.find();
        console.log('data fached');
        res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'}); 
    }
  })

  
//day - 06.......................................

router.get('/:workType', async(req, res) =>{
    try{
      const workType = req.params.workType; // Extract the work type from the URL parameter
      if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
        const response = await Person.find({work: workType});
        console.log('response feched');
        res.status(200).json(response);
      }else{
        res.status(404).json({error: 'Invalid work type'});
      }
  
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Errror'});
    }
  })

  //UPDATE ---METHOD---------

  router.put('/:id', async (req, res) =>{
  
    try{
        const personId = req.params.id; // Extract the id from the URL parameter
        const updatePersonData = req.body; // Update data for the person
        
        const response = await Person.findByIdAndUpdate(personId , updatePersonData, {
            new: true, // Return the updated document
            runValidators:true // Run Mongoose validation
        })

        if(!response){
            return res.status(404).json({error: 'Person is not found'});
        }

        console.log('data update');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Errror'});
    }
  })

  //DETELE DATA--------------------METHOD

  router.delete('/:id', async (req, res) =>{
  
    try{
        const personId = req.params.id; // Extract the id from the URL parameter
        //Assuming you have a  person model
        
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: 'Person is not found'});
        }

        console.log('data delete');
        res.status(200).json({message: 'Person Deleted Successfully'});

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Errror'});
    }
  })

  module.exports = router;