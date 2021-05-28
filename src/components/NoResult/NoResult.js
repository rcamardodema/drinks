import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import WrapperCenter from "../../layout/WrapperCenter";

const styles = {
  text: {
    textAlign: "center",
  },
};

const NoResult = (props) => {
  const { message } = props;
  return (
    <WrapperCenter>
      <Typography variant="h3">{message}</Typography>
    </WrapperCenter>
  );
};

NoResult.propTypes = {
  message: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(NoResult);
