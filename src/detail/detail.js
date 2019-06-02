import React from 'react';
import Axios from 'axios';
import './detail.css';
class Detail extends React.Component{
	constructor(props){
		super(props);
		this.state={
			info:{},
			visible:false,
			num:1,
			attr:[],
			currentIndex:"",
			fontChange:"请选择颜色",
			pic:"",
			vl:""
		}
	}
	componentDidMount(){
//		console.log(this.props.match.params.id)
		this.Fun()
	}
	Fun=()=>{
		Axios({
			method:'get',
			url:'http://shop.com/index.php/index/goods/detail',
			datatype:'json',
			params:this.props.match.params.id
		}).then((res)=>{
//			console.log(res.data.data.info.attr[0].pic)
			this.setState({
				pic:res.data.data.info.attr[0].pic,
				info:res.data.data.info,
				attr:res.data.data.info.attr.map((result,list)=>{
					result.index=list;
					return(
						result
					)
				})
			})
		})
	}
	buy=()=>{
		this.setState({
			visible:true
		})
	}
	hidden=()=>{
		this.setState({
			visible:false
		})
	}
	add=()=>{
		let a=this.state.num
		this.setState({
			num:++a
		})
	}
	cut=()=>{
		let a=this.state.num
		if(a<2){
			a=2
		}
		this.setState({
			num:--a
		})
	}
	change=(vl)=>{
//		console.log(vl)
		this.setState({
			currentIndex:vl.index,
			fontChange:`已选择"${vl.attr_name}"`,
			pic:vl.pic,
			vl:vl
		});
		if(this.state.currentIndex===vl.index){
			this.setState({
				currentIndex:"",
				fontChange:"请选择颜色"
			})
		}
	}
	join=()=>{
		if(this.state.currentIndex!==""){
			const token =localStorage.getItem('token')
			let param=new URLSearchParams();
			param.append('goods_id',this.props.match.params.id)
			param.append('token',token)
			param.append('count',this.state.num)
			param.append('attr_id',this.state.vl.attr_id)
		
			Axios({
				method:'post',
				url:'http://shop.com/index.php/index/goods/cart',
				data:param
			}).then((res)=>{
				alert(res.data.msg)
				window.location.href="../shop/shop.js"
			})
		}else{
			return false
		}

	}
	render(){
//		console.log(this.state.info.attr)
//		console.log(this.state.fontChange)
//		console.log(this.state.info)
//		console.log(this.state.attr)
		return(
			<div>
				<div className="describe">
				<img alt="" src={this.state.info.img} />
					<div className="font05">{this.state.info.title}</div>
					<div className="font06">￥{this.state.info.price}</div>
					<div className="font07">订单满188包邮</div>
					<div onClick={this.buy} className="font08">立即购买</div>
				</div>
				{this.state.visible&&
					<div>
				<div className="tip"></div>
				<div className="goods">
					<div className="detail">
						<span onClick={this.hidden} className="mui-modal-close">X</span>
						<img alt="" src={this.state.pic}/>
						<div className="product-hd">
							<div className="spu-title">{this.state.info.title}</div>
							<div className="spu-price">￥178.00</div>
							<div className='spu-props-tips'>{this.state.fontChange}</div>
						</div>
						<div className="props-items">
							<div className="color">颜色 :</div>
								<div className="bd">
								{this.state.info.attr.map((val,index)=>{
									return(
										<span onClick={this.change.bind(this,val)} key={index} className={`items ${val.index===this.state.currentIndex?"css":""}`}>{val.attr_name}</span>
									)
								})}
								</div>
						</div>
						<div className="num">数量 :</div>
						<div className="mui-number-picker">
							<b onClick={this.cut}>-</b>
							<span>{this.state.num}</span>
							<b onClick={this.add}>+</b>
						</div>
						
						<div className='usebutton'>
							<div onClick={this.join} className={`fastbuy ${this.state.currentIndex===""?"":"back"}`}>加入购物车</div>
							<div className={`inshopcar ${this.state.currentIndex===""?"":"back"}`}>立即购买</div>
						</div>
					</div>
				</div>
				</div>
				}
			</div>
		)
	}
}

export default Detail;