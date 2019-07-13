import React from 'react';
import {Button, Card, message, Table, Modal} from "antd";
import Util from 'rootSrc/util.jsx';
const util = new Util();
class BasicTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basicDataSource: [],
            selectedRowKeys:[],
            selectedItem:{},
            selectedRows: [],
            current:1,
            pageSize: 5,
            total:0
        }
    }
    componentDidMount() {
        this.getTableList();
    }
    getTableList() {
        util.ajax({
            url: '/table/basic',
            params: {
                page: this.state.current,
                pageSize: this.state.pageSize
            }
        }).then((res) => {
            /*配置key*/
            res.list.map((item, i) => {
               item.key = i;
            });
            this.setState({
                basicDataSource: res.list,
                total: res.total
            });
        })
    }
    /*单选按钮*/
    onRowClick(record, index) {
        Modal.info({
           title:'信息提示',
           content: `您点击的是第${index+1}行，用户名为：${record.userName}`
        });
        this.setState({
            selectedRowKeys: [index],
            selectedItem: record
        })
    };
    del() {
        let ids = [];
        this.state.selectedRows.map((item,i) => {
            ids.push(item.id);
        });
        Modal.confirm({
            title: '删除提示',
            content: `您确定要删除这些数据吗？${ids.join(',')}`,
            onOk: () => {
                message.success('删除成功')
            }
        })
    }
    render() {
        /*定义基本表头和内容*/
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '爱好',
                dataIndex: 'hobbies',
                key: 'hobbies'
            }
        ];
        const dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
                hobbies: '烫头'
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
                hobbies: '抽烟'
            },
            {
                key: '3',
                name: '周伯通',
                age: 50,
                address: '西湖区湖底公园1号',
                hobbies: '喝酒'
            },
        ];
        /*动态获取数据的表头*/
        const columns1 = [
            {
                title: 'ID',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render: (sex) => {
                    return sex === 0 ? "男" : "女"
                }
            },
            {
                title: '年龄',
                dataIndex: 'age'
            },
            {
                title: '状态',
                dataIndex: 'state',
                render: state => {
                    let arr = ['咸鱼一条','北大才子','青年伯俊','创业天才','牛逼大神'];
                    /*因为数组索引是从0开始的*/
                    let index = parseInt(state) - 1;
                    return arr[index]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render: interest => {
                    let arr = ['篮球','足球','桌球','游泳','唱歌','跳舞','喝酒','抽烟'];
                    let index = parseInt(interest) - 1;
                    return arr[index]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }

        ];
        /*单选按钮的配置*/
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys
        };
        /*复选按钮配置*/
        const rowCheckBoxSelection = {
            type: 'checkbox',
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectRows) => {
                this.setState({
                    selectedRowKeys: selectedRowKeys,
                    selectedRows: selectRows
                })
            }
        };
        return (
            <div className='form-basic'>
                <Card className='card-wrap' title='基本表格'>
                    <Table dataSource={dataSource} columns={columns} pagination={false}/>
                </Card>
                <Card className='card-wrap' title='动态渲染'>
                    <Table dataSource={this.state.basicDataSource} columns={columns1} pagination={false}/>
                </Card>
                <Card className='card-wrap' title='动态渲染-单选按钮'>
                    <Table
                        dataSource={this.state.basicDataSource}
                        columns={columns1}
                        rowSelection={rowSelection}
                        pagination={false}
                        onRow={(record, index) => {
                            return {
                                onClick: () => this.onRowClick(record, index)
                            }
                        }}
                    />
                </Card>
                <Card className='card-wrap' title='动态渲染-多选按钮'>
                    <Table
                        dataSource={this.state.basicDataSource}
                        columns={columns1}
                        rowSelection={rowCheckBoxSelection}
                        pagination={false}/>
                </Card>
                <Card className='card-wrap' title='动态渲染-分页'>
                    <Button onClick={() => this.del()}>删除</Button>
                    <Table
                        dataSource={this.state.basicDataSource}
                        columns={columns1}
                        rowSelection={rowCheckBoxSelection}
                        pagination={
                            util.pagination({
                                current: this.state.current,
                                pageSize: this.state.pageSize,
                                total: this.state.total
                            },current => {
                                this.setState({
                                    current: current
                                },() => this.getTableList())
                            })
                        }
                    />
                </Card>
            </div>
        )
    }
}
export default BasicTable