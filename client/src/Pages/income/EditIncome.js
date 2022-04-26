import React, { useEffect, useState } from "react";
import {useFormik} from "formik";
import{ useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { deleteIncAction, updateIncAction } from "../../redux/slices/incomes/incomesSlices";
import DisabledButton from "../../components/DisabledButton";
import { useHistory } from "react-router-dom";
import './EditIncome.scss';
import addIncomeImg from "../../img/logo.png";
import bg from "../../img/addIncomeBg.jpg";

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


const EditIncome = ({location: {
  state: { revenue },
  },
}) => {
  const dispatch = useDispatch();
  const history = useHistory();


  const formik = useFormik({
    initialValues:{
        title: revenue?.title,
        description: revenue?.description,
        amount: revenue?.amount
      },
    onSubmit: values => {
      const data = {
        ...values,
        id: revenue?._id,
      };
      dispatch(updateIncAction(data));
      alert("Income updated!");
    },
    validationSchema: formSchema,
  }); 

  const formik2 = useFormik({
    initialValues:{
        title: revenue?.title,
        description: revenue?.description,
        amount: revenue?.amount
      },
    onSubmit: values => {
      const data = {
        ...values,
        id: revenue?._id,
      };
      dispatch(deleteIncAction(data));
      alert("Income deleted!");
    },
    validationSchema: formSchema,
  });

  // get data form store
  const incomeData = useSelector(state => state.incomes);
  const {appErr, serverErr, incomeUpdated, loading, isIncUpdated, isIncDeleted} = incomeData;
  // redirect
  useEffect(() => {
    if(isIncUpdated) history.push("/userIncome");
  }, [isIncUpdated, dispatch]);
  
  useEffect(() => {
    if(isIncDeleted) history.push("/userIncome");
  }, [isIncDeleted, dispatch]);

  return (
    <div className="AddIncome">
        <img src={bg} className="AddIncomeBg"></img>
        <img src={addIncomeImg} className="addIncome"></img>
        <div className="updateForm">
              <form onSubmit={formik.handleSubmit}>
              <div class="segment">
                <h1>Edit Income</h1>
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
                  <button type="submit" className="btnAddIncome">
                  Update
                </button>
                )}
              </form>
              <form onSubmit={formik2.handleSubmit}>
                <button type="submit" className="btnAddIncome">
                  Delete
                </button>
              </form>
            </div>
          </div>
  );      
};

export default EditIncome;