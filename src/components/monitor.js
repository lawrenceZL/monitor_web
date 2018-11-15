import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import Gmair_header from '../material/image/guomai.png';
import Location_logo from '../material/image/location_logo.png';
import Wind from '../material/image/wind.png';
import Air_quality from '../material/image/air_quality.png';
import CO2 from '../material/image/co2.png';
import Temprature_humidity from '../material/image/temprature_humidity.png';
import Gmair_logo from '../material/image/gmair_logo.png';
import Log from '../material/image/log.png';
import Wechat from '../material/image/wechat.png';
import Wechat_public from '../material/image/wechat_public.jpg';
import Aqi_line from '../material/image/aqi_line.png'
import {machine_air_service} from '../service/machine_air.service';

import './monitor_vertical.css';


class Monitor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            online_status: ``,
            date: new Date(),
            CO2: ``,
            indoor_pm2_5: ``,
            temp: ``,
            humid: ``,
            city_pm2_5: ``,
            aqi: ``,
            city_name: ``,
            CO2_visible: true,
            cityId: ``,
            provinceId: ``,
            qrcode: ``,
        }
    }

    tick() {
        this.setState({
            date: new Date(),
        })
        this.init_time();
    }

    init_time() {
        let today = new Date();
        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() + 1)).slice(-2).toString();
        let date = ('0' + today.getDate()).slice(-2).toString();
        let hour = ('0' + today.getHours()).slice(-2).toString();
        let minute = ('0' + today.getMinutes()).slice(-2).toString();
        let date_string = year + "年" + month + "月" + date + "日" + "  " + hour + ":" + minute;
        return date_string;
    }

    componentDidMount() {
        let qrcode = this.props.match.params.qrcode;
        this.setState({qrcode: qrcode})
        this.getIndoor(qrcode);
        this.getCity(qrcode);
        setInterval(() => this.getIndoor(qrcode), 10000)
        setInterval(() => this.tick(), 1000)
        setInterval(() => this.getCity(qrcode), 10000)
        setInterval(() => this.getOutdoor(this.state.cityId, this.state.provinceId), 1000)
    }

    //根据qrcode获取室内信息,
    getIndoor(qrcode) {
        machine_air_service.obtain_test_data(qrcode).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                this.setState({
                    CO2: response.data.co2,
                    indoor_pm2_5: response.data.pm2_5,
                    temp: response.data.temp,
                    humid: response.data.humid,
                })
            }
        })
    }

    //根据qrcode获取在线状态
    getOnlineStatus(qrcode) {
        machine_air_service.obtain_online_status(qrcode).then(response => {
            if (response.responseCode === "RESPONSE_OK") {
                this.setState({
                    online_status: true
                })
            }
            else {
                this.setState({
                    online_status: false,
                })
            }
        })
    }

    //根据cityId/provinceId获取城市数值
    getOutdoor(cityId, provinceId) {
        machine_air_service.obtain_outdoor(cityId, provinceId).then(response => {
            if (response.responseCode === "RESPONSE_OK") {
                this.setState({
                    city_pm2_5: response.data[0].pm2_5,
                    aqi: response.data[0].aqi,
                    city_name: response.data[0].cityName,
                })
            }
        })
    }

    //根据qrcode查询城市
    getCity(qrcode) {
        machine_air_service.obtain_city(qrcode).then(response => {
            if (response.responseCode === "RESPONSE_OK") {
                this.setState({
                    cityId: response.data[0].cityId,
                })
            }
        })
    }

    pm2_5_render(pm2_5) {
        if (pm2_5 >= 0 && pm2_5 <= 35) {
            return <span>优秀</span>
        } else if (pm2_5 > 35 && pm2_5 <= 75) {
            return <span>良好</span>
        } else if (pm2_5 > 75 && pm2_5 <= 115) {
            return <span>轻度污染</span>
        } else if (pm2_5 > 115 && pm2_5 <= 150) {
            return <span>中度污染</span>
        } else if (pm2_5 > 150 && pm2_5 <= 250) {
            return <span>重度污染</span>
        } else {
            return <span>严重污染</span>
        }

    }

    co2_render(CO2) {
        if (CO2 <= 1500) {
            return <span> 氧气<span className="font-bold">&nbsp;&nbsp;充沛</span></span>
        }
        if (CO2 > 1500 && CO2 < 2000) {
            return <span>二氧化碳&nbsp;</span>
        }
    }

    render() {
        return (
            <div>
                <div className="monitor-header">
                    <div className="location-div">
                        <img src={Location_logo} className="location-img"></img>
                        <img src={Gmair_header} className="geer-img"></img>
                    </div>
                    <div className="init-div">
                        <div style={{float: `left`, width: `50%`}}>
                            {this.init_time()}
                        </div>
                        <div style={{float: `right`, width: `50%`}}>
                            <img src={Wind} className="wind-img"></img>
                            <span>果麦新风净化系统运行中</span>
                        </div>
                    </div>
                </div>
                <div className="monitor-indoor">
                    <div className="monitor-indoor-outdoor-header">
                        <span className="chinese-label">室内</span>
                        <span className="english-label">{this.state.qrcode}</span>
                    </div>
                    <div className="monitor-indoor-body">
                        <div className="monitor-indoor-body-item">
                            <div className="content_left">
                                <img src={Air_quality} className="indoor-img"></img>
                                <div className="content_left_text">PM2.5</div>
                            </div>
                            <div className="content_middle">
                                空气质量<span className="font-bold">&nbsp;&nbsp;{this.pm2_5_render(this.state.indoor_pm2_5)}</span>
                            </div>
                            <div className="content_right">
                                <span className="test_value">{this.state.indoor_pm2_5}</span>
                                <span className="test_unit">&nbsp;ug/m<sup>3</sup></span>
                            </div>
                        </div>
                        <div className="seperate-div"></div>
                        { this.state.CO2>0&&this.state.CO2<2000&&
                            <div className="monitor-indoor-body-item">
                                <div className="content_left">
                                    <img src={CO2} className="indoor-img"></img>
                                    <div className="content_left_text">二氧化碳浓度</div>
                                </div>
                                <div className="content_middle">
                                    {this.co2_render(this.state.CO2)}
                                </div>
                                <div className="content_right">
                                    <span className="test_value">{this.state.CO2}</span>
                                    <span className="test_unit">&nbsp;ppm</span>
                                </div>
                            </div>
                        }
                        <div className="seperate-div"></div>
                        <div className="monitor-indoor-body-item border-bottom-raduis">
                            <div className="content_left">
                                <img src={Temprature_humidity} className="indoor-img"></img>
                                <div className="content_left_text">温度/湿度</div>
                            </div>
                            <div className="content_middle">
                                <div className="content_middle_1">
                                    室内<span className="font-bold">&nbsp;&nbsp;温度</span>
                                </div>
                                <div className="content_middle_1">
                                    室内<span className="font-bold">&nbsp;&nbsp;湿度</span>
                                </div>
                            </div>
                            <div className="content_right">
                                <div className="half-height margin-bottom-10">
                                    <span className="test_value">{this.state.temp}</span>
                                    <span className="test_unit">&nbsp;<sup>o</sup>C</span>
                                </div>
                                <div className="half-height margin-top-10">
                                    <span className="test_value">{this.state.humid}</span>
                                    <span className="test_unit">&nbsp;%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="monitor-outdoor">
                    <div className="monitor-indoor-outdoor-header outdoor">
                        <span className="chinese-label">
                            {this.state.city_name!=""&& <span>{this.state.city_name}</span>}
                            {this.state.city_name===""&& <span>室外</span>}
                        </span>
                        <span className="english-label">Outdoor</span>
                    </div>
                    <div className="monitor-outdoor-body">
                        <div className="monitor-indoor-body-item">
                            <div className="content_left">
                                <img src={Air_quality} className="indoor-img"></img>
                                <div className="content_left_text">AQI/PM2.5</div>
                            </div>
                            <div className="content_middle">
                                空气质量<span className="font-bold">&nbsp;&nbsp;{this.pm2_5_render(this.state.city_pm2_5)}</span>
                            </div>
                            <div className="content_right">
                                <div className="half-height">
                                    <span className="test_unit">AQI</span>
                                    <span className="test_value">&nbsp;{this.state.aqi}</span>
                                </div>
                                <div className="half-height">
                                    <span className="test_unit">PM2.5&nbsp;</span>
                                    <span className="test_value">{this.state.city_pm2_5}</span>
                                    <span className="test_unit">&nbsp;ug/m<sup>3</sup></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact-div">
                    <div className="footer_left" >
                        <div className="half-height">
                            <img src={Gmair_logo} className="gmair-image"></img>
                            <div><img src={Log} className="log-image"></img></div>
                        </div>
                        <div style={{height:`5px`}}></div>
                        <div className="half-height footer_text">
                            <div><span>TEL&nbsp;:&nbsp;</span>4009946898</div>
                            <div><span>Email&nbsp;:&nbsp;</span>service@gmair.net</div>
                        </div>
                    </div>
                    <div className="footer_right">
                        <div className="footer_right_img_div">
                            <img src={Wechat} className="qrcode-img"></img>
                        </div>
                        <div className="footer_right_img_div">
                            <img src={Wechat_public} className="qrcode-img"></img>
                        </div>
                        <div style={{paddingTop:`45%`}}>
                            <img className="aqi-img" src={Aqi_line}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Monitor);
