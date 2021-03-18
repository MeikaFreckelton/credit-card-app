const express = require('express');
const mongoose = require('mongoose');
// const defaultVars = require('./config/default.json')
// const mongoUri = defaultVars.mongoURI
const bodyParser = require('body-parser')

const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// console.log(process.env.DB_HOST)

// routes
app.use('/api/users', require('./routes/auth'))
app.use('/api/cards', require('./routes/cards'))


// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'public/index.html'));
//     });
// }
// console.log(typeof(process.env.DB_HOST))




app.get('/', (req, res) => res.send('Home Route'));
const port = process.env.PORT || 8080;
mongoose
    .connect(process.env.DB_HOST, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      useFindAndModify: false,
    })
    .then(() => {
        app.listen(port, () => console.log(`Server and Database running on ${port}, http://localhost:${port}`));
    })
    .catch((err) => {
        console.log(err);
        process.exit(1)
    });