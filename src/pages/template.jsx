import React from 'react';

import {Link} from "react-router-dom";
import 'rootSrc/less/template.less'
import {Row, Col} from "antd";
import NavHeader from 'rootSrc/components/navHearder.jsx';
class Template extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className={'template'}>
                <Row>
                    <NavHeader headType='second'/>
                </Row>
                <Row className={'content'}>
                    <Col span={24}>
                        {this.props.children}
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Template