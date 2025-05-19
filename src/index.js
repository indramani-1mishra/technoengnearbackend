const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/serverconfig');
const connectDb = require('./config/databaseconfig');
const apirouter = require('./router/apiroutes');

const app = express();

// ✅ Allowed Frontend Origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://anntechnobyraj.netlify.app'
];

// ✅ CORS Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true // ✅ Allow cookies & credentials
}));

// ✅ Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API Routes
app.use('/api', apirouter);

// ✅ Root Route for testing
app.get('/', (req, res) => {
  res.send('<h1>Server is running ✅</h1>');
});

// ✅ Start Server
app.listen(PORT, async () => {
  await connectDb();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
