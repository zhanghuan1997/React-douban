import React from 'react';
import './zhuce.css';
import Axios from 'axios';
class Zhuce extends React.Component{
	constructor(){
		super();
		this.state={
			username:"",
			phone:"",
			password:""
			
		}
	}
	getVal=(e)=>{

		this.setState({
			username:e.target.value
		})
	}
	getPhone=(e)=>{
		this.setState({
			phone:e.target.value
		})
	}
	getPass=(e)=>{
		this.setState({
			password:e.target.value
		})
	}
	getThings=()=>{
		let param = new URLSearchParams();
		param.append('user_name',this.state.username);
		param.append('phone',this.state.phone);
		param.append('password',this.state.password);
		
		Axios({
			method:'post',
			url:'http://shop.com/index.php/index/user/reg',
			data:param,
		}).then((res)=>{
			console.log(res)
			alert(res.data.msg)
			if(res.data.error===0){
				window.location.href="http://localhost:3000/denglu"
			}
		})
	}
	gohome=()=>{
		window.location.href="../denglu/denglu.js"
	}
	
	render(){
		return(
				<div>
					<div className="all">
						<span onClick={this.gohome} className="X">X</span>
						<div className="itemss">
							<div className="font-logo">注册豆瓣</div>
							<span className="font-hui">登陆注册表示同意</span>&nbsp;&nbsp;
							<span className="font-green">豆瓣使用协议,隐私政策</span>
						</div>
						<div className="inputs">
							<input ref="inp01" onChange={this.getVal} value={this.state.username} placeholder="用户名" type="phone" className="phone"></input>
							<input ref="inp02" onChange={this.getPhone} value={this.state.phone} placeholder="电话号" type="text" className="password"></input>
							<input ref="inp03" onChange={this.getPass} value={this.state.password} placeholder="密码" type="text" className="password"></input>
						</div>
						<div onClick={this.getThings} className="button">注册</div>
					</div>
				</div>
		)
	}
}

export default Zhuce;