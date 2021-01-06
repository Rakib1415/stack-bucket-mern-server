require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
mongoose.connect('mongodb://localhost:27017/stack-bucket-mern', {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> {
    console.log('Database connected!')
}).catch((e)=> {
    console.log(e)
})
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'../','public')));
app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        msg:'Hello world'
    })
});

app.use((req, res, next)=> {
    const error = new Error('404 page not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=> {
    console.log(error);
    if(error.status === 404){
        return res.status(404).json({
            msg : error.message,
            status : 404
        })
    }
    return res.status(500).json({
        msg : 'Internal Server Error',
        status : 500
    })
})

app.listen(process.env.PORT, ()=> {
    console.log('Listening on port ', process.env.PORT);
})