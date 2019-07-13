import React from 'react';
import {Card, Row, Col, Modal} from "antd";

class Gallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            currentImg: ''
        }
    }
    openModal(e, img) {
        console.log(img)
        this.setState({
            visible: true,
            currentImg: img
        })
    }
    render() {
        let arr = [
            ['1.png','2.png','3.png','4.png','5.png'],
            ['6.png','7.png','8.png','9.png','10.png'],
            ['11.png','12.png','13.png','14.png','15.png'],
            ['16.png','17.png','18.png','19.png','20.png'],
            ['21.png','22.png','23.png','24.png','25.png'],
        ];
        let imgList = arr.map((item) => {
            return item.map(img=> {
                return (
                    <Card
                        key={img}
                        cover = {<img src={require('rootSrc/resource/gallery/'+ img)} alt={img} onClick={(e) => this.openModal(e, img)}/>}
                    >
                        <Card.Meta
                            title={'Rain Tune'}
                            description={'I Love You'}
                        />
                    </Card>
                )
            })
        });
        return (
            <div className='ui-gallery'>
                <Row gutter={16}>
                    <Col sm={5}>{imgList[0]}</Col>
                    <Col sm={4}>{imgList[1]}</Col>
                    <Col sm={5}>{imgList[2]}</Col>
                    <Col sm={4}>{imgList[3]}</Col>
                    <Col sm={5}>{imgList[4]}</Col>
                </Row>
                <Modal
                    visible={this.state.visible}
                    width={300}
                    title={'图片画廊'}
                    onCancel={() => {
                        this.setState({
                            visible: false
                        })
                    }}
                    footer={null}
                >
                    <img src={`/src/resource/gallery/${this.state.currentImg}`} width={'100%'} alt={this.state.currentImg}/>
                </Modal>
            </div>
        )
    }
}
export default Gallery