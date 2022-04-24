import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import navigate from "../../utils/nav";
import AccountSum from './accountSum';
import Pie from './Pie';
import bg from '../../img/profileBg.jpg';
import './Profile.scss';
import dateFormatter from "../../utils/dateFormatter";

const Profile = () => {
  const history = useHistory();

  const users = useSelector((state) => state?.users);
  const { userLoading, userAppErr, userServerErr, userAuth } = users;


  return (
    <>
    <section className="py-5">
        <div className="container">
            <div className="d-flex mb-6 align-items-center infobox">
              <img
                className="img-fluid me-4 rounded-2"
                src="https://27jts3o00yy49vo2y30wem91-wpengine.netdna-ssl.com/wp-content/uploads/2018/05/ASSET-USER-ADMIN-300x300.png"
                alt=""
              />
              <div className="info">
                <div className="name">{userAuth?.fullname}</div>
                <div className="text-secondary mail">
                  {userAuth?.email}
                </div>
                <div className="text-secondary joinDate">
                  Joined Date: {dateFormatter(userAuth?.createdAt? (userAuth?.createdAt) : null)}
                </div>
              </div>
              <div><Pie></Pie></div>
            
            
            
            </div>
            <AccountSum></AccountSum>
            {/* <div className="d-flex align-items-center justify-content-center">
              <button
                onClick={() => navigate(history, "userExpense", "")}
                className="btn me-4 w-100 btn-outline-danger d-flex align-items-center justify-content-center"
              >
                <span>View Expenses History</span>
              </button>
              <button
                onClick={() => navigate(history, "userIncome", "")}
                className="btn w-100 btn-outline-primary d-flex align-items-center justify-content-center"
              >
                <span>View Income History</span>
              </button>
            </div> */}
        </div>
      </section>




    {/* ORG */}

      {/* <section className="py-5">
        <img src={bg} className="profileBg"></img>
        <div className="container">
          <div className="position-relative p-8  rounded-2">
            <div className="d-flex mb-6 align-items-center info">
              <img
                className="img-fluid me-4 rounded-2"
                src="https://27jts3o00yy49vo2y30wem91-wpengine.netdna-ssl.com/wp-content/uploads/2018/05/ASSET-USER-ADMIN-300x300.png"
                alt=""
              />
              <div>
                <h6 className="fw-bold mb-0">
                  <div className="name">{userAuth?.fullname}</div>
                  <div className="badge ms-2 bg-primary-light text-primary email">
                    {userAuth?.email}
                    <br />
                    {/* {profile?.expenses?.length + profile?.income?.length}{" "} */}
                    {/* Records Created */}
                  {/* </div>
                </h6>
                <div className="badge ms-2 bg-primary-light text-primary joinDate">
                  JOINED DATE: {dateFormatter(userAuth?.createdAt? (userAuth?.createdAt) : null)}
                </div>
                <br />
              </div>
            </div>

            <p className="mb-8"> </p>
            <AccountSum></AccountSum>
            <div className="d-flex align-items-center justify-content-center">
              <button
                onClick={() => navigate(history, "userExpense", "")}
                className="btn me-4 w-100 btn-outline-danger d-flex align-items-center justify-content-center"
              >
                <span>View Expenses History</span>
              </button>
              <button
                onClick={() => navigate(history, "userIncome", "")}
                className="btn w-100 btn-outline-primary d-flex align-items-center justify-content-center"
              >
                <span>View Income History</span>
              </button>
            </div>
          </div>
        </div>
      </section> */}
    </> 
  );
};

export default Profile;
