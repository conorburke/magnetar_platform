import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: "transparent", color: "#f7f7f7" }}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            color="primary"
            component={React.forwardRef<HTMLAnchorElement, Partial<LinkProps>>(
              (props, ref) => <Link to={"/"} {...props} ref={ref as any} />
            )}
          >
            Home
          </Button>
          <Button
            color="primary"
            component={React.forwardRef<HTMLAnchorElement, Partial<LinkProps>>(
              (props, ref) => <Link to={"/users"} {...props} ref={ref as any} />
            )}
          >
            Users
          </Button>
          {/* <Button
            color="primary"
            component={props => <Link to={"/users"} {...props} />}
          >
            Users
          </Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
