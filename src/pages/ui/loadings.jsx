import React from 'react';
import {Card, Spin, Icon, Alert} from "antd";
import 'rootSrc/less/ui/ui.less';
class Loadings extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const icon = <Icon type={'loading'} style={{fontSize: 30}}/>
        return (
            <div className='ui-loadings'>
                <Card className={'card-wrap'}>
                    <Spin size={'small'}/>
                    <Spin style={{margin: '0 10px'}}/>
                    <Spin size={'large'} spinning={true}/>
                    <Spin indicator={icon} style={{marginLeft: 10}}/>
                </Card>
                <Card className={'card-wrap'}>
                    <Alert
                        type={'info'}
                        message={'Info'}
                        description={'This is a Info Modal'}
                    />
                    <Spin>
                        <Alert
                            type={'success'}
                            message={'Success'}
                            description={'This is a Success Modal'}
                            showIcon={true}
                        />
                    </Spin>
                    <Spin tip={'加载中...'}>
                        <Alert
                            type={'info'}
                            message={'Info'}
                            description={'This is a Info Modal'}
                            showIcon={true}
                        />
                    </Spin>
                    <Spin indicator={icon}>
                        <Alert
                            type={'warning'}
                            message={'Warning'}
                            description={'This is a Warning Modal'}
                            showIcon={true}
                        />
                    </Spin>
                    <Spin indicator={icon} tip={'加载中...'}>
                        <Alert
                            type={'error'}
                            message={'Error'}
                            description={'This is a Error Modal'}
                            showIcon={true}
                        />
                    </Spin>
                </Card>
            </div>
        )
    }
}
export default Loadings