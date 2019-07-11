import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    width: '100%',
    marginBottom: '15px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 300,
    height: 220
  },
}));

function NotebookListCard({name, image, brand, price, description}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        image={image[0]}
        title={name}
        alt={name}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {brand.name}
          </Typography>
          <Typography>
            {description}
          </Typography>
          <Typography>
            {price}
          </Typography>
        </CardContent>

      </div>
    </Card>
  );
}

export default NotebookListCard;
