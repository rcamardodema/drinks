import PropTypes from "prop-types";

import { useState, useEffect, useCallback } from "react";

import { useSnackbar } from "notistack";

import api, { operations } from "../utils/API";

import { withStyles } from "@material-ui/core/styles";

import { NavBar, PageLoader, FiltersList } from "../components";
import { Home } from "@material-ui/icons";

const styles = {
  title: { margin: "2px" },
};

const HomePage = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  const [filtersState, setFiltersState] = useState({
    categories: [],
    alcoholic: [],
    // FOR THE MOMENT I DON'T NEED THEM
    // glasses: [],
    // ingredients: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  const getFilterWithDelay = useCallback(async (operation, delay) => {
    return new Promise((res, rej) => {
      setTimeout(async () => {
        try {
          const { data } = await api("get", {
            operation,
          });
          res(data.drinks);
        } catch (err) {
          rej(err);
        }
      }, delay);
    });
  }, []);

  const getAllFilters = useCallback(async () => {
    setIsLoading(true);
    try {
      const categoryFilterList = await getFilterWithDelay(
        operations.categoriesFilterList,
        0
      );
      const glassesFilterList = await getFilterWithDelay(
        operations.glassesFilterList,
        10
      );
      const ingredientsFilterList = await getFilterWithDelay(
        operations.ingredientsFilterList,
        20
      );
      const alcoholFilterList = await getFilterWithDelay(
        operations.alcoholFilterList,
        30
      );
      setFiltersState({
        categories: categoryFilterList.map((value) => value.strCategory),
        alcoholic: alcoholFilterList.map((value) => value.strAlcoholic),
        // FOR THE MOMENT I DON'T NEED THEM
        // glasses: glassesFilterList.map((value) => value.strGlass),
        // ingredients: ingredientsFilterList.map((value) => value.strIngredient1),
      });
      setIsLoading(false);
    } catch (err) {
      enqueueSnackbar(err.message, {
        variant: "warning",
      });
      setIsLoading(false);
    }
  }, [getFilterWithDelay, enqueueSnackbar]);

  useEffect(() => {
    getAllFilters();
  }, [getAllFilters]);

  return (
    <>
      <NavBar isSearching="off" />
      {isLoading ? <PageLoader /> : <FiltersList filters={filtersState} />}
    </>
  );
};

Home.propTypes = {
  classes: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(HomePage);
