import React, {Component} from 'react';
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
      processors: [
        {_id: 1, name: 'Intel Atom'},
        {_id: 2, name: 'Intel Pentium Gold'},
        {_id: 3, name: 'Core i3'},
        {_id: 4, name: 'Core i5'},
        {_id: 5, name: 'Core i7'},
        {_id: 6, name: 'AMD A4'},
        {_id: 7, name: 'AMD E1'},
        {_id: 8, name: 'AMD A6'},
      ]
    }
  };

  handleFilters = (filters, category) => {
    const newFilters = {...this.state.filters};
    newFilters[category] = filters;
    this.setState({filters: newFilters});
  };

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

