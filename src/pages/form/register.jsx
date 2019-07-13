import React from 'react';
import {Card,Form, Input, Icon, Button, message, Checkbox, Switch, Select, DatePicker, TimePicker, Radio, Upload, InputNumber} from "antd";
import moment from 'moment'
import 'rootSrc/less/form/formRegister.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            imageUrlList: []
        };
    }
    onSubmit() {
        /*获取表单字段*/
        //const userInfo = this.props.form.getFieldsValue();
        /*必须写下面的这句，然后在表单提交的时候，才会校验*/
        this.props.form.validateFields((err, values) => {
            if(!err) {
                message.success(`恭喜您：${values.username}`);
                console.log(JSON.stringify(values));
            }
        })
    }
    getBase64 =(img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            this.getBase64(info.file.originFileObj, imageUrl => {
                let imgUrlList = this.state.imageUrlList;
                imgUrlList.push(imageUrl);
                    this.setState({
                        imageUrlList: imgUrlList,
                        loading: false,
                    })
                }
            );
        }
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const Zone = (
            this.state.imageUrlList.map((item,index) => {
                return <a href="javascript:;" className={'imgZone'} key={index}>
                    <img src={item} alt=""/>
                </a>
            })
        );
        return (
            <div className='ui-carousel'>
                <Card title={'注册表单'}>
                    <Form>
                        <FormItem label={'用户名'} {...formItemLayout}>
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
                        <FormItem label={'密码'} {...formItemLayout}>
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
                        <FormItem label={'性别'} {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue: '1'
                                })(
                                    <RadioGroup>
                                        <Radio value={'1'}>男</Radio>
                                        <Radio value={'2'}>女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label={'年龄'} {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: 18
                                })(
                                    <InputNumber/>
                                )
                            }
                        </FormItem>
                        <FormItem label={'状态'} {...formItemLayout}>
                            {
                                getFieldDecorator('state', {
                                    initialValue: '1'
                                })(
                                    <Select>
                                        <Option value={'1'}>咸鱼一条</Option>
                                        <Option value={'2'}>风华浪子</Option>
                                        <Option value={'3'}>北大学子</Option>
                                        <Option value={'4'}>创业先驱</Option>
                                        <Option value={'5'}>牛逼大佬</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label={'爱好'} {...formItemLayout}>
                            {
                                getFieldDecorator('interest', {
                                    initialValue: ['1','2']
                                })(
                                    <Select mode={'multiple'}>
                                        <Option value={'1'}>跑步</Option>
                                        <Option value={'2'}>唱歌</Option>
                                        <Option value={'3'}>跳舞</Option>
                                        <Option value={'4'}>滑冰</Option>
                                        <Option value={'5'}>游泳</Option>
                                        <Option value={'6'}>篮球</Option>
                                        <Option value={'7'}>桌球</Option>
                                        <Option value={'8'}>读书</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label={'是否已婚'} {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried', {
                                    initialValue: false,
                                    valuePropName: 'checked'
                                })(
                                    <Switch/>
                                )
                            }
                        </FormItem>
                        <FormItem label={'出生日期'} {...formItemLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment('1995-01-01 09:00:00'),
                                })(
                                    <DatePicker
                                        showTime
                                        format={'YYYY-MM-DD hh:mm:ss'}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label={'地址'} {...formItemLayout}>
                            {
                                getFieldDecorator('address', {
                                    initialValue: '深圳市宝安区宝安机场'
                                })(
                                    <TextArea autosize={{minRows: 4, maxRows: 6}}/>
                                )
                            }
                        </FormItem>
                        <FormItem label={'早起时间'} {...formItemLayout}>
                            {
                                getFieldDecorator('time')(
                                    <TimePicker format={'hh:mm:ss'}/>
                                )
                            }
                        </FormItem>
                        <FormItem label={'上传头像'} {...formItemLayout}>
                            {
                                getFieldDecorator('avatar', {
                                })(
                                    <Upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture-card"
                                        showUploadList={true}
                                        className="avatar-uploader"
                                        onChange={this.handleChange}
                                    >
                                        {uploadButton}
                                    </Upload>
                                )
                            }
                            {/*注意当加入showUploadList 的时候，会自动预览，若是把 其变为false,想自定义预览，则需要加上下面的这句*/}
                            {/*<div>{Zone}</div>*/}
                        </FormItem>
                        <FormItem wrapperCol={{sm: {span: 12, offset: 4}}}>
                            {
                                getFieldDecorator('protocol', {
                                    initialValue: true,
                                    valuePropName: 'checked'
                                })(
                                    <Checkbox>我已认真阅读过<a href={'javascript:;'}>此协议</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem wrapperCol={{sm: {span: 12, offset: 4}}}>
                            <Button type={'primary'} onClick={() => this.onSubmit()}>确认</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>

        )
    }
}
export default Form.create()(Register);