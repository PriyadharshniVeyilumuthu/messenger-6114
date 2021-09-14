import React from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import backgroundImage from "../resources/images/bg-img.png"
import bubbleImage from "../resources/images/bubble.svg"

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: "1.8em",
        zIndex: -1,
        height: "100vh",
        backgroundSize: "cover",
        backgroundImage: `linear-gradient(to bottom, rgba(58, 141, 255, 0.9), rgba(154, 168, 252, 0.52)), url(${backgroundImage})`
    },
    container: {
        marginTop: "-160px",
    },
    bubble: {
        marginLeft: "-20px",
        marginBottom: "30px",
        justifyContent: "center"
    },
    textContent: {
        width: "70%",
        marginLeft: "80px",
        color: "white",
        lineHeight: "40px"
    }
}));

const SideImage = () => {
    const classes = useStyles();
    return <Paper className={classes.root}>
        <Grid container direction="column" className={classes.container} justifyContent="center">
            <Grid container item xs={12} xm={3} justifyContent="center">
                <img src={bubbleImage} alt={"bubbleImage"} className={classes.bubble} />
            </Grid>
            <Grid container item xs={12} justifyContent="center" className={classes.textContent}>
                <Grid item spacing={5}>
                Converse with anyone
                <br/>
                with any language
                </Grid>
            </Grid>
        </Grid>
    </Paper>
}

export default SideImage;