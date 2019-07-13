import React from 'react';
import {Card, Carousel} from "antd";
import 'rootSrc/less/ui/ui.less';
class myCarousel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='ui-carousel'>
                <Card className={'card-wrap'}>
                    <Carousel>
                        <div><h3>React</h3></div>
                        <div><h3>Vue</h3></div>
                        <div><h3>Angular</h3></div>
                    </Carousel>
                </Card>
                <Card className={'card-wrap slide-wrap'}>
                    <Carousel autoplay>
                        <div><p className={'p1'}></p></div>
                        <div><p className={'p2'}></p></div>
                        <div><p className={'p3'}></p></div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}
export default myCarousel