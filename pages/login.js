/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import loginStyle from "../styles/pages/login.module.scss";
import { FiUser } from "react-icons/fi";
import { CgLock } from "react-icons/cg";

function login() {
	return (
		<div className={loginStyle.login}>
			<div className="mb-5 text-center">
				<Image src="/images/login-icon.png" alt="icons" width="200px" height="200px" />
				<h4 className="mt-3">Welcome !</h4>
				<p>Log in to your exiting account.</p>
			</div>
			<div className={loginStyle.formStyle}>
				<form>
					{/* Input email */}
					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email address
						</label>
						<div className={loginStyle.wrapper}>
							<FiUser className={loginStyle.iconUser} size={20} color="#18172B" />
							<input type="email" className="form-control form-control-lg" placeholder="examplexxx@gmail.com" id="email" required />
						</div>
					</div>

					{/* Input password */}
					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<div className={loginStyle.wrapper}>
							<CgLock className={loginStyle.iconUser} size={20} color="#18172B" />
							<input type="password" className="form-control form-control-lg" placeholder="Password" id="password" required />
						</div>
					</div>
					<div className={loginStyle.linkForgot}>
						<a>Forgot Password?</a>
					</div>

					{/* Button Login */}
					<div className="d-grid gap-2">
						<button className="btn btn-primary btn-lg" type="submit">
							Login
						</button>
					</div>

					<p className={loginStyle.dontHaveAccount}>
						Don’t have an account ? <a>Sign Up</a>
					</p>
				</form>
			</div>
		</div>
	);
}

export default login;
