import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

const styles = {
  container: {
    width: "100%",
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const WrapperCenter = (props) => {
  const { classes, children } = props;

  return <div className={classes.container}>{children}</div>;
};

WrapperCenter.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.element.isRequired,
};

export default withStyles(styles)(WrapperCenter);
