const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req. body
const PORT = process.env.PORT || 4000;

// data base connected
db.connect();

const MenuItem = require('./models/MenuItem');

app.get('/', function (req, res) {
  res.send('Hello World hi...........dj')
})


//import the  router files 

const personRoutes = require('./routes/personRoutes');

//use the routers
app.use('/person', personRoutes);


//import the  router files 

const menuItemRoutes = require('./routes/menuItemRoutes');

//use the routers
app.use('/menu', menuItemRoutes);


app.listen(4000 ,()=>{
        console.log('ssahanur alam kohinur parvin sonali sahil')
})

// i am sahanur 