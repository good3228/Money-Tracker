import React, { useEffect, useState } from "react";
import{ useDispatch, useSelector } from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import moneySVG from "../../img/money.svg";
import { createIncAction } from "../../redux/slices/incomes/incomesSlices";
import './AddIncome.scss';
import addIncomeImg from '../../img/logo.png';
const formSchema = Yup.object({
  title: Yup.string().required('title is required '),
  description: Yup.string().required('description is required'),
  amount: Yup.number().required('amount is required'),
});


const AddIncome = () => {
    //dispatch events
    const dispatch = useDispatch();

    const formik = useFormik({
      initialValues:{
          title:"",
          description:"",
          amount:""
      },
      onSubmit: values => {
          dispatch(createIncAction(values));
          alert("New income added");
      },
      validationSchema: formSchema,
    });

  return (
    <>
      <div className="AddIncome">
        <img src={addIncomeImg} className="addIncomeBg"></img>
        <form onSubmit={formik.handleSubmit}>
          <div class="segment">
            <h1>Add Income</h1>
          </div>
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
          <div className="text-light mb-3">
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
          <div className="text-light mb-3">
            {/* Err */}
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
          <div className="text-light mb-3">
            {formik.touched.amount && formik.errors.amount}
          </div>
          <button class="btnAddIncome" type="submit">
            Add Income
          </button>

          {/* <div class="segment">
            <button class="unit" type="button">
              <i class="icon ion-md-arrow-back"></i>
            </button>
            <button class="unit" type="button">
              <i class="icon ion-md-bookmark"></i>
            </button>
            <button class="unit" type="button">
              <i class="icon ion-md-settings"></i>
            </button>
          </div> */}
        </form>
      </div>
    </>
  );
};

export default AddIncome;
