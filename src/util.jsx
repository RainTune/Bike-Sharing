import axios from 'axios';
import React from 'react';
/*import qs from 'qs';*/
import {message} from "antd";
import JSONP from 'jsonp';
class Axios {
    trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    errorTip(err) {
        alert('出错了')
    }
    pagination(data, callBack) {
        return {
            current: data.current,
            pageSize: data.pageSize,
            total: data.total,
            showQuickJumper: true,
            hideOnSinglePage: true,
            showTotal: (total) => {
                return `总共有${data.total}条`
            },
            onChange: current => {
                callBack(current)
            }/*,
            itemRender: (current, type, originalElement) => {
                if(type == 'prev') {
                    return <a>prev</a>
                }
                if(type == 'next') {
                    return <a>next</a>
                }
                return originalElement
            }*/
        }
    }
    jsonp(options) {
        return new Promise((resolve,reject) => {
            JSONP(options.url,{
                /*param: 'callback'*/
            },(err, data) => {
               if(data.status === '1') {
                    resolve(data)
                }else {
                    reject(err)
                }
            })
        })
    }
    ajax(options) {
        let loading;
        if(options.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseURL = "https://www.easy-mock.com/mock/5d0b8eee943d8c4e93c180ce/api";
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: options.method || 'get',
                baseURL: baseURL,
                params: options.params || '',
            }).then(response => {
                if(loading) {loading.style.display = 'none';}
                let res = response.data;
                if(res.status == '0') {
                    resolve(res.result)
                }else {
                    message.error('请求失败')
                }
            },(err) => {
                if(loading) {loading.style.display = 'none';}
                reject(err);
                message.error('服务器繁忙')
            })
        })
    }
}
export default Axios