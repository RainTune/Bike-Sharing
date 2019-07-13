import React from 'react';
import {Card} from "antd";

import echarts from 'echarts/lib/echarts.js';
/*引入柱状图*/
import 'echarts/lib/chart/bar';
/*引入提示框和标题组件*/
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import Util from 'rootSrc/util.jsx';
const util = new Util();
class ChartBar extends React.Component {
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
                userNumber: res.userNumber,
                date: res.date
            },() => {
                this.initBikeOrder();
                this.initUserNumber();
            })
        })
    }
    initBikeOrder() {
        //let myBar = echarts.init(document.getElementById('bar'));
        let myBar = echarts.init(this.refs.bar1)
        myBar.setOption({
            color: 'gold',
            title: { text: this.state.bikeOrderList.title },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: this.state.bikeOrderList.date
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '订单量',
                type: 'bar',
                data: this.state.bikeOrderList.data
            }]
        });
    }
    initUserNumber() {
        let myBar = echarts.init(this.refs.bar2);
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
                type: 'bar',
                data: list[i]
            })
        }
        return res;
    }
    render() {
        return (
            <div className='ui-message'>
                <Card className='card-wrap' title='信息提示'>
                    <Card className='card-wrap' title='柱状图1'>
                        <div id="bar" style={{height: 400}} ref = 'bar1'></div>
                    </Card>
                    <Card className='card-wrap' title='柱状图2'>
                        <div id="bar" style={{height: 400}} ref = 'bar2'></div>
                    </Card>
                </Card>
            </div>
        )
    }
}
export default ChartBar