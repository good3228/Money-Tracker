import * as revenueService from './../services/revenues-service.js'

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