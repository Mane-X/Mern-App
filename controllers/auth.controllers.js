// Import User Model
const User = require("../models/user.model");

// Import JWT packages
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

// Import OAuth2Client (Google Auth)
const { OAuth2Client } = require("google-auth-library");

// Import Node-Fetch
const fetch = require("node-fetch");

const registerUser = (req, res) => {
	const { name, email, password,surname } = req.body;

	User.findOne({ email }).exec((err, user) => {
		if (user) {
			return res.status(400).json({
				message: "User already exists",
			});
		}

		// Create new User
		const newUser = new User({ name, email, password, surname });
		newUser.save();

		return res.status(201).json({
			message: "User created successfully! Please sign In",
			newUser,
		});
	});
};

/**
 * @function: resgisterUser
 * @description: Serve created User to client and sign a JWT Token
 *
 * @param {*} req user information from body
 * @param {*} res with user information to client
 */
const loginUser = (req, res) => {
	const { email, password } = req.body;

	User.findOne({ email }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User with that email does not exist. Please signup",
			});
		}
		// authenticate (validate password - coming from User model)
		if (!user.authenticate(password)) {
			return res.status(400).json({
				error: "Email and password does not match",
			});
		}

		// generate a token - send it to client
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});
		const { _id, name, email, role, todos } = user;

		return res.json({
			token,
			user: { _id, name, email, role, todos },
		});
	});
};

/**
 * @function: requireSignin
 * @description: Pass this middlewear to routes if we want them protected
 *
 * By passing this middlewear to endpoints, we have access to the user
 * so we can simply say req.user, and we should be able to retrive the
 * current logged in user -- see how it is passed on the endpoints
 * with the Todo routes & controllers
 *
 * @example: router.get('/todos', requireSignin, showTodos)
 */
const requireSignin = expressJwt({
	secret: process.env.JWT_SECRET, // req.user
});

/**
 * @function: adminMiddleware
 * @description: Pass this middlewear to routes if we want them ADMIN protected
 *
 * By passing this middlewear along with 'requireSignin' to endpoints, we should
 * be able to check if the user has a role of 'Admin'.
 *
 * We can restrict access to certain endpoints if you want them admin protected
 *
 * @example: router.get('/todos', requireSignin, adminMiddleware,showTodos)
 */
const adminMiddleware = (req, res, next) => {
	User.findById({ _id: req.user._id }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User not found",
			});
		}

		if (user.role !== "admin") {
			return res.status(400).json({
				error: "Admin resource. Access denied",
			});
		}

		req.profile = user;
		next();
	});
};

// client ID
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuth = (req, res) => {
	const { idToken } = req.body;

	client
		.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
		.then((response) => {
			const { email_verified, name, email } = response.payload;

			if (email_verified) {
				User.findOne({ email }).exec((err, user) => {
					if (user) {
						const token = jwt.sign(
							{ _id: user._id },
							process.env.JWT_SECRET,
							{ expiresIn: "7d" }
						);
						const { _id, email, name, role, todos } = user;
						return res.json({
							token,
							user: { _id, email, name, role, todos },
						});
					} else {
						let password = email + process.env.JWT_SECRET;

						user = new User({ name, email, password });
						user.save((err, data) => {
							if (err) {
								console.log(
									"ERROR GOOGLE LOGIN ON USER SAVE",
									err
								);
								return res.status(400).json({
									error: "User signup failed with google",
								});
							}

							const token = jwt.sign(
								{ _id: data._id },
								process.env.JWT_SECRET,
								{ expiresIn: "7d" }
							);
							const { _id, email, name, role, todos } = data;

							return res.json({
								token,
								user: { _id, email, name, role, todos },
							});
						});
					}
				});
			} else {
				return res.status(400).json({
					error: "Google login failed. Try again",
				});
			}
		});
};

const facebookAuth = (req, res) => {
	 console.log('FACEBOOK LOGIN REQ BODY', req.body);
	const { userID, accessToken } = req.body;

	const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

	return (
		fetch(url, {
			method: "GET",
		})
			.then((response) => response.json())
			// .then(response => // console.log(response))
			.then((response) => {
				const { email, name } = response;

				User.findOne({ email }).exec((err, user) => {
					if (user) {
						const token = jwt.sign(
							{ _id: user._id },
							process.env.JWT_SECRET,
							{ expiresIn: "7d" }
						);
						const { _id, email, name, role, todos } = user;

						return res.json({
							token,
							user: { _id, email, name, role, todos },
						});
					}

					/**
					 * @description:
					 *
					 * The below else statements creates a new user if the user does not exist in the database
					 * The password is generated by joining the email and the JWT Secret
					 */

					  else {
					     let password = email + process.env.JWT_SECRET;

					     user = new User({ name, email, password });
					     user.save((err, data) => {
					         if (err) {
					              console.log('ERROR FACEBOOK LOGIN ON USER SAVE', err)
					             return res.status(400).json({
					                 error: 'User signup failed with facebook'
					             })
					         }

					         const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
					         const { _id, email, name, role, todos } = data;

					         return res.json({
					             token,
					             user: { _id, email, name, role, todos }
					         })
					     })
					 }
				});
			})
			.catch((error) => {
				res.json({
					error: "Facebook login failed. Try later",
				});
			})
	);
};

module.exports = {
	registerUser,
	loginUser,
	requireSignin,
	adminMiddleware,
	googleAuth,
	facebookAuth,
};