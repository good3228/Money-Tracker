import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import ContentDetails from "../../components/ContentDetails";
import { fetchAllExpAction } from "../../redux/slices/expenses/expensesSlices";

const ExpensesList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllExpAction(1));
  },[dispatch]);

  //get all expenses

  const allExpenses = useSelector(state => state?.expenses);
  const{loading, appErr, serverErr, expensesList} = allExpenses;

  // console.log(loading, appErr, serverErr, expensesList);
  return (
    <>
        <section className="py-6">
          <div className="container-fluid">
            <div className="position-relative border rounded-2">
              <a
                className="position-absolute top-0 end-0 mt-4 me-4"
                href="#"
              ></a>
              <div className="pt-8 px-8 mb-8">
                <h6 className="mb-0 fs-3">Recent Consumption Records</h6>
              </div>
              <table className="table">
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
                  {loading ? <h1>Loading</h1>: appErr || serverErr ? <div>Error</div>:
                  expensesList?.length <= 0 ? <h1>No Expense Found</h1>: expensesList?.map(exp=>(
                    // <div>{exp?.title}</div>
                    <ContentDetails item = {exp} key = {exp?._id} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
          </div>
        </section>
    </>
  );
};

export default ExpensesList;