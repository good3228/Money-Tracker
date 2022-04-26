import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import ContentDetails from "../../components/IncomeContentDetails";
import { fetchAllIncAction } from "../../redux/slices/incomes/incomesSlices";
import "./IncomeList.scss";
import bg from "../../img/profileBg.jpg";
import { useHistory } from "react-router-dom";
import navigate from "../../utils/nav";

const formSchema = Yup.object({
  keyword: Yup.string().required('keyword is required '),
});


//  fetch all data
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
      <section className="py-4">
        <img src={bg} className="ExpensesListBg"></img>
        <div className="container-fluid text-center">
          {/* <div className="position-relative rounded-2">
            <a className="position-absolute top-0 end-0 mt-4 me-4" href="#"></a>
            <div className="pt-8 px-8 mb-8"> */}
              <h3><strong>Recent Income Records</strong></h3>
            {/* </div> */}
            <button type = "submit"
              onClick={() => navigate(history, "income-search", "")}
              className="btn btn-outline-primary my-3"
              >Search with Title</button>
            <table className="table  bg-white">
              <thead>
                <tr className="table-active bg-primary">
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
        {/* </div>
        <div
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

export default IncomeList;
