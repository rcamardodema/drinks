import PropTypes from "prop-types";

import { Grid, Typography, CardMedia } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  img: {
    width: "250px",
    height: "250px",
  },
  name: {
    height: "95px",
  },
};

const DetailHeader = (props) => {
  const { classes, category, glassType, image, name, isAlcohol } = props;

  return (
    <Grid
      item
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={2}
    >
      <Grid item xs={4}>
        <CardMedia className={classes.img} image={image} title={name} />
      </Grid>
      <Grid item xs={8} container direction="column" spacing={2}>
        <Grid item className={classes.name}>
          <Typography variant="h4" color="primary">
            {name}
          </Typography>
        </Grid>
        <Grid item container direction="row">
          <Grid item xs={3}>
            <Typography variant="subtitle1" color="primary">
              Category:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle1">{category}</Typography>
          </Grid>
        </Grid>
        <Grid item container direction="row">
          <Grid item xs={3}>
            <Typography variant="subtitle1" color="primary">
              Type of glass:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle1">{glassType}</Typography>
          </Grid>
        </Grid>
        <Grid item container direction="row">
          <Grid item xs={3}>
            <Typography variant="subtitle1" color="primary">
              Alcoholic:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle1">{isAlcohol}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

DetailHeader.DetailHeader = {
  category: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  glassType: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isAlcohol: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default withStyles(styles)(DetailHeader);
