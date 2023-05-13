const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { signToken, auth } = require("../../utils/auth");

// GET all users /api/users/
router.get("/", async (req, res) => {
	try {
		const userData = await User.find();
		res.json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET one user /api/users/:id
router.get("/:id", auth, async (req, res) => {
	try {
		const userId = req.params.id;
		const userData = await User.findById(userId);
		res.json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// CREATE one user /api/users/create
router.post("/create", async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const newUser = await User.create({
			username,
			email,
			password,
		});

		const token = signToken(newUser);
		res.json({ message: `User with name ${username} created`, token });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// LOGIN Route /api/users/login
router.post("/login", async (req, res) => {
	try {
		let { email, password } = req.body;
		email = email.toLowerCase();

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).send("Email not found");
		}

		const verified = await user.isCorrectPassword(password);
		if (!verified) {
			return res.status(400).send("Invalid password");
		}

		const token = signToken(user);

		res.json({ message: `User with name ${user.username} logged in`, token });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
