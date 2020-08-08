import React from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const Facebook = ({ informParent = (f) => f, thisComponent }) => {
	const responseFacebook = (response) => {
		// request to backend
		axios({
			method: 'POST',
			url: `/api/facebook-loggin`,
			data: { userID: response.userID, accessToken:response.accessToken }
		})
			.then((response) => {
				// console.log('FACEBOOK SIGNING SUCCESS', response);
				// inform parent component
				informParent(response);
			})
			.catch((error) => {
				console.log('FACEBOOK SIGNING ERROR', error.response);
			});
    };

	return (
		<div className="">
			<FacebookLogin
				appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
				autoLoad={false}
				callback={responseFacebook}
				render={(renderProps) => (
					<button
						onClick={renderProps.onClick}
						disabled={renderProps.disabled}
						style={{ margin: "5px 0px" }}
						className="btn btn-dark btn-block text-white btn-facebook btn-user">
						<i className="fab fa-facebook pr-2" />
						{thisComponent === "Signin" && "Login with Facebook"}
						{thisComponent === "Signup" && "Register with Facebook"}
					</button>
				)}
			/>
		</div>
	);
};

export default Facebook;
