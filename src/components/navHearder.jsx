import React from 'react';
import 'rootSrc/less/navHeader.less';
import moment from 'moment';
import Axios from 'rootSrc/util.jsx';
import {message} from "antd";


import {connect} from "react-redux";

let axios = new Axios();
import logoImg from 'rootSrc/resource/logo.jpg';

class NavHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            top: 10,
            dateTime: '',
            userName: 'Custom',
            weather: {}
        };
    }
    componentWillMount() {
        this.getDate();
        this.getWeather();
    }
    getDate() {
        setInterval(() => {
            let now = moment().format('YYYY-MM-DD hh:mm:ss');
            this.setState({
                dateTime: now
            })
        },1000)
    }
    getWeather() {
        /*深圳市*/
        let city = '440300';
        axios.jsonp({
            url: 'https://restapi.amap.com/v3/weather/weatherInfo?city='+city+'&key=5f09bb6b62b9a45c524c8823f18fd059'
        })
            .then((res)=> {
                this.setState({
                    weather: res.lives[0]
                },() => {
                    /*console.log(this.state.weather);*/
                })
            },() => {
                message.error('天气请求出问题了');
            })
    }
    render() {
        const {name} = this.props;
        return (
            <div className={this.props.headType === 'second'?'nav-header nav-header-second':'nav-header'}>
                <div className="head-top" >
                    {/*如果跳到详情页面则加载下面的，因为其和主界面不是同一个模板*/}
                    {
                        this.props.headType === "second"&&(<div className={'second-menu'}>
                            <img src={logoImg} alt={''}/>
                            <span>RainTune</span>
                        </div>)
                    }
                    <span>欢迎:{this.state.userName}</span>
                    <a href='javascript:;'>退出</a>
                </div>
                {
                    /*如果跳到详情页则不需要加载下面的*/
                    this.props.headType !== "second" && (<div className={'title'}>
                        <span>{name}</span>
                        <a href="javascript:;">
                            <span>{this.state.dateTime}</span>
                            {
                                this.state.weather?(<span className={'weather'}>
                                {this.state.weather.city + ':' + this.state.weather.temperature + '℃' + '  '+ this.state.weather.weather}
                            </span>):<span  className={'weather'}>暂无天气数据</span>
                            }
                        </a>
                    </div>)
                }
            </div>

        )
    }
}
function mapStateToProps(state){
    return {
        name: state.name
    }
}
export default connect(mapStateToProps)(NavHeader)