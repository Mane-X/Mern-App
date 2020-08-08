import React from "react";

function AdminTeamDisplay({ teamInDB }) {
    const { name, todos, surname, role, email, cars } = teamInDB;
    const styles = { textTransform: "capitalize" };
	const checkRole = () => {
		if (role === "admin") {
			//To make sure to only show regular users
		} else {
            return (
				<>
					<td style={styles}>{name}</td>
					<td style={styles}>{surname}</td>
					<td>{email}</td>
					<td>{todos.length}</td>
					<td>{cars.length}</td>
				</>
			);
		}
	};
	return <tr>{checkRole()}</tr>;
}

export default AdminTeamDisplay;
