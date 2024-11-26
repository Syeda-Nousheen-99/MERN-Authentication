const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const AuthRouter = require('./Router/AuthRouter');
const ProductRouter = require('./Router/ProductRouter')

require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) =>{
    res.send("Hello Backend")
})

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

app.listen(PORT, () =>{
    console.log(`Server is running at ${PORT}`);   
})

