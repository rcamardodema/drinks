import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@material-ui/core";

const styles = (theme) => ({
  card: {
    width: "120px",
    backgroundColor: "black",
    cursor: "pointer",
    height: "190px",
    borderTop: "3px solid orange",
    "&:hover": {
      transform: "translatey(-4px)",
      boxShadow: `0px 2px 5px${theme.palette.primary.main}`,
    },
  },
  img: {
    height: "120px",
    width: "120px",
  },
  content: {
    padding: "10px",
  },
  title: {
    lineHeight: "1.2",
  },
});

const DrinkCard = (props) => {
  const { drink, classes } = props;

  const history = useHistory();

  return (
    <Grid item key={drink.idDrink}>
      <Card
        className={classes.card}
        onClick={() => {
          history.push(`/details/${drink.idDrink}`);
        }}
      >
        <CardMedia
          className={classes.img}
          image={drink.strDrinkThumb}
          title={drink.strDrink}
        />
        <CardContent className={classes.content}>
          <Typography className={classes.title} gutterBottom color="primary">
            {drink.strDrink}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

DrinkCard.propTypes = {
  classes: PropTypes.shape({
    card: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  drink: PropTypes.shape({
    idDrink: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrinkCard);
