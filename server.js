const express = require('express');
const connectDB = require('./config/db');
var bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const fileUpload = require('express-fileupload');

const app = express();

//Connect Database
connectDB();

// Handlebars Helpers
const {
    formatDate,
    stripTags,
    truncate,
    editIcon,
    select,
} = require('./helpers/hbs')


// Handlebars
app.engine(
    '.hbs',
    exphbs({
        helpers: {
            formatDate,
            stripTags,
            truncate,
            editIcon,
            select,
        },
        //defaultLayout: 'main',
        extname: '.hbs',
    })
)
app.set('view engine', '.hbs')

//Init Middleware
app.use(express.json({
    extended: false
}))

app.use(fileUpload());

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

//app.get('/', (req, res) => res.send('API Running'));
//app.get('/', require('./routes/front/front'));

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/menu', require('./routes/api/menu'));
app.use('/api/transaction', require('./routes/api/transaction'));
app.use('/api/users', require('./routes/api/users'));

//Serve static asset in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));