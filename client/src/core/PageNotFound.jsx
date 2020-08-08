import React from "react";
import {Link, withRouter } from "react-router-dom";
import Layout from "./Layout";
import { WindMillLoading } from "react-loadingg";
const pageNotFound = () => (
	<div
		className="text-center d-flex"
		style={{
			height: "90vh",
			justifyContent: "center",
			alignItems: "center",
		}}>
		<div className="container-fluid">
			<div className="text-center mt-5">
				<div className="error mx-auto" data-text="404">
					<p className="m-0">404</p>
				</div>
				<p className="text-dark mb-5 lead">Page Not Found</p>
				<p className="text-black-50 mb-0">
					It looks like you found a glitch in the matrix...
				</p>
				<Link href="/">← Back to Home Page</Link>
				<WindMillLoading style={{ position: "", margin: "auto" }} />
			</div>
		</div>
	</div>
);

export default withRouter(pageNotFound);
