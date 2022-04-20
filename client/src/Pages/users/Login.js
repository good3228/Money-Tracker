import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { loginUserAction } from "../../redux/slices/User/usersSlices";
import DisabledButton from "../../components/DisabledButton";
import { useHistory } from "react-router-dom";
import "./Login.scss";
//form validation

const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  //history
  const history = useHistory();
  //dispatch
  const dispatch = useDispatch();
  //  get data from store
  const user = useSelector((state) => state?.users);
  const { userAppErr, userServerErr, userLoading, userAuth } = user;
  //formik form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginUserAction(values));
    },
    validationSchema: formSchema,
  });
  // Redirect
  // console.log(user);
  useEffect(() => {
    if (userAuth) {
      history.push("/profile/");
    }
  }, [userAuth]);
  return (
    <section>
      <div>
        <div>
          <div>
            <div></div>
          </div>
          <div className="main">
            <div>
              <p className="sign" align="center">
                Sign In
              </p>
              {/* Display Err */}
              {userAppErr || userServerErr ? (
                <div className="warning">
                  {<p className="warning">username or password wrong</p> || (
                    <p>userServerErr</p>
                  )}
                </div>
              ) : null}
              <form onSubmit={formik.handleSubmit} className="form1">
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  className="un"
                  type="email"
                  placeholder="Email"
                />
                {/* Err */}
                <div>{formik.touched.email && formik.errors.email}</div>
                <input
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  type="password"
                  placeholder="Password"
                  className="pass"
                />
                {/* Err */}
                <div>{formik.touched.password && formik.errors.password}</div>
                <div>
                  {userLoading ? (
                    <DisabledButton />
                  ) : (
                    <button type="submit" className="submit" align="center">
                      Login
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
