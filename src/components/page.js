import React, { Component } from 'react';
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

import './monitor_vertical.css';


class App extends Component {
    constructor(){
        super();

    this.state={
        date:new Date(),
    }}

    tick(){
        this.setState({
            date:new Date(),
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
    componentDidMount(){
        setInterval(()=>this.tick(),1000)
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
                        <div className="col-xs-6" id="time-div" style={{float:`left`,paddingLeft:`8%`}}>
                            {this.init_time()}
                        </div>
                        <div className="col-xs-6" id="machine-div" style={{float:`right`,paddingRight:`8%`}}>
                            <img src={Wind} className="wind-img"></img>
                                <span>果麦新风净化系统运行中</span>
                        </div>
                    </div>
                </div>
                <div className="monitor-indoor">
                    <div className="monitor-indoor-outdoor-header">
                        <span className="chinese-label">室内</span>
                        <span className="english-label">Indoor</span>
                    </div>
                    <div className="monitor-indoor-body">
                        <div className="monitor-indoor-body-item">
                            <div className="col-xs-3 center" style={{paddingLeft:`5%`}}>
                                <img src={Air_quality} className="indoor-img"></img>
                                    <div className="font-30">PM2.5</div>
                            </div>
                            <div className="col-xs-5 font-50">
                                空气质量
                                <span className="font-bold">
                        &nbsp;&nbsp;优秀
                    </span>
                            </div>
                            <div className="col-xs-4">
                                <span id="air-quality-indoor" className="font-80">0</span>
                                <span className="font-40">&nbsp;ug/m<sup>3</sup></span>
                            </div>
                        </div>
                        <div className="seperate-div"></div>
                        <div className="monitor-indoor-body-item" id="co2-div">
                            <div className="col-xs-3 center"  style={{paddingLeft:`2%`}}>
                                <img src={CO2} className="indoor-img"></img>
                                    <div className="font-30">二氧化碳浓度</div>
                            </div>
                            <div className="col-xs-5 font-50" style={{paddingLeft:`7%`}}>
                                氧气
                                <span className="font-bold">
                        &nbsp;&nbsp;充沛
                    </span>
                            </div>
                            <div className="col-xs-4" style={{paddingLeft:`10%`}}>
                                <span id="co2-indoor" className="font-80" >0</span>
                                <span className="font-40">&nbsp;ppm</span>
                            </div>
                        </div>
                        <div className="seperate-div"></div>
                        <div className="monitor-indoor-body-item border-bottom-raduis">
                            <div className="col-xs-3 center" style={{paddingLeft:`5%`}}>
                                <img src={Temprature_humidity} className="indoor-img"></img>
                                    <div className="font-30">温度/湿度</div>
                            </div>
                            <div className="col-xs-5"  style={{padding:`9%`}}>
                                <div className="font-40">
                                    室内
                                    <span className="font-bold">
                        &nbsp;&nbsp;温度
                        </span>
                                </div>
                                <div className="font-40">
                                    室内
                                    <span className="font-bold">
                        &nbsp;&nbsp;湿度
                        </span>
                                </div>
                            </div>
                            <div className="col-xs-4" style={{paddingLeft:`15.6%`}}>
                                <div className="half-height margin-bottom-10">
                                    <span id="temprature-indoor" style={{fontSize:`70px`}}>0</span>
                                    <span className="font-40">&nbsp;<sup>o</sup>C</span>
                                </div>
                                <div className="half-height margin-top-10">
                                    <span id="humidity-indoor" style={{fontSize:`70px`}}>0</span>
                                    <span className="font-40">&nbsp;%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="monitor-outdoor">
                    <div className="monitor-indoor-outdoor-header outdoor">
                        <span className="chinese-label">室外</span>
                        <span className="english-label">Outdoor</span>
                    </div>
                    <div className="monitor-outdoor-body">
                        <div className="monitor-indoor-body-item" id="outdoor-item" style={{paddingLeft: `3.5%`,}}>
                            <div className="col-xs-3 center">
                                <img src={Air_quality} className="indoor-img"></img>
                                    <div className="font-30">AQI/PM2.5</div>
                            </div>
                            <div className="col-xs-5 font-50" id="outdoor-aqi-label" style={{padding:`7.8%`}}>
                                空气质量优秀
                            </div>
                            <div className="col-xs-4" style={{paddingLeft:`6%`}}>
                                <div className="half-height">
                                    <span className="font-40">AQI</span>
                                    <span id="aqi-outdoor" className="font-80">&nbsp;0</span>
                                </div>
                                <div className="half-height">
                                    <span className="font-30">PM2.5&nbsp;</span>
                                    <span id="pm25-outdoor" className="font-50">0</span>
                                    <span className="font-30">ug/m<sup>3</sup></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact-div">
                    <div className="col-xs-7" style={{float:`left`}}>
                        <div className="half-height">
                            <img src={Gmair_logo} className="gmair-image"></img>
                            <div><img src={Log} className="log-image"></img></div>

                        </div>
                        <div className="div-20"></div>
                        <div className="half-height font-40">
                            <div><span>TEL&nbsp;:&nbsp;</span>4009946898</div>
                            <div><span>Email&nbsp;:&nbsp;</span>service@gmair.net</div>
                        </div>
                    </div>
                    <div className="col-xs-5" style={{float:`left`,paddingRight:`6%`,paddingLeft:`6%`}}>
                        <div style={{float:`left`}}>
                            <img style={{paddingRight:`10%`}} src={Wechat} className="qrcode-img"></img>
                        </div>
                        <div style={{float:`left`}}>
                            <img style={{paddingLeft:`10%`}} src={Wechat_public} className="qrcode-img"></img>
                        </div>
                        <div style={{paddingTop:`200px`}}>
                        <img width="350px" src={Aqi_line}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
