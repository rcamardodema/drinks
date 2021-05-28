import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { Typography, Box, Grid } from "@material-ui/core";

import FilterCard from "./FilterCard/FilterCard";

const styles = {
  title: { margin: "8px" },
};

const FiltersList = (props) => {
  const { classes, filters } = props;

  let filterBox = [];
  for (const filterType in filters) {
    const filterList = [...filters[filterType]];
    filterBox.push(
      <Box key={filterType} style={{ marginTop: "15px", marginBottom: "5px" }}>
        <Typography variant="h6" style={{ marginBottom: "15px" }}>
          {filterType.toUpperCase()}
        </Typography>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="flex-start"
          spacing={2}
        >
          {filterList.map((value) => {
            return (
              <Grid item key={value}>
                <FilterCard filterName={value} filterType={filterType} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  }

  return (
    <>
      <Typography className={classes.title} variant="h5">
        Select one Filter
      </Typography>
      {filterBox}
    </>
  );
};

FiltersList.prototype = {
  classes: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  filters: PropTypes.shape({
    alcoholic: PropTypes.arrayOf(PropTypes.string.isRequired),
    categories: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};

export default withStyles(styles)(FiltersList);
