import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHome } from "react-icons/fa";
import InputForm from "../components/InputForm";
import MainForm from "../components/MainForm";
import HTTP from "../utilities/instance-axios";
export default function Register() {
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
		CPassword: "",
	});
	const { username, email, password, CPassword } = user;
	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await HTTP.post("/api/auth/register", user)
			.then(({ data }) => {
				toast.success(data.message);
			})
			.catch(({ response }) => {
				toast.error(response.data.message);
			});
	};

	return (
		<div className="register">
			<div className="root-to-home">
				<Link to="/">
					<FaHome />
				</Link>
			</div>
			<div className="container-form">
				<MainForm>
					<div className="page-title">REGISTER</div>
					{/* username input */}
					<InputForm
						label="Username"
						name="username"
						value={username}
						type="text"
						placeholder="type username"
						handleChange={handleChange}
					/>
					{/* email input */}
					<InputForm
						label="Email Address"
						name="email"
						value={email}
						type="email"
						placeholder="type email address"
						handleChange={handleChange}
					/>
					{/* password input */}
					<InputForm
						label="Password"
						name="password"
						value={password}
						type="password"
						placeholder="type password"
						handleChange={handleChange}
					/>
					{/* password input */}
					<InputForm
						label="Confirm Password"
						name="CPassword"
						value={CPassword}
						type="password"
						placeholder="type confirm password"
						handleChange={handleChange}
					/>
					<div className="group-submit">
						<button className="btn btn-success" onClick={handleSubmit}>
							submit
						</button>
						<span>
							have an Account ?{"  "}
							<Link to="/login">Login</Link>
						</span>
					</div>
				</MainForm>
			</div>
		</div>
	);
}
