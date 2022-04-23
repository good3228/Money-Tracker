import React, {useEffect,useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import ContentDetails from "../../components/ContentDetails";
import { fetchAllExpAction, searchExpAction } from "../../redux/slices/expenses/expensesSlices";
import bg from "../../img/profileBg.jpg";
import './ExpensesList.scss';
import { useHistory } from "react-router-dom";
import navigate from "../../utils/nav";

const formSchema = Yup.object({
  keyword: Yup.string().required('keyword is required '),
});

const ExpenseSearch = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchExpAction(1));
  },[dispatch]);

  const history = useHistory();

  //get all expenses

  const allExpenses = useSelector(state => state?.expenses);
  const{loading, appErr, serverErr, expensesList, keyword} = allExpenses;

  // console.log(loading, appErr, serverErr, expensesList);

  const formik = useFormik({
    initialValues:{
        keyword: ""
      },
      onSubmit: (values) => {
        dispatch(searchExpAction(values));
        // console.log(values);
      },
    validationSchema: formSchema,
  }); 

  return (
    <>
      <section className="py-6">
        <img src={bg} className="ExpensesListBg"></img>
        <div className="container-fluid">
          <div className="position-relative border rounded-2">
            <a className="position-absolute top-0 end-0 mt-4 me-4" href="#"></a>
            <div className="pt-8 px-8 mb-8">
              <h6 className="mb-0 fs-3">Recent Consumption Records</h6>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <input type="text"
                 value={formik.values.keyword}
                 onChange={formik.handleChange("keyword")}
                 onBlur={formik.handleBlur("keyword")}
               placeholder="search title..."> 
              </input>
              <button type = "submit">search</button>
              </form>
              <button type = "submit"
                onClick={() => navigate(history, "userExpense", "")}
              >To the Expense History Page</button>
            <table className="table border border-bottom">
              <thead>
                <tr className="table-active">
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Title</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Description</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Amount</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Date</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Action</small>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <h1>Loading</h1>
                ) : appErr || serverErr ? (
                  <div>Error</div>
                ) : keyword?.length <= 0 ? (
                  <h1>No Expense Found</h1>
                ) : (
                  keyword?.map((exp) => (
                    // <div>{exp?.title}</div>
                    <ContentDetails item={exp} key={exp?._id} />
                  ))
                )}
              </tbody>
              
            </table><div className="botLine"></div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        ></div>
      </section>
    </>
  );
};

export default ExpenseSearch;