import * as revenueService from './../services/revenues-service.js'
import Revenue from '../models/Revenue.js';


//these are the two functions which set up the different response
const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error);
}
const setSuccessResponse = (obj,response) => {
    response.status(200);
    response.json(obj);
}

export const create_revenue = async (request, response) => {
    try{
        const payload = request.body;
        const revenue = await revenueService.save(payload)
        setSuccessResponse(revenue,response)
    }catch(error){
        setErrorResponse(error,response)
    }
}

export const fetch_userRevenue = async (request, response) => {
    try{
        const id = request.params.id;
        const revenue = await revenueService.get(id);
        setSuccessResponse(revenue,response)
    }catch(error){
        setErrorResponse(error,response)
    }
}
export const fetch_revenue_record = async (request, response) => {
    try{
        const userid = request.params.userid;
        const record = await revenueService.getRecord(userid);
        setSuccessResponse(record,response)
    }catch(error){
        setErrorResponse(error,response)
    }
}
export const update_userRevenue = async (request,response) => {
    try{
        const id = request.params.id;
        const updated = {...request.body};
        updated.id = id;
        const updatedRevenue = await revenueService.update(updated);
        setSuccessResponse(updatedRevenue,response)
    }catch(error){
        setErrorResponse(error,response)
    }
}

export const delete_userRevenue = async (request,response) => {
    try{
        const id = request.params.id;
        const revenue = await revenueService.remove(id)
        setSuccessResponse({message:`Successfully deleted revenue ${id}`},response)
    }catch(error){
        setErrorResponse(error,response)
    }
}

export const search_revenue_record = async (request, response) => {
    try{
        const userid = request.params.userid;
        // const record = await expenseService.getRecord(userid);
        const title = request.query.title;
        const searchRevenue = await Revenue.find({
            "user":userid,
            $or:[
                {title:{ $regex: new RegExp(title)}}
            ]
        }).sort('-createdAt');
        if(searchRevenue || searchRevenue.length === []){
            setSuccessResponse(searchRevenue,response);
        }
    }catch(error){
        setErrorResponse(error,response)
    }
}