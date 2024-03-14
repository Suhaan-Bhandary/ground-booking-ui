import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../app/features/userApi";
import { userActions } from "../../app/features/userSlice";
import { USER_LOALSTORAGE_KEY } from "../../constants/user";
import { setLocalStorage } from "../../helpers/localStorage";
import { userLoginInitialValues, userLoginSchema } from "../../helpers/user";
import { IUserLocalStorage, IUserLoginRequest } from "../../types/user";
import { isApiResponse } from "../../helpers/api";

const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, loginUserResult] = useLoginUserMutation();

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
    <div>
      <h1>User Login</h1>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" disabled={loginUserResult.isLoading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
