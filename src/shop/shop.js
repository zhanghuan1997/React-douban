import React from 'react';
import './shop.css';
import Axios from 'axios';
class Shop extends React.Component{
	constructor(){
		super();
		this.state={
			visible:false,
			othervisible:true,
			num:1,
			cart:[],
			currentId:"",
			currentIndex:"",
			goodsArr:[],
			
		}
	}
	hide=(e)=>{
		console.log(e)
		this.setState({
			currentId:e.goods_id
		})
	}
	othervisible=(item)=>{
//		console.log(item.id)
		let param=new URLSearchParams();
		let token=localStorage.getItem("token")
		param.append('token',token)
		let newList=this.state.cart.filter((ditem)=>{
			return item.id===ditem.id
		})
//			console.log(newList)
		let goods_id=newList[0].goods_id
//		console.log(goods_id)
		let attr_id=newList[0].attr_id
		param.append('goods_id',goods_id)
		param.append('attr_id',attr_id)
		Axios({
			method:'post',
			url:'http://shop.com/index.php/index/goods/cartDelete',
			data:param
		}).then((res)=>{
			console.log(res.data.data.cart)
			this.setState({
				cart:res.data.data.cart
			})
		})
	}
	no=()=>{
		this.setState({
			currentId:""
		})
	}
	add=()=>{
	 	var a=this.state.num
	 	this.setState({
	 		num:++a
	 	})
	}
	weilei=(e)=>{
		var list=this.state.cart.forEach((item)=>{
				if(item.id===e.id){
					item.isSelected=!item.isSelected
				}
		})
		this.setState({
			currentIndex:e.goods_id,
			list:this.state.cart
			
		})
	}
	cut=(e)=>{
		let token=localStorage.getItem('token')
        Axios.post('http://shop.com/index.php/index/goods/cartDec',{
        	goods_id:e.goods_id,
        	attr_id:e.attr_id,
        	token:token,
        	count:this.state.num
        	
        }).then((res)=>{
        	console.log(res)
        	this.setState({
        		cart:res.data.data.cart
        	})
        })
        
		
		var a=this.state.num
		if(a<2){
			a=2
		}
		this.setState({
			num:--a
		})
	}
	componentDidMount(){
		this.Fun()
	}
	Fun=()=>{
		const param=new URLSearchParams();
		const token=localStorage.getItem("token")
		param.append('token',token)
		
		Axios({
			method:'post',
			url:'http://shop.com/index.php/index/goods/cartinfo',
			data:param
		}).then((res)=>{
			console.log(res)

			this.setState({
				cart:res.data.data.cart.map((result,list)=>{
					result.id=list
					result.isSelected=false
					return(
						result
					)
				})
			})
		})
		
	}
	render(){
		console.log(this.state.cart)
//		console.log(this.state.currentId)
		return(
			<div>
				<div className="only">
					<div className="top">豆瓣&nbsp;豆品</div>
					<div className="bigchecked">
						<div className="c01"></div>
						<span>豆瓣豆品</span>
					</div>
					{this.state.cart.map((val,index)=>{
						return(
							<div key={index}>
							{this.state.othervisible&&
							<div className="goodss">
								<div className="good">
									<div  onClick={this.weilei.bind(this,val)} className={`c ${val.isSelected?"aaa":""}`}></div>
									<img alt="" src={val.pic} />
									<div className="smallgood">
										<div className="font-a">{val.name}</div>
										<div className="font-b">{val.attr_name}</div>
										<b onClick={this.cut.bind(this,val)}>-</b>
										<span>{val.count}</span>
										<b onClick={this.add}>+</b>
									</div>
									<span onClick={this.hide.bind(this,val)} className="span-a">删除</span>
									<span className="span-b">￥{val.price}</span>
								</div>
								{this.state.currentId===val.goods_id? (
									<div className="tip02">
									<div className="next">
										<div onClick={this.no} className="quxiao">取消</div>
										<div onClick={this.othervisible.bind(this,val)} className="querenshanchu">确认删除</div>
									</div>
								</div>
								) : (
									null
								)
								}
							</div>}
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}

export default Shop;