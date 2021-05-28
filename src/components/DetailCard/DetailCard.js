import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import DetailHeader from "./DetailHeader/DetailHeader";
import DetailIngredients from "./DetailIngredients/DetailIngredients";
import DetailInstruction from "./DetailInstruction/DetailInstruction";

const styles = {
  root: {
    width: "100%",
  },
  container: {
    minWidth: "400px",
    maxWidth: "900px",
    padding: "20px",
    paddingTop: "40px",
  },
};

const DetailCard = (props) => {
  const { classes, drink } = props;

  const {
    category,
    glassType,
    image,
    ingredients,
    instructions,
    isAlcohol,
    name,
  } = drink;

  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      justify="flex-start"
      alignItems="center"
    >
      <Grid
        spacing={4}
        container
        className={classes.container}
        direction="column"
        justify="flex-start"
      >
        <DetailHeader
          category={category}
          glassType={glassType}
          image={image}
          name={name}
          isAlcohol={isAlcohol}
        />
        <DetailIngredients ingredients={ingredients} />
        <DetailInstruction instructions={instructions} />
      </Grid>
    </Grid>
  );
};

DetailCard.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired,
  }).isRequired,
  drink: PropTypes.shape({
    category: PropTypes.string.isRequired,
    glassType: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        quantity: PropTypes.string.isRequired,
      })
    ).isRequired,
    instructions: PropTypes.shape({
      de: PropTypes.string,
      en: PropTypes.string,
      es: PropTypes.string,
      fr: PropTypes.string,
      it: PropTypes.string,
    }),
    isAlcohol: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(DetailCard);
