import React from 'react';
import NotebookCard from "../products/NotebookCard";
import NotebookListCard from "../products/NoteBookListCard";
import Button from "@material-ui/core/Button";

function Notebooks({notebooks, layout, limit, loadMore}) {

  return (
    <div>
      <div className="row">
          {notebooks.items.map(notebook => (
            layout === 'grid' ?
              <div className="col-lg-4">
                <NotebookCard key={notebook._id} {...notebook} />
              </div>
              :
              <div className="col-lg-12">
                <NotebookListCard key={notebook._id} {...notebook} />
              </div>
          ))}
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
