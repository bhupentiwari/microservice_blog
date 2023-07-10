const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events',(req,res) => {
    const event = req.body;
    console.log('event bus is called');
    //Post service
    axios.post('http://localhost:4000/events', event).catch((error) =>{
        console.log(error.message);
    });
    //Comment Service
    axios.post('http://localhost:4001/events', event).catch((error) =>{
        console.log(error.message);
    });
    
    //Query bus service
    axios.post('http://localhost:4002/events', event).catch((error) =>{
        console.log(error.message);
    });

    res.send({ status : 'OK'});

})

app.listen(4005, ()=>{
    console.log('Listening on 4005');
});

