const express= require('express');
const mongoose= require('mongoose');
const dotenv = require('dotenv');
const app = express();
//Importing the routes
const authRoute= require('./routers/auth');
const postRoute= require('./routers/post');
 
dotenv.config();

//conect to database
mongoose.connect(
    process.env.DB_CONNECT,
        { useNewUrlParser: true },
()=> console.log('connected to db')
);

//middleware 
app.use(express.json());
// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);

 

app.listen(3000, ()=> console.log('Sever up and running bitches'));

