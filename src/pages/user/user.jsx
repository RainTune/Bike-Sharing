import React from 'react';
import {Button, Card, message, Table, Modal, Form, DatePicker, Radio, Input, Icon, Select} from "antd/lib/index";
import Util from 'rootSrc/util.jsx';
import moment from 'moment';
import 'rootSrc/less/city/city.less';
const util = new Util();
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;
class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basicDataSource: [],
            current:1,
            pageSize: 10,
            total:0,
            selectedRowKeys:[],
            selectedItem:{},
            type:'',
            title:'',
            isVisible: false
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
            url: '/user_list',
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
    operate(type) {
        if(type === 'created') {
            this.setState({
                type,
                title: '创建员工',
                isVisible: true
            })
        }else if(type === 'edit') {
            if(JSON.stringify(this.state.selectedItem) === '{}'){
                message.info('请选择一个员工');
                return;
            }
            this.setState({
                type,
                title: '编辑员工',
                isVisible: true
            })
        }else if(type === 'detail') {
            if(JSON.stringify(this.state.selectedItem) === '{}'){
                message.info('请选择一个员工');
                return;
            }
            this.setState({
                type,
                title: '员工详情',
                isVisible: true
            })
        } else if(type === 'del') {
            if(JSON.stringify(this.state.selectedItem) === '{}'){
                message.info('请选择一个员工');
                return;
            }
            Modal.info({
                title: '提示框',
                content: '您确定要删除此员工吗？',
                onOk: () => {
                    console.log(this.state.selectedItem.id);
                    util.ajax({
                        url: '/user_operate',
                        params: {
                            id: this.state.selectedItem.id
                        },
                        method: 'post'
                    }).then(() => {
                            message.success('删除成功');
                            this.getTableList();
                        })
                }
            });
        }
    }
    handleOk() {
        let type = this.state.type;
        let userInfo = this.userForm.props.form.getFieldsValue();
        if(type === 'detail') {
            return;
        }
        this.userForm.props.form.validateFields((err,values) =>{
            if(!err) {
                userInfo.type = type;
                util.ajax({
                    url: '/user_operate',
                    params: userInfo,
                    method: 'post'
                }).then(() => {
                    this.setState({
                        isVisible: false
                    })
                })
            }
        });

    }
    render() {
        const columns = [
            {
                title:'ID',
                dataIndex:'id'
            }, {
                title: '用户名',
                dataIndex: 'username'
            }, {
                title: '性别',
                dataIndex: 'sex',
                render: item => item == 1 ? '男': '女'
            }, {
                title: '状态',
                dataIndex: 'state',
                render: item => {
                    let arr = ['咸鱼一条', '风华浪子', '北大才子', '创业天才', '牛逼大佬'];
                    return arr[item-1]
                }
            }, {
                title: '爱好',
                dataIndex: 'interest'
            },
            {
                title: '是否结婚',
                dataIndex: 'isMarried',
                render: item=> item == 0 ? '未婚' : '已婚'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            }, {
                title: '联系地址',
                dataIndex: 'address'
            }, {
                title: '早起时间',
                dataIndex: 'time'
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
                    <Button type={'primary'} icon={'plus'} onClick = {() => this.operate('created')}>创建员工</Button>
                    <Button type={'primary'} icon={'edit'} onClick = {() => this.operate('edit')}>编辑员工</Button>
                    <Button type={'primary'} icon={'user'} onClick = {() => this.operate('detail')}>员工详情</Button>
                    <Button type={'primary'} icon={'delete'} onClick = {() => this.operate('del')}>删除员工</Button>
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
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={() => this.handleOk()}
                    onCancel={() => {
                        this.setState({
                            isVisible: false
                        })
                    }}
                    footer={this.state.type !== 'detail'}
                >
                    <UserForm
                        wrappedComponentRef={inst => this.userForm = inst}
                        type={this.state.type}
                        userInfo={this.state.selectedItem}/>
                </Modal>
            </div>
        )
    }
}
export default User

class FilterForm extends React.Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        return(
            <Form layout={'inline'}>
                <FormItem label={'用户名'}>
                    {
                        getFieldDecorator('username',{
                            rules: [
                                {
                                    required: true, message: '用户名不能为空'
                                }
                            ]
                        })(
                           <Input placeholder={'请输入用户名'}/>
                        )
                    }
                </FormItem>
                <FormItem label={'入职时间'}>
                    {
                        getFieldDecorator('join_time',{
                            rules: [
                                {required: true, message: '请选择入职日期'}
                            ]
                        })(
                            <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' placeholder={"请输入入职时间"}/>
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

class UserForm extends React.Component{
    render() {
        const {getFieldDecorator} = this.props.form;
        let type = this.props.type;
        let userInfo = this.props.userInfo;
        let stateArr = ['咸鱼一条','风华浪子','北大才子','创业先驱','牛逼大佬'];
        let formItemLayout = {
            labelCol: {span:4},
            wrapperCol: {span:15}
        };
        return(
            <Form layout={'horizontal'}>
                <FormItem label={'姓名'} {...formItemLayout}>
                    {
                        type === 'detail'? userInfo.username :
                        getFieldDecorator('username',{
                            initialValue: type === 'edit' ? userInfo.username : '',
                            rules: [
                                {required: true, message: '姓名不能为空'}
                            ]
                        })(
                            <Input placeholder={'请输入姓名'}/>
                        )
                    }
                </FormItem>
                <FormItem label={'性别'} {...formItemLayout}>
                    {
                        type === 'detail'? (userInfo.sex === 1 ? '男' : '女') :
                        getFieldDecorator('sex',{
                            initialValue: type === 'edit' ? userInfo.sex : 1
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label={'状态'} {...formItemLayout}>
                    {
                        type === 'detail' ? stateArr[userInfo.state -1] :
                        getFieldDecorator('state', {
                            initialValue: type === 'edit' ? userInfo.state : 1
                        })(
                            <Select>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>风华浪子</Option>
                                <Option value={3}>北大学子</Option>
                                <Option value={4}>创业先驱</Option>
                                <Option value={5}>牛逼大佬</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label={'出生日期'} {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.birthday :
                        getFieldDecorator('birthday', {
                            initialValue: type === 'edit' ? moment(userInfo.birthday) : '',
                            rules: [
                                {required: true, message: '日期不能为空'}
                            ]
                        })(
                            <DatePicker format={'YYYY-MM-DD'}/>
                        )
                    }
                </FormItem>
                <FormItem label={'地址'} {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.address :
                        getFieldDecorator('address',{
                            initialValue: type === 'edit' ? userInfo.address : '',
                            rules: [
                                {required: true, message: '地址不能为空'}
                            ]
                        })(
                            <TextArea autosize={{minRows: 4, maxRows: 6}}/>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
UserForm = Form.create()(UserForm);
