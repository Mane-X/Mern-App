import React, { useState } from "react";
import { Redirect, withRouter, Link } from "react-router-dom";
import sky from "./images/sky.jpg"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { authenticate, isAuth } from "./Helpers";

import "react-toastify/dist/ReactToastify.min.css";
import Google from "./Google";
import Facebook from "./Facebook";

const Signin = ({ history }) => {
	// Signup State
	const [values, setValues] = useState({
		email: "",
		password: "",
		buttonText: "Login",
		thisComponent: "Signin",
	});

	const { email, password, buttonText, thisComponent } = values;

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
        .post("/api/signin", { email, password })
        .then((response) => {
            // console.log('SIGNIN SUCCESS', response);
            
            // save the response (user, token) => localStorage/cookie
				authenticate(response, () => {
					setValues({
						...values,
						email: "",
						password: "",
						buttonText: "Submitted",
                    });
                    
                    
					isAuth() && isAuth().role === "admin"
						? history.push("/admin")
						: history.push("/private");
				});
			})
			.catch((error) => {
				setValues({ ...values, buttonText: "Submit" });
                console.log(error);
                if (error.response.status === 400) {
                    console.log("object");
                    toast.error("Email And Password do not match");
                }
			});
    };
	const signinForm = () => (
		<div>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-9 col-lg-12 col-xl-10">
						<div className="card shadow-lg o-hidden border-0 my-5">
							<div className="card-body p-0">
								<div className="row">
									<div className="col-lg-6 d-none d-lg-flex">
										<div
											className="flex-grow-1 bg-login-image"
											style={{
												backgroundImage: ` url(${sky})`,
											}}></div>
									</div>
									<div className="col-lg-6">
										<div className="p-5">
											<div className="text-center">
												<h4 className="text-dark mb-4">
													Welcome Back!
												</h4>
											</div>
											<form className="user">
												<div className="form-group">
													<input
														className="form-control form-control-user"
														type="email"
														id="exampleInputEmail"
														aria-describedby="emailHelp"
														placeholder="Enter Email Address..."
														name="email"
														onChange={handleChange(
															"email"
														)}
														value={email}
													/>
												</div>
												<div className="form-group">
													<input
														className="form-control form-control-user"
														type="password"
														id="exampleInputPassword"
														placeholder="Password"
														name="password"
														onChange={handleChange(
															"password"
														)}
														value={password}
													/>

													<small
														id="emailHelp"
														className="form-text text-muted">
														We'll never share your
														email with anyone else.
													</small>
												</div>
												<div className="form-group">
													<div className="custom-control custom-checkbox small">
														<div className="form-check">
															<input
																className="form-check-input custom-control-input"
																type="checkbox"
																id="formCheck-1"
															/>
														</div>
													</div>
												</div>
												<button
													onClick={clickSubmit}
													className="btn btn-primary btn-block text-white btn-user"
													type="submit">
													{buttonText}
												</button>
												<hr />
												<Google
													informParent={informParent}
													thisComponent={
														thisComponent
													}
												/>
												<Facebook
													informParent={informParent}
													thisComponent={
														thisComponent
													}
												/>
												<hr />
											</form>
											<div className="text-center">
												<Link
													className="small"
													to="/signup">
													Create an Account!
												</Link>
											</div>
										</div>
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
		<div>
			<ToastContainer />
			{isAuth() ? <Redirect to="/" /> : null}
			{signinForm()}
		</div>
	);
};

export default withRouter(Signin);
