import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountStatsAction } from "../../redux/slices/accountStatistics/accountStatisticSlices";
import DisabledButton from "../../components/DisabledButton";
import { useHistory } from "react-router-dom";
import Graph from "../../components/pieChart";
import './accountSum.scss';
//dispatch
const AccountSum = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccountStatsAction());
  }, [dispatch]);

  const statistic = useSelector((state) => state.statistic);

  const { accountDetails, appErr, loading, serverErr } = statistic;

  return (
    <>
      <div className="box">
        <Graph
          revenue={accountDetails?.revenueStats[0]?.totalRev}
          expenses={accountDetails?.expensesStats[0]?.totalExp}
        />
      </div>
      <div className="row">
        <div className="col-12 col-md-6 mb-6">
          <div className="p-8 border-dark border border-bottom-0 rounded-2">
            <div className="d-flex mb-6 align-items-start justify-content-between">
              <span
                className="d-inline-flex align-items-center justify-content-center bg-light-light rounded-2"
                style={{ width: "40px", height: "40px" }}
              ></span>
              {/* Expenses Start */}
              <span className="badge fs-2 text-danger">
                Total Expenses:
              </span>
            </div>
            {!appErr && !serverErr ? (
              <h1 className="mb-4">
                &nbsp; ${accountDetails?.expensesStats[0]?.totalExp}
              </h1>
            ) : (
              <h1 className="mb-4">$0</h1>
            )}

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
              <span>&nbsp; Minimum Transactions:</span>
              <span className="text-danger ms-1">
                {!appErr && !serverErr ? (
                  <span>${accountDetails?.expensesStats[0]?.minExp}</span>
                ) : (
                  <span>0</span>
                )}
              </span>
            </h4>

            <h4 className="mb-0">
              <span>&nbsp; Maximum Transactions:</span>
              <span className="text-danger ms-1">
                {!appErr && !serverErr ? (
                  <span>${accountDetails?.expensesStats[0]?.maxExp}</span>
                ) : (
                  <span>0</span>
                )}
              </span>
            </h4>

            <h4 className="mb-0">
              <span>&nbsp; Average Transactions:</span>
              <span className="text-danger ms-1">
                {!appErr && !serverErr ? (
                  <span>${accountDetails?.expensesStats[0]?.averageExp}</span>
                ) : (
                  <span>0</span>
                )}
              </span>
            </h4>
            <br></br>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-6">
          <div className="p-8 border-dark border border-bottom-0 rounded-2">
            <div className="d-flex mb-6 align-items-start justify-content-between">
              <span
                className="d-inline-flex align-items-center justify-content-center bg-danger-light rounded-2"
                style={{ width: "40px", height: "40px" }}
              ></span>

              {/* Income Start */}
              <span className="badge fs-2 bg-primary-light text-primary">
                Total Income:
              </span>
            </div>
            {!appErr && !serverErr ? (
              <h1 className="mb-4">
                &nbsp; ${accountDetails?.revenueStats[0]?.totalRev}
              </h1>
            ) : (
              <h1 className="mb-4">0</h1>
            )}

            <h4 className="mb-0">
              <span>&nbsp; Number of Transactions:</span>
              {!appErr && !serverErr ? (
                <span className="text-danger ms-1">
                  {accountDetails?.revenueStats[0]?.totalRecords}
                </span>
              ) : (
                <span className="text-danger ms-1">0</span>
              )}
            </h4>

            <h4 className="mb-0">
              <span>&nbsp; Minimum Transactions:</span>
              {!appErr && !serverErr ? (
                <span className="text-danger ms-1">
                  ${accountDetails?.revenueStats[0]?.minRev}
                </span>
              ) : (
                <span className="text-danger ms-1">0</span>
              )}
            </h4>

            <h4 className="mb-0">
              <span>&nbsp; Maximum Transactions:</span>
              {!appErr && !serverErr ? (
                <span className="text-danger ms-1">
                  ${accountDetails?.revenueStats[0]?.maxRev}
                </span>
              ) : (
                <span className="text-danger ms-1">0</span>
              )}
            </h4>

            <h4 className="mb-0">
              <span>&nbsp; Average Transactions:</span>
              {!appErr && !serverErr ? (
                <span className="text-danger ms-1">
                  ${accountDetails?.revenueStats[0]?.averageRev}
                </span>
              ) : (
                <span className="text-danger ms-1">0</span>
              )}
            </h4>
            <br></br>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSum;
