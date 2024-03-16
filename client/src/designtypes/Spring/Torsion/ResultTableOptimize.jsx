import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED } from '../../../store/actionTypes';
import { seek, saveAutoSave } from '../../../store/modelSlice';
import { logUsage } from '../../../logUsage';
import * as sto from './symbol_table_offsets';

export class ResultTableOptimize extends Component {

    constructor(props) {
//        console.log('In ResultTableOptimize.constructor props=',props);
        super(props);
        this.onOptimizeSeekMINWeight = this.onOptimizeSeekMINWeight.bind(this);
        this.onOptimizeSeekMAXCycle_Life = this.onOptimizeSeekMAXCycle_Life.bind(this);
        this.onOptimizeSeekMINRate = this.onOptimizeSeekMINRate.bind(this);
        this.onOptimizeSeekMAXStroke = this.onOptimizeSeekMAXStroke.bind(this);
    }

    onOptimizeSeekMINWeight(event) {
//        console.log('In ResultTableOptimize.onOptimizeSeekMINWeight','event=',event);
        logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MIN Weight button' });
        this.props.saveAutoSave();
        this.props.seek('Weight', MIN);
        this.props.onClick(event);
    }

    onOptimizeSeekMAXCycle_Life(event) {
//        console.log('In ResultTableOptimize.onOptimizeSeekMAXCycle_Life','event=',event);
        logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MAX Cycle_Life button' });
        this.props.saveAutoSave();
        this.props.seek('Cycle_Life', MAX);
        this.props.onClick(event);
    }

    onOptimizeSeekMINRate(event) {
//        console.log('In ResultTableOptimize.onOptimizeSeekMINRate','event=',event);
        logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MIN Rate button' });
        this.props.saveAutoSave();
        this.props.seek('Rate', MIN);
        this.props.onClick(event);
    }

    onOptimizeSeekMAXStroke(event) {
//        console.log('In ResultTableOptimize.onOptimizeSeekMAXStroke','event=',event);
        logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MAX Stroke button' });
        this.props.saveAutoSave();
        this.props.seek('Stroke', MAX);
        this.props.onClick(event);
    }

    render() {
//        console.log('In ResultTableOptimize.render');
        return (
            <>
                <p>Select a pre-configured Seek optimization:</p>
                <Table borderless="true" size="sm">
                    <tbody>
                        <tr>
                            <td width="50%">
                                <Button variant="primary" disabled={this.props.symbol_table[sto.Weight].lmin & FIXED ? true : false} onClick={this.onOptimizeSeekMINWeight}>Seek MIN Weight</Button>
                            </td>
                            <td width="50%">
                                <Button variant="primary" disabled={this.props.symbol_table[sto.Cycle_Life].lmin & FIXED ? true : false} onClick={this.onOptimizeSeekMAXCycle_Life}>Seek MAX Cycle_Life</Button>
                            </td>
                        </tr>
                        <tr>
                            <td width="50%">
                                <Button variant="primary" disabled={this.props.symbol_table[sto.Rate].lmin & FIXED ? true : false} onClick={this.onOptimizeSeekMINRate}>Seek MIN Rate</Button>
                            </td>
                            <td width="50%">
                                <Button variant="primary" disabled={this.props.symbol_table[sto.Stroke].lmin & FIXED ? true : false} onClick={this.onOptimizeSeekMAXStroke}>Seek MAX Stroke</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </>
        );
    }
}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
});

const mapDispatchToProps = {
    seek: seek,
    saveAutoSave: saveAutoSave
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultTableOptimize);
