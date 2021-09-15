import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import GlossyButton from "./GlossyButton";

const styles = makeStyles(() => ({
  button: {
    margin: "40px",
    paddingRight: "40px",
  },
  labelText: {
    paddingTop: "20px",
    color: "#b0b0b0",
  },
}));
const HeaderRow = (props) => {
  const classes = styles();
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="flex-start"
      spacing={4}
      className={classes.button}
    >
      <Grid item>
        <Typography className={classes.labelText}>{props.labelText}</Typography>
      </Grid>
      <Grid item>
      <Grid container item justifyContent="center">
        <GlossyButton onClick={props.onClick} text={props.clickableText} />
      </Grid>
      </Grid>
    </Grid>
  );
};

export default HeaderRow;
