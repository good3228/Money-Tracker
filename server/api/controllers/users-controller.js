import * as userService from './../services/users-service.js'
import expressAsyncHandler from 'express-async-handler'
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
export const create_new_user =
    async (request,response) => {
        const {email,password,fullname} = request?.body;
        const userExist = await userService.searchOne({email:email});
        if(userExist!==null)
        {
            response.status(500);
            response.send("User already exists!")
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





