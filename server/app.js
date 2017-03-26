const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//Importing Router modules(controllers)
const coursesApi = require('./routes/courses');
const pathsApi = require('./routes/paths');
const usersApi = require('./routes/users');
const uploadApi = require('./routes/uploads');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: '2mb' }));

// Point static path to dist
app.use(express.static(path.join(__dirname, '/../dist')));

//API Routes
app.use('/api/courses', coursesApi);
app.use('/api/paths', pathsApi);
app.use('/api/users', usersApi);
app.use('/api/upload', uploadApi);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../dist/index.html'));
});


module.exports = app;
