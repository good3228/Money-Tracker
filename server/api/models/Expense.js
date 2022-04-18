import mongoose from "mongoose";

//create a mongoose schema and set several properties
const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'title is required.'
    },
    description: {
        type: String,
        required: 'description is required.'
    },
    amount: {
        type: Number,
        required: 'amount is required.'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: 'User id is required'
    }
},{timestamps: true});

const expense = mongoose.model('expense',expenseSchema); //specify the collection to insert

export default expense;