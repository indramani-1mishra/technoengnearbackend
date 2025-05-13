const express = require('express');
const { PORT } = require('./config/serverconfig');
const connectDb = require('./config/databaseconfig');
const apirouter = require('./router/apiroutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',apirouter);
app.get('/', (req, res) => {
  return res.send('<h1>hello</h1>');
});

app.listen(PORT,async()=>{
    await connectDb();
    console.log(`server run on port http://localhost:${PORT}`);
    
})