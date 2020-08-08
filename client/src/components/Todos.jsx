import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import CarsSold from "./cars.jsx";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { getCookie, signout } from "../auth/Helpers";
import Todo from "./Todo";

const Todos = ({ history }) => {
	// Signup State
	const [values, setValues] = useState({
		todo: "",
		todos: [],
		loading: true,
	});

	const { todo, todos, loading } = values;

	const token = getCookie("token");

	useEffect(() => {
		loadTodos();
	}, []);

	const loadTodos = () => {
		axios({
			method: "GET",
			url: `/api/todos`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				// console.log('PRIVATE PROFILE UPDATE', response)
				const todos = response.data.todos;
				setValues({ ...values, todos, todo: "", loading: false });
			})
			.catch((error) => {
				// console.log('LOAD TODOS ERROR', error.response.data.error);
				if (error.response.status === 401)
					signout(() => history.push("/"));
			});
	};

	return (
		<div className="dashboard text-center ">
			<ToastContainer />
			<div className="content">
				<div className="justify-content-between align-items-center mb-4 ">
					<h3 className="text-center">Dashboard</h3>
				</div>

				{loading === true ? (
					<h1 className="pt-5 text-center ">Loading...</h1>
				) : todos.length === 0 ? (
					<React.Fragment>
						<h3 className="pt-5 text-center"> YEY!!! No Todos!</h3>
						<h6 className="lead text-center">
							No Tasks added by the Admin. You can relax.{" "}
							<span role="img" aria-label="">
								😌
							</span>
						</h6>
					</React.Fragment>
				) : (
					<div className="card shadow mb-4">
						<div className="card-header py-3">
							<h6 className="text-primary font-weight-bold m-0">
								Task List
							</h6>
						</div>
						<ul className="list-group list-group-flush">
							{todos.map((todoObject) => (
								<Todo
									todoObject={todoObject}
									key={todoObject._id}
								/>
							))}
						</ul>
					</div>
				)}

				<CarsSold />
				<br />
				<br />
				<br />
			</div>
		</div>
	);
};

export default Todos;
