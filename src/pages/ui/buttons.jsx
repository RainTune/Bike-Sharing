import React from 'react';
import {Card, Button, Radio, Icon} from "antd";
import 'rootSrc/less/ui/ui.less';
class Buttons extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            size: 'default'
        }
    }
    setLoading() {
        this.setState({
            loading: !this.state.loading
        })
    }
    setSize(e) {
        this.setState({
            size: e.target.value
        })
    }
    render() {
        return (
            <div className='ui-buttons'>
                <Card title={'基础按钮'} className={'card-wrap'}>
                    <Button type='primary'>primary</Button>
                    <Button type='default'>default</Button>
                    <Button type='dashed'>dashed</Button>
                    <Button type='danger'>danger</Button>
                    <Button type='link'>link</Button>
                    <Button disabled={true}>disabled</Button>
                </Card>
                <Card title={'图形按钮'} className={'card-wrap'}>
                    <Button icon='plus'>添加</Button>
                    <Button icon='delete'>删除</Button>
                    <Button icon='edit'>修改</Button>
                    <Button icon='search' type='dashed'>查询</Button>
                    <Button icon='search' shape='circle'/>
                    <Button icon='download' type='primary'>download</Button>
                </Card>
                <Card title={'loading按钮'} className={'card-wrap'}>
                    <Button loading={this.state.loading}>确定</Button>
                    <Button loading={this.state.loading}/>
                    <Button loading={this.state.loading} shape='circle-outline'/>
                    <Button loading={this.state.loading} shape='circle'/>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button type='primary' onClick={() => {this.setLoading()}}>
                        {this.state.loading
                            ? <Icon type='poweroff'/>
                            :<span>开启</span>
                        }
                    </Button>
                </Card>
                <Card title={'loading按钮'}>
                    <Button.Group>
                        <Button><Icon type='left'/>返回</Button>
                        <Button icon='right' type='primary'>下一步</Button>
                    </Button.Group>
                </Card>
                <Card title={'按钮尺寸'} className='card-wrap'>
                    <Radio.Group value={this.state.size} onChange={(e) => this.setSize(e)}>
                        <Radio value='small'>小</Radio>
                        <Radio value='default'>中</Radio>
                        <Radio value='large'>大</Radio>
                    </Radio.Group>
                    <Button type='primary' size={this.state.size}>primary</Button>
                    <Button type='default' size={this.state.size}>default</Button>
                    <Button type='dashed' size={this.state.size}>dashed</Button>
                    <Button type='danger' size={this.state.size}>danger</Button>
                </Card>
            </div>
        )
    }
}
export default Buttons