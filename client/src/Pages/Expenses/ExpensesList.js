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


//  fetch all data
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
      <section className="py-4">
        <img src={bg} className="ExpensesListBg"></img>
        <div className="container-fluid text-center">
          {/* <div className="position-relative rounded-2"> */}
            {/* <a className="position-absolute top-0 end-0 mt-4 me-4" href="#"></a> */}
            {/* <div className> */}
              <h3><strong>Recent Consumption Records</strong></h3>
            {/* </div> */}
            {/* <form onSubmit={formik.handleSubmit}> */}
              {/* <input type="text"
                 value={formik.values.keyword}
                 onChange={formik.handleChange("keyword")}
                 onBlur={formik.handleBlur("keyword")}
               placeholder="search title..."> 
              </input> */}
              <button type = "submit"
              onClick={() => navigate(history, "expanse-search", "")}
              className="btn btn-outline-danger my-3"
              >Search with Title</button>
              {/* </form> */}
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
                ) : expensesList?.length <= 0 ? (
                  <h1>No Expense Found</h1>
                ) : (
                  expensesList?.map((exp) => (
                    // <div>{exp?.title}</div>
                    <ContentDetails item={exp} key={exp?._id} />
                  ))
                )}
              </tbody>
              
            </table>
            {/* <div className="botLine"></div> */}
          {/* </div> */}
        </div>
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

export default ExpensesList;