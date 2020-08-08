const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSoldSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		make: {
			type: String,
		},
		price: Number,
	},
	{ timestamps: true }
);

// Auto Populate Users
// Auto Populate Users
const autoPopulateUser = function (next) {
	this.populate("User", "_id name email user");
	next();
};

CarSoldSchema.pre("findOne", autoPopulateUser);
CarSoldSchema.pre("findById", autoPopulateUser);
CarSoldSchema.pre("find", autoPopulateUser);

module.exports = mongoose.model("CarSold", CarSoldSchema);
