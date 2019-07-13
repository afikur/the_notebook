import React, {Component} from 'react';
import axios from 'axios';
import Notebooks from "./Notebooks";
import NotebooksPerPage from "./NotebooksPerPage";
import SortNotebooksBy from "./SortNotebooksBy";
import CollapsibleCheckboxes from "./CollapsibleCheckboxes";
import NotebooksLayout from "./NotebooksLayout";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import IconButton from "@material-ui/core/IconButton";
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

class NotebooksPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layout: 'grid',
      search: {
        filters: {
          brand: [],
          processor: []
        },
        sortBy: 'name',
        limit: 4,
        skip: 0,
        order: 'asc'
      },
      notebooks: {
        items: [],
        length: 0
      },
      loading: false
    };

    this.handleFilters = this.handleFilters.bind(this);
    this.setLayout = this.setLayout.bind(this);
    this.handleScrollEvent = this.handleScrollEvent.bind(this);
    this.loadMoreNotebooks = this.loadMoreNotebooks.bind(this);
    this.handleNotebooksSorting = this.handleNotebooksSorting.bind(this);
    this.toggleOrder = this.toggleOrder.bind(this);
  }

  async handleFilters(filters, category) {
    const {search} = this.state;

    const newFilters = {...search.filters};
    newFilters[category] = filters;

    const res = await axios.post('http://localhost:8000/api/notebooks/search', {
      ...search,
      skip: 0,
      filters: newFilters
    });

    const {notebooks, size} = res.data;
    this.setState({
      search: {
        ...search,
        filters: newFilters,
        skip: 0
      },
      notebooks: {
        items: notebooks,
        length: size
      }
    })
  };

  setLayout(layout) {
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
    this.setState({loading: true});
    const notebooksResponse = await axios.post('http://localhost:8000/api/notebooks/search', {...search});

    this.setState({
      loading: false,
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

  handleScrollEvent() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    if(this.state.notebooks.length >= this.state.search.limit) {
      this.loadMoreNotebooks();
    }
  };

  async toggleOrder() {
    const {search} = this.state;
    const order = this.state.search.order === 'asc' ? 'desc' : 'asc';

    const response = await axios.post('http://localhost:8000/api/notebooks/search', {...search, skip: 0, order});

    this.setState({
      notebooks: {
        items: response.data.notebooks,
        length: response.data.size
      },
      search: {
        ...this.state.search,
        skip: 0,
        order
      }
    });
  }

  async loadMoreNotebooks() {
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

  async handleNotebooksSorting(event) {
    const sortBy = event.target.value;
    const {search} = this.state;
    const response = await axios.post('http://localhost:8000/api/notebooks/search', {...search, skip: 0, sortBy});

    this.setState({
      notebooks: {
        items: response.data.notebooks,
        length: response.data.size
      },
      search: {
        ...search,
        skip: 0,
        sortBy
      }
    });
  }

  render() {
    const {layout, search} = this.state;
    const {limit} = search;

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-sm-6 col-xs-12">
            <CollapsibleCheckboxes onCheck={this.handleFilters} />
          </div>
          <div className="col-lg-8">
            <SortNotebooksBy
              onChange={this.handleNotebooksSorting}
              sortBy={search.sortBy}
            />

            <IconButton onClick={this.toggleOrder}>
              {search.order === 'asc' ?
                <ArrowDownward/> :
                <ArrowUpward />
              }
            </IconButton>

            <NotebooksPerPage
              onChange={this.handleNumberOfProductChange}
              limit={limit}
            />

            <NotebooksLayout
              onSet={this.setLayout}
              layout={layout}
            />
            {this.state.loading ?
              <LinearProgress />
              :
              <Notebooks
                notebooks={this.state.notebooks}
                layout={layout}
                limit={limit}
                loadMore={this.loadMoreNotebooks}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default NotebooksPage;
