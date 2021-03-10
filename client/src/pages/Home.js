import React from "react";
import { Link } from "react-router-dom";
import "../assets/home.css";

export default function Home() {
	return (
		<div className="home">
			<div className="container-home">
				<h1>hello world</h1>
				<Link to="login">Login</Link>
			</div>
		</div>
	);
}
