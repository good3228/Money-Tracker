import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountStatsAction } from "../../redux/slices/accountStatistics/accountStatisticSlices";
import DisabledButton from "../../components/DisabledButton";
import { useHistory } from "react-router-dom";
import Graph from "../../components/pieChart";
import './accountSum.scss';
import navigate from "../../utils/nav";


//dispatch
const AccountSum = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchAccountStatsAction());
  }, [dispatch]);

  const statistic = useSelector((state) => state.statistic);

  const { accountDetails, appErr, loading, serverErr } = statistic;

  return (
    <>
      <div className="row">
          <div className="col box b1">
            <div className="">
              {/* <span
                className="d-inline-flex align-items-center justify-content-center bg-light-light rounded-2"
                style={{ width: "40px", height: "40px" }}
              ></span> */}
              {/* Expenses Start */}
              <div className="badge fs-2 text-danger">
                Total Expenses: 
                {!appErr && !serverErr ? (
                  <span className="mb-4">
                    &nbsp;${accountDetails?.expensesStats[0]?.totalExp}
                  </span>
                ) : (
                  <span className="mb-4"> $0</span>
                )}
                </div>
            </div>

            <h4 className="mb-0">
              <span>&nbsp; Number of Transactions:</span>
              <span className="text-danger ms-1">
                {!appErr && !serverErr ? (
                  <span>{accountDetails?.expensesStats[0]?.totalRecords}</span>
                ) : (
                  <span>0</span>
                )}
              </span>
            </h4>

            <h4 className="mb-0">
              <span>&nbsp; Min Expense:</span>
              <span className="text-danger ms-1">
                {!appErr && !serverErr ? (
                  <span>${accountDetails?.expensesStats[0]?.minExp}</span>
                ) : (
                  <span>0</span>
                )}
              </span>
            </h4>

            <h4 className="mb-0">
              <span>&nbsp; Max Expense:</span>
              <span className="text-danger ms-1">
                {!appErr && !serverErr ? (
                  <span>${accountDetails?.expensesStats[0]?.maxExp}</span>
                ) : (
                  <span>0</span>
                )}
              </span>
            </h4>

            <h4 className="mb-0">
              <span>&nbsp; Avg Expense:</span>
              <span className="text-danger ms-1">
                {!appErr && !serverErr ? (
                  <span>${accountDetails?.expensesStats[0]?.averageExp}</span>
                ) : (
                  <span>0</span>
                )}
              </span>
            </h4>
            <br></br>
            <button
                onClick={() => navigate(history, "userExpense", "")}
                className="btn w-100 btn-outline-danger d-flex align-items-center justify-content-center"
              >
                <span>View Expenses History</span>
              </button>
          </div>
        


        
        <div className="col box b2">
          <div className="">
            {/* <div className=""> */}
              {/* <span
                className="d-inline-flex align-items-center justify-content-center bg-danger-light rounded-2"
                style={{ width: "40px", height: "40px" }}
              ></span> */}

              {/* Income Start */}
              <span className="badge fs-2 text-primary">
                Total Income:
              
            
            {!appErr && !serverErr ? (
              <span className="mb-4">
                &nbsp;${accountDetails?.revenueStats[0]?.totalRev}
              </span>
            ) : (
              <span className="mb-4">$0</span>
            )}
            </span>

            <h4 className="mb-0">
              <span>&nbsp; Number of Transactions:</span>
              {!appErr && !serverErr ? (
                <span className="text-primary ms-1">
                  {accountDetails?.revenueStats[0]?.totalRecords}
                </span>
              ) : (
                <span className="text-primary ms-1">0</span>
              )}
            </h4>

            <h4 className="mb-0">
              <span>&nbsp; Min Revenue:</span>
              {!appErr && !serverErr ? (
                <span className="text-primary ms-1">
                  ${accountDetails?.revenueStats[0]?.minRev}
                </span>
              ) : (
                <span className="text-primary ms-1">0</span>
              )}
            </h4>

            <h4 className="mb-0">
              <span>&nbsp; Max Revenue:</span>
              {!appErr && !serverErr ? (
                <span className="text-primary ms-1">
                  ${accountDetails?.revenueStats[0]?.maxRev}
                </span>
              ) : (
                <span className="text-primary ms-1">0</span>
              )}
            </h4>

            <h4 className="mb-0">
              <span>&nbsp; Avg Revenue:</span>
              {!appErr && !serverErr ? (
                <span className="text-primary ms-1">
                  ${accountDetails?.revenueStats[0]?.averageRev}
                </span>
              ) : (
                <span className="text-primary ms-1">0</span>
              )}
            </h4>
            <br></br>
            <button
                onClick={() => navigate(history, "userIncome", "")}
                className="btn w-100 btn-outline-primary d-flex align-items-center justify-content-center"
              >
                <span>View Income History</span>
              </button>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSum;
