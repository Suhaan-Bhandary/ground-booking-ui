import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../app/features/userApi";
import { userActions } from "../../app/features/userSlice";
import { USER_LOALSTORAGE_KEY } from "../../constants/user";
import { setLocalStorage } from "../../helpers/localStorage";
import {
  userRegisterInitialValues,
  userRegisterSchema,
} from "../../helpers/user";
import { IUserLocalStorage, IUserRegisterRequest } from "../../types/user";
import { isApiResponse } from "../../helpers/api";

const UserRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <div>
      <h1>User Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user_name">Username</label>
          <input
            name="user_name"
            type="text"
            value={values.user_name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.user_name && errors.user_name ? (
            <span>{errors.user_name}</span>
          ) : null}
        </div>

        <div>
          <label htmlFor="mobile_no">Mobile</label>
          <input
            name="mobile_no"
            type="text"
            value={values.mobile_no}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.mobile_no && errors.mobile_no ? (
            <span>{errors.mobile_no}</span>
          ) : null}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="text"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password ? (
            <span>{errors.password}</span>
          ) : null}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            name="confirmPassword"
            type="text"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.confirmPassword && errors.confirmPassword ? (
            <span>{errors.confirmPassword}</span>
          ) : null}
        </div>

        <button type="submit" disabled={registerUserResult.isLoading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserRegister;
