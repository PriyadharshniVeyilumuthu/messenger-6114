import React from "react";
import {
  Grid,
  Box,
  Button,
  FormControl,
  TextField,
  makeStyles,
  Typography,
} from "@material-ui/core";
import SideImage from "./SideLayout";
import HeaderRow from "./HeaderRow";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column",
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  registerAccount: {
    margin: 41,
  },
  register: {
    color: "#3A8DFF",
    margin: "30px 20px 20px 30px",
    paddingTop: "-10px",
  },
  welcomeText: {
    fontSize: "xx-large",
    fontWeight: "bolder",
  },
  loginForm: {
    paddingBottom: "20em",
  },
  labelRoot: {
    fontSize: "19px",
    paddingBottom: "10px",
  },
  inputContainer: {
    paddingTop: "20px",
    paddingBottom: "20px",
  },
  actionButton: {
    margin: "25px",
    width: "175px",
    padding: "15px",
  },
}));

const FormComponent = (props) => {
  const classes = useStyles();
  console.log(props.formErrorMessage);

  return (
    <Grid container direction="row" classes={{ root: { height: "100%" } }}>
      {props.isDesktopView && (
        <Grid container item xs sm={5}>
          <SideImage />
        </Grid>
      )}
      <Grid container item xs sm={7}>
        <HeaderRow
          clickableText={props.clickableText}
          labelText={props.headerLabel}
          onClick={props.onLabelClick}
        />
        <Grid
          container
          direction="row-reverse"
          justifyContent="center"
          alignItems="flex-start"
          spacing={4}
          className={classes.registerAccount}
        >
          <Box>
            <form className={classes.loginForm} onSubmit={props.handleSubmit}>
              <Grid
                container
                spacing={4}
                direction="column"
                alignItems="flex-start"
              >
                <Grid item>
                  <Typography className={classes.welcomeText}>
                    {props.welcomeText}
                  </Typography>
                </Grid>
                {props.fields.map((field) => {
                  const specialInputProps = field.specialInputProps || {};
                  return (
                    <Grid item>
                      <FormControl>
                        <TextField
                          aria-label={field.shortName}
                          label={field.name}
                          name={field.shortName}
                          type={field.type}
                          helperText={props.formErrorMessage[field.shortName]}
                          error={!!props.formErrorMessage[field.shortName]}
                          InputProps={{ ...specialInputProps }}
                        />
                      </FormControl>
                    </Grid>
                  );
                })}
                <Grid container justifyContent="center">
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      color="primary"
                      className={classes.actionButton}
                    >
                      {props.buttonText}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormComponent;
