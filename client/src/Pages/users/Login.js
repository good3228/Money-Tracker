import React, { useEffect } from "react";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import * as Yup from "yup";
import {loginUserAction} from '../../redux/slices/User/usersSlices'

//form validation

const formSchema = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    //dispatch
    const dispatch = useDispatch();
    //formik form
    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        onSubmit: values => {
            dispatch(loginUserAction(values));
        },
        validationSchema: formSchema,
    });
  return (
    <section>
      <div>
        <div>
          <div>
            <div>
              <h2>
                Keep Track of what you are spending
              </h2>
            </div>
          </div>
          <div>
            <div>
              <span>Sign In</span>
              <h3>Login to your account</h3>
              {/* Display Err */}
              {/* {userAppErr || userServerErr ? (
                <div class="alert alert-danger" role="alert">
                  {userAppErr || userServerErr}
                </div>
              ) : null} */}
              <form onSubmit={formik.handleSubmit}>
                <input
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                  type="email"
                  placeholder="E-mail address"
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
                  <div>
                    <button
                      type="submit"
                    >
                      Login
                    </button>
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