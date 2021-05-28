import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

import { Home, ArrowBack, Search } from "@material-ui/icons";

import SearchInput from "./SearchInput/SearchInput";

const styles = (theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  title: {
    flexGrow: 1,
    fontWeight: 600,
  },
});

const MyToolBar = (props) => {
  const { home, isSearching, classes, onSearch } = props;

  const history = useHistory();
  let homeButton;
  switch (home) {
    case "home":
      homeButton = (
        <IconButton
          color="primary"
          onClick={() => {
            history.replace("/");
          }}
        >
          <Home />
        </IconButton>
      );
      break;
    case "back":
      homeButton = (
        <IconButton
          focusRipple
          color="primary"
          onClick={() => {
            history.goBack();
          }}
        >
          <ArrowBack />
        </IconButton>
      );
      break;
    default:
      homeButton = null;
      break;
  }
  let search;
  switch (isSearching) {
    case "on":
      search = <SearchInput onSearch={onSearch} />;
      break;
    case "off":
      search = (
        <IconButton
          color="primary"
          onClick={() => {
            history.push("/drinks");
          }}
        >
          <Search />
        </IconButton>
      );
      break;
    default:
      search = null;
      break;
  }

  return (
    <AppBar
      className={classes.root}
      position="sticky"
      color="secondary"
      elevation={0}
    >
      <Toolbar variant="dense">
        {homeButton}
        <Typography className={classes.title} variant="h6" color="primary">
          DRINKS APP
        </Typography>
        {search}
      </Toolbar>
    </AppBar>
  );
};

MyToolBar.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onSearch: PropTypes.func,
  isSearching: PropTypes.string,
  home: PropTypes.string,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MyToolBar);
