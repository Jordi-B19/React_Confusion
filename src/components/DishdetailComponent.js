import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
	CardTitle } from 'reactstrap';

class DishDetail extends Component {

	constructor(props) {
		super(props);
	}

	renderDish(dish) {
		if (dish != null)
			return(
				<Card>
					<CardImg top src={dish.image} alt={dish.name} />
					<CardBody>
						<CardTitle><h6>{dish.name}</h6></CardTitle>
						<CardText>{dish.description}</CardText>
					</CardBody>
				</Card>
			);
		else
			return(
				<div></div>
			);
	}

	renderComments(dish){
		if(dish != null && dish.comments != null){
			return(
				<div className="col-12 col-md-5 m-1">
					<h4>Comments</h4>
					<ul className="list-unstyled">
						{dish.comments.map((comment)=>{
							const date = new Date(comment.date)
							const options = { year: 'numeric', month: 'short', day: 'numeric' };
							return(
							<li>
								{comment.comment}<br></br>
								<br></br>
								-- {comment.author}, {date.toLocaleDateString("en-US",options)}<br></br>
								<br></br>
							</li>
						)})}
					</ul>
				</div>
			)
		}
		else{return(<div></div>)}
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						{this.renderDish(this.props.dish)}
					</div>
					{this.renderComments(this.props.dish)}
				</div>
			</div>
		)
	}
}

export default DishDetail;