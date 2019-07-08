import React, {Component} from 'react';
import axios from 'axios';
import CollapseCheckBox from "../util/CollapseCheckBox";

class Products extends Component {
  state = {
    products: {
      grid: '',
      filters: {
        brand: [],
        processor: []
      },
      brands: [],
      processors: []
    }
  };

  handleFilters = (filters, category) => {
    const newFilters = {...this.state.filters};
    newFilters[category] = filters;
    this.setState({filters: newFilters});
  };

  async componentDidMount() {
    const processorsPromise = axios.get('http://localhost:8000/api/processors');
    const brandsPromise = axios.get('http://localhost:8000/api/brands');
    const [processorsRes, brandsRes] = await Promise.all([processorsPromise, brandsPromise]);
    this.setState({
      products: {
        ...this.state.products,
        brands: brandsRes.data,
        processors: processorsRes.data
      }
    });
  }

  render() {
    console.log(this.state.filters)
    const {products} = this.state;
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
              open={false}
              title="Processor"
              list={products.processors}
              handleFilters={(filters) =>
                this.handleFilters(filters, 'processor'
              )}
            />
          </div>
          <div className="col-lg-8">Right</div>
        </div>
      </div>
    );
  }
}

export default Products;

