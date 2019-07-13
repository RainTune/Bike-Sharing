import React from 'react';
import {Card} from "antd";

import echarts from 'echarts/lib/echarts.js';
/*引入柱状图*/
import 'echarts/lib/chart/line';
/*引入提示框和标题组件*/
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import Util from 'rootSrc/util.jsx';
const util = new Util();
class ChartLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bikeOrderList: {},
            userNumber: {}
        }
    }
    componentDidMount() {
        this.getBikeOrderList();
    }
    getBikeOrderList() {
        util.ajax({
            url: '/bike_order'
        }).then((res) => {
            this.setState({
                bikeOrderList: res.bikeOrderList,
                userNumber: res.userNumber
            },() => {
                this.initBikeOrderBase();
                this.initUserNumber();
            })
        })
    }
    initBikeOrderBase() {
        let myPie = echarts.init(this.refs.line1);
        console.log(this.state.bikeOrderList.date);
        myPie.setOption({
            title: {
                text: this.state.bikeOrderList.title
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: this.state.bikeOrderList.date,
                boundaryGap: false
            },
            yAxis: {
                type: 'value'
            },/*,注意legend中的每一个值都必须与series中的name对应，所以单个折线图没有必要设置legend
            legend: {
                data: this.state.bikeOrderList.date
            }*/
            series: [{
                name: '订单量',
                type: 'line',
                data: this.state.bikeOrderList.data,
                areaStyle: {}
            }]
        });
    }
    initUserNumber() {
        let myBar = echarts.init(this.refs.line2);
        let userNumberSeries = this.getUserNumberSeries();
        myBar.setOption({
            color: ['cyan','orange','gold'],
            title: { text: this.state.userNumber.title },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: Object.keys(this.state.userNumber.data)
            },
            xAxis: {
                data: this.state.userNumber.date
            },
            yAxis: {
                type: 'value'
            },
            series:userNumberSeries
        });
    }
    getUserNumberSeries() {
        let res = [];
        let list = this.state.userNumber.data;
        for(var i in list) {
            res.push({
                name: i,
                type: 'line',
                data: list[i]
            })
        }
        return res;
    }
    render() {
        return (
            <div className='ui-message'>
                <Card className='card-wrap' title='信息提示'>
                    <Card className='card-wrap' title='折线图1'>
                        <div id="bar" style={{height: 400}} ref = 'line1'/>
                    </Card>
                    <Card className='card-wrap' title='折线图2'>
                        <div id="bar" style={{height: 400}} ref = 'line2'/>
                    </Card>
                </Card>
            </div>
        )
    }
}
export default ChartLine