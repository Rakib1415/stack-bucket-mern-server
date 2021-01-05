const express = require('express');
const cors = require('cors');

const morgan = require('morgan');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        msg:'Hello world'
    })
})

app.listen(8080, ()=> {
    console.log('Listening on port 8080');
})