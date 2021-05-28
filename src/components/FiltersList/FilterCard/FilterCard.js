import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const styles = (theme) => ({
  paper: {
    padding: "7px",
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "5px",
    height: "47px",
    width: "150px",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    cursor: "pointer",
  },
});

const FilterCard = (props) => {
  const { classes, filterName, filterType } = props;

  const history = useHistory();

  return (
    <Paper
      variant="outlined"
      className={classes.paper}
      onClick={() => {
        history.push(
          `/drinks/${filterName.replaceAll("/", "-")}/${filterType}`
        );
      }}
    >
      {filterName}
    </Paper>
  );
};

FilterCard.propTypes = {
  classes: PropTypes.shape({
    paper: PropTypes.string.isRequired,
  }).isRequired,
  filterName: PropTypes.string.isRequired,
  filterType: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FilterCard);
