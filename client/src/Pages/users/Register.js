import React, {useEffect} from "react";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import { registerUserAction } from "../../redux/slices/User/usersSlices";
import DisabledButton from "../../components/DisabledButton";
import {useHistory} from "react-router-dom";

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
      if(userAuth) { history.push('/'); }
    },[userAuth])

  return (
    <section>
      <div>
        <div>
          <div>
            <div>
              <h2>
                Keep Track of your income and expenses flow
              </h2>
            </div>
          </div>
          <div>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <span>New User</span>
                <h3>Register</h3>
                {/* Success msg */}
                {/* {registered && (
                  <SuccessMessage msg="Register Successfully. You will be redirected soon" />
                )} */}
                {/* Display Err */}
              {userAppErr || userServerErr ? (
                <div>
                  {"username or email exists" || "userServerErr"}
                </div>
              ) : null}
                <input
                  value={formik.values.fullname}
                  onChange={formik.handleChange("fullname")}
                  onBlur={formik.handleBlur("fullname")}
                  type="text"
                  placeholder="Full Name"
                />
                {/* Err */}
                <div>
                  {formik.touched.fullname && formik.errors.fullname}
                </div>
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  type="email"
                  placeholder="Email"
                />
                {/* Err */}
                <div>
                  {formik.touched.email && formik.errors.email}
                </div>
                <input
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  type="password"
                  placeholder="Password"
                />
                {/* Err */}
                <div>
                  {formik.touched.password && formik.errors.password}
                </div>
                {userLoading ? (<DisabledButton />) : (
                      <button
                      type="submit"
                    >
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