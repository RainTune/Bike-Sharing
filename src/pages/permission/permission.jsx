import React from 'react';
import {Button, Card, message, Table, Modal, Form, Select, Input,Tree, Transfer} from "antd/lib/index";
import Util from 'rootSrc/util.jsx';
import moment from 'moment';
import 'rootSrc/less/city/city.less';
import menuConfig from 'rootSrc/resource/menuConfig.js';
const util = new Util();
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

class Permission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basicDataSource: [],
            current:1,
            pageSize: 10,
            total:0,
            selectedRowKeys:[],
            selectedItem:{},
            isShowRoleForm: false,
            isOpenSetPermission: false,
            isOpenUserAuth: false,
            userAuthList: [],
            targetKeys: [],
            menuPermission: []
        }
    }
    componentDidMount() {
        this.getTableList();
    }
    getTableList() {
        let params = {
            page: this.state.current,
            pageSize: this.state.pageSize,
        };
        util.ajax({
            url: '/role_list',
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
    onRowClick(record, index) {
        this.setState({
            selectedRowKeys: [index],
            selectedItem: record
        })
    };
    /*创建角色*/
    createRole() {
        this.roleForm.props.form.validateFields((err, values) => {
            if(!err) {
                util.ajax({
                    url: '/role_create',
                    params: values
                }).then(res => {
                    message.success('创建成功');
                    this.setState({
                        isShowRoleForm: false
                    });
                    this.getTableList();
                })
            }
        });

    }
    /*设置权限*/
    openSetPermission() {
        let item = this.state.selectedItem;
        if(JSON.stringify(item) == '{}') {
            message.info('请选择一个人员');
            return;
        }
        this.setState({
            isOpenSetPermission: true,
            menuPermission: item.menus
        })
    }
    setPermissionSubmit() {
        let data = this.permissionForm.props.form.getFieldsValue();
        data.id = this.state.selectedItem.id;
        data.menuPermission = this.state.menuPermission;
        util.ajax({
            url: '/set_auth',
            params: data
        }).then(()=>{
            message.success('设置成功');
            this.setState({
                isOpenSetPermission: false
            });
            this.getTableList();
        })
    }
    /*用户授权*/
    openUserAuth() {
        let item = this.state.selectedItem;
        if(JSON.stringify(item) == '{}') {
            message.info('请选择一个人员');
            return;
        }
        this.setState({
            isOpenUserAuth: true
        });
        this.getUserAuthList(item.id);
    }
    getUserAuthList(id) {
        util.ajax({
            url: '/role_user_auth',
            params: {
                id
            }
        }).then((res) => {
            this.filterUserAuthList(res.list);
        })
    }
    filterUserAuthList(list) {
        let userAuthList = [],
            targetKeys = [];
        list.forEach((item) => {
            const data = {
                key: item.user_id,
                title: item.user_name,
                status: item.status
            };
            userAuthList.push(data);
            if(item.status == 1) {
                targetKeys.push(data.key);
            }
        });
        this.setState({
            userAuthList,
            targetKeys
        })
    }
    acceptAuth() {
        let params = this.userAuthForm.props.form.getFieldsValue();
        params.user_ids = this.state.targetKeys;
        params.role_id = this.state.selectedItem.id;
        util.ajax({
            url: '/accept_auth',
            params
        }).then(() => {
            message.success('授权成功');
            this.setState({
                isOpenUserAuth: false
            });
            this.getTableList();
        })
    }
    render() {
        const columns = [
            {
                title:'ID',
                dataIndex:'id'
            }, {
                title: '角色名称',
                dataIndex: 'role_name'
            }, {
                title: '创建时间',
                dataIndex: 'create_time',
                render(time){
                    return moment(time).format('YYYY-MM-DD hh:mm:ss');
                }
            }, {
                title: '使用状态',
                dataIndex: 'status',
                render(status) {
                    return status == 1 ? '已开启' : '已关闭';
                }
            }, {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render(time) {
                    return moment(time).format('YYYY-MM-DD hh:mm:ss');
                }
            }, {
                title: '授权人',
                dataIndex: 'authorize_user_name',
            }
        ];
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys
        };
        return (
            <div className='permission'>
                <Card className='card-wrap' title = '权限管理和设置'>
                    <Button type={'primary'} onClick = {() => this.setState({isShowRoleForm: true})}>创建角色</Button>
                    <Button type={'primary'} onClick={() => this.openSetPermission()}>设置权限</Button>
                    <Button type={'primary'}onClick={() => this.openUserAuth()}>用户授权</Button>
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
                    title={'创建角色'}
                    visible={this.state.isShowRoleForm}
                    onOk={() => this.createRole()}
                    onCancel={() => {
                        this.setState({
                            isShowRoleForm: false
                        })
                    }}
                >
                    <RoleForm wrappedComponentRef={inst => this.roleForm = inst}/>
                </Modal>
                <Modal
                    title={'设置权限'}
                    visible={this.state.isOpenSetPermission}
                    onOk={() => this.setPermissionSubmit()}
                    onCancel={() => {
                        this.setState({
                            isOpenSetPermission: false
                        })
                    }}
                >
                    <SetPermission
                        wrappedComponentRef={inst => this.permissionForm = inst}
                        detailInfo = {this.state.selectedItem}
                        menuPermission = {this.state.menuPermission}
                        setMenuPermission = {(checkedKeys) => this.setState({
                            menuPermission: checkedKeys
                        })}
                    />
                </Modal>
                <Modal
                    title={'用户授权'}
                    visible={this.state.isOpenUserAuth}
                    onOk={() => this.acceptAuth()}
                    onCancel={() => {
                        this.setState({
                            isOpenUserAuth: false
                        })
                    }}
                    width={800}
                >
                    <UserAuthForm
                        wrappedComponentRef={inst => this.userAuthForm = inst}
                        detailInfo = {this.state.selectedItem}
                        dataSource = {this.state.userAuthList}
                        targetKeys = {this.state.targetKeys}
                        setUserAuth = {(targetKeys) => this.setState({
                            targetKeys
                        })}
                    />
                </Modal>
            </div>
        )
    }
}
export default Permission

class RoleForm extends React.Component{
    render() {
        const {getFieldDecorator} = this.props.form;
        let formItemLayout = {
            labelCol: {span:4},
            wrapperCol: {span:15}
        };
        return(
            <Form layout={'horizontal'}>
                <FormItem label={'角色名称'} {...formItemLayout}>
                    {
                        getFieldDecorator('role_name',{
                            rules: [
                                {required: true, message: '角色名称不能为空'}
                            ]
                        })(
                            <Input placeholder={'请输入角色名称'}/>
                        )
                    }
                </FormItem>
                <FormItem label={'状态'} {...formItemLayout}>
                    {
                        getFieldDecorator('state', {
                            initialValue: 1
                        })(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={2}>关闭</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
RoleForm = Form.create()(RoleForm);

class SetPermission extends React.Component{
    getMenu(menu) {
        return menu.map((item) => {
            if(item.children) {
                return <TreeNode title={item.title} key={item.key}>
                    {this.getMenu(item.children)}
                </TreeNode>
            }else{
                return <TreeNode title={item.title} key={item.key}/>
            }
        });
    }
    onCheck(checkedKeys) {
        this.props.setMenuPermission(checkedKeys)
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        let formItemLayout = {
            labelCol: {span:4},
            wrapperCol: {span:15}
        };
        let name = this.props.detailInfo.role_name;
        return(
            <Form layout={'horizontal'}>
                <FormItem label={'角色名称'} {...formItemLayout}>
                    {
                        getFieldDecorator('role_name',{
                            initialValue: name,
                            rules: [
                                {required: true, message: '角色名称不能为空'}
                            ]
                        })(
                            <Input disabled={true}/>
                        )
                    }
                </FormItem>
                <FormItem label={'状态'} {...formItemLayout}>
                    {
                        getFieldDecorator('state', {
                            initialValue: 1
                        })(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={2}>关闭</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    checkedKeys={this.props.menuPermission}
                    onCheck={(checkedKeys) => this.onCheck(checkedKeys)}
                >
                    <TreeNode title={'平台权限'} key={'plat_authorization'}>
                        {this.getMenu(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}
SetPermission = Form.create()(SetPermission);

class UserAuthForm extends React.Component{
    onChange(tagetKeys) {
        this.props.setUserAuth(tagetKeys)
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        let formItemLayout = {
            labelCol: {span:4},
            wrapperCol: {span:15}
        };
        let name = this.props.detailInfo.role_name;
        return(
            <Form layout={'horizontal'}>
                <FormItem label={'角色名称'} {...formItemLayout}>
                    {
                        getFieldDecorator('role_name',{
                            initialValue: name,
                            rules: [
                                {required: true, message: '角色名称不能为空'}
                            ]
                        })(
                            <Input disabled={true}/>
                        )
                    }
                </FormItem>

                <FormItem wrapperCol={{span: 15, offset:4}}>
                    <Transfer
                        listStyle={{width: 200,display:'inline-block'}}
                        dataSource={this.props.dataSource}
                        targetKeys={this.props.targetKeys}
                        titles={['待选用户', '已选用户']}
                        render={item => item.title}
                        onChange={(tagetKeys) => this.onChange(tagetKeys)}
                    />
                </FormItem>
            </Form>
        )
    }
}
UserAuthForm = Form.create()(UserAuthForm);

