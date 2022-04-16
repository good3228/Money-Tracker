import * as userService from './../services/users-service.js'

//these are the two functions which set up the different response
const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error);
}
const setSuccessResponse = (obj,response) => {
    response.status(200);
    response.json(obj);
}

//get the data from request body and save to database
export const create_new_user = async (request,response) => {
    const {email,password,fullname} = request?.body;
    try{
        const email = request.body.email;
        if(User.findOne({email: req.body.email}))
        {
            setErrorResponse
        }
        const user = await tasksService.save(response.body);
        setSuccessResponse(user,response)
    }catch(error) {
        setErrorResponse(error,response)
    }
}




