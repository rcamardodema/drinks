import { useState } from "react";
import PropTypes from "prop-types";

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  track: {
    backgroundColor: "whitesmoke",
    opacity: 0.4,
    transition: theme.transitions.create(["background-color", "border"]),
  },
}));

const styles = (theme) => ({
  container: {
    margin: "14px",
  },
  label: {
    color: theme.palette.primary.main,
  },
  helper: { color: theme.palette.primary.main, height: "22px" },
});

const FilterAppllier = (props) => {
  const { filter, classes, changed, isOn } = props;
  const [isVisible, setIsVisible] = useState({
    state: false,
    timer: undefined,
  });

  const switchStyle = useStyle();

  const changeHandler = (event) => {
    if (!event.target.checked) {
      setIsVisible({
        state: true,
        timer: setTimeout(() => {
          hideMessageHandler();
        }, 4000),
      });
    } else {
      clearTimeout(isVisible.timer);
      setIsVisible({
        state: false,
        timer: undefined,
      });
    }
    changed(event.target.checked);
  };

  const hideMessageHandler = () => {
    setIsVisible(false);
  };

  return (
    <div className={classes.container}>
      <FormControl component="fieldset">
        <FormControlLabel
          control={
            <Switch
              classes={switchStyle}
              className={classes.switch}
              color="primary"
              checked={isOn}
              onChange={changeHandler}
            />
          }
          label={`${filter} Filter`}
        />
        <FormHelperText className={classes.helper}>
          {isVisible.state
            ? `Without Filter the drinks will be filtered by the content of Search field`
            : null}
        </FormHelperText>
      </FormControl>
    </div>
  );
};

FilterAppllier.propTypes = {
  changed: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    helper: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  filter: PropTypes.string.isRequired,
  isOn: PropTypes.bool.isRequired,
};

export default withStyles(styles, styles, { withTheme: true })(FilterAppllier);
