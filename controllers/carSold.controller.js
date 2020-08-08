const Car = require("../models/carSold.model");
const User = require("../models/user.model");

const addCar = (req, res) => {
	const user = req.user._id;
	const { make, price } = req.body;
	const car = new Car({ user, make: make, price: price  });
	// Save new car

	car.save();

	User.findById(user).exec((err, data) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to add car",
			});
		}
		/**
		 */
        data.cars.push(car);
        data.save();


		return res.status(200).json({
			message: "Car added!",
			data,
		});
	});
};
const viewCars = (req, res) => {
	const loggedInUser = req.user._id;
/*     User.aggregate([{
        $greoup
    }]) */
	User.findById(loggedInUser).exec((err, user) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to fetch Sold Cars",
			});
		}
		////console.log(user)
		return res.json({
			cars: user.cars,
		});
	});
};
const deleteCar = (req, res) => {
	const { _id } = req.params;
    console.log(_id)
	Car.findByIdAndDelete(_id).exec((err, data) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to delete car",
			});
		}


		return res.status(201).json({
			message: "Car deleted!",
		});
	});

};

module.exports = {
	addCar,
	viewCars,
	deleteCar, 
};
