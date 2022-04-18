import * as userService from './../services/users-service.js'
//these are the two functions which set up the different response
const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error);
}
const setClientErrorResponse = (error, response) => {
    response.status(401);
    response.json(error);
}
const setSuccessResponse = (obj,response) => {
    response.status(200);
    response.json(obj);
}

//get the data from request body and save to database
export const create_new_user = async (request,response) => {
        const {email,password,fullname} = request?.body;
        const userExist = await userService.searchOne({email:email});
        if(userExist!==null)
        {
           setErrorResponse("User already exists!",response)
        }
        else
        {
            try{
                const user = await userService.save(request.body);
                setSuccessResponse(user,response)
            }catch(error) {
                setErrorResponse(error,response)
            }
        }
}


export const getUser = async (request,response) => {
        const {email,password} = request?.body;
        const userValid = await userService.searchOne({email,password});
        if(userValid===null)
        {
            setClientErrorResponse("username or password wrong!",response);
        }
        else
        {
            setSuccessResponse(userValid,response);
        }
}


