import * as Yup from "yup";

export const userRegisterInitialValues = {
  user_name: "",
  mobile_no: "",
  password: "",
  confirmPassword: "",
};

export const userRegisterSchema = Yup.object({
  user_name: Yup.string()
    .required("Username is required")
    .matches(/[a-zA-Z]/, "Username should only contain letters"),
  mobile_no: Yup.string()
    .required("Mobile is required")
    .matches(/[0-9]/, "Mobile should only contain digits")
    .min(10, "Mobile number should contain 10 digits"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .when("password", {
      is: (val: string) => val && val.length > 0,
      then: (schema) =>
        schema.oneOf([Yup.ref("password")], "Confirm Password does not match"),
    })
    .required("Confirm Password is required"),
});

export const userLoginInitialValues = {
  mobile_no: "",
  password: "",
};

export const userLoginSchema = Yup.object({
  mobile_no: Yup.string().required("Mobile is required"),
  password: Yup.string().required("Password is required"),
});
