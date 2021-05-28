import PropTypes from "prop-types";

import Loader from "react-loader-spinner";

import { withStyles } from "@material-ui/core/styles";

import WrapperCenter from "../../layout/WrapperCenter";

const PageLoader = (props) => {
  const { theme } = props;

  return (
    <WrapperCenter>
      <Loader
        type="Rings"
        width={250}
        height={250}
        color={theme.palette.primary.main}
      />
    </WrapperCenter>
  );
};

PageLoader.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object,
};

export default withStyles(null, { withTheme: true })(PageLoader);
