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