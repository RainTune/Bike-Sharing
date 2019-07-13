import React from 'react';

import {Link} from "react-router-dom";

import {Row, Col} from "antd";
import NavSlide from 'rootSrc/components/navSlide.jsx';
import NavHeader from 'rootSrc/components/navHearder.jsx';
import NavFooter from 'rootSrc/components/navFooter.jsx';
import 'rootSrc/less/main.less';
class Common extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <Row>
                <Col span={4}>
                    <NavSlide/>
                </Col>
                <Col span={20} className={'main'}>
                    <NavHeader/>
                    <div className="my_content">
                        {this.props.children}
                    </div>
                    <NavFooter/>
                </Col>
            </Row>
        )
    }
}
export default Common