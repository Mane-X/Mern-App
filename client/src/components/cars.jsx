import React, { useEffect, useState } from "react";
import axios from "axios";
import { isAuth, getCookie, signout, updateUser } from "../auth/Helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { WindMillLoading } from "react-loadingg";
const Cars = ({ history }) => {
	const token = getCookie("token");
	const [values, setValues] = useState({
		car: "",
		cars: [],
		loading: false,
		make: "",
		price: 0,
	});
	const { cars, loading, make, price } = values;
	const handleChange = (name) => (e) => {
		let regex = /[^a-z 0-9 @.]/gi;
		//strips OUT ANY foreign characters
		setValues({ ...values, [name]: e.target.value.replace(regex, "") });
		////console.log(values);
	};
	const loadCars = () => {
		axios({
			method: "GET",
			url: `/api/cars`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				const cars = response.data.cars;
				setValues({ ...values, cars, car: "", loading: true });
				console.log(response);
			})
			.catch((error) => {
				// console.log('LOAD cars ERROR', error.response.data.error);
				if (error.response.status === 401)
					signout(() => history.push("/"));
			});
	};
	const addCar = (e) => {
		e.preventDefault();
		axios({
			method: "POST",
			url: `/api/cars/new`,
			data: { price, make },
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				setValues({ ...values, car: " " });
				toast.success(response.data.message);
			})
			.then(loadCars)
			.catch((error) => {
				toast.error(error.response.data.error);
			});
	};
	const deleteCar = (carID) => {
		/////alert(carID);
		//setValues({ ...values, deleting: "Deleting A Task Please Wait ..." });
		axios({
			method: "DELETE",
			url: `/api/cars/${carID}`,
			data: { make, price },
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				toast.success(response.data.message);
				//setValues({ ...values, deleting: "" });
				loadCars();
			})
			.catch((error) => {
				toast.error(error.response.data.error);
			});
	};

	useEffect(() => {
		loadCars();
	}, []);
	let id = 1;
	return (
		<div className="container">
			<br />
			<div className="container">
				<div className="card bg-dark cardCars">
					<h3 className="card-title">Add A Sold Car</h3>
					<br />
					<div className="card-text">
						<form className="user" onSubmit={addCar}>
							<div className="form-group row">
								<div className="col-sm-6 mb-3 mb-sm-0 card-text">
									<input
										className="form-control form-control-user card-text"
										type="text"
										id="exampleFirstName"
										onChange={handleChange("make")}
										placeholder="Make"
									/>
								</div>
								<div className="col-sm-6">
									<input
										className="form-control form-control-user"
										type="number"
										id="exampleFirstName"
										onChange={handleChange("price")}
										placeholder="Price"
									/>
								</div>
							</div>
							<br />
							<button
								className="btn btn-primary btn-block text-white btn-user"
								type="submit">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
			<br />
			<h1>Cars Sold</h1>
			<table className="table table-striped table-dark">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Make</th>
						<th scope="col">Price</th>
					</tr>
				</thead>
				<tbody onSubmit={addCar}>
					{cars.length !== 0 ? (
						loading ? (
							cars.map((car) => (
								<tr key={car._id}>
									<td>{id++}</td>
									<td>{car.make}</td>
									<td>{car.price}</td>
									<td>
										{" "}
										<button
											className="btn btn-sm btn-outline-danger"
											onClick={deleteCar.bind(
												car._id,
												car._id
											)}>
											Delete &nbsp; &nbsp;
											<i className="fas fa-trash-alt"></i>
										</button>
									</td>
								</tr>
							))
						) : (
							<div>
								{" "}
								<WindMillLoading
									style={{ position: "", margin: "auto" }}
									size="large"
									color="white"
								/>
							</div>
						)
					) : (
                            <div>Nothing to Show
                                 <br/>
                        </div>
					)}
				</tbody>
			</table>
		</div>
	);
};
export default Cars;
