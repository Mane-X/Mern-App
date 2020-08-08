import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import TeamLayout from "./admin/adminTeamDisplay.jsx";
import axios from "axios";
import { getCookie, signout } from "../auth/Helpers";
import "./admin/admin.css";
import { WaveLoading } from "react-loadingg";


const AdminTeam = ({ history }) => {
	const [teams, setTeam] = useState([]);
	const [loading, setLoading] = useState(false);
	const token = getCookie("token");
	let total = 0;
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
				// // console.log('PRIVATE PROFILE UPDATE', response)
				//const { role, name, email } = response.data;
				setTeam(response.data);
				setLoading(true);
				////console.log(response.data);
			})
			.catch((error) => {
				// // console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);

				if (error.response.status === 401) {
					signout(() => history.push("/"));
				}
			});
	};
	return (
		<div className=" adminLayout">
			<div className="container-fluid">
				<br />
				<div className="card shadow">
					<div className="card-header py-3">
						<p className="text-secondary m-0 font-weight-bold">
							Team Info
						</p>
					</div>
					<div className="card-body">
						<div
							className="table-responsive table mt-2"
							id="dataTable"
							role="grid"
							aria-describedby="dataTable_info">
							{loading ? (
								<table
									className="table dataTable my-0 table-striped"
									id="dataTable">
									<thead className="thead-dark">
										<tr>
											<th>Name</th>
											<th>Surname</th>
											<th>Email</th>
											<th>Tasks</th>
											<th>Cars Sold</th>
										</tr>
									</thead>
									<tbody>
										{teams.map((team) => (
											<TeamLayout
												key={team._id}
												teamInDB={team}
											/>
										))}
									</tbody>
								</table>
							) : (
								<div className="text-center">
									<WaveLoading
										size="large"
										color="#212529"
										style={{ position: "", margin: "auto" }}
									/>
									<h6 className="text-center">
										{" "}
										Please Wait Loading....
									</h6>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AdminTeam;
