const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
const {jwtAuthMiddleware, generateToken} = require("./../jwt");

// Post route to add a person

router.post("/signup", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data
    //create a new Person document using the Mongoose model
    const newPerson = new Person(data);

    // save the new person to the database
    const response = await newPerson.save();
    console.log("data saved");

    //  token generate using username 
    const payload = {
      id: response.id,
      username: response.username,
    }
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is :", token);

    res.status(200).json({response: response, token: token});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login Route***********
router.post('/login', async (req, res) => {
  try {
    // Extract username and password
    const {username, password} = req.body;

    // Find the user in the database
    const user = await Person.findOne({username: username});
    // if user not found
    if (!user || (await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    //  generate token
    const payload = {
      id: user.id,
      username: user.username,
    }
    const token = generateToken(payload);
    console.log("Token is :", token);
    // respond with token
    return res.status(200).json({token: token});
    }catch(err){
      console.log(err);
      res.status(500).json({ error: "Internal Server Errror" });
    }

  })

  // Profile route
  router.get("/profile", jwtAuthMiddleware, async (req, res) => {
    try {
      const userData = req.user;
      console.log("data fached" , userData);
      const userId = userData.id;
      const user = await Person.findById(userId);
      res.status(200).json(user);

    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })


// Get method to get the person
router.get("/",jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fached");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//day - 06.......................................

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // Extract the work type from the URL parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response feched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Errror" });
  }
});

//UPDATE ---METHOD---------

router.put("/:id", async (req, res) => {
  //id id variable---paramerterise
  try {
    const personId = req.params.id; // Extract the id from the URL parameter--client debe
    const updatePersonData = req.body; // Update data for the person//body me

    const response = await Person.findByIdAndUpdate(
      personId,
      updatePersonData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person is not found" });
    }

    console.log("data update");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Errror" });
  }
});

//DETELE DATA--------------------METHOD

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the URL parameter
    //Assuming you have a  person model

    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person is not found" });
    }

    console.log("data delete");
    res.status(200).json({ message: "Person Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Errror" });
  }
});

module.exports = router;
