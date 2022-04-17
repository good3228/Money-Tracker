import mongoose from "mongoose";

//create a mongoose schema and set several properties
const revenueSchema = new mongoose.Schema({
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
},{timestamps: true});//remove the default _v property


const revenue = mongoose.model('revenue',revenueSchema); //specify the collection to insert

export default revenue;