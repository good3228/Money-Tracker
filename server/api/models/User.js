import mongoose from "mongoose";

//create a mongoose schema and set several properties
const Schema = new mongoose.Schema({
    email: {
        type: String,
        required: 'email is required.'
    },
    password: {
        type: String,
        required: 'password is required.'
    },
    fullname: {
        type: String,
        required: 'fullname is required.'
    }
},{ versionKey: false });//remove the default _v property

const model = mongoose.model('user',Schema,'User'); //specify the collection to insert

export default model;