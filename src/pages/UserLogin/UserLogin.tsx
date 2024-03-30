import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../app/features/userApi";
import { userActions } from "../../app/features/userSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiEnvelope, BiLockAlt } from "react-icons/bi";
import { USER_LOALSTORAGE_KEY } from "../../constants/user";
import { isApiResponse } from "../../helpers/api";
import { setLocalStorage } from "../../helpers/localStorage";
import { userLoginInitialValues, userLoginSchema } from "../../helpers/user";
import { useAppDispatch } from "../../hooks/redux";
import { IUserLocalStorage, IUserLoginRequest } from "../../types/user";
import styles from "./UserLogin.module.css";
import { useState } from "react";

const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginUser, loginUserResult] = useLoginUserMutation();

  const [showPassword, setShowPassword] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: userLoginInitialValues,
      validationSchema: userLoginSchema,
      onSubmit: async (values) => {
        const responseBody: IUserLoginRequest = {
          user: {
            mobile_no: values.mobile_no,
            password: values.password,
          },
        };

        try {
          const payload = await loginUser(responseBody).unwrap();

          toast.success("User Login successfully");
          setLocalStorage<IUserLocalStorage>(USER_LOALSTORAGE_KEY, payload);
          dispatch(userActions.setUser(payload.user));

          // Navigating to Home Page
          navigate("/");
        } catch (error) {
          console.error("Rejected:", error);
          if (isApiResponse(error)) {
            error.data.errors.forEach((errMessage) => {
              toast.error(errMessage);
            });
          } else {
            toast.error("Something went wrong");
          }
        }
      },
    });

  return (
    <div className={styles.Login}>
      <div className={styles.container}>
        <div className={`${styles.form} ${styles.login}`}>
          <span className={styles.title}>Login</span>
          <form onSubmit={handleSubmit}>
            <div
              className={`${styles.inputField} ${
                touched.mobile_no && errors.mobile_no
                  ? styles.inputFieldError
                  : ""
              }`}
            >
              <input
                type="mobile_no"
                placeholder="Enter your mobile no"
                name="mobile_no"
                value={values.mobile_no}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <BiEnvelope className={styles.icon} />
            </div>
            <div
              className={`${styles.inputField} ${
                touched.password && errors.password
                  ? styles.inputFieldError
                  : ""
              }`}
            >
              <input
                type={showPassword ? "text" : "password"}
                className={styles.password}
                placeholder="Enter your password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <BiLockAlt className={styles.icon} />
              {showPassword ? (
                <AiOutlineEye
                  className={`${styles.icon} ${styles.eyeIcon}`}
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className={`${styles.icon} ${styles.eyeIcon}`}
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            <div className={`${styles.inputField} ${styles.button}`}>
              <input
                type="submit"
                value="Login"
                disabled={loginUserResult.isLoading}
              />
            </div>
          </form>

          <div className={styles.loginSignUp}>
            <span className={styles.signUpText}>
              Not a member?
              <Link to="/register">Register</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
