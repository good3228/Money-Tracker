import React from "react";
import moneySVG from "../../img/money.svg";
import {useFormik} from "formik";
import{ useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { deleteIncAction, updateIncAction } from "../../redux/slices/incomes/incomesSlices";
import DisabledButton from "../../components/DisabledButton";


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
      alert("Incomes updated!");
    },
    validationSchema: formSchema,
  });

  //get data form store
  const incomeData = useSelector(state => state.incomes);
  const {appErr, serverErr, incomeUpdated, loading} = incomeData;
  return (
    <section className="py-5 bg-secondary vh-100">
      <div className="container text-center">
        <a className="d-inline-block mb-5">
          <img
            className="img-fluid"
            src={moneySVG}
            alt="SVGeXPENSES"
            width="200"
          />
        </a>
        <div className="row mb-4">
          <div className="col-12 col-md-8 col-lg-5 mx-auto">
            <div className="p-4 shadow-sm rounded bg-white">
              <form onSubmit={formik.handleSubmit}>
                <span className="text-muted">
                </span>
                <h2 className="mb-4 fw-light">  
                </h2>
                {/* Display Err */}
                {appErr || serverErr? <div>Error</div> : null}
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleBlur("title")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Title"
                  />
                </div>
                {/* Err */}
                <div className="text-danger mb-3">
                  {formik.touched.title && formik.errors.title}
                </div>
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.description}
                    onChange={formik.handleChange("description")}
                    onBlur={formik.handleBlur("description")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Description"
                  />
                </div>
                {/* Err */}
                <div className="text-danger mb-3">
                {formik.touched.description && formik.errors.description}
                </div>
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.amount}
                    onChange={formik.handleChange("amount")}
                    onBlur={formik.handleBlur("amount")}
                    className="form-control"
                    type="number"
                    placeholder="Enter Amount"
                  />
                </div>
                {/* Err */}
                <div className="text-danger mb-3">
                {formik.touched.amount && formik.errors.amount}
                </div>
                {loading ? (
                  <DisabledButton />
                ) : (
                  <button type="submit" className="btn btn-primary mb-4 w-100">
                  Update
                </button>
                )}
              </form>
              <form onSubmit={formik2.handleSubmit}>
                <button type="submit" className="btn btn-primary mb-4 w-100">
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditIncome;