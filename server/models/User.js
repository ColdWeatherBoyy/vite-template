const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		minlength: 1,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/.+@.+\..+/, "Must match an email address!"],
	},
	password: {
		type: String,
		required: true,
		validate: {
			validator: function (value) {
				// tests password for having one digit, one lowercase, one uppercase, one special character, and to be at least 8 characters long
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
					value
				);
			},
			message: (props) => "Not a valid password!",
		},
	},
});

userSchema.pre("save", async function (next) {
	if (this.isNew || this.isModified("password")) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}
	next();
});

userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
