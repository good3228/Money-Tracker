import Expense from './../models/Expense.js'


export const save = (newExpense)=>{
    const expense = new Expense(newExpense);
    return expense.save();
}


export const get = (expenseId) => {
    const expense = Expense.findById(expenseId).exec();
    return expense;
}

export const getRecord = (userid) => {
    const expense = Expense.find({user:userid}).exec();
    return expense;
}

export const update = (updatedExpense) => {
    updatedExpense.updatedAt = new Date()
    const expense = Expense.findByIdAndUpdate(updatedExpense.id,updatedExpense,{new: true}).exec();
    return expense;
}

//function to delete a specific income by id
export const remove = (id) => {
    const expense = Expense.findByIdAndDelete(id).exec();
    return expense;
}