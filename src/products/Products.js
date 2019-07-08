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
      brands: [
        {_id: 1, name: 'Asus'},
        {_id: 2, name: 'Dell'},
        {_id: 3, name: 'Apple'},
        {_id: 4, name: 'Lenovo'},
        {_id: 5, name: 'Sony Vio'},
        {_id: 6, name: 'HP'},
      ],
      processors: []
    }
  };

  handleFilters = (filters, category) => {
    const newFilters = {...this.state.filters};
    newFilters[category] = filters;
    this.setState({filters: newFilters});
  };

  componentDidMount() {
    axios.get('http://localhost:8000/api/processors')
      .then(response => {
        const processors = response.data;
        this.setState({
          products: {...this.state.products, processors}
        });
      })
      .catch(err => console.log(err));
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

