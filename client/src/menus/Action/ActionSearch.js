import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { search } from '../../store/actionCreators';

class ActionSearch extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        this.props.search();
    }

    render() {
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle}>
                    Search
                </NavDropdown.Item>
            </React.Fragment>
        );
    }
}  

const mapDispatchToProps = {
    search: search
};

export default connect(null, mapDispatchToProps)(ActionSearch);
