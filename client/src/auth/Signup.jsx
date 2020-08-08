import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Buu from "./images/buu.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { isAuth, authenticate } from "./Helpers";
import "react-toastify/dist/ReactToastify.min.css";
import Google from "./Google";
import Facebook from "./Facebook";

const Signup = ({ history }) => {
	// Signup State
	const [values, setValues] = useState({
		name: "",
		email: "",
		surname: "",
		password: "",
		buttonText: "Register Account",
		thisComponent: "Signup",
	});

	const {
		name,
		surname,
		email,
		password,
		buttonText,
		thisComponent,
	} = values;

	const handleChange = (name) => (e) => {
		setValues({ ...values, [name]: e.target.value });
	};

	const informParent = (response) => {
		authenticate(response, () => {
			toast.success(`Hey ${response.data.user.name}, Welcome back!`);
			isAuth() && isAuth().role === "admin"
				? history.push("/admin")
				: history.push("/private");
		});
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, buttonText: "Loading...." });

		axios
			.post(`/api/signup`, { name, surname, email, password })
			.then((response) => {
				// console.log('SIGNUP SUCCESS', response);
				setValues({
					...values,
					name: "",
					email: "",
					password: "",
					surname: "",
					buttonText: "Submitted",
				});
				toast.success(response.data.message);
			})
			.catch((error) => {
				//console.log('SIGNUP ERROR', error.response.data);
				setValues({ ...values, buttonText: "Submit" });
				toast.error(error.response.data);
			});
	};

	const signupForm = () => (
		<div>
			<div className="container">
				<div className="card shadow-lg o-hidden border-0 my-5">
					<div className="card-body p-0">
						<div className="row">
							<div className="col-lg-5 d-none d-lg-flex">
								<div
									className="flex-grow-1 bg-register-image"
									style={{
										backgroundImage: `url(${Buu})`,
									}}></div>
							</div>
							<div className="col-lg-7">
								<div className="p-5">
									<div className="text-center">
										<h4 className="text-dark mb-4">
											Create an Account !
										</h4>
									</div>
									<form className="user">
										<div className="form-group row">
											<div className="col-sm-6 mb-3 mb-sm-0">
												<input
													className="form-control form-control-user"
													type="text"
													id="exampleFirstName"
													onChange={handleChange(
														"name"
													)}
													value={name}
													placeholder="First Name"
													name="first_name"
												/>
											</div>
											<div className="col-sm-6">
												<input
													className="form-control form-control-user"
													type="text"
													onChange={handleChange(
														"surname"
													)}
													value={surname}
													type="surname"
													id="exampleLAstName"
													placeholder="Last Name"
													name="last_name"
												/>
											</div>
										</div>
										<div className="form-group">
											<input
												className="form-control form-control-user"
												type="email"
												onChange={handleChange("email")}
												value={email}
												id="exampleInputEmail"
												aria-describedby="emailHelp"
												placeholder="Email Address"
												name="email"
											/>
										</div>
										<div className="form-group">
											<input
												className="form-control form-control-user"
												onChange={handleChange(
													"password"
												)}
												value={password}
												type="password"
												id="examplePasswordInput"
												placeholder="Password"
												name="password"
											/>

											<small
												id="emailHelp"
												className="form-text text-muted">
												We'll never share your email
												with anyone else.
											</small>
										</div>
										<button
											className="btn btn-primary btn-block text-white btn-user"
											type="submit"
											onClick={clickSubmit}>
											{buttonText}
										</button>
										<hr />

										<Google
											informParent={informParent}
											thisComponent={thisComponent}
										/>
										<Facebook
											informParent={informParent}
											thisComponent={thisComponent}
										/>
										<hr />
									</form>
									<div className="text-center">
										<Link className="small" to="/signin">
											Already have an account? Login!
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<div className="signUp">
			<ToastContainer />
			{isAuth() ? <Redirect to="/" /> : null}
			{signupForm()}
		</div>
	);
};

export default Signup;
