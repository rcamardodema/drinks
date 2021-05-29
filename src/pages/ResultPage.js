import PropTypes from "prop-types";

import { useState, useEffect, useCallback } from "react";

import { useParams } from "react-router-dom";

import api, { operations } from "../utils/API";

import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useSnackbar } from "notistack";

import {
  NavBar,
  DrinkCard,
  PageLoader,
  NoResult,
  FilterAppllier,
} from "../components";

const styles = {
  page: {
    marginTop: "10px",
  },
};

const ResultPage = (props) => {
  const { classes } = props;

  const [drinksWithFilter, setDrinksWithFilter] = useState([]);
  const [resulList, setResultDrinks] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [withFilter, setWithFilter] = useState({
    isFirst: true,
    state: false,
  });

  const [message, setMessage] = useState(
    "Try to type something on the Search Field"
  );

  const { filter, type } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  const getDrinksByFilterHandler = useCallback(async () => {
    try {
      let operation;
      switch (type) {
        case "categories":
          operation = operations.drinksByCategory;
          break;
        case "alcoholic":
          operation = operations.drinksByAlcoholFilter;
          break;
        default:
          throw new Error("Not valid filter");
      }
      const { data } = await api("get", {
        operation: operation,
        query: filter.replaceAll("-", "/"),
      });
      return data.drinks;
    } catch (err) {
      throw err;
    }
  }, [filter, type]);

  const getDrinksByInputHandler = useCallback(async (value) => {
    try {
      const { data } = await api("get", {
        operation: operations.lookupByDrinkName,
        query: value.trim(),
      });
      return data.drinks;
    } catch (err) {
      throw err;
    }
  }, []);

  const filterToogleHandler = useCallback(
    async (value) => {
      setIsLoading(true);
      changeSwitchHandler(value);
      if (value) {
        try {
          let drinksList = await getDrinksByFilterHandler();
          if (drinksList) {
            setDrinksWithFilter([...drinksList]);
            if (inputValue) {
              const newList = applyInputFilter(drinksList, inputValue);
              setResultDrinks([...newList]);
              if (!newList.length > 0) {
                setMessage("No result");
              }
            } else {
              setResultDrinks([...drinksList]);
            }
          } else {
            setResultDrinks([]);
            setMessage("No drinks for selected filter");
          }
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          enqueueSnackbar(err.message, {
            variant: "warning",
          });
        }
      } else {
        try {
          if (inputValue) {
            const drinksList = await getDrinksByInputHandler(inputValue);

            if (drinksList) {
              setResultDrinks([...drinksList]);
            } else {
              setResultDrinks([]);
              setMessage("No result");
            }
          } else {
            setResultDrinks([]);
            setMessage("Try to type something on the Search Field");
          }
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          enqueueSnackbar(err.message, {
            variant: "warning",
          });
        }
      }
    },
    [
      enqueueSnackbar,
      getDrinksByInputHandler,
      getDrinksByFilterHandler,
      inputValue,
    ]
  );

  const lookUpHandler = async (value) => {
    setIsLoading(true);
    setInputValue(value);
    if (value && value !== " ") {
      try {
        if (withFilter.state) {
          const newList = applyInputFilter(drinksWithFilter, value);
          setResultDrinks([...newList]);
          if (!newList.length > 0) {
            setMessage("No result");
          }
        } else {
          const drinksList = await getDrinksByInputHandler(value);
          if (drinksList) {
            setResultDrinks([...drinksList]);
          } else {
            setResultDrinks([]);
            setMessage("No result");
          }
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        enqueueSnackbar(err.message, {
          variant: "warning",
        });
      }
    } else {
      if (withFilter.state) {
        setResultDrinks([...drinksWithFilter]);
      } else {
        setResultDrinks([]);
        setMessage("Try to type something on the Search Field");
      }
      setIsLoading(false);
    }
  };

  const changeSwitchHandler = (value) => {
    setWithFilter({ state: value });
  };

  const applyInputFilter = (drinksList, value) => {
    const newList = drinksList.filter((drink) =>
      drink.strDrink.toLowerCase().includes(value.trim())
    );
    return newList;
  };

  const { isFirst } = withFilter;
  const changeFirstHandler = useCallback(() => {
    setWithFilter({
      ...withFilter,
      isFirst: false,
    });
  }, [withFilter]);

  useEffect(() => {
    if (filter && isFirst) {
      changeFirstHandler();
      filterToogleHandler(true);
    }
  }, [filter, filterToogleHandler, isFirst, changeFirstHandler]);

  return (
    <>
      <NavBar home="back" isSearching="on" onSearch={lookUpHandler} />
      {filter && (
        <FilterAppllier
          changed={filterToogleHandler}
          isOn={withFilter.state}
          filter={filter.replaceAll("-", "/")}
        />
      )}
      {isLoading ? (
        <PageLoader />
      ) : resulList.length > 0 ? (
        <Grid
          className={classes.page}
          container
          spacing={3}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {resulList.map((drink) => (
            <DrinkCard key={drink.idDrink} drink={drink} />
          ))}
        </Grid>
      ) : (
        <NoResult message={message} />
      )}
    </>
  );
};

ResultPage.propTypes = {
  classes: PropTypes.shape({
    page: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(ResultPage);
