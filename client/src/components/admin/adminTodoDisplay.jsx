import React, { useState } from "react";

const AdminTodoDisplay = ({ teamInDB, deleteTask, checkLength, deleting }) => {
	const { name, todos, role, email, _id } = teamInDB;

	const checkRole = () => {
		if (role === "admin") {
			//To make sure to only show regular users
		} else {
			return (
				<>
					<tbody>
						<tr>
							<td style={{ textTransform: "capitalize" }}>
								{name}
							</td>
							<td>{email}</td>
							<td>
								{todos.length !== 0 ? (
									<>
										<button
											type="button"
											className="btn btn-outline-light"
											data-toggle="modal"
											data-target={`#exampleModal${_id}`}>
											View Tasks
										</button>
										<div
											className="modal fade"
											id={`exampleModal${_id}`}
											tabIndex="-1"
											role="dialog"
											aria-labelledby="exampleModalLabel"
											aria-hidden="true">
											<div
												className="modal-dialog"
												role="document">
												<div className="modal-content">
													<div className="modal-header">
														<h5
															style={{
																color: "black",
																textTransform:
																	"capitalize",
															}}
															className="modal-title"
															id="exampleModalLabel">
															{name}'s Tasks{" "}
															<br />
															{deleting}
														</h5>
														<button
															type="button"
															className="close"
															data-dismiss="modal"
															aria-label="Close">
															<span aria-hidden="true">
																&times;
															</span>
														</button>
													</div>
													<div
														className="modal-body"
														style={{
															color: "black",
															textTransform:
																"capitalize",
														}}>
														{todos.map((task) => (
															<div key={task._id}>
																<li className="list-group-item">
																	<p>
																		{
																			task.todo
																		}{" "}
																	</p>

																	<i
																		onClick={checkLength.bind(
																			todos,
																			todos
																		)}>
																		<button
																			className="btn btn-sm btn-outline-danger"
																			onClick={deleteTask.bind(
																				task._id,
																				task._id,
																				email,
																				email
																			)}>
																			Delete
																			&nbsp;
																			&nbsp;
																			<i className="fas fa-trash-alt"></i>
																		</button>
																	</i>
																</li>
															</div>
														))}

														<div className="modal-footer">
															<button
																type="button"
																className="btn btn-secondary"
																data-dismiss="modal">
																Close
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</>
								) : (
									<div>
										<p>No Tasks....</p>
									</div>
								)}
							</td>
						</tr>
					</tbody>
				</>
			);
		}
	};
	return <>{checkRole()}</>;
};

export default AdminTodoDisplay;
