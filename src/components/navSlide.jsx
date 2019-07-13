import React from 'react';
import 'rootSrc/less/navSlide.less'
import {NavLink} from "react-router-dom";
import {Col, Menu, Icon} from "antd";
import data from 'rootSrc/resource/menuConfig.js';
import logoImg from 'rootSrc/resource/logo.jpg';

import {connect} from "react-redux";
import {changeTitle} from "rootSrc/pages/redux/action.jsx";


const { SubMenu }  = Menu;

class NavSlide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList : []
        }
    }
    componentWillMount() {
        let res = this.getMenuList(data);
        let currentKey = window.location.hash.replace(/#|\?.*$/g, '');
        /*console.log(currentKey);*/
        this.setState({
            menuList: res,
            currentKey: [currentKey]
        })
    }
    getMenuList(menu) {
        return  menu.map((item) => {
            if(item.children) {
                return (
                    <SubMenu key = {item.key} title={item.title}>
                    {this.getMenuList(item.children)}
                    </SubMenu>
                )
            }else {
                return <Menu.Item key={item.key} title={item.title}>
                    <NavLink to = {item.key}>{item.title}</NavLink>
                </Menu.Item>
            }
        });
    }
    menuClick(item) {
        const {dispatch} = this.props;
        dispatch(changeTitle(item.item.props.title));
        this.setState({
            currentKey: [item.key]
        })
    }
    render() {
        return (
            <div className={'nav-slide'}>
                <div className="logo">
                    <img src={logoImg}/>
                    <span>RainTune</span>
                </div>

                <Menu
                    onClick={(item) => this.menuClick(item)}
                    mode="vertical"
                    className="menu-list"
                    selectedKeys={this.state.currentKey }
                >
                    {this.state.menuList}
                </Menu>

            </div>
        )
    }
}
export default connect()(NavSlide)