import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountStatsAction } from "../../redux/slices/accountStatistics/accountStatisticSlices";
import DisabledButton from "../../components/DisabledButton";
import { useHistory } from "react-router-dom";
import Graph from "../../components/pieChart";
import navigate from "../../utils/nav";


//dispatch
const Pie = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccountStatsAction());
  }, [dispatch]);

  const statistic = useSelector((state) => state.statistic);

  const { accountDetails, appErr, loading, serverErr } = statistic;

  return (
    <>
        <Graph
          revenue={accountDetails?.revenueStats[0]?.totalRev}
          expenses={accountDetails?.expensesStats[0]?.totalExp}
        />      
    </>
  );
};

export default Pie;
