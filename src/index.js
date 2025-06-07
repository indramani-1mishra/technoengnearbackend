const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/serverconfig');
const connectDb = require('./config/databaseconfig');
const apirouter = require('./router/apiroutes');
const cookieParser = require('cookie-parser');

const app = express();

// ✅ Allowed Frontend Origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://anntechnobyraj.netlify.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));


// ✅ Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
