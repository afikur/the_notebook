import React from 'react';
import CollapseCheckBox from "../common/CollapseCheckBox";
import axios from "axios";

class CollapsibleCheckboxes extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      processors: []
    }
  }

  async componentDidMount() {
    const processorsPromise = axios.get('http://localhost:8000/api/processors');
    const brandsPromise = axios.get('http://localhost:8000/api/brands');
    const [processorsResponse, brandsResponse] = await Promise.all([processorsPromise, brandsPromise]);
    this.setState({
      brands: brandsResponse.data,
      processors: processorsResponse.data
    });
  }

  render() {
    const { brands, processors } = this.state;
    const { onCheck } = this.props;
    return (
      <div>
        <CollapseCheckBox
          open
          title="Brands"
          list={brands}
          onCheck={filters => onCheck(filters, 'brand')}
        />

        <CollapseCheckBox
          open
          title="Processor"
          list={processors}
          onCheck={filters => onCheck(filters, 'processor')}
        />
      </div>
    );
  }
}

export default CollapsibleCheckboxes;
