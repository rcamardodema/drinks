import { useState, useEffect, useCallback } from "react";

import { useParams } from "react-router-dom";

import api, { operations } from "../utils/API";

import { useSnackbar } from "notistack";

import { NavBar, PageLoader, DetailCard } from "../components";
import Drink from "../model/Drink";

const DetailPage = () => {
  const { drinkId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [drinkState, setDrinkState] = useState({});

  const { enqueueSnackbar } = useSnackbar();
  const rebuildData = useCallback((data) => {
    const [drinkInfo] = data.drinks;
    const drink = new Drink(drinkInfo);
    return drink;
  }, []);

  const getDrinkDetail = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api("get", {
        operation: operations.drinkById,
        query: drinkId,
      });
      if (data.drinks) {
        const newDrink = rebuildData(data);
        setDrinkState({ ...newDrink });
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      enqueueSnackbar(err.message, {
        variant: "warning",
      });
    }
  }, [drinkId, enqueueSnackbar, rebuildData]);

  useEffect(() => {
    if (drinkId) {
      getDrinkDetail();
    }
  }, [drinkId, getDrinkDetail]);

  return (
    <>
      <NavBar home="back" />
      {isLoading ? (
        <PageLoader />
      ) : drinkState.propertyIsEnumerable("name") ? (
        <DetailCard drink={drinkState} />
      ) : (
        <PageLoader />
      )}
    </>
  );
};

export default DetailPage;
