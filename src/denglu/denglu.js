import React from 'react';
import './denglu.css';
import {Link} from 'react-router-dom';
import Axios from 'axios';


class Denglu extends React.Component{
	constructor(){
		super();
		this.state={
			phone:"15844711719",
			password:"111"
		}
	}
	getVal=(e)=>{
//		console.log(this.refs.inp.value)
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
		let param=new URLSearchParams();
		param.append('phone',this.state.phone);
		param.append('password',this.state.password)
		
		Axios({
			method:'post',
			url:'http://shop.com/index.php/index/user/doLogin',
			data:param
		}).then((res)=>{
//			console.log(res.data.data.token)
			var token=res.data.data.token
			console.log(token)
			localStorage.setItem("token",token)
			if(res.data.error===0){
				alert(res.data.msg)
				window.location.href="../logo/logo.js"
			}else{
				alert(res.data.msg+'清注册')
			}
		})
	}
	returns=()=>{
		window.location.href="../logo/logo.js"
	}
	render(){
//		console.log(this.state.password)
		return(
			<div>
				<div className="all">
					<span  onClick={this.returns} className="X">X</span>
					<div className="itemss">
						<div className="font-logo">登陆豆瓣</div>
						<span className="font-hui">登陆注册表示同意</span>&nbsp;&nbsp;
						<span className="font-green">豆瓣使用协议,隐私政策</span>
					</div>
					<div className="inputs">
						<input ref="inp" value={this.state.phone} onChange={this.getVal} placeholder="手机号" type="text" className="phone"></input>
						<input ref="inp02" value={this.state.password} onChange={this.getPass} placeholder="密码" type="text" className="password"></input>
					</div>
					<div onClick={this.getThings} className="button">登陆</div>
					<Link to="/zhuce"><div className="button">注册</div></Link>
				</div>
			</div>
		)
	}
}

export default Denglu;