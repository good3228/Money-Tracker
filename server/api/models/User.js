import mongoose from "mongoose";

//create a mongoose schema and set several properties
const userSchema = new mongoose.Schema({
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
},{timestamps: true});

userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}

const model = mongoose.model('user',userSchema,'User'); //specify the collection to insert

export default model;