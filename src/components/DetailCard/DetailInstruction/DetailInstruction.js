import PropTypes from "prop-types";

import { Grid, Typography } from "@material-ui/core";

const DetailInstruction = (props) => {
  const { instructions } = props;

  return (
    <Grid item container spacing={1} direction="column">
      <Grid item>
        <Typography variant="h5" color="primary">
          Instructions
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">{instructions.en}</Typography>
      </Grid>
    </Grid>
  );
};

DetailInstruction.propTypes = {
  instructions: PropTypes.shape({
    de: PropTypes.string,
    en: PropTypes.string,
    es: PropTypes.string,
    fr: PropTypes.string,
    it: PropTypes.string,
  }).isRequired,
};

export default DetailInstruction;
