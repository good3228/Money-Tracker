import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import ContentDetails from "../../components/IncomeContentDetails";
import { fetchAllIncAction } from "../../redux/slices/incomes/incomesSlices";
import "./IncomList.scss";
import bg from "../../img/profileBg.jpg";
import { useHistory } from "react-router-dom";
import navigate from "../../utils/nav";

const formSchema = Yup.object({
  keyword: Yup.string().required('keyword is required '),
});

const IncomeList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllIncAction(1));
  }, [dispatch]);

  //get all incomes

  const allIncomes = useSelector((state) => state?.incomes);
  const { loading, appErr, serverErr, incomesList, keyword } = allIncomes;

  return (
    <>
      <section className="py-6">
        <img src={bg} className="ExpensesListBg"></img>
        <div className="container-fluid">
          <div className="position-relative border rounded-2">
            <a className="position-absolute top-0 end-0 mt-4 me-4" href="#"></a>
            <div className="pt-8 px-8 mb-8">
              <h6 className="mb-0 fs-3">Recent Income Records</h6>
            </div>
            <button type = "submit"
              onClick={() => navigate(history, "income-search", "")}
              >To the Search Page</button>
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
                {loading ? (
                  <h1>Loading</h1>
                ) : appErr || serverErr ? (
                  <div>Error</div>
                ) : incomesList?.length <= 0 ? (
                  <h1>No Income Found</h1>
                ) : (
                  incomesList?.map((inc) => (
                    <ContentDetails item={inc} key={inc?._id} />
                  ))
                )}
              </tbody>
            </table>
            <div className="botLine"></div>
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

export default IncomeList;
