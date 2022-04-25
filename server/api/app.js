import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/index.js';
import model from './models/index.js';

//using express framework
const app = express();

//connect to the mongodb atlas
mongoose.connect('mongodb+srv://AJHJ-Admin:info6150project@info6150-ajhj.o2v2p.mongodb.net/ExpenseTracker');

app.use(express.json())
app.use(express.urlencoded());
app.use(cors()); //for cross domain

routes(app);

export default app; //export the model