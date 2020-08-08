import React  from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import "../css/app.css";
const App = () => {
	return (
		<div className="text-center home">
			<br />
			<Jumbotron fluid>
				<Container>
					<h1>Vintage Automobiles</h1>
					<hr />
					<h6 className="lead">Class Comes First</h6>
					<a className="btn btn-outline-dark" href="/signin">
						Lets Get Started
					</a>
				</Container>
			</Jumbotron>
		</div>
	);
};

export default App;
