import React from 'react';
import ReactDom from 'react-dom';
import 'antd/dist/antd.min.css';
import {HashRouter as Router, Link, Route, Switch, Redirect} from "react-router-dom";
import Common from 'rootSrc/pages/common.jsx'
import NavHome from 'rootSrc/components/navHome.jsx';
import UIButtons from 'rootSrc/pages/ui/buttons.jsx';
import UICarousel from 'rootSrc/pages/ui/carousel.jsx';
import UIGallery from 'rootSrc/pages/ui/gallery.jsx';
import UILoading from 'rootSrc/pages/ui/loadings.jsx';
import UIMessage from 'rootSrc/pages/ui/message.jsx';
import UIModal from 'rootSrc/pages/ui/modals.jsx';
import UINotification from 'rootSrc/pages/ui/notification.jsx';
import UITabs from 'rootSrc/pages/ui/tabs.jsx';
import FormLogin from 'rootSrc/pages/form/login.jsx';
import FormRegister from  'rootSrc/pages/form/register.jsx';
import BisicTable from 'rootSrc/pages/table/basicTable.jsx';
import HighTable from 'rootSrc/pages/table/highTable.jsx';
import City from 'rootSrc/pages/city/city.jsx';
import Order from 'rootSrc/pages/order/order.jsx';
import Template from 'rootSrc/pages/template.jsx';
import OrderDetail from 'rootSrc/pages/order/orderDetail.jsx';
import User from 'rootSrc/pages/user/user.jsx';
import BikeMap from 'rootSrc/pages/bikeMap/bikeMap.jsx';
import ChartsBar from 'rootSrc/pages/charts/bar.jsx';
import ChartsPie from 'rootSrc/pages/charts/pie.jsx';
import ChartsLine from 'rootSrc/pages/charts/line.jsx';
import RichText from 'rootSrc/pages/richText/richText.jsx';
import Permission from 'rootSrc/pages/permission/permission.jsx';

class myRouter extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let uiRoute = (
          <Switch>
              <Route path='/ui/buttons' component={UIButtons}/>
              <Route path='/ui/modals' component={UIModal}/>
              <Route path='/ui/loadings' component={UILoading}/>
              <Route path='/ui/notification' component={UINotification}/>
              <Route path='/ui/messages' component={UIMessage}/>
              <Route path='/ui/tabs' component={UITabs}/>
              <Route path='/ui/gallery' component={UIGallery}/>
              <Route path='/ui/carousel' component={UICarousel}/>
          </Switch>
        );
        let formRoute = (
            <Switch>
                <Route path='/form/login' component={FormLogin}/>
                <Route path='/form/reg' component={FormRegister}/>
            </Switch>
        );
        let tableRoute = (
            <Switch>
                <Route path='/table/basic' component={BisicTable}/>
                <Route path='/table/high' component={HighTable}/>
            </Switch>
        );
        let chartsRoute = (
            <Switch>
                <Route path='/charts/bar' component={ChartsBar}/>
                <Route path='/charts/pie' component={ChartsPie}/>
                <Route path='/charts/line' component={ChartsLine}/>
            </Switch>
        );
        let baseRoute = (
            <Common>
                <Switch>
                    <Route path = '/home' component={NavHome}/>
                    <Route path = '/ui' render={() => uiRoute}/>
                    <Route path = '/form' render={() => formRoute}/>
                    <Route path = '/table' render={() => tableRoute}/>
                    <Route path = '/city' component={City}/>
                    <Route path = '/order' component={Order}/>
                    <Route path = '/user' component={User}/>
                    <Route path = '/bikeMap' component={BikeMap}/>
                    <Route path = '/charts' render={() => chartsRoute}/>
                    <Route path = '/rich' component={RichText}/>
                    <Route path = '/permission' component={Permission}/>
                    <Redirect from = '/' to = '/home'/>
                </Switch>
            </Common>
        );
        let theThirdPartyRoute = (
            <Template>
                <Switch>
                    <Route path = '/theThirdParty/order/detail/:id' component = {OrderDetail}/>
                </Switch>
            </Template>
        );
        return (
            <Router>
                <Switch>
                    <Route path='/theThirdParty' render ={() => theThirdPartyRoute}/>
                    <Route path='/' render ={() => baseRoute}/>
                </Switch>
            </Router>
        )
    }
}
export default myRouter