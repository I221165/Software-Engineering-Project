// app.js
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const app = express();

// Set EJS as the view engine and use layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Middleware to parse URL-encoded bodies (for forms) and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (e.g., CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Mount the routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Frontend server running on port ${PORT}`));