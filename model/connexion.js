const mongoose = require('mongoose');

async function connect() {
    try{
        await mongoose.connect('mongodb://localhost:27017/evalmongo');
        console.log('Connected to database');
    }catch(err){
        console.error('Failed to connect to database :' + err);
    }
}

module.exports = { connect };
