import axios from "axios";

const monitor_url = "http://monitor.gmair.net:8022/monitor";

//根据codeValue获取单个机器在线状态
function obtain_online_status(codeValue){
    let online_status_url=monitor_url+"/machine/online?codeValue="+codeValue;
    return axios.get(online_status_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

//根据qrcode获取机器测量信息
function obtain_test_data(qrcode) {
    let test_data_url=monitor_url+"/machine/status?qrcode="+qrcode;
    return axios.get(test_data_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}
//根据qrcode获取城市
function obtain_city(qrcode) {
    let obtain_city_url=monitor_url+"/cityid/probe?qrcode="+qrcode;
    return axios.get(obtain_city_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

//根据cityId/provinceId获取城市空气质量
function obtain_outdoor(cityId,provinceId) {
    let outdoor_url=monitor_url+"/city/air?cityId="+cityId+"&provinceId="+provinceId;
    return axios.get(outdoor_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}


export  const machine_air_service = {
    obtain_online_status,obtain_outdoor,obtain_test_data,obtain_city
}