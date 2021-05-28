import PropTypes from "prop-types";

import {
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  table: {
    width: "40%",
  },
  tableTextHeader: {
    color: theme.palette.primary.main,
  },
  tableText: {
    color: "white",
    textTransform: "capitalize",
  },
});

const DetailIngredients = (props) => {
  const { ingredients, classes } = props;

  return (
    <Grid
      item
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      spacing={2}
    >
      <Typography variant="h5" color="primary">
        Ingredients
      </Typography>
      <TableContainer className={classes.table}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableTextHeader}>Name</TableCell>
              <TableCell className={classes.tableTextHeader} align="right">
                Quantity
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((row, i) => (
              <TableRow key={row.name + i}>
                <TableCell
                  className={classes.tableText}
                  component="th"
                  scope="row"
                >
                  {row.name}
                </TableCell>
                <TableCell className={classes.tableText} align="right">
                  {row.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

DetailIngredients.propTypes = {
  classes: PropTypes.shape({
    table: PropTypes.string.isRequired,
    tableText: PropTypes.string.isRequired,
    tableTextHeader: PropTypes.string.isRequired,
  }).isRequired,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      quantity: PropTypes.string.isRequired,
    })
  ).isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DetailIngredients);
