const router = require("express").Router();
const { User } = require("../../models");

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
router.get("/:id", async (req, res) => {
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
		res.json({ message: `User with name ${username} created` });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
