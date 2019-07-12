import React, {Fragment} from 'react';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {createStyles, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 80
    }
  }),
);

function SortNotebooksBy({onChange=f=>f}) {
  const classes = useStyles();
  return (
    <Fragment>
      <span>Sort by</span>
      <FormControl className={classes.formControl}>
        <Select
          value='price'
          onChange={e => onChange(e)}
          inputProps={{
            name: 'sortBy',
            id: 'sortBy',
          }}
        >
          {['price', 'brand'].map(el =>
            <MenuItem key={el} value={el}>{el}</MenuItem>
          )}
        </Select>
      </FormControl>
    </Fragment>
  );
}

export default SortNotebooksBy;
