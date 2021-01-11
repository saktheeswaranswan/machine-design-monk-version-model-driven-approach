import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';

class ConstraintMaxHeaderDependentVariable extends Component {

    render() {
//        console.log('In ConstraintMaxHeaderDependentVariable.render this=',this);
        return (
            <React.Fragment>
                <tr>
                    <th className="text-center bg-secondary text-white" colSpan="4" id="DVMaxConstraintTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Upper limits on Dependent Variables</Tooltip>}>
                            <span>DV Max Constraint</span>
                        </OverlayTrigger>
                    </th>
                </tr>
                <tr>
                    <th className="text-left d-lg-none" id="DVMaxConstraintNameTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip className="d-lg-none">Variable names</Tooltip>}>
                            <span>Name</span>
                        </OverlayTrigger>
                    </th>
                    <th className="text-left" id="DVMaxConstraintConstrainTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Check box to establish upper limit</Tooltip>}>
                            <span>Constrain</span>
                        </OverlayTrigger>
                    </th>
                    <th className="text-center" id="DVMaxConstraintValueTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Enter value for upper limit</Tooltip>}>
                            <span>Value</span>
                        </OverlayTrigger>
                    </th>
                    <th className={"text-right " + (this.props.system_controls.show_violations ? "" : "d-none")} id="DVMaxConstraintViolationTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Measure of constraint <br />satisfaction (-) or violation (+)</Tooltip>}>
                            <span>Violation</span>
                        </OverlayTrigger>
                    </th>
                </tr>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    system_controls: state.model.system_controls
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ConstraintMaxHeaderDependentVariable);
