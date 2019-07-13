import React from 'react';
import {Card} from "antd";

import echarts from 'echarts/lib/echarts.js';
/*引入柱状图*/
import 'echarts/lib/chart/pie';
/*引入提示框和标题组件*/
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import Util from 'rootSrc/util.jsx';
const util = new Util();
class ChartPie extends React.Component {
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
            },() => {
                this.initBikeOrderBase();
                this.initBikeOrderDoughnut();
                this.initBikeOrderNightingale();
            })
        })
    }
    initBikeOrderBase() {
        let myPie = echarts.init(this.refs.pie1);
        let data = this.dataConversion();
        myPie.setOption({
            title: {
                text: this.state.bikeOrderList.title,
                x: 'center',
                textStyle: {
                    color: '#ccc'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}({d}%)<br/>{b}:{c}'
            },
            legend: {
                data: this.state.bikeOrderList.date,
                orient: 'vertical',
                right:10,
                top: 20
            },
            series: [{
                name: '订单量',
                radius: '80%',
                type: 'pie',
                data
            }]
        });
    }
    initBikeOrderDoughnut() {
        let myPie = echarts.init(this.refs.pie2);
        let data = this.dataConversion();
        myPie.setOption({
            title: {
                text: this.state.bikeOrderList.title,
                x: 'center',
                textStyle: {
                    color: '#ccc'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}({d}%)<br/>{b}:{c}'
            },
            legend: {
                data: this.state.bikeOrderList.date,
                orient: 'vertical',
                right:10,
                top: 20
            },
            series: [{
                name: '订单量',
                type: 'pie',
                radius: ['50%','70%'],
                center: ['30%', '50%'],
                data
            }]
        });
    }
    initBikeOrderNightingale() {
        let myPie = echarts.init(this.refs.pie3);
        let data = this.dataConversion();
        myPie.setOption({
            title: {
                text: this.state.bikeOrderList.title,
                x: 'center',
                textStyle: {
                    color: '#ccc'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}({d}%)<br/>{b}:{c}'
            },
            legend: {
                data: this.state.bikeOrderList.date,
                orient: 'vertical',
                right:10,
                top: 20
            },
            series: [{
                name: '订单量',
                type: 'pie',
                data: data.sort((a,b) => a.value - b.value),
                roseType: 'area'
            }]
        });
    }
    dataConversion() {
        let res = [];
        let data = this.state.bikeOrderList.data;
        let date = this.state.bikeOrderList.date;
        data.forEach((item, i) => {
            res.push({
                name: date[i],
                value: item
            })
        });
        return res;
    }
    render() {
        return (
            <div className='ui-message'>
                <Card className='card-wrap' title='信息提示'>
                    <Card className='card-wrap' title='饼状图1'>
                        <div id="bar" style={{height: 400}} ref = 'pie1'></div>
                    </Card>
                    <Card className='card-wrap' title='饼状图2'>
                        <div id="bar" style={{height: 400}} ref = 'pie2'></div>
                    </Card>
                    <Card className='card-wrap' title='饼状图3'>
                        <div id="bar" style={{height: 400}} ref = 'pie3'></div>
                    </Card>
                </Card>
            </div>
        )
    }
}
export default ChartPie