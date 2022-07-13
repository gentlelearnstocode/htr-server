const fs = require('fs')
const dotenv = require('dotenv');
dotenv.config({ path: '../../config.env' });
const Road = require('../../models/roadModel')

const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log('Connection established...');
  });

const roads = JSON.parse(fs.readFileSync(`${__dirname}/roads-data.json`, 'utf-8'))

const importData = async() =>{
    try{
        await Road.create(roads)
        console.log('Data has been loaded successfully');
    }
    catch(err){
        console.log(err);
    }
}

const deleteData = async() =>{
    try{
        await Road.deleteMany()
        console.log('Data has been deleted successfully')
    }
    catch(err){
        console.log(err);
    }
}

if(process.argv.includes('--import')){
    importData()
}
else if(process.argv.includes('--delete')){
    deleteData()
}