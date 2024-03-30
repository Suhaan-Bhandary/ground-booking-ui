import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../app/features/userApi";
import { userActions } from "../../app/features/userSlice";
import { USER_LOALSTORAGE_KEY } from "../../constants/user";
import { isApiResponse } from "../../helpers/api";
import { setLocalStorage } from "../../helpers/localStorage";
import {
  userRegisterInitialValues,
  userRegisterSchema,
} from "../../helpers/user";
import { useAppDispatch } from "../../hooks/redux";
import { IUserLocalStorage, IUserRegisterRequest } from "../../types/user";
import styles from "./UserRegister.module.css";

const UserRegister = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [registerUser, registerUserResult] = useRegisterUserMutation();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: userRegisterInitialValues,
      validationSchema: userRegisterSchema,
      onSubmit: async (values) => {
        const responseBody: IUserRegisterRequest = {
          user: {
            user_name: values.user_name,
            mobile_no: values.mobile_no,
            password: values.password,
          },
        };

        try {
          const payload = await registerUser(responseBody).unwrap();

          toast.success("User registered successfully");
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
    <div className={styles.UserRegister}>
      <div className={styles.container}>
        <header className={styles.title}>Registration Form</header>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputField}>
            <label htmlFor="username">
              {touched.user_name && errors.user_name ? (
                <p className="error-color">{errors.user_name}</p>
              ) : (
                <p>Username</p>
              )}
              <input
                type="text"
                name="user_name"
                placeholder="username"
                autoComplete="username"
                value={values.user_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
          </div>
          <div className={styles.inputField}>
            <label htmlFor="mobile_no">
              {touched.mobile_no && errors.mobile_no ? (
                <p className="error-color">{errors.mobile_no}</p>
              ) : (
                <p>Mobile No</p>
              )}
              <input
                type="tel"
                name="mobile_no"
                autoComplete="mobile tel"
                value={values.mobile_no}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
          </div>
          <div className={styles.inputField}>
            <label htmlFor="password">
              {touched.password && errors.password ? (
                <p className="error-color">{errors.password}</p>
              ) : (
                <p>Password</p>
              )}
              <input
                type="password"
                name="password"
                placeholder="*****"
                autoComplete="off"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
          </div>

          <div className={styles.inputField}>
            <label htmlFor="password">
              {
                // prettier-ignore
                touched.confirmPassword
                    && errors.confirmPassword
                      ? <p className="error-color">{errors.confirmPassword}</p> 
                      : <p>Confirm Password</p>
              }
              <input
                type="password"
                name="confirmPassword"
                placeholder="*****"
                autoComplete="off"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
          </div>

          <button
            type="submit"
            className={styles.registerButton}
            disabled={registerUserResult.isLoading}
          >
            Register
          </button>
        </form>

        <div className={styles.loginSignUp}>
          <span className={styles.signUpText}>
            <span>Already have an Account ?</span>
            <Link to="/login">Log in</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
