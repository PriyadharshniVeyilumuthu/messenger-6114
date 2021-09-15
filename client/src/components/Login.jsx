import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../store/utils/thunkCreators";
import FormComponent from "./FormComponent";
import { makeStyles } from "@material-ui/core";

export const passwordStyles = makeStyles(() => ({
  forgotPassword: {
    color: "#3A8DFF",
    fontSize: "small",
    cursor: "pointer",
  },
  passwordFont: {
    fontSize: "30px",
    width: "11.5em",
  },
}));
const Login = (props) => {
  const classes = passwordStyles();
  const history = useHistory();
  const { user, login } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!email || email.length === 0) {
      setFormErrorMessage({ email: "Invalid Email" });
      return;
    }

    if (!password || password.length === 0) {
      setFormErrorMessage({ password: "Invalid password" });
      return;
    }

    await login({ email, password });
  };

  if (user && user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <FormComponent
      clickableText={"Create account"}
      headerLabel={"Don't have an account?"}
      onLabelClick={() => history.push("/register")}
      handleSubmit={handleLogin}
      welcomeText={"Welcome back!"}
      fields={[
        {
          name: "E-mail address",
          shortName: "email",
          type: "email",
        },
        {
          name: "Password",
          shortName: "password",
          type: "password",
          specialInputProps: {
            className: classes.passwordFont,
            endAdornment: (
              <div
                className={classes.forgotPassword}
                onClick={() => console.log("Forgot")}
              >
                Forgot?
              </div>
            ),
          },
        },
      ]}
      buttonText={"Login"}
      setFormErrorMessage={setFormErrorMessage}
      isDesktopView={props.isDesktopView}
      formErrorMessage={formErrorMessage}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
