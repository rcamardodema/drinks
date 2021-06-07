import PropTypes from "prop-types";

import "./App.css";

import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { Route, Switch } from "react-router-dom";

import { Home, Result, Details, NotFound } from "./pages";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  },
});

function App(props) {
  const { classes } = props;

  return (
    <div className="background">
      <Container className={classes.root} fixed>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/drinks/:filter?/:type?">
            <Result />
          </Route>
          <Route exact path="/details/:drinkId?">
            <Details />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
