import React from 'react';
import {Button, Card, message, Table, Modal, Form, Select,DatePicker, Radio} from "antd/lib/index";
import Util from 'rootSrc/util.jsx';
import moment from 'moment';
import 'rootSrc/less/city/city.less';
const util = new Util();
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basicDataSource: [],
            current:1,
            pageSize: 10,
            total:0,
            selectedRowKeys:[],
            selectedItem:{}
        }
    }
    componentDidMount() {
        this.getTableList();
    }
    getTableList(filerFormInfo) {
        let params = {
            page: this.state.current,
            pageSize: this.state.pageSize
        };
        if(filerFormInfo) {
            for(let i in filerFormInfo){
                params[i] = filerFormInfo[i];
            }
        }
        util.ajax({
            url: '/order/list',
            params
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
    onFilterFormReset() {
        this.filterForm.props.form.resetFields();
    }
    onFilterFormCheck() {
        let filerFormInfo = this.filterForm.props.form.getFieldsValue();
        this.filterForm.props.form.validateFields((err, values)=>{
            if(!err) {
                this.setState({
                    current: 1
                },()=> {
                    this.getTableList(filerFormInfo);
                })
            }
        })

    }
    onRowClick(record, index) {
        this.setState({
            selectedRowKeys: [index],
            selectedItem: record
        })
    };
    getDetail() {
        let item = this.state.selectedItem;
        let flag = (JSON.stringify(item) == "{}") ? false: true;
        if(!flag) {
            message.info('请先选择一个订单');
            return;
        }
        window.open(`#/theThirdParty/order/detail/${item.id}`,'_blank')

    }
    render() {
        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            }, {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            }, {
                title: '用户名',
                dataIndex: 'user_name'
            }, {
                title: '手机号',
                dataIndex: 'mobile'
            }, {
                title: '里程',
                dataIndex: 'distance'
            }, {
                title: '行驶时长',
                dataIndex: 'total_time'
            }, {
                title: '状态',
                dataIndex: 'status'
            }, {
                title: '开始时间',
                dataIndex: 'start_time'
            }, {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ];
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys
        };
        return (
            <div className='order'>
                <Card className='card-wrap'>
                    <FilterForm
                        wrappedComponentRef={(inst) => this.filterForm = inst}
                        onFilterFormReset = {() => this.onFilterFormReset()}
                        onFilterFormCheckOut = {() => this.onFilterFormCheck()}
                    />
                </Card>
                <Card className='card-wrap'>
                    <Button type={'primary'} onClick = {() => this.getDetail()}>订单详情</Button>
                </Card>
                <div className={'table-wrap'}>
                    <Table
                        bordered={true}
                        dataSource={this.state.basicDataSource}
                        columns={columns}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => this.onRowClick(record, index)
                            }
                        }}
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
                </div>
            </div>
        )
    }
}
export default Order


class FilterForm extends React.Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        return(
            <Form layout={'inline'}>
                <FormItem label={'城市'}>
                    {
                        getFieldDecorator('city_id',{
                            initialValue: '0'
                        })(
                            <Select style={{width:80}}>
                                <Option value={'0'}>全部</Option>
                                <Option value={'1'}>北京</Option>
                                <Option value={'2'}>天津</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('start_time',{
                            rules: [
                                {required: true, message: '请选择起始时间'}
                            ]
                        })(
                            <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' placeholder={"请输入起始时间"}/>
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('end_time',{
                            rules: [
                                {required: true, message: '请选择结束时间'}
                            ]
                        })(
                            <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' placeholder={"请输入结束时间"}/>
                        )
                    }
                </FormItem>
                <FormItem label={'订单状态'}>
                    {
                        getFieldDecorator('status',{
                            initialValue: '0'
                        })(
                            <Select style={{width:100}}>
                                <Option value={'0'}>全部</Option>
                                <Option value={'1'}>进行中</Option>
                                <Option value={'2'}>行程结束</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type={'primary'} onClick={() => this.props.onFilterFormCheckOut()}>查询</Button>
                    <Button onClick={() =>this.props.onFilterFormReset()}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
FilterForm = Form.create()(FilterForm);
