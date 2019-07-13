import React from 'react';
import {Card,Form, Input, Icon, Button, message, Checkbox} from "antd";
const FormItem = Form.Item;
class Login extends React.Component {
    constructor(props) {
        super(props)
    }
    onSubmit() {
        /*获取表单字段*/
        const userInfo = this.props.form.getFieldsValue();
        /*必须写下面的这句，然后在表单提交的时候，才会校验*/
        this.props.form.validateFields((err, values) => {
            if(!err) {
                message.success(`恭喜您：${values.username}`)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='ui-carousel'>
                <Card title={'行内表单'}>
                    <Form layout={'inline'}>
                        <FormItem>
                            <Input type={'text'} placeholder={'请输入用户名'}/>
                        </FormItem>
                        <FormItem>
                            <Input type={'password'} placeholder={'请输入密码'}/>
                        </FormItem>
                        <FormItem>
                            <Button type={'primary'}>确认</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title={'块级表单'}>
                    <Form style={{maxWidth: 300}}>
                        <FormItem>
                            {
                                getFieldDecorator('username', {
                                    initialValue: 'Rain',
                                    rules: [
                                        { required: true, message: '请输入用户名' }
                                    ]
                                })(
                                    <Input
                                        type='text'
                                        prefix={<Icon type="user" />}
                                        placeholder="Username"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem>
                        {
                            getFieldDecorator('password', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '请输入密码' }
                                ]
                            })(
                                <Input
                                    type='password'
                                    prefix={<Icon type="user" />}
                                    placeholder="Password"
                                />
                            )
                        }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('isAgree', {
                                    initialValue: true,
                                    valuePropName: 'checked'
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href="javascript:;" style={{float: 'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type={'primary'} onClick={() => this.onSubmit()}>确认</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>

        )
    }
}
export default Form.create()(Login);