import React, {Component} from 'react';
import axios from 'axios';
import CollapseCheckBox from "../util/CollapseCheckBox";
import ViewList from '@material-ui/icons/ViewList';
import {withStyles} from '@material-ui/core/styles';
import ViewModule from '@material-ui/icons/ViewModule';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Notebooks from "../Notebooks/Notebooks";
import NotebooksPerPage from "../Notebooks/NotebooksPerPage";
import SortNotebooksBy from "../Notebooks/SortNotebooksBy";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  button: {
    margin: theme.spacing(1),
  },
  inputLabel: {
    // transform: 'translate(0, 8px) scale(1)'
  },
  active: {
    color: 'blue'
  }
});

class Products extends Component {
  state = {
    layout: 'grid',
    search: {
      filters: {
        brand: [],
        processor: []
      },
      limit: 4,
      skip: 0,
    },
    brands: [],
    processors: [],
    notebooks: {
      items: [],
      length: 0
    }
  };

  handleFilters = async (filters, category) => {
    const {search} = this.state;

    const newFilters = {...search.filters};
    newFilters[category] = filters;

    const res = await axios.post('http://localhost:8000/api/notebooks/search', {
      ...search,
      filters: newFilters
    });

    const {notebooks, size} = res.data;
    this.setState({
      search: {
        ...search,
        filters: newFilters,
      },
      notebooks: {
        items: notebooks,
        length: size
      }
    })
  };

  setLayout = (layout) => {
    this.setState({layout});
  };

  handleNumberOfProductChange = async (event) => {
    const {search} = this.state;
    const limit = event.target.value;
    const res = await axios.post('http://localhost:8000/api/notebooks/search', {
      ...search,
      limit
    });
    const {notebooks, size} = res.data;

    this.setState({
      notebooks: {
        items: notebooks,
        length: size
      },
      search: {
        ...this.state.search,
        limit
      }
    })
  };

  async componentDidMount() {
    const {search} = this.state;
    const processorsPromise = axios.get('http://localhost:8000/api/processors');
    const brandsPromise = axios.get('http://localhost:8000/api/brands');
    const notebooksPromise = axios.post('http://localhost:8000/api/notebooks/search', {...search});
    const [processorsResponse, brandsResponse, notebooksResponse] = await Promise.all([processorsPromise, brandsPromise, notebooksPromise]);

    this.setState({
      brands: brandsResponse.data,
      processors: processorsResponse.data,
      notebooks: {
        items: notebooksResponse.data.notebooks,
        length: notebooksResponse.data.size
      }
    });

    window.addEventListener('scroll', this.handleScrollEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollEvent);
  }

  handleScrollEvent = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    if(this.state.notebooks.length >= this.state.search.limit) {
      this.loadMoreNotebooks();
    }
  };

  loadMoreNotebooks = async () => {
    const {search} = this.state;
    const skip = search.skip + search.limit;
    const response = await axios.post('http://localhost:8000/api/notebooks/search', {...search, skip});
    const notebooks = [...this.state.notebooks.items, ...response.data.notebooks];

    this.setState({
      notebooks: {
        items: notebooks,
        length: response.data.size
      },
      search: {
        ...search,
        skip
      }
    });
  };

  render() {
    console.log(this.state.search)
    const {classes} = this.props;
    const {brands, processors, layout, search} = this.state;

    const {limit} = search;

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-sm-6 col-xs-12">
            <CollapseCheckBox
              open
              title="Brands"
              list={brands}
              handleFilters={(filters) =>
                this.handleFilters(filters, 'brand'
              )}
            />

            <CollapseCheckBox
              open
              title="Processor"
              list={processors}
              handleFilters={(filters) =>
                this.handleFilters(filters, 'processor'
              )}
            />
          </div>
          <div className="col-lg-8">

            <SortNotebooksBy />

            <NotebooksPerPage
              onChange={this.handleNumberOfProductChange}
              limit={limit}
            />

            <IconButton onClick={() => this.setLayout('grid')}>
              <ViewModule
                className={layout === 'grid' ? classes.active : ''}
              />
            </IconButton>
            <IconButton onClick={() => this.setLayout('list')}>
              <ViewList
                className={layout === 'list' ? classes.active : ''}
              />
            </IconButton>

            <Notebooks
              notebooks={this.state.notebooks}
              layout={layout}
              limit={limit}
              loadMore={this.loadMoreNotebooks}
            />

          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Products);

