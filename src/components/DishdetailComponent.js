import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
	CardTitle, Breadcrumb, BreadcrumbItem, 
	Button, Modal, ModalHeader, ModalBody, FormGroup, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

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


function RenderComments({comments, addComment, dishId}){
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
				<CommentForm dishId={dishId} addComment={addComment} />
			</div>
		);
	else
		return(<div></div>);
}

class CommentForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            isModalOpen: false
        }
		this.toggleModal = this.toggleModal.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
	  }
	  
	handleSubmit(values) {
		this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <FormGroup>
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                            </Control.select>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="author">Your Name</Label>
                            <Control.text model=".author" id="author" name="author"
								className="form-control"
								placeholder="Your Name"
                                validators={{
                                    minLength: minLength(3), maxLength: maxLength(15)
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".name"
                                show="touched"
                                messages={{
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea model=".comment" id="comment" name="comment"
                                rows="7"
                                className="form-control" />
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </FormGroup>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </React.Fragment>
        )
    }
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
					<RenderComments comments={props.comments}
						addComment={props.addComment}
						dishId={props.dish.id}
					/>
				</div>
			</div>
		</div>
	)
}

export default DishDetail;