import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAccountStatsAction} from "../../redux/slices/accountStatistics/accountStatisticSlices"
import DisabledButton from "../../components/DisabledButton";
import {useHistory} from "react-router-dom";

//dispatch
const AccountSum = ()=> {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchAccountStatsAction())
  },[dispatch]);

/*
  const account = useSelector(state=>state.account);
  const {loading,accountDetail,appErr,serverErr} = account;*/

  return (
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
                              Total Expenses
                            </span>
                          </div>
                          <h1 class="mb-4"></h1>
                          <p class="mb-0">
                            <span>Number of Transactions</span>
                            <span class="text-danger ms-1">
                              <span></span>
                            </span>
                          </p>

                          <p class="mb-0">
                            <span>Minimum Transactions</span>
                            <span class="text-danger ms-1">
                              <span></span>
                            </span>
                          </p>

                          <p class="mb-0">
                            <span>Maximum Transactions</span>
                            <span class="text-danger ms-1">
                              <span></span>
                            </span>
                          </p>

                          <p class="mb-0">
                            <span>Average Transactions</span>
                            <span class="text-danger ms-1">
                              <span></span>
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
                              Total Income
                            </span>
                          </div>
                          <h1 class="mb-4"></h1>

                          <p class="mb-0">
                            <span>Number of Transactions</span>
                            <span class="text-danger ms-1">

                            </span>
                          </p>

                          <p class="mb-0">
                            <span>Minimum Transactions</span>
                            <span class="text-danger ms-1">

                            </span>
                          </p>

                          <p class="mb-0">
                            <span>Maximum Transactions</span>
                            <span class="text-danger ms-1">

                            </span>
                          </p>

                          <p class="mb-0">
                            <span>Average Transactions</span>
                            <span class="text-danger ms-1">

                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

  )
}

export default AccountSum;