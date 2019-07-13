import React from 'react';
import ReactDom from 'react-dom';

import MyRouter from 'rootSrc/router.jsx';
/*全局导入加载中的样式*/
import 'rootSrc/less/loading.less';

/*redux*/
import {Provider} from 'react-redux';
import configStore from 'rootSrc/pages/redux/store.jsx';
const store = configStore();

ReactDom.render(
    <Provider store={store}>
        <MyRouter/>
    </Provider>,
    document.getElementById('app')
);
