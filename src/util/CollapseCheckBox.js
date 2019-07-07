import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import CollapseCheckboxTitle from "./CollapseCheckboxTitle";

class CollapseCheckBox extends Component {
  state = {
    open: false,
    checked: []
  };

  componentDidMount() {
    this.setState({open: this.props.open})
  }

  toggleOpen = () => {
    this.setState({open: !this.state.open});
  };

  handleCheckboxToggle = value => ()=> {
    const {checked} = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    }, () => {
      this.props.handleFilters(newChecked);
    });
  };

  renderCheckboxList = () => {
    const {checked} = this.state;
    return this.props.list ?
      this.props.list.map(item => (
        <ListItem
          key={item._id}
          onClick={this.handleCheckboxToggle(item._id)}
          button
        >
          <ListItemText primary={item.name}/>
          <ListItemSecondaryAction>
            <Checkbox
              color="primary"
              checked={checked.indexOf(item._id) !== -1}
              onChange={this.handleCheckboxToggle(item._id)}
            />
          </ListItemSecondaryAction>
        </ListItem>
      ))
      :
      null;
  };

  render() {
    const {open} = this.state;
    const {title} = this.props;
    return (
      <div>
        <CollapseCheckboxTitle
          open={open}
          title={title}
          toggleOpen={this.toggleOpen}
        />
        <Collapse
          in={open}
          timeout="auto"
        >
          <List component="div" disablePadding>
            {this.renderCheckboxList()}
          </List>
        </Collapse>
      </div>
    );
  }
}

export default CollapseCheckBox;
