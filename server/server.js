const express = require("express");
const { urlencoded, static, json } = require("express");
const { join } = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(static(join(__dirname, "..", "client", "dist")));

// initalize server port
app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
