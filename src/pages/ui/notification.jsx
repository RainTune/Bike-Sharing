import React from 'react';
import {Card, Button, notification} from "antd";

class Notification extends React.Component {
    constructor(props) {
        super(props)
    }
    openNotification(type, direction) {
        direction = direction || 'topRight'
        notification[type]({
            message: '发工资了',
            description: '本月全勤，无旷工',
            placement: direction
        })
    }
    render() {
        return (
            <div className='ui-notification'>
                <Card className={'card-wrap'}>
                    <Button type='default' onClick={() => this.openNotification('success')}>Success</Button>
                    <Button type='dashed' onClick={() => this.openNotification('info')}>Info</Button>
                    <Button type='primary' onClick={() => this.openNotification('warning')}>Warning</Button>
                    <Button type='danger' onClick={() => this.openNotification('error')}>Error</Button>
                </Card>
                <Card className={'card-wrap'}>
                    <Button type='default' onClick={() => this.openNotification('success','topLeft')}>Success</Button>
                    <Button type='dashed' onClick={() => this.openNotification('info')}>Info</Button>
                    <Button type='primary' onClick={() => this.openNotification('warning','bottomRight')}>Warning</Button>
                    <Button type='danger' onClick={() => this.openNotification('error','bottomLeft')}>Error</Button>
                </Card>
            </div>
        )
    }
}
export default Notification