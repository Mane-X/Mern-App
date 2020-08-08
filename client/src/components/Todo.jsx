import React from "react";
import "./todo.css";
// import trashIcon from '../assets/trash-alt-regular.svg';

const Todo = ({ todoObject, date }) => {
	const { _id, todo } = todoObject;

	return (
		<li className="list-group-item">
			<div className="row align-items-center no-gutters">
				<div className="col mr-2">
					<h6 className="mb-0">
						<strong>{todo}</strong>
					</h6>
					<span className="text-xs">
						Added By Admin
					</span>
				</div>
			</div>
		</li>
	);
};

export default Todo;
