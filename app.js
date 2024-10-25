// Acquiring the necessary libraries or modules.
const express = require ('express'); // Acquiring the express library.
const path = require ('path'); // Acquiring the path module.
const mongoose = require('mongoose'); // Acquiring the mongoose library.
const bodyparser = require('body-parser'); // Acquiring the body parser library.

const app = express(); // Initializing the app as an express app.
const port = 80; // Initializing the port no on localhost:80 to render the website.

app.use('/static',express.static('static')); // For serving the static files.
app.set('view-engine', 'pug'); // Setting the view engine as pug.
app.set('views', path.join(__dirname,'views')); // Setting the views directory.

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Mongoose related stuff: 
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/DanceWebsiteData'); // We created the database as DanceWebsiteData.
  console.log("we are connected.")
}

// Defining Schema For ContactDance: 
// For Contact Page: 
const contactSchema = new mongoose.Schema({
    name: String,
    father_Name: String,
    age: String,
    gender: String,
    email: String,
    phone_Number: String
  });

// For Sign In Page: 
const SignInSchema = new mongoose.Schema({
    password: String,
    email: String
  });

// Compiling The Schema Into Model: 
// For Contact Page: 
const Contact = mongoose.model('Contact', contactSchema);

// For Sign In Page: 
const SignIn = mongoose.model('SignIn', SignInSchema);

// Creating the end points.
app.get('/',(req,res)=>{
    const params = {};
    res.status(200).render('home.pug',params);
})

app.get('/about',(req,res)=>{
    const params = {};
    res.status(200).render('home.pug',params);
})

app.get('/services',(req,res)=>{
    const params = {};
    res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{
    const params = {};
    res.status(200).render('contact.pug',params);
})

app.get('/signin',(req,res)=>{
    const params = {};
    res.status(200).render('signIn.pug',params);
})

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("The data has been saved.");
    }).catch(()=>{
        res.status(400).send("The data is not saved please try again.");
    })
})

app.post('/signin',(req,res)=>{
    var myData = new SignIn(req.body);
    myData.save().then(()=>{
        res.send("The data has been saved.");
    }).catch(()=>{
        res.status(400).send("The data is not saved please try again.");
    })
})

app.listen(port, ()=>{
    console.log(`The server has started successfully on http://localhost:${port}`);
}); // Start the server.