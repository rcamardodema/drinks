import PropTypes from "prop-types";

import { useState, useRef } from "react";

import { InputBase, CircularProgress } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  search: {
    color: theme.palette.primary.main,
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
});

const SearchInput = (props) => {
  const { classes, onSearch } = props;

  const [isTyping, setIsTyping] = useState(false);

  const inputRef = useRef();

  const inputChangeHandler = (value) => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      if (value === inputRef.current.value) {
        clearTimeout(timer);
        setIsTyping(false);
        onSearch(value);
      }
    }, 600);
  };

  return (
    <>
      {isTyping && <CircularProgress color="primary" />}
      <InputBase
        autoFocus
        onChange={(e) => {
          inputChangeHandler(e.target.value);
        }}
        inputRef={inputRef}
        className={classes.search}
        startAdornment={
          <Search color="primary" className={classes.searchIcon} />
        }
        placeholder="Search..."
      />
    </>
  );
};

SearchInput.propTypes = {
  classes: PropTypes.shape({
    search: PropTypes.string.isRequired,
    searchIcon: PropTypes.string.isRequired,
  }).isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchInput);
