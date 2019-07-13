import React from 'react';
import {message, Card, Tabs, Icon} from "antd";

const TabPane = Tabs.TabPane;
class UITabs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            paneList: [],
            activeKey: ''
        };
        this.newTabIndex = 0;
    }
    handleTab(activeKey){
        message.info('您点击的是第'+activeKey+'标签')
    }
    handleTabChange(activeKey) {
        this.setState({
            activeKey
        })
    }
    onEdit(targetKey, action){
        this[action](targetKey);
    };

    add(){
        const paneList = this.state.paneList;
        const activeKey = `newTab${this.newTabIndex++}`;
        paneList.push({ title: activeKey, content: 'New Tab Pane', key: activeKey });
        this.setState({ paneList, activeKey });
    };

    remove(targetKey){
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.paneList.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const paneList = this.state.paneList.filter(pane => pane.key !== targetKey);
        if (paneList.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = paneList[lastIndex].key;
            } else {
                activeKey = paneList[0].key;
            }
        }
        this.setState({ paneList, activeKey });
    };
    componentWillMount() {
        const paneList = [
            {
                title: 'Tab1',
                content: '页签1',
                key: '1'
            },
            {
                title: 'Tab2',
                content: '页签2',
                key: '2'
            },
            {
                title: 'Tab3',
                content: '页签3',
                key: '3'
            }
        ];
        this.setState({
            paneList,
            activeKey: paneList[0].key
        })
    }

    render() {
        return (
            <div className='ui-tabs'>
                <Card className='card-wrap' title='Tabs页签'>
                    <Tabs defaultActiveKey={'1'} onChange={(activeKey) => this.handleTab(activeKey)}>
                        <TabPane tab={'Tab1'} key={'1'}>欢迎学习React课程</TabPane>
                        <TabPane tab={'Tab2'} key={'2'} disabled>您喜欢这门课程吗</TabPane>
                        <TabPane tab={'Tab3'} key={'3'}>喜欢就给个好评吧</TabPane>
                    </Tabs>
                </Card>
                <Card className='card-wrap' title='Tabs页签'>
                    <Tabs defaultActiveKey={'1'} onChange={(activeKey) => this.handleTab(activeKey)}>
                        <TabPane tab={<span><Icon type='user'/>1</span>} key={'1'}>欢迎学习React课程</TabPane>
                        <TabPane tab={<span><Icon type='apple'/>2</span>} key={'2'}>您喜欢这门课程吗</TabPane>
                        <TabPane tab={<span><Icon type='android'/>3</span>} key={'3'}>喜欢就给个好评吧</TabPane>
                    </Tabs>
                </Card>
                <Card className='card-wrap' title='Tabs页签'>
                    <Tabs
                        activeKey={this.state.activeKey}
                        onChange={(activeKey) => this.handleTabChange(activeKey)}
                        type='editable-card'
                        onEdit={(targetKey, action) => this.onEdit(targetKey, action)}
                    >
                        {
                            this.state.paneList.map((item,i) => {
                                return <TabPane tab={item.title} key={item.key}>
                                    {item.content}
                                </TabPane>
                            })
                        }
                    </Tabs>
                </Card>

            </div>
        )
    }
}
export default UITabs