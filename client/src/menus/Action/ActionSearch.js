import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CONSTRAINED, FIXED } from '../../store/actionTypes';
import { search, saveAutoSave } from '../../store/actionCreators';
import { logUsage } from '../../logUsage';
import { displayMessage } from '../../components/MessageModal';

class ActionSearch extends Component {

    constructor(props) {
        super(props);
        this.onSearchRequest = this.onSearchRequest.bind(this);
    }

    onSearchRequest(event) {
//        console.log('In ActionSearch.onSearchRequest this=',this,'event=',event);
        var warnMsg = '';
        if (this.props.objective_value <= this.props.system_controls.objmin.value) {
            warnMsg += 'Objective Value less than OBJMIN. There is nothing for Search to do. Consider using Seek; ';
        }
        if (Object.entries(this.props.symbol_table).reduce((total, element)=>{return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total+1 : total+0}, 0) === 0) {
            warnMsg += 'No free independent variables; ';
        }
        if (Object.entries(this.props.symbol_table).reduce((total, element)=>{return (element.type === "equationset" && element.input) && Number.isNaN(element.value) ? total+1 : total+0}, 0) !== 0) {
            warnMsg += 'One (or more) Independent Variable(s) is (are) Not a Number; ';
        }
        if (Number.isNaN(this.props.objective_value)) {
            warnMsg += 'Objective Value is Not a Number. Check constraint values; ';
        }
        Object.entries(this.props.symbol_table).forEach((element) => { // For each Symbol Table entry
            if (element.type !== undefined && element.type !== "table" && element.lmin === CONSTRAINED && element.lmax === CONSTRAINED && element.cmin > element.cmax) {
                warnMsg += (element.name + ' constraints are inconsistent; ');
            }
        });
        if (warnMsg !== '') {
            displayMessage(warnMsg,'warning');
        } else {
            var old_objective_value = this.props.objective_value.toPrecision(4);
            this.props.saveAutoSave();
            this.props.search();
            const { store } = this.context;
            var design = store.getState();
            var new_objective_value = design.model.result.objective_value.toPrecision(4)
            logUsage('event', 'ActionSearch', { event_label: old_objective_value + ' --> ' + new_objective_value});
        }
    }

    render() {
//        console.log('In ActionSearch.render this=',this);

        var display_search_button;
        if (this.props.objective_value > this.props.system_controls.objmin.value) {
            display_search_button = true;
        } else {
            display_search_button = false;
        }

        return (
            <>
                <NavDropdown.Item onClick={this.onSearchRequest} disabled={!display_search_button}>
                    Search (solve)
                </NavDropdown.Item>
            </>
        );
    }
}

ActionSearch.contextTypes = {
    store: PropTypes.object
};

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value,
});

const mapDispatchToProps = {
    search: search,
    saveAutoSave: saveAutoSave
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionSearch);
