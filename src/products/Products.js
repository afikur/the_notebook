import React, {Component} from 'react';
import axios from 'axios';
import CollapseCheckBox from "../util/CollapseCheckBox";
import NotebookCard from "./NotebookCard";
import NotebookListCard from "./NoteBookListCard";
import ViewList from '@material-ui/icons/ViewList';
import {withStyles} from '@material-ui/core/styles';
import ViewModule from '@material-ui/icons/ViewModule';
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import IconButton from "@material-ui/core/IconButton/IconButton";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
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
    products: {
      layout: 'grid',
      filters: {
        brand: [],
        processor: []
      },
      limit: '',
      brands: [],
      processors: [],
      notebooks: []
    }
  };

  handleFilters = async (filters, category) => {
    const newFilters = {...this.state.filters};
    newFilters[category] = filters;

    const res = await axios.post('http://localhost:8000/api/notebooks/search', {
      limit: this.state.products.limit,
      filters: newFilters
    });
    const {notebooks} = res.data;

    this.setState({
      products: {
        ...this.state.products,
        filters: newFilters,
        notebooks
      }
    })
  };

  setLayout = (layout) => {
    this.setState({
      products: {
        ...this.state.products,
        layout
      }
    });
  };

  handleNumberOfProductChange = async (event) => {
    const limit = event.target.value;
    const res = await axios.post('http://localhost:8000/api/notebooks/search', {
      limit: limit,
      filters: this.state.products.filters
    });
    const {notebooks} = res.data;
    console.log(this.state.products);
    this.setState({
      products: {
        ...this.state.products,
        notebooks,
        limit
      }
    })
  };

  async componentDidMount() {
    const processorsPromise = axios.get('http://localhost:8000/api/processors');
    const brandsPromise = axios.get('http://localhost:8000/api/brands');
    const notebooksPromise = axios.post('http://localhost:8000/api/notebooks/search');
    const [processorsResponse, brandsResponse, notebooksResponse] = await Promise.all([processorsPromise, brandsPromise, notebooksPromise]);
    this.setState({
      products: {
        ...this.state.products,
        brands: brandsResponse.data,
        processors: processorsResponse.data,
        notebooks: notebooksResponse.data.notebooks
      }
    });
  }

  render() {
    const {classes} = this.props;
    const {products} = this.state;
    const {notebooks, layout} = products;

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-sm-6 col-xs-12">
            <CollapseCheckBox
              open
              title="Brands"
              list={products.brands}
              handleFilters={(filters) =>
                this.handleFilters(filters, 'brand'
              )}
            />

            <CollapseCheckBox
              open
              title="Processor"
              list={products.processors}
              handleFilters={(filters) =>
                this.handleFilters(filters, 'processor'
              )}
            />
          </div>
          <div className="col-lg-8">
            <FormControl className={classes.formControl}>
              <InputLabel className={classes.inputLabel} htmlFor="sortBy">Sort</InputLabel>
              <Select
                value=''
                inputProps={{
                  name: 'sortBy',
                  id: 'sortBy',
                }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel className={classes.inputLabel} htmlFor="showItemsPerPage">Show per page</InputLabel>
              <Select
                value={this.state.products.limit}
                onChange={this.handleNumberOfProductChange}
                inputProps={{
                  name: 'showItemsPerPage',
                  id: 'showItemsPerPage',
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>

            <IconButton onClick={() => this.setLayout('grid')}>
              <ViewModule
                className={this.state.products.layout === 'grid' ? classes.active : ''}
              />
            </IconButton>
            <IconButton onClick={() => this.setLayout('list')}>
              <ViewList
                className={this.state.products.layout === 'list' ? classes.active : ''}
              />
            </IconButton>
            <div className="row">
            {notebooks && notebooks.map(notebook => (
              layout === 'grid' ?
                <NotebookCard key={notebook._id} {...notebook} />
                :
                <NotebookListCard key={notebook._id} {...notebook} />
              )
            )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Products);

