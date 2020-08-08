import React, { useState, useEffect } from "react";
// import { Link, Redirect } from 'react-router-dom';

import Layout from "../core/Layout";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { isAuth, getCookie, signout, updateUser } from "../auth/Helpers";

import "react-toastify/dist/ReactToastify.min.css";

const Private = ({ history }) => {
	// Signup State
	const [values, setValues] = useState({
		role: "",
		name: "",
		email: "",
		password: "",
		buttonText: "Update",
	});

	const token = getCookie("token");

	useEffect(() => {
		loadProfile();
	}, []);

	const loadProfile = () => {
		axios({
			method: "GET",
			url: `/api/user/${isAuth()._id}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				// console.log('PRIVATE PROFILE UPDATE', response)
				const { role, name, email } = response.data;
				setValues({ ...values, role, name, email });
			})
			.catch((error) => {
				// console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);

				if (error.response.status === 401) {
					signout(() => history.push("/"));
				}
			});
	};

	const { role, name, email, password, buttonText } = values;

	const handleChange = (name) => (e) => {
		setValues({ ...values, [name]: e.target.value });
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, buttonText: "Updating" });

		axios({
			method: "PUT",
			url: `/api/user/update`,
			data: { name, password },
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				// console.log('PRIVATE PROFILE UPDATE SUCCESS', response);
				updateUser(response, () => {
					setValues({ ...values, buttonText: "Updated" });
					toast.success("Profile updated successfully!");

                    setValues({ ...values, buttonText: "Update " });
                    loadProfile()
				});
			})
			.catch((error) => {
				// console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
				setValues({ ...values, buttonText: "Update" });
				toast.error(error.response.data.error);
			});
	};

	const updateForm = () => (
		<form>
			<div className="form-group">
				<label className="text" style={{color:"white"}}>Role</label>
				<input
					disabled
					defaultValue={role}
					type="text"
					style={{ cursor: "not-allowed" }}
					className="form-control"
				/>
			</div>

			<div className="form-group">
				<label className="text" style={{color:"white"}}>Name</label>
				<input
					onChange={handleChange("name")}
					value={name}
					type="text"
					className="form-control"
				/>
			</div>

			<div className="form-group">
				<label className="text" style={{color:"white"}}>Email</label>
				<input
					disabled
					defaultValue={email}
					type="email"
					className="form-control"
					style={{ cursor: "not-allowed" }}
				/>
			</div>

			<div className="form-group">
				<label className="text" style={{color:"white"}}>Password</label>
				<input
					onChange={handleChange("password")}
					value={password}
                    type="password"
                    placeholder="*********"
					className="form-control"
				/>
			</div>

			<div>
				<button className="btn btn-secondary" onClick={clickSubmit}>
					{buttonText}
				</button>
			</div>
		</form>
	);

	return (
		<div className="private">
			<div className="privateContent">
				<ToastContainer />
				<h1 className="pt-5 text-center">Private</h1>
				<p className="lead text-center" style={{ color: "white" }}>
					Profile Update
				</p>
				{updateForm()}
			</div>
		</div>
	);
};

export default Private;
