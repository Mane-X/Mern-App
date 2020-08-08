import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { isAuth, signout } from "../auth/Helpers";

const Layout = ({ children, history }) => {
	const isActive = (path) => {
		if (history.location.pathname === path) {
			return { color: "#90adff" };
		} else {
			return { color: "#fff" };
		}
	};

	const nav = () => (
		<Navbar
			sticky="top"
			collapseOnSelect
			expand="lg"
			bg="dark"
			variant="dark">
			<Navbar.Brand href="/">Vintage Cars</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<a href="/" className="nav-link" style={isActive("/")}>
						Home
					</a>

					{!isAuth() && (
						<React.Fragment>
							<a
								href="/signin"
								className="nav-link"
								style={isActive("/signin")}>
								Sign In
							</a>

							<a
								href="/signup"
								className="nav-link"
								style={isActive("/signup")}>
								Sign Up
							</a>
						</React.Fragment>
					)}
					{isAuth() && (
						<React.Fragment>
							<a
								className="nav-link "
								onClick={() => {
									signout(() => {
										history.push("/");
									});
								}}
								style={{
									color: "#fff",
									cursor: "pointer",
								}}>
								Signout
							</a>

						</React.Fragment>
					)}
					{isAuth() && isAuth().role === "admin" && (
						<React.Fragment>
							<a
								className="nav-item  nav-link"
								href="/admin"
								style={isActive("/admin")}>
								{isAuth().name}
							</a>

							<a
								className="nav-link"
								href="/admin/team"
								style={isActive("/team")}>
								Team
							</a>

							<a
								className="nav-link"
								href="/admin/team/tasks"
								style={isActive("/team")}>
								Team Tasks
							</a>
						</React.Fragment>
					)}
					{isAuth() && isAuth().role === "subscriber" && (
						<React.Fragment>
							<a
								className="nav-item nav-link"
								href="/todos"
								style={isActive("/todos")}>
								Dashboard
							</a>
							<a
								className="nav-link"
								href="/private"
								style={isActive("/private"),{textTransform:"capitalize"}}>
								{isAuth().name}
							</a>
						</React.Fragment>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);

	return (
		<Fragment>
			{nav()}
			{children}
		</Fragment>
	);
};

export default withRouter(Layout);
