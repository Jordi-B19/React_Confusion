import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({dish}) {
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


function RenderComments({comments}){
	if(comments != null)
		return(
			<div>
				<h4>Comments</h4>
				<ul className="list-unstyled">
					{comments.map((comment) => {
							const date = new Date(comment.date)
							const options = { year: 'numeric', month: 'short', day: 'numeric' };
							return(
								<li key={comment.id}>
									{comment.comment}<br />
									<br />
									-- {comment.author}, {date.toLocaleDateString("en-US",options)}<br />
									<br />
								</li>
							);
						})	
					}
				</ul>
			</div>
		);
	else
		return(<div></div>);
}

const DishDetail = (props) => {
	return (
		<div className="container">
			<div className="row">
				<Breadcrumb>
					<BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
					<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
				</Breadcrumb>
				<div className="col-12">
					<h3>{props.dish.name}</h3>
					<hr />
				</div>                
			</div>
			<div className="row">
				<div className="col-12 col-md-5 m-1">
					<RenderDish dish={props.dish} />
				</div>
				<div className="col-12 col-md-5 m-1">
					<RenderComments comments={props.comments} />
				</div>
			</div>
		</div>
	)
}

export default DishDetail;