import Revenue from './../models/Revenue.js'


export const save = (newRevenue)=>{
    const revenue = new Revenue(newRevenue);
    return revenue.save();
}

export const get = (revenueId) => {
    const revenue = Revenue.findById(revenueId).exec();
    return revenue;
}

export const getRecord = (userid) => {
    const revenue = Revenue.find({user:userid}).exec();
    return revenue;
}

export const update = (updatedRevenue) => {
    updatedRevenue.updatedAt = new Date()
    const revenue = Revenue.findByIdAndUpdate(updatedRevenue.id,updatedRevenue,{new: true}).exec();
    return revenue;
}

//function to delete a specific income by id
export const remove = (id) => {
    const revenue = Revenue.findByIdAndDelete(id).exec();
    return revenue;
}