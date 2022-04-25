import React, { useEffect, useState } from "react";
import moneySVG from "../../img/money.svg";
import {useFormik} from "formik";
import{ useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { deleteExpAction, updateExpAction } from "../../redux/slices/expenses/expensesSlices";
import DisabledButton from "../../components/DisabledButton";
import { useHistory } from "react-router-dom";
import './EditExpense.scss';
import addIncomeImg from "../../img/logo.png";
import bg from "../../img/addExpenseBg.jpeg";

const formSchema = Yup.object({
  title: Yup.string().required('title is required '),
  description: Yup.string().required('description is required'),
  amount: Yup.number().required('amount is required'),
});

const formSchema2 = Yup.object({
  title: Yup.string().required('title is required '),
  description: Yup.string().required('description is required'),
  amount: Yup.number().required('amount is required'),
});


const EditExpense = ({location: {
  state: { expense },
  },
}) => {
  // console.log(expense);
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues:{
        title: expense?.title,
        description: expense?.description,
        amount: expense?.amount
      },
    onSubmit: values => {
      const data = {
        ...values,
        id: expense?._id,
      };
      dispatch(updateExpAction(data));
      alert("Expense updated!");
    },
    validationSchema: formSchema,
  }); 

  const formik2 = useFormik({
    initialValues:{
        title: expense?.title,
        description: expense?.description,
        amount: expense?.amount
      },
    onSubmit: values => {
      const data = {
        ...values,
        id: expense?._id,
      };
      dispatch(deleteExpAction(data));
      alert("Expense deleted!");
    },
    validationSchema: formSchema,
  });

  //get data form store
  const expenseData = useSelector(state => state.expenses);
  // console.log(expenseData);
  const {appErr, serverErr, expenseUpdated, loading, isExpUpdated, isExpDeleted} = expenseData;
  //Redirect
useEffect(() => {
  if(isExpUpdated) history.push("/userExpense");
}, [isExpUpdated, dispatch]);

useEffect(() => {
  if(isExpDeleted) history.push("/userExpense");
}, [isExpDeleted, dispatch]);

  return (
      <div className="AddExpense">
        <img src={bg} className="AddExpenseBg"></img>
        <img src={addIncomeImg} className="addIncome"></img>
        <div className="updateForm">
              <form onSubmit={formik.handleSubmit}>
              <div class="segment">
                  <h1>Edit Expense</h1>
              </div>
                {/* Display Err */}
                {appErr || serverErr? <div>Error</div> : null}
                <label>
                  <input
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleBlur("title")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Title"
                  />
                </label>
                {/* Err */}
                <div className="text-light mb-4 text-center">
                  {formik.touched.title && formik.errors.title}
                </div>
                <label>
                  <input
                    value={formik.values.description}
                    onChange={formik.handleChange("description")}
                    onBlur={formik.handleBlur("description")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Description"
                  />
                </label>
                {/* Err */}
                <div className="text-light mb-4 text-center">
                {formik.touched.description && formik.errors.description}
                </div>
                <label>
                  <input
                    value={formik.values.amount}
                    onChange={formik.handleChange("amount")}
                    onBlur={formik.handleBlur("amount")}
                    className="form-control"
                    type="number"
                    placeholder="Enter Amount"
                  />
                </label>
                {/* Err */}
                <div className="text-light mb-4 text-center">
                {formik.touched.amount && formik.errors.amount}
                </div>
                {loading ? (
                  <DisabledButton />
                ) : (
                  <button type="submit" class="btnAddExpense">
                  Update
                </button>
                )}
              </form>
              <form onSubmit={formik2.handleSubmit}>
                <button type="submit" className="btnAddExpense">
                  Delete
                </button>
              </form>
                            
              </div>
        </div>
  );
};

export default EditExpense;