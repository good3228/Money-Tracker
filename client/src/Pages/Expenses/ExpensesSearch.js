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

//  setting null when into search page
const ExpenseSearch = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchExpAction());
  },[dispatch]);

  const history = useHistory();

  //get all expenses

  const allExpenses = useSelector(state => state?.expenses);
  const{loading, appErr, serverErr, expensesList, keyword} = allExpenses;

  // console.log(loading, appErr, serverErr, expensesList);

  //  get search data
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
      <section className="py-4">
        <img src={bg} className="ExpensesListBg"></img>
        <div className="container-fluid text-center">
          {/* <div className="position-relative border rounded-2">
            <a className="position-absolute top-0 end-0 mt-4 me-4" href="#"></a> */}
            {/* <div className="pt-8 px-8 mb-8"> */}
              <h3><strong>Search Consumption Records</strong></h3>
            {/* </div> */}
            <form onSubmit={formik.handleSubmit}>
              <input type="text"
                 value={formik.values.keyword}
                 onChange={formik.handleChange("keyword")}
                 onBlur={formik.handleBlur("keyword")}
                 placeholder="search title..."
                 className="py-1"> 
              </input>
              <button type = "submit" className="btn-search bg-danger text-white">Search</button>
              <button type = "submit"
                onClick={() => navigate(history, "userExpense", "")}
                className="btn-back btn btn-outline-danger my-3"
              >Cancel Search</button>
              </form>
            <table className="table bg-white">
              <thead>
                <tr className="table-active bg-danger">
                  <th scope="col">
                    <button className="btn d-flex text-uppercase w-100 justify-content-center text-white">
                      <b>Title</b>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex text-uppercase w-100 justify-content-center text-white">
                      <b>Description</b>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex text-uppercase w-100 justify-content-center text-white">
                      <b>Amount</b>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex text-uppercase w-100 justify-content-center text-white">
                      <b>Date</b>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex text-uppercase w-100 justify-content-center text-white">
                      <b>Action</b>
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
        {/* </div> */}
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        ></div> */}
      </section>
    </>
  );
};

export default ExpenseSearch;