import User from './../models/User.js';

//function to save the new user-account to database
export const save = (newUser)=>{
    const user = new User(newUser);
    return user.save();
}

export const searchOne = (userInfo)=> {
    return User.findOne(userInfo);
}