import React from 'react';
import {Button, Card, message} from "antd";
import 'rootSrc/less/ui/ui.less';
class Message extends React.Component {
    constructor(props) {
        super(props)
    }
    openMessage(type) {
        message[type](`This is a ${type} message`);
    }
    render() {
        return (
            <div className='ui-message'>
               <Card className='card-wrap' title='信息提示'>
                   <Button type='primary' onClick={() => this.openMessage('success')}>成功提示</Button>
                   <Button type='default' onClick={() => this.openMessage('info')}>信息提示</Button>
                   <Button type='dashed' onClick={() => this.openMessage('warning')}>警告提示1</Button>
                   <Button type='danger' onClick={() => this.openMessage('error')}>错误提示</Button>
                   <Button type='default' onClick={() => this.openMessage('warn')}>警告提示2</Button>
                   <Button type='default' onClick={() => this.openMessage('loading')}>加载提示</Button>
               </Card>
            </div>
        )
    }
}
export default Message