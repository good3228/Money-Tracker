import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import navigate from "../../utils/nav";
import AccountSum from './accountSum'


const Profile = () => {
  const history = useHistory();

  const users = useSelector((state) => state?.users);
  const { userLoading, userAppErr, userServerErr, userAuth } = users;


  return (
    <>
      <section className="py-5">
        <div className="container">
          <div className="position-relative p-8 border rounded-2">
            <div className="d-flex mb-6 align-items-center">
              <img
                className="img-fluid me-4 rounded-2"
                src="https://27jts3o00yy49vo2y30wem91-wpengine.netdna-ssl.com/wp-content/uploads/2018/05/ASSET-USER-ADMIN-300x300.png"
                alt=""
              />
              <div>
                <h6 className="fw-bold mb-0">
                  <span>{userAuth?.fullname}</span>
                  <span className="badge ms-2 bg-primary-light text-primary">
                    {userAuth?.email}<br/>
                    {/* {profile?.expenses?.length + profile?.income?.length}{" "} */}
                    {/* Records Created */}
                  </span>
                </h6>
                <span className="badge ms-2 bg-primary-light text-primary">
                    JOINED DATE: {userAuth?.createdAt}
                </span><br />
                <button
                  // onClick={() => navigate(history, "update-profile", profile)}
                  className="btn"
                >
                  Edit Profile
                  <i class="bi bi-pen fs-3 m-3 text-primary"></i>
                </button>
              </div>
            </div>

            <p className="mb-8"> </p>
            <AccountSum></AccountSum>
            <div className="d-flex align-items-center justify-content-center">
              <button
                onClick={() => navigate(history, "userExpense", "")}
                className="btn me-4 w-100 btn-danger d-flex align-items-center justify-content-center"
              >
                <span>View Expenses History</span>
              </button>
              <button
                onClick={() => navigate(history, "userIncome", "")}
                className="btn w-100 btn-outline-success d-flex align-items-center justify-content-center"
              >
                <span>View Income History</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
