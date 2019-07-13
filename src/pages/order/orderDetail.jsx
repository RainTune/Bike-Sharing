import React from 'react';
import {Link} from "react-router-dom";

import 'rootSrc/less/order/orderDetail.less'

import {Card, Row, Col} from "antd";
import Util from 'rootSrc/util.jsx';

import startImgUrl from 'rootSrc/resource/map/start_point.png';
import endImgUrl from 'rootSrc/resource/map/end_point.png';
const util = new Util();
class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetailInfo: {}
        };
    }
    componentDidMount() {
        let orderId = this.props.match.params.id;
        if(orderId) {
            this.getDetailInfo(orderId);
        }
    }
    getDetailInfo(orderId) {
        util.ajax({
            url: '/order/detail',
            params: {
                orderId
            }
        }).then(res => {
            this.setState({
                orderDetailInfo: res
            });
            this.initialMap(res);
        })
    }
    initialMap(res) {
         this.map = new window.BMap.Map("myMap");
         let point = new window.BMap.Point(116.404, 39.915);
         this.addMapControl();
         this.drawBikeRoute(res.position_list);
         this.drawServiceArea(res.area)
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
            startPoint = new window.BMap.Point(position[0].lon, position[0].lat);
            let startIcon = new window.BMap.Icon(startImgUrl, new window.BMap.Size(36,42),{
                imageSize: new window.BMap.Size(36,42)
            });
            let startMarker = new window.BMap.Marker(startPoint,{ icon: startIcon});
            map.addOverlay(startMarker)
            endPoint = new window.BMap.Point(position[len-1].lon, position[len-1].lat);
            let endIcon = new window.BMap.Icon(endImgUrl, new window.BMap.Size(36,42),{
                imageSize: new window.BMap.Size(36,42)
            });
            let endMarker = new window.BMap.Marker(endPoint,{ icon: endIcon});
            map.addOverlay(endMarker);
            /*绘制路线*/
            let trackPoint = position.map((item,i) => {
                let point = new window.BMap.Point(item.lon, item.lat);
                return point;
            });
            let polyline = new window.BMap.Polyline(trackPoint,{
                strokeColor: 'blue', strokeWeight: 4, strokeOpacity: 0.8
            });
            map.addOverlay(polyline);
        }
        map.centerAndZoom(endPoint, 11);
    }
    drawServiceArea(area) {
        let map = this.map;
        let zone = area.map((item,i) => {
            let point = new window.BMap.Point(item.lon, item.lat);
            return point;
        });
        let polygon = new window.BMap.Polygon(zone,{
            fillStyle: 'red',
            fillOpacity: 0.5,
            strokeWeight: 4,
            strokeColor: 'blue'
        });
        map.addOverlay(polygon);
    }
    render() {
        const info = this.state.orderDetailInfo;
        return (
            <div className={'order-detail'}>
                <Card className="card-wrap map" id='myMap'/>
                <Card  className={'card-wrap basic-info'}>
                    <Row>
                        <Col span={4} className={'detail-title'}>基础信息</Col>
                        <Col span={20} className={'detail-content'}>
                            <div className="detail-item">
                                <span>用车模式</span>
                                <span>{info.mode == '1' ? '服务区' : '停车点'}</span>
                            </div>
                            <div className="detail-item">
                                <span>订单编号</span>
                                <span>{info.order_sn}</span>
                            </div>
                            <div className="detail-item">
                                <span>车辆编号</span>
                                <span>{info.bike_sn}</span>
                            </div>
                            <div className="detail-item">
                                <span>用户姓名</span>
                                <span>{info.user_name}</span>
                            </div>
                            <div className="detail-item">
                                <span>手机号码</span>
                                <span>{info.mobile}</span>
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card  className={'card-wrap orbit-info'}>
                    <Row>
                        <Col span={4} className={'detail-title'}>行驶轨迹</Col>
                        <Col span={20} className={'detail-content'}>
                            <div className="detail-item">
                                <span>行程起点</span>
                                <span>{info.start_location}</span>
                            </div>
                            <div className="detail-item">
                                <span>行程终点</span>
                                <span>{info.end_location}</span>
                            </div>
                            <div className="detail-item">
                                <span>行驶里程</span>
                                <span>{info.distance}</span>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}
export default OrderDetail