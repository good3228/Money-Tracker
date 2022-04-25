import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AccountSum from './accountSum';
import Pie from './Pie';
import bg from '../../img/profileBg.jpg';
import './Profile.scss';
import dateFormatter from "../../utils/dateFormatter";

const Profile = () => {
  const history = useHistory();

  const users = useSelector((state) => state?.users);
  const statistic = useSelector((state) => state.statistic);
  const { userLoading, userAppErr, userServerErr, userAuth } = users;
  const { accountDetails, appErr, loading, serverErr } = statistic;


  return (
    <>
    <section className="py-4">
      <img src={bg} className="ProfileBg"></img>
        <div className="container">
          <div className="row align-items-center infobox">
              <div className="col img-max">
                <img
                  className="mx-auto d-block mb-2 float-md-left mr-md-4 img-fluid"
                  src="https://27jts3o00yy49vo2y30wem91-wpengine.netdna-ssl.com/wp-content/uploads/2018/05/ASSET-USER-ADMIN-300x300.png"
                  alt="cannot"
                />
              </div>
              <div className="col info">
                <h3 className="name">{userAuth?.fullname}</h3>
                <div className="text-secondary mail">
                  {userAuth?.email}
                </div>
                <div className="text-secondary joinDate">
                  Joined Date: {dateFormatter(userAuth?.createdAt? (userAuth?.createdAt) : null)}
                </div>
                <br></br>
                <h2
                 className="text-success"><b>
                Net Profit:
                {!appErr && !serverErr ? (
                  <span className="mb-4">
                    &nbsp;${accountDetails?.profit}
                  </span>
                ) : (
                  <span className="mb-4"> $0</span>
                )}
                </b></h2>
                </div>
              <div className="col"><Pie></Pie></div>
          </div>
          <AccountSum></AccountSum>
      </div>
      </section>
    </> 
  );
};

export default Profile;
