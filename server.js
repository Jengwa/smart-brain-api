const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image')
const profile = require('./controllers/profile')

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
   ssl: true,
   
  }
});

db.select('*').from('users');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {res.send('it is working ok.....')})

app.post('/signin',  (req,res) =>{signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req,res) =>{register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res) => {profile.handleProfile(req,res,db)})

app.put('/image', (req,res) => {image.handleImage(req,res,db)});

app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3003) ,() => {
	console.log(`the app is running on ${process.env.PORT}`)
}


