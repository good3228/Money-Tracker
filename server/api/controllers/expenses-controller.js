import * as expenseService from './../services/expenses-service.js'
import Expense from '../models/Expense.js';

//these are the two functions which set up the different response
const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error);
}
const setSuccessResponse = (obj,response) => {
    response.status(200);
    response.json(obj);
}

export const create_expense = async (request, response) => {
    // const {title, description, amount} = request.body;
    // console.log(request);
    try{
        // const expense = await Expense.create({
        //     title,
        //     description,
        //     amount,
        //     user: request?.user?._id
        // })
        const payload = request.body;
        const expense = await expenseService.save(payload)
        setSuccessResponse(expense,response)
    }catch(error){
        setErrorResponse(error,response)
    }
}

export const fetch_userExpense = async (request, response) => {
    try{
        const id = request.params.id;
        const expense = await expenseService.get(id);
        setSuccessResponse(expense,response)
    }catch(error){
        setErrorResponse(error,response)
    }
}
export const fetch_expense_record = async (request, response) => {
    try{
        const userid = request.params.userid;
        const record = await expenseService.getRecord(userid);
        // const title = request.query.title;
        // const record = await Expense.find({
        //     title:{ $regex: new RegExp(title)},
        // }).sort('-createdAt');
        // if(record || record.length === []){
            setSuccessResponse(record,response);
        // }
    }catch(error){
        setErrorResponse(error,response)
    }
}
export const update_userExpense = async (request,response) => {
    try{
        const id = request.params.id;
        const updated = {...request.body};
        updated.id = id;
        const updatedExpense = await expenseService.update(updated);
        setSuccessResponse(updatedExpense,response)
    }catch(error){
        setErrorResponse(error,response)
    }
}

export const delete_userExpense = async (request,response) => {
    try{
        const id = request.params.id;
        const expense = await expenseService.remove(id)
        setSuccessResponse({message:`Successfully deleted expense ${id}`},response)
    }catch(error){
        setErrorResponse(error,response)
    }
}

export const search_expense_record = async (request, response) => {
    try{
        const userid = request.params.userid;
        // const record = await expenseService.getRecord(userid);
        const title = request.query.title;
        const searchExpense = await Expense.find({
            "user":userid,
            $or:[
                {title:{ $regex: new RegExp(title)}}
            ]
        }).sort('-createdAt');
        if(searchExpense || searchExpense.length === []){
            setSuccessResponse(searchExpense,response);
        }
    }catch(error){
        setErrorResponse(error,response)
    }
}