import { Outlet, Link } from "react-router-dom";

function App() {
	return (
		<>
			<div>
				<h1>Template is a go</h1>
				<Link to={`test`}>Go To Test</Link>
			</div>
		</>
	);
}

export default App;
