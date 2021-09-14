import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../store/utils/thunkCreators";
import FormComponent from "./FormComponent";
import { passwordStyles } from "./Login";

const SignUp = (props) => {
  const classes = passwordStyles();
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!username || username.length === 0) {
      setFormErrorMessage({ username: "Invalid Username" });
      return;
    }

    if (!email || email.length === 0) {
      setFormErrorMessage({ email: "Invalid Email" });
      return;
    }

    if (!password || password.length === 0) {
      setFormErrorMessage({ password: "Invalid password" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <FormComponent 
    clickableText={"Login"}
    headerLabel={"Already have an account?"} 
    onLabelClick={() => history.push("/login")}
    handleSubmit={handleRegister}
    welcomeText={"Create an account."}
    fields={[{
      name: "Username",
      shortName: "username",
      type: "text"
    },
    {
      name: "E-mail address",
      shortName: "email",
      type: "email"
    },
    {
      name: "Password",
      shortName: "password",
      type: "password",
      specialInputProps: {
        className:  classes.passwordFont,
      }
    }]}
    buttonText={"Create"}
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
