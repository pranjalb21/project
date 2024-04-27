require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./router/authRouter.js');
const connectDB = require('./utils/db.js');
const errorMiddleware = require('./middlewares/errorMiddleware.js');

const contactRouter = require('./router/contactRouter.js');

const app = express();

app.use(express.json());
app.use(cors())

app.use('/api/auth', authRouter);
app.use('/contact', contactRouter);

app.use(errorMiddleware);

connectDB().then(() => {
    app.listen('5000', () => {
        console.log('Hello');
    })
})