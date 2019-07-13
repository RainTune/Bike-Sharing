import React from 'react';
import {Button, Card, message, Table, Modal, Form, Select,DatePicker} from "antd/lib/index";
import Util from 'rootSrc/util.jsx';
import 'rootSrc/less/city/city.less';
import startImgUrl from "rootSrc/resource/map/start_point.png";
import endImgUrl from "rootSrc/resource/map/end_point.png";
import bikeImgUrl from 'rootSrc/resource/map/bike.jpg';
const util = new Util();
const FormItem = Form.Item;
const Option = Select.Option;
class BikeMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {}
        }
    }
    componentDidMount() {
        this.getTableList();
    }
    getTableList(filerFormInfo) {
        util.ajax({
            url: '/bikes_map',
            params: filerFormInfo
        }).then((res) => {
            this.setState({
                list: res
            });
            /*初始化地图*/
            this.initialMap(res);
        })
    }
    initialMap(res) {
        this.map = new window.BMap.Map("BikesMap");
        this.addMapControl();
        this.drawBikeRoute(res.route_list);
        this.drawBikesList(res.bike_list);
        this.drawServiceArea(res.service_list);
    }
    /*添加地图控件*/
    addMapControl() {
        let map = this.map;
        /*添加控件并设置位置*/
        map.addControl(new window.BMap.NavigationControl({
            anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT
        }));
        map.addControl(new window.BMap.ScaleControl({
            anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT
        }));
    }
    drawBikeRoute(position){
        let len = position.length;
        let map = this.map;
        let startPoint = '';
        let endPoint = '';
        if(position && len > 0) {
            /*添加起始点坐标*/
            let trackPoint = [];
            position.forEach((item, i)=>{
               trackPoint.push(item.split(','));
            });
            startPoint = new window.BMap.Point(trackPoint[0][0],trackPoint[0][1]);
            let startIcon = new window.BMap.Icon(startImgUrl, new window.BMap.Size(36,42),{
                imageSize: new window.BMap.Size(36,42),
                /*设置偏移量，18是32的一半，居中*/
                anchor: new window.BMap.Size(18,42)
            });
            let startMarker = new window.BMap.Marker(startPoint,{ icon: startIcon});
            map.addOverlay(startMarker);
            /*添加结束点坐标*/
            endPoint = new window.BMap.Point(trackPoint[len-1][0],trackPoint[len-1][1]);
            let endIcon = new window.BMap.Icon(endImgUrl, new window.BMap.Size(36,42),{
                imageSize: new window.BMap.Size(36,42),
                /*设置偏移量，18是32的一半，居中*/
                anchor: new window.BMap.Size(18,42)
            });
            let endMarker = new window.BMap.Marker(endPoint,{ icon: endIcon});
            map.addOverlay(endMarker);
            /*绘制路线*/
            let trackPointMap = trackPoint.map((item) => {
                let point = new window.BMap.Point(item[0], item[1]);
                return point;
            });
            let polyline = new window.BMap.Polyline(trackPointMap,{
                strokeColor: 'blue', strokeWeight: 4, strokeOpacity: 0.8
            });
            map.addOverlay(polyline);
        }
        /*设置中心区域*/
        map.centerAndZoom(endPoint, 11);
    }
    drawServiceArea(area) {
        let map = this.map;
        let zone = area.map((item,i) => {
            let point = new window.BMap.Point(item.lon, item.lat);
            return point;
        });
        let polyline = new window.BMap.Polyline(zone,{
            strokeWeight: 4,
            strokeColor: 'red'
        });
        map.addOverlay(polyline);
    }
    drawBikesList(bikesList) {
        let map = this.map;
        if(bikesList && bikesList.length > 0) {
            bikesList.forEach((item) => {
                let bikePoint = item.split(',');
                let point = new window.BMap.Point(bikePoint[0],bikePoint[1]);
                let bikeIcon = new window.BMap.Icon(bikeImgUrl, new window.BMap.Size(36,42),{
                     imageSize: new window.BMap.Size(36,42),
                     anchor: new window.BMap.Size(18,42)
                });
                let marker = new window.BMap.Marker(point, {icon: bikeIcon});
                map.addOverlay(marker);
            });
        }
    };
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
    render() {
        return (
            <div className='order'>
                <Card className='card-wrap'>
                    <FilterForm
                        wrappedComponentRef={(inst) => this.filterForm = inst}
                        onFilterFormReset = {() => this.onFilterFormReset()}
                        onFilterFormCheckOut = {() => this.onFilterFormCheck()}
                    />
                </Card>
                <Card id='BikesMap'style={{height: 350}}/>
            </div>
        )
    }
}
export default BikeMap


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
