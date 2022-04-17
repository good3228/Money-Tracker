import Revenue from './../models/Revenue.js'


export const save = (newRevenue)=>{
    const revenue = new Revenue(newRevenue);
    return revenue.save();
}

export const searchAll = ()=> {
    return Revenue.find();
}

export const get = (userid) => {
    const revenue = Revenue.findById(userid).exec();
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