import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./store/utils/thunkCreators";
import { Home, SnackbarError } from "./components";
import ResponsiveWrapper from "./components/ResponsiveWrapper";
import Login from "./components/Login";
import Signup from "./components/Signup";

const Routes = (props) => {
  const { user, fetchUser } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (user.error) {
      // check to make sure error is what we expect, in case we get an unexpected server error object
      if (typeof user.error === "string") {
        setErrorMessage(user.error);
      } else {
        setErrorMessage("Internal Server Error. Please try again");
      }
      setSnackBarOpen(true);
    }
  }, [user.error]);

  if (props.user.isFetchingUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {snackBarOpen && (
        <SnackbarError
          setSnackBarOpen={setSnackBarOpen}
          errorMessage={errorMessage}
          snackBarOpen={snackBarOpen}
        />
      )}
      <Switch>
        <Route path="/login" component={() => <ResponsiveWrapper><Login /></ResponsiveWrapper>} />
        <Route path="/register" component={() => <ResponsiveWrapper><Signup /></ResponsiveWrapper>} />
        <Route
          exact
          path="/"
          render={(props) => (props.user?.id ? <Home /> : <Signup />)}
        />
        <Route path="/home" component={Home} />
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser() {
      dispatch(fetchUser());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
