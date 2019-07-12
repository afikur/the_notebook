import React from 'react';
import Button from "@material-ui/core/Button";
import SentimentDissatisfied from '@material-ui/icons/SentimentDissatisfied';
import NotebookGridCard from "./NotebookGridCard";
import NotebookListCard from "./NoteBookListCard";

function Notebooks({notebooks, layout, limit, loadMore}) {
  function getNotebooks() {
    return (
      notebooks.items.length <= 0 ?
        <div className="col-lg-12 center-xs">
          <SentimentDissatisfied style={{fontSize: '2.5em', color: 'blue', marginTop: '68px'}}/>
          <p>Sorry! No Notebooks available right now</p>
        </div>
        :
        notebooks.items.map(notebook => (
          layout === 'grid' ?
            <div className="col-lg-4">
              <NotebookGridCard key={notebook._id} {...notebook} />
            </div>
            :
            <div className="col-lg-12">
              <NotebookListCard key={notebook._id} {...notebook} />
            </div>
          ))
    )
  }
  return (
    <div>
      <div className="row">
        {getNotebooks()}
      </div>
      <div className="row">
        <div className="col-xs-offset-4 col-xs-4">
          {notebooks.length >= limit ?
            <Button
              variant="contained"
              color="primary"
              onClick={loadMore}
              fullWidth
            >
              Load more
            </Button>
            :
            null
          }
        </div>
      </div>
    </div>
  );
}

export default Notebooks;
