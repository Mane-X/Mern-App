import React from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";

const Google = ({ informParent = (f) => f, thisComponent }) => {
	const responseGoogle = (response) => {
		// request to backend

		axios({
			method: "POST",
			url: `/api/google-loggin`,
			data: { idToken: response.tokenId },
		})
            .then((response) => {
                alert("Please Wait Page Is Loading");
				// // console.log('GOOGLE SIGNING SUCCESS', response)
				// inform parent component
				informParent(response);
			})
			.catch((error) => {
                // // console.log('GOOGLE SIGNING ERROR', error.response)
                informParent(error);
				//
			});
	};
    const client = process.env.REACT_APP_GOOGLE_CLIENT_ID;
	return (
		<div className="">
			<GoogleLogin
				clientId={`${client}`}
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				render={(renderProps) => (
					<button
						onClick={renderProps.onClick}
						disabled={renderProps.disabled}
						className="btn btn-secondary btn-block text-white btn-google btn-user">
						{" "}
						&nbsp;
						<i className="fab fa-google pr-2" />
						{thisComponent === "Signin" && "Login with Google"}
						{thisComponent === "Signup" && "Register with Google"}
					</button>
				)}
				cookiePolicy={"single_host_origin"}
			/>
		</div>
	);
};

export default Google;
