const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// routes
app.use('/api/users', require('./routes/auth'))
app.use('/api/cards', require('./routes/cards'))


app.use(express.urlencoded({ extended: false }));
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