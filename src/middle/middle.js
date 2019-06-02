import React from 'react';
import './middle.css';
import Footer from '../footer/footer';
import Axios from 'axios';

class Middle extends React.Component{
	
	
	route=()=>{
		var token=localStorage.getItem("token")
		console.log(token)
		Axios({
			method:'get',
			url:'http://shop.com/index.php/index/user/info',
			dataType:'json',
			params:{
				token:token
			}
		}).then((res)=>{
			console.log(res.data.error)
			if(res.data.error===0){
				window.location.href="../shop/shop.js"
			}else{
				window.location.href="../denglu/denglu.js"
			}
		})
	}
	render(){
		return(
			<div>
				<div className="middle">
					<div className="user-bar">
						<div onClick={this.route} className="user-bar-cart">购物车</div>
						<i className="user-bar-line"></i>
						<div className="user-bar-people">我的豆品</div>
					</div>
				</div>
				<Footer />
			</div>
		)
	}
}

export default Middle;