import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import ContentDetails from "../../components/ContentDetails";
import { fetchAllExpAction} from "../../redux/slices/expenses/expensesSlices";
import bg from "../../img/profileBg.jpg";
import { useHistory } from "react-router-dom";
import './ExpensesList.scss';
import navigate from "../../utils/nav";

const formSchema = Yup.object({
  keyword: Yup.string().required('keyword is required '),
});

const ExpensesList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllExpAction(1));
  },[dispatch]);

  //get all expenses

  const allExpenses = useSelector(state => state?.expenses);
  const{loading, appErr, serverErr, expensesList
    , keyword
  } = allExpenses;

  // console.log(loading, appErr, serverErr, expensesList);

  // const formik = useFormik({
  //   initialValues:{
  //       keyword: ""
  //     },
  //     onSubmit: (values) => {
  //       dispatch(fetchAllExpAction(values));
  //       // console.log(values);
  //     },
  //   validationSchema: formSchema,
  // }); 

  // useEffect(() => {
  //   if (keyword) {
  //     history.push("/expanse-search/");
  //   }
  // }, [keyword]);

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
            {/* <form onSubmit={formik.handleSubmit}> */}
              {/* <input type="text"
                 value={formik.values.keyword}
                 onChange={formik.handleChange("keyword")}
                 onBlur={formik.handleBlur("keyword")}
               placeholder="search title..."> 
              </input> */}
              <button type = "submit"
              onClick={() => navigate(history, "expanse-search", "")}
              >To the Search Page</button>
              {/* </form> */}
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
                ) : expensesList?.length <= 0 ? (
                  <h1>No Expense Found</h1>
                ) : (
                  expensesList?.map((exp) => (
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

export default ExpensesList;