import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAccountStatsAction} from "../../redux/slices/accountStatistics/accountStatisticSlices"
import DisabledButton from "../../components/DisabledButton";
import {useHistory} from "react-router-dom";
import Graph from "../../components/pieChart"

//dispatch
const AccountSum = ()=> {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchAccountStatsAction())
  },[dispatch]);

  const statistic = useSelector(state=>state.statistic)

   const {accountDetails,appErr,loading,serverErr} = statistic;

  return (
                <>
                <Graph revenue= {accountDetails?.revenueStats[0]?.totalRev} expenses={accountDetails?.expensesStats[0]?.totalExp} />
                <div class="row">
                      <div class="col-12 col-md-6 mb-6">
                        <div class="p-8 border rounded-2">
                          <div class="d-flex mb-6 align-items-start justify-content-between">
                            <span
                              class="d-inline-flex align-items-center justify-content-center bg-light-light rounded-2"
                              style={{ width: "40px", height: "40px" }}
                            ></span>
                            {/* Expenses Start */}
                            <span class="badge fs-2 bg-light text-danger">
                              Total Expenses:
                            </span>
                          </div>
                          {!appErr&&!serverErr ?(<h1 class="mb-4">{accountDetails?.expensesStats[0]?.totalExp}</h1>):<h1 class="mb-4">0</h1>}

                          <p class="mb-0">
                            <span>Number of Transactions:</span>
                            <span class="text-danger ms-1">
                              {!appErr&&!serverErr ?(<span>{accountDetails?.expensesStats[0]?.totalRecords}</span>):<span>0</span>}
                            </span>
                          </p>

                          <p class="mb-0">
                            <span>Minimum Transactions:</span>
                            <span class="text-danger ms-1">
                              {!appErr&&!serverErr ?(<span>{accountDetails?.expensesStats[0]?.minExp}</span>):<span>0</span>}
                            </span>
                          </p>

                          <p class="mb-0">
                            <span>Maximum Transactions:</span>
                            <span class="text-danger ms-1">
                              {!appErr&&!serverErr ?(<span>{accountDetails?.expensesStats[0]?.maxExp}</span>):<span>0</span>}
                            </span>
                          </p>

                          <p class="mb-0">
                            <span>Average Transactions:</span>
                            <span class="text-danger ms-1">
                              {!appErr&&!serverErr ?(<span>{accountDetails?.expensesStats[0]?.averageExp}</span>):<span>0</span>}
                            </span>
                          </p>
                        </div>
                      </div>
                    <div class="col-12 col-md-6 mb-6">
                        <div class="p-8 border rounded-2">
                          <div class="d-flex mb-6 align-items-start justify-content-between">
                            <span
                              class="d-inline-flex align-items-center justify-content-center bg-danger-light rounded-2"
                              style={{ width: "40px", height: "40px" }}
                            ></span>

                            {/* Income Start */}
                            <span class="badge fs-2 bg-primary-light text-primary">
                              Total Income:
                            </span>
                          </div>
                          {!appErr&&!serverErr ?(<h1 class="mb-4">{accountDetails?.revenueStats[0]?.totalRev}</h1>):<h1 class="mb-4">0</h1>}

                          <p class="mb-0">
                            <span>Number of Transactions:</span>
                            {!appErr&&!serverErr ?(<span class="text-danger ms-1">{accountDetails?.revenueStats[0]?.totalRecords}</span>):<span class="text-danger ms-1">0</span>}
                          </p>

                          <p class="mb-0">
                            <span>Minimum Transactions:</span>
                            {!appErr&&!serverErr ?(<span class="text-danger ms-1">{accountDetails?.revenueStats[0]?.minRev}</span>):<span class="text-danger ms-1">0</span>}
                          </p>

                          <p class="mb-0">
                            <span>Maximum Transactions:</span>
                            {!appErr&&!serverErr ?(<span class="text-danger ms-1">{accountDetails?.revenueStats[0]?.maxRev}</span>):<span class="text-danger ms-1">0</span>}
                          </p>

                          <p class="mb-0">
                            <span>Average Transactions:</span>
                            {!appErr&&!serverErr ?(<span class="text-danger ms-1">{accountDetails?.revenueStats[0]?.averageRev}</span>):<span class="text-danger ms-1">0</span>}
                          </p>
                        </div>
                      </div>
                    </div>
                    </>

  )
}

export default AccountSum;