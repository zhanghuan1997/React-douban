import React from 'react';
import './footer.css'
import Axios from 'axios';
import {Link} from "react-router-dom";


class Footer extends React.Component{
	constructor(props){
		super(props);
		this.state={
			goods:[]
		}
	}
	componentDidMount(){
		this.Fun()
	}

	Fun(){
		Axios.get("http://shop.com/index.php/index/goods/index")
		.then((res)=>{
//			console.log(res)
			this.setState({
				goods:res.data.data.goods
			})
		})
	
	}
	render(){
//		console.log(this.state.goods)
		return(
				<div>
					<div className="product-list">
						<div className="product-list-header">新品首发</div>
						<ul className="product-list-content">
							{this.state.goods.map((val,index)=>{
								return(
									<li key={index} className="product-list-item">
										<Link key={index} to={`/detail/${val.id}`}>
												<img src={val.img}
												alt=""/>
												<div className="product-card-info">
													<div className="font01">{val.title}</div>
													<div className="font02">{val.desc}</div>
													<div className="product-card-bottom">
														<span className="font03">{val.price}</span>
														<span className="font04">新品上市</span>
													</div>
												</div>
										</Link>
									</li>
								)
							})}
						</ul>
					</div>
				</div>
		)
	}
	
}


export default Footer;