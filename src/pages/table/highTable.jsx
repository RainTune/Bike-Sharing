import React from 'react';
import {Button, Card, message, Table, Modal} from "antd";
import Util from 'rootSrc/util.jsx';
const util = new Util();
class HighTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basicDataSource: [],
            current:1,
            pageSize: 15,
            total:0,
            sortOrder:''
        }
    }
    componentDidMount() {
        this.getTableList();
    }
    getTableList() {
        util.ajax({
            url: '/table/high',
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

    handleChange(pagination, filters, sorter) {
        this.setState({
            sortOrder: sorter.order
        })
    }
    del(item){
        Modal.confirm({
            title: '警告',
            content: '您确定要删除这条数据吗？',
            onOk: () => {
                //console.log(item);
                message.success('删除成功')
            }
        })
    }
    render() {
        /*动态获取数据的表头*/
        const columns1 = [
            {
                title: 'ID',
                dataIndex: 'id',
                width: '5%'
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: '10%'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render: (sex) => {
                    return sex === 0 ? "男" : "女"
                },
                width: '5%'
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: '5%'
            },
            {
                title: '状态',
                dataIndex: 'state',
                render: state => {
                    let arr = ['咸鱼一条','北大才子','青年伯俊','创业天才','牛逼大神'];
                    /*因为数组索引是从0开始的*/
                    let index = parseInt(state) - 1;
                    return arr[index]
                },
                width: '15%'
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render: interest => {
                    let arr = ['篮球','足球','桌球','游泳','唱歌','跳舞','喝酒','抽烟'];
                    let index = parseInt(interest) - 1;
                    return arr[index]
                },
                width: '10%'
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: '15%'
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: '25%'
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: '10%'
            }

        ];
        const columns2 = [
            {
                title: 'ID',
                dataIndex: 'id',
                width: 100,
                fixed: 'left'
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 200,
                fixed: "left"
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render: (sex) => {
                    return sex === 0 ? "男" : "女"
                },
                width: 100
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 100
            },
            {title: '年龄', dataIndex: 'age', width: 100},
            {title: '年龄', dataIndex: 'age', width: 100},
            {title: '年龄', dataIndex: 'age', width: 100},
            {title: '年龄', dataIndex: 'age', width: 100},
            {title: '年龄', dataIndex: 'age', width: 100},
            {title: '年龄', dataIndex: 'age', width: 100},
            {
                title: '状态',
                dataIndex: 'state',
                render: state => {
                    let arr = ['咸鱼一条','北大才子','青年伯俊','创业天才','牛逼大神'];
                    /*因为数组索引是从0开始的*/
                    let index = parseInt(state) - 1;
                    return arr[index]
                },
                width: 200
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render: interest => {
                    let arr = ['篮球','足球','桌球','游泳','唱歌','跳舞','喝酒','抽烟'];
                    let index = parseInt(interest) - 1;
                    return arr[index]
                },
                width: 200
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 100
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 200
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 100,
                fixed: 'right'
            }

        ];
        let w = 2;
        /*注意w的宽度必须要大于表格的宽度*/
        columns2.map(item=> {
            w += item.width
        });
        const columns3 = [
            {
                title: 'ID',
                dataIndex: 'id',
            },
            {
                title: '用户名',
                dataIndex: 'userName',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render: (sex) => {
                    return sex === 0 ? "男" : "女"
                },
            },
            {
                title: '年龄',
                dataIndex: 'age',
                sorter: (row1, row2) => {
                    return parseInt(row1.age) - parseInt(row2.age);
                },
                sortOrder: this.state.sortOrder
            },
            {
                title: '状态',
                dataIndex: 'state',
                render: state => {
                    let arr = ['咸鱼一条','北大才子','青年伯俊','创业天才','牛逼大神'];
                    /*因为数组索引是从0开始的*/
                    let index = parseInt(state) - 1;
                    return arr[index]
                },
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render: interest => {
                    let arr = ['篮球','足球','桌球','游泳','唱歌','跳舞','喝酒','抽烟'];
                    let index = parseInt(interest) - 1;
                    return arr[index]
                },
            },
            {
                title: '生日',
                dataIndex: 'birthday',
            },
            {
                title: '地址',
                dataIndex: 'address',
            },
            {
                title: '早起时间',
                dataIndex: 'time',
            },
            {
                title: '操作',
                render: (text, item) => {
                    return <Button size={'small'} type={'warning'} onClick={() => this.del(item)}>删除</Button>
                }
            }

        ];
        return (
            <div className='form-basic'>
                <Card className='card-wrap' title='头部固定'>
                    <Table
                        dataSource={this.state.basicDataSource}
                        columns={columns1}
                        pagination={false}
                        scroll={{ y: 240 }}
                    />
                </Card>
                <Card className='card-wrap' title='左右固定'>
                    <Table
                        dataSource={this.state.basicDataSource}
                        columns={columns2}
                        scroll={{x:w}}
                        pagination={
                            util.pagination({
                                current: this.state.current,
                                pageSize: this.state.pageSize,
                                total: this.state.total
                            },current => {
                                console.log(current);
                                this.setState({
                                    current: current
                                },() => this.getTableList())
                            })
                        }
                    />
                </Card>
                <Card className='card-wrap' title = '表格排序'>
                    <Table
                        dataSource={this.state.basicDataSource}
                        columns={columns3}
                        pagination={false}
                        onChange={(pagination, filters, sorter) => this.handleChange(pagination, filters, sorter)}
                    />
                </Card>
            </div>
        )
    }
}
export default HighTable