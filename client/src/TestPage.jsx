import React from "react";
import { Outlet, Link } from "react-router-dom";

function TestPage() {
	return (
		<>
			<h1>Test Route</h1>
			<Link to={`/`}>Go To Homepage</Link>
		</>
	);
}

export default TestPage;
