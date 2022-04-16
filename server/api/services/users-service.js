import User from './../models/User.js';

//function to save the new user-account to database
export const save = (newUser)=>{
    const user = new User(newUser);
    return user.save();
}

//function to get the specific user by id
export const get = (id) => {
    const user = User.findById(id).exec();
    return task;
}

//function to update the specific task by id
export const update = (updatedTask) => {
    updatedTask.lastModifiedDate = new Date()
    const task = Task.findByIdAndUpdate(updatedTask.id,updatedTask).exec();
    return task;
}

//function to delete a specific task by id
export const remove = (id) => {
    const task = Task.findByIdAndDelete(id).exec();
    return task;
}