import React from 'react';
import {Modal, Card, Button, Icon} from "antd";
import 'rootSrc/less/ui/ui.less';
class Modals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalFlag1: false,
            modalFlag2: false,
            modalFlag3: false,
            modalFlag4: false,
            loading: false
        }
    }
    openModal(type) {
        this.setState({
            [type]: true
        })
    }
    handleOK(type) {
        if(type === 'modalFlag2') {
            this.setState({
                loading: true
            },()=>{
                setTimeout(() => {
                    this.setState({
                        [type]: false,
                        loading: false
                    })
                },3000)
            });
        }else {
            this.setState({
                [type]: false
            })
        }

    }
    handleCancel(type) {
        this.setState({
            [type]: false
        })
    }
    openModalConfirm(type) {
        Modal[type]({
            title: 'Rain Tune',
            content: '你确认你牛逼吗？',
            onOk() {
                console.log('ok')
            },
            onCancel() {
                console.log('cancel')
            }
        })
    }
    render() {
        return (
            <div className='ui-modals'>
                <Card title={'基础模态框'} className={'card-wrap'}>
                    <Button onClick={() => this.openModal('modalFlag1')}>default</Button>
                    <Button onClick={() => this.openModal('modalFlag2')}>自定义</Button>
                    <Button onClick={() => this.openModal('modalFlag3')}>距离顶部特定距离</Button>
                    <Button onClick={() => this.openModal('modalFlag4')}>水平垂直居中</Button>
                </Card>
                <Card title={'信息确认框'} className={'card-wrap'}>
                    <Button onClick={() => this.openModalConfirm('info')}>info</Button>
                    <Button onClick={() => this.openModalConfirm('success')}>success</Button>
                    <Button onClick={() => this.openModalConfirm('error')}>error</Button>
                    <Button onClick={() => this.openModalConfirm('warning')}>warning</Button>
                </Card>
                <Modal
                    title={'Basic Modal'}
                    visible={this.state.modalFlag1}
                    onOk={() => this.handleOK('modalFlag1')}
                    onCancel={() => this.handleCancel('modalFlag1')}
                >
                    欢迎进入基本模态框页面
                </Modal>
                <Modal
                    title={'Basic Modal'}
                    visible={this.state.modalFlag2}
                    /*onOk={() => this.handleOK('modalFlag2')}
                    onCancel={() => this.handleCancel('modalFlag2')}
                    okButtonProps={{type:'primary',icon: 'loading'}}*/
                    footer={[
                        <Button type='dashed' key='1' onClick={() => this.handleCancel('modalFlag2')}>返回</Button>,
                        <Button type='primary' key='2' loading={this.state.loading} onClick={() => this.handleOK('modalFlag2')}>下一步</Button>
                    ]}
                >
                    欢迎进入自定义模态框页面
                </Modal>
                <Modal
                    title={'Basic Modal'}
                    visible={this.state.modalFlag3}
                    onOk={() => this.handleOK('modalFlag3')}
                    onCancel={() => this.handleCancel('modalFlag3')}
                    style={{top:10}}
                    okText={'好的'}
                    cancelText={'算了'}
                >
                    欢迎进入距离顶部特定距离模态框页面
                </Modal>
                <Modal
                    title={'Basic Modal'}
                    visible={this.state.modalFlag4}
                    onOk={() => this.handleOK('modalFlag4')}
                    onCancel={() => this.handleCancel('modalFlag4')}
                    centered={true}
                >
                    欢迎进入水平垂直居中模态框页面
                </Modal>
            </div>
        )
    }
}
export default Modals