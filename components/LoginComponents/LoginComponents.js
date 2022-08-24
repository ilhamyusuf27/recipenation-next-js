import React from "react";
import Image from "next/image";
import Link from "next/link";
import loginStyle from "../../styles/pages/login.module.scss";
import { FiUser } from "react-icons/fi";
import { CgLock } from "react-icons/cg";

import Swal from "sweetalert2";

import { useRouter } from "next/router";

import axios from "axios";

import { useDispatch } from "react-redux";
import * as Type from "../../redux/auth/type";

function LoginComponents() {
	const dispatch = useDispatch();
	const router = useRouter();

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);

	const handleLogin = (e) => {
		e.preventDefault();

		setIsLoading(true);

		axios
			.post("/api/auth/login", { email, password })
			.then((response) => {
				dispatch({
					type: Type.SET_AUTH,
					payload: {
						token: response?.data?.token,
						user: response?.data?.data,
					},
				});
				setIsLoading(false);
				Swal.fire({
					icon: "success",
					title: response?.data?.message,
				}).then(() => router.replace("/"));
			})
			.catch((err) => {
				setIsLoading(false);
				Swal.fire({
					icon: "error",
					title: err?.response?.data,
				});
			});
	};

	return (
		<div className={loginStyle.login}>
			<div className="mb-5 text-center">
				<Image src="/images/login-icon.png" alt="icons" width="200px" height="200px" />
				<h4 className="mt-3">Welcome !</h4>
				<p>Log in to your exiting account.</p>
			</div>

			<div className={loginStyle.formStyle}>
				<form onSubmit={handleLogin}>
					{/* Input email */}
					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email address
						</label>
						<div className={loginStyle.wrapper}>
							<FiUser className={loginStyle.iconUser} size={20} color="#18172B" />
							<input type="email" className="form-control form-control-lg" placeholder="examplexxx@gmail.com" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
						</div>
					</div>

					{/* Input password */}
					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<div className={loginStyle.wrapper}>
							<CgLock className={loginStyle.iconUser} size={20} color="#18172B" />
							<input type="password" className="form-control form-control-lg" placeholder="Password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
						</div>
					</div>
					{/* <div className={loginStyle.linkForgot}>
						<a>Forgot Password?</a>
					</div> */}

					{/* Button Login */}
					<div className="d-grid gap-2">
						<button className="btn btn-primary btn-lg" type="submit" disabled={isLoading}>
							{isLoading ? "Loading..." : "Login"}
						</button>
					</div>

					<p className={loginStyle.dontHaveAccount}>
						Don’t have an account ?
						<Link href="/register" passHref>
							<a>Sign Up</a>
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

export default LoginComponents;
