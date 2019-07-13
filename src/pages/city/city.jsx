import React from 'react';
import {Button, Card, message, Table, Modal, Form, Select, Radio} from "antd/lib/index";
import Util from 'rootSrc/util.jsx';
import moment from 'moment';
import 'rootSrc/less/city/city.less';
const util = new Util();
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
class City extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basicDataSource: [],
            current:1,
            pageSize: 10,
            total:0,
            isShowOpenCity: false
        }
    }
    componentDidMount() {
        this.getTableList();
    }
    getTableList(filerFormInfo) {
        let params = {
            page: this.state.current,
            pageSize: this.state.pageSize,
        };
        if(filerFormInfo) {
            for(let i in filerFormInfo){
                params[i] = filerFormInfo[i];
            }
        }
        util.ajax({
            url: '/city_list',
            params: params
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
        this.setState({
            current: 1
        },() => this.getTableList(filerFormInfo));

    }
    openCity() {
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        util.ajax({
            url: 'add_city',
            params: cityInfo
        }).then((res) => {
            console.log(cityInfo);
            message.success('开通成功');
            this.setState({
                isShowOpenCity: false
            },() => {
                this.getTableList();
            });

        },() => {
            message.error('开通失败')
        })

    }
    render() {
        const columns = [
            {
                title:'城市ID',
                dataIndex:'id'
            }, {
                title: '城市名称',
                dataIndex: 'name'
            }, {
                title: '用车模式',
                dataIndex: 'mode',
                render(mode){
                    return mode ==1 ?'停车点':'禁停区';
                }
            }, {
                title: '营运模式',
                dataIndex: 'op_mode',
                render(op_mode) {
                    return op_mode == 1 ? '自营' : '加盟';
                }
            }, {
                title: '授权加盟商',
                dataIndex: 'franchisee_name'
            }, {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render(arr){
                    let res = [];
                    arr.map((item)=>{
                        res.push(item.user_name);
                    });
                    return res.join(',')
                }
            }, {
                title: '城市开通时间',
                dataIndex: 'open_time'
            }, {
                title: '操作时间',
                dataIndex: 'update_time',
                render: (update_time) => {
                    return moment(update_time).format('YYYY-MM-DD HH:mm:ss')
                }
            }, {
                title: '操作人',
                dataIndex: 'sys_user_name'
            }
        ];
        return (
            <div className='city'>
                <Card className='card-wrap'>
                    <FilterForm
                        wrappedComponentRef={(inst) => this.filterForm = inst}
                        onFilterFormReset = {() => this.onFilterFormReset()}
                        onFilterFormCheckOut = {() => this.onFilterFormCheck()}
                    />
                </Card>
                <Card className='card-wrap' title = '城市管理'>
                    <Button type={'primary'} onClick={() => this.setState({isShowOpenCity: true})}>开通城市</Button>
                </Card>
                <div className={'table-wrap'}>
                    <Table
                        bordered={true}
                        dataSource={this.state.basicDataSource}
                        columns={columns}
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
                <Modal
                    title='开通城市'
                    visible={this.state.isShowOpenCity}
                    onOk={() => this.openCity()}
                    onCancel={() => {
                        this.setState({
                            isShowOpenCity: false
                        })
                    }}
                >
                    <CityForm wrappedComponentRef={(inst) => this.cityForm = inst}/>
                </Modal>
            </div>
        )
    }
}
export default City


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
                <FormItem label={'用车模式'}>
                    {
                        getFieldDecorator('mode',{
                            initialValue: '0'
                        })(
                            <Select style={{width:150}}>
                                <Option value={'0'}>全部</Option>
                                <Option value={'1'}>指定停车点模式</Option>
                                <Option value={'2'}>禁停区模式</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label={'营运模式'}>
                    {
                        getFieldDecorator('op_mode',{
                            initialValue: '0'
                        })(
                            <Select style={{width:80}}>
                                <Option value={'0'}>全部</Option>
                                <Option value={'1'}>自营</Option>
                                <Option value={'2'}>加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label={'加盟商授权状态'}>
                    {
                        getFieldDecorator('auth_status',{
                            initialValue: '0'
                        })(
                            <Select style={{width:100}}>
                                <Option value={'0'}>全部</Option>
                                <Option value={'1'}>已授权</Option>
                                <Option value={'2'}>未授权</Option>
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

class CityForm extends React.Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                sm: 24,
                md: 4
            },
            wrapperCol: {
                sm: 24,
                md: 12
            }
        };
        return(
            <Form layout='horizontal'>
                <FormItem label={'开通城市'}  {...formItemLayout}>
                    {
                        getFieldDecorator('city_id',{
                            initialValue: '1'
                        })(
                            <Select>
                                <Option value={'1'}>北京</Option>
                                <Option value={'2'}>天津</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label={'用车模式'} {...formItemLayout}>
                    {
                        getFieldDecorator('mode',{
                            initialValue: '1'
                        })(
                            <RadioGroup>
                                <Radio value={'1'}>指定停车点模式</Radio>
                                <Radio value={'2'}>禁停区模式</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label={'营运模式'} {...formItemLayout}>
                    {
                        getFieldDecorator('op_mode',{
                            initialValue: '1'
                        })(
                            <RadioGroup>
                                <Radio value={'1'}>自营</Radio>
                                <Radio value={'2'}>加盟</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
CityForm = Form.create()(CityForm);