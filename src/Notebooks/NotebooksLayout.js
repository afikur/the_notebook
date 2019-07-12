import React, {Fragment} from 'react';
import IconButton from "@material-ui/core/IconButton/IconButton";
import {makeStyles} from '@material-ui/core/styles';
import ViewList from '@material-ui/icons/ViewList';
import ViewModule from '@material-ui/icons/ViewModule';

const styles = makeStyles(() => ({
  active: {
    color: 'blue'
  }
}));

function NotebooksLayout({layout, onSet}) {
  const classes = styles();
  return (
    <Fragment>
      <IconButton onClick={() => onSet('grid')}>
        <ViewModule
          className={layout === 'grid' ? classes.active : ''}
        />
      </IconButton>
      <IconButton onClick={() => onSet('list')}>
        <ViewList
          className={layout === 'list' ? classes.active : ''}
        />
      </IconButton>
    </Fragment>
  );
}

export default NotebooksLayout;
