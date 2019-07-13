import React from 'react';
import {Icon} from "antd";
import 'rootSrc/less/navFooter.less';
class NavFooter extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='nav-footer'>
                版权所有@RainTune (使用谷歌浏览器体验更佳！)&nbsp;&nbsp;&nbsp; <Icon type="cloud" />&nbsp;&nbsp;&nbsp;技术支持：RainTune
            </div>
        )
    }
}
export default NavFooter