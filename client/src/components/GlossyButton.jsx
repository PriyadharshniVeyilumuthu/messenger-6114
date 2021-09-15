import { Box, Button, makeStyles } from "@material-ui/core";
import React from "react";

const styles = makeStyles(() => ({
  button: {
    boxShadow: `0px 1px 20px 12px #f5f7f9`,
    color: "#3A8DFF",
    width: "200px",
    height: "60px",
    paddingTop: "-10px",
  },
}));

const GlossyButton = (props) => {
  const classes = styles();
  return (
    <Box boxShadow={1}>
      <Button className={classes.button} onClick={props.onClick}>
        {props.text}
      </Button>
    </Box>
  );
};
export default GlossyButton;
