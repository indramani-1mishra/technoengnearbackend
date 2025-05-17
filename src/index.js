const express = require('express');
const cors = require('cors'); // ✅ Add this line
const { PORT } = require('./config/serverconfig');
const connectDb = require('./config/databaseconfig');
const apirouter = require('./router/apiroutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://anntechnobyraj.netlify.app/', // ✅ Remove trailing slash for consistency
}));

// Routes
app.use('/api', apirouter);

app.get('/', (req, res) => {
  res.send('<h1>hello</h1>');
});

// Start server
app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server running on http://localhost:${PORT}`);
});
