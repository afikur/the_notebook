import React, {Fragment} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
    }
  })
);

function NotebooksPerPage({limit, onChange}) {
  const classes = useStyles();

  return (
    <Fragment>
      <span>Show</span>
      <FormControl className={classes.formControl}>
        <Select
          value={limit}
          onChange={e => onChange(e)}
          inputProps={{
            name: 'showItemsPerPage',
            id: 'showItemsPerPage',
          }}
        >
          {[4, 6, 8, 10 ,12].map(num =>
            <MenuItem key={num} value={num}>{num}</MenuItem>
          )}

        </Select>
      </FormControl>
    </Fragment>
  );
}

export default NotebooksPerPage;
