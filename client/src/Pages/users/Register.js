import React, {useEffect} from "react";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import { registerUserAction } from "../../redux/slices/User/usersSlices";
import DisabledButton from "../../components/DisabledButton";
import { useHistory } from "react-router-dom";
import signBg from '../../img/signBg.jpg';
import './Register.scss';
const formSchema = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
    fullname: Yup.string().required("Full Name is required"),
});


const Register = () => {

    //history
    const history = useHistory();
      //  get data from store
      const user = useSelector((state) => state?.users);
      const {userAppErr, userServerErr, userLoading, userAuth} = user;
    //dispatch
    const dispatch = useDispatch();
    //formik form
    const formik = useFormik({
        initialValues:{
            email:"",
            password:"",
            fullname:""
        },
        onSubmit: values => {
            dispatch(registerUserAction(values));
        },
        validationSchema: formSchema,
    });

     // Redirect
    // console.log(user);
    useEffect(() => {
      if(userAuth) { history.push('/login'); }
    },[userAuth])

  return (
    <section className="register_main">
      <img src={signBg} className="background register"></img>
      <div>
        <div>
          <div>
            <div>
              <p className="sign register" id = "register" align="center">
                Register
              </p>
              <form onSubmit={formik.handleSubmit}>
                {/* Success msg */}
                {/* {registered && (
                  <SuccessMessage msg="Register Successfully. You will be redirected soon" />
                )} */}
                {/* Display Err */}
                {userAppErr || userServerErr ? (
                  <div className="text-danger text-center mb-3">
                    {"Email exists" || "userServerErr"}
                  </div>
                ) : null}
                <input
                  value={formik.values.fullname}
                  onChange={formik.handleChange("fullname")}
                  onBlur={formik.handleBlur("fullname")}
                  type="text"
                  placeholder="Full Name"
                  className="fullname"
                />
                {/* Err */}
                <div className="text-danger text-center mb-3">
                  {formik.touched.fullname && formik.errors.fullname}
                </div>
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  type="email"
                  placeholder="Email"
                  className="un"
                />
                {/* Err */}
                <div className="text-danger text-center mb-3">
                  {formik.touched.email && formik.errors.email}
                </div>
                <input
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  type="password"
                  placeholder="Password"
                  className="pass"
                />
                {/* Err */}
                <div className="text-danger text-center mb-3">
                  {formik.touched.password && formik.errors.password}
                </div>
                {userLoading ? (
                  <DisabledButton />
                ) : (
                  <button type="submit" className="submit">
                    Register
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;