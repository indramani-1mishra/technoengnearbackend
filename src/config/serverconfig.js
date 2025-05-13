require('dotenv').config();

const PORT =process.env.PORT;
const MONGO_URL= process.env.MONGO_URL;
const CLOUD_NAME=process.env.CLOUD_NAME;
const API_KEY=process.env.API_KEY;
const SECREAT_API_KEY=process.env.SECREAT_API_KEY;

module.exports={
    PORT,
    MONGO_URL,
    CLOUD_NAME,
    API_KEY,
    SECREAT_API_KEY
}