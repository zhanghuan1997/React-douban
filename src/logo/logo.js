import React from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
import Axios from 'axios';
import 'antd-mobile/dist/antd-mobile.css';
import './logo.css';
import Middle from '../middle/middle'



class Logo extends React.Component{
	constructor(){
		super();
		this.state={
			banner:[],
		}
	}
  componentDidMount() {
 	this.Fun();
  	
 }
  Fun(){
  	Axios.get("http://shop.com/index.php/index/goods/index")
  	.then((res)=>{
//		console.log(res)
		this.setState({
			banner:res.data.data.banner
		})
  	})
 }
	render(){
//		console.log(this.state.banner)
		return(
			<div>
				<WingBlank style={{margin:'0',padding:'0'}}>
			        <Carousel
			          autoplay={true}
			          infinite
			        >
			          {this.state.banner.map((val,index) => (
			          	
			              <img
			                src={val.img}
			                alt=""
			                key={index}
			                style={{ width: '100%', verticalAlign: 'top', height:'35rem' }}
			                onLoad={() => {
			                  // fire window resize event to change height
			                  window.dispatchEvent(new Event('resize'));
			                  this.setState({ imgHeight: 'auto' });
			                }}
			              />
			        
			          ))}
			        </Carousel>
      			</WingBlank>
      			<Middle />
			</div>
		)
	}
}
export default Logo;