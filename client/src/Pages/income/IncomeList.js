import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import ContentDetails from "../../components/ContentDetails";
import { fetchAllIncAction } from "../../redux/slices/incomes/incomesSlices";

const IncomeList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllIncAction(1));
  },[dispatch]);

  //get all incomes

  const allIncomes = useSelector(state => state?.revenue);
  const{loading, appErr, serverErr, incomesList} = allIncomes;


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
                <h6 className="mb-0 fs-3">Recent Income Records</h6>
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
                    incomesList?.length <= 0 ? <h1>No Income Found</h1>: incomesList?.map(inc=>(
                      <ContentDetails item = {inc} key = {inc?._id} />
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

export default IncomeList;