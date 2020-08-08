import React, { useState, useEffect } from "react";
import TodoTeamLayout from "./admin/adminTodoDisplay.jsx";
import { getCookie, signout } from "../auth/Helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./admin/admin.css";
import axios from "axios";
import { WindMillLoading  } from "react-loadingg";

const AdminTodo = ({ history }) => {
	const [values, setValues] = useState({
		todo: "",
		email: "",
		emailVerify: "",
        todos: [],
        deleting:""
	});
	const [displayVerifyEmail, setDisplayVerifyEmail] = useState("none");
	const [displayWarn, setDisplayWarn] = useState("none");
	const { todo, email, emailVerify, deleting } = values;
	const [teams, setTeam] = useState([]);
	const [loadingTodo, setLoadingTodo] = useState(false);
	const token = getCookie("token");

	// Get user input from form
	const handleChange = (name) => (e) => {
		let regex = /[^a-z 0-9 @.]/gi;
		//strips OUT ANY foreign characters
		setValues({ ...values, [name]: e.target.value.replace(regex, "") });
		////////console.log(values);
		setDisplayVerifyEmail("");
	};

	const addTodo = (e) => {
		e.preventDefault();
		if (email === emailVerify) {
			axios({
				method: "POST",
				url: `/api/todo/new/${email}`,
				data: { todo },
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => {
					setValues({
						...values,
						todo: "",
						email: "",
						emailVerify: "",
					});
                    setDisplayVerifyEmail("none");
                    console.log(response);
					toast.success(response.data.message);
					loadTeam();
				})
				.catch((error) => {
					toast.error(error.response.data.error);
				});
		} else {
			setDisplayWarn("");
		}
	};

	useEffect(() => {
		loadTeam();
	}, []);

	const loadTeam = () => {
		axios({
			method: "GET",
			url: `/api/admin/team`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				// // ////console.log('PRIVATE PROFILE UPDATE', response)
				//const { role, name, email } = response.data;
				setTeam(response.data);
				setLoadingTodo(true);
			})
			.catch((error) => {
				// // ////console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);

				if (error.status === 401) {
					signout(() => history.push("/"));
				}
			});
		////console.log(lengthOfTodo);
	};
	const checkLength = (todos) => {
		/**
		 * after deleting all the tasks for a user as an admin the modal doesn't
		 * close properly and you cant use the web application until you reload
		 * so i add this code to do it for you but you can comment it out to see what I am talking about
		 */
		let length = todos.length - 1;
		if (length === 0) {
			//////////console.log(length);
			alert("No more tasks to show");
			window.location.reload(false);
		}
	};
    const deleteTodo = (id, email) => {
        setValues({ ...values, deleting: "Deleting A Task Please Wait ..." });
		axios({
            method: "DELETE",
			url: `/api/todos/${id}/${email}`,
			data: { todo },
			headers: {
                Authorization: `Bearer ${token}`,
			},
		})
        .then((response) => {
            toast.success(response.data.message);
            setValues({ ...values, deleting: "" });
				loadTeam();
			})
			.catch((error) => {
				toast.error(error.response.data.error);
			});
	};
	return (
		<div className="adminTaskToSales">
			<ToastContainer />
			<br />
			<h1 style={{ color: "white" }}>Give your team tasks to complete</h1>
			<div className="jumbotron">
				<form onSubmit={addTodo} className="formTask">
					<div className="form-group">
						<label htmlFor="exampleInputEmail1">
							Email Address Of Team Member
						</label>
						<input
							type="email"
							placeholder="Email"
							value={email}
							className="form-control inputTask"
							onChange={handleChange("email")}
						/>{" "}
						<br />
						<div style={{ display: `${displayVerifyEmail}` }}>
							<label>Verify Email</label>
							<input
								type="email"
								value={emailVerify}
								placeholder="Verify Email"
								className="form-control inputTask"
								onChange={handleChange("emailVerify")}
							/>
						</div>
						<span
							style={{
								display: displayWarn,
								color: "red",
							}}>
							Emails do not match
						</span>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">Task</label>
						<textarea
							onChange={handleChange("todo")}
							type="text"
							value={todo}
							className="form-control inputTask"
							rows="2"
							placeholder="Task Details"></textarea>
					</div>
					<button
						type="submit"
						className="btn  btn-outline-secondary">
						Submit
					</button>
				</form>
			</div>
			<br />
			<div className="tableTasks table-responsive">
				<br />
				<h2 className="text-center" style={{ color: "white" }}>
					View Tasks For Each Team Member
				</h2>
				{loadingTodo ? (
					<>
						<table className="table table-striped table-dark">
							<thead>
								<tr>
									<th scope="col">Name</th>
									<th scope="col">Email</th>
									<th scope="col">Task</th>
								</tr>
							</thead>
							{teams.map((team) => (
								<TodoTeamLayout
									key={team._id}
									teamInDB={team}
									checkLength={checkLength}
									deleteTask={deleteTodo}
									deleting={deleting}
								/>
							))}
						</table>
					</>
				) : (
					<div className="text-center">
						<br />
						<WindMillLoading
							style={{ position: "", margin: "auto" }}
							size="large"
							color="white"
						/>
						<h4 style={{ color: "white" }}>
							{" "}
							Please Wait Loading....
						</h4>
					</div>
				)}
			</div>
		</div>
	);
};

export default AdminTodo;
