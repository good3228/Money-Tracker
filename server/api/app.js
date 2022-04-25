import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/index.js';
import model from './models/index.js';

//using express framework
const app = express();

//connect to the mongodb atlas
mongoose.connect('mongodb+srv://AJHJ-Admin:info6150project@info6150-ajhj.o2v2p.mongodb.net/ExpenseTracker');
<<<<<<< HEAD
=======
// mongoose.connect('mongodb://localhost:27017/expens-tracker')
>>>>>>> 6791027630ef21c8a59f7c43de2d7e077ea18627

app.use(express.json())
app.use(express.urlencoded());
app.use(cors()); //for cross domain

routes(app);

export default app; //export the model