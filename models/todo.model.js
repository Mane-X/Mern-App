const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		todo: {
			type: String,
			required: true,
			min: 3,
            dateAdded: new Date(),
		},
	},
	{ timestamps: true }
);

// Auto Populate Users
const autoPopulateUser = function (next) {
	this.populate("User", "_id name email user");
	next();
};

todoSchema.pre("findOne", autoPopulateUser);
todoSchema.pre("findById", autoPopulateUser);
todoSchema.pre("find", autoPopulateUser);

module.exports = mongoose.model("Todo", todoSchema);
