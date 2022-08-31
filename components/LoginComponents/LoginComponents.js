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
import { useFormik } from "formik";
import * as yup from "yup";

function LoginComponents() {
	const dispatch = useDispatch();
	const router = useRouter();

	const [isLoading, setIsLoading] = React.useState(false);

	const handleLogin = (values) => {
		setIsLoading(true);

		axios
			.post("/api/auth/login", { email: values.email, password: values.password })
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
					title: err?.response?.data?.message,
				});
			});
	};

	const loginSchema = yup.object().shape({
		email: yup.string().email("Please enter a valid email").required("Required"),
		password: yup.string().min(6).max(20).required("Required"),
	});

	const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: loginSchema,
		onSubmit: handleLogin,
	});

	return (
		<div className={loginStyle.login}>
			<div className="mb-5 text-center">
				<Image src="/images/login-icon.png" alt="icons" width="200px" height="200px" />
				<h4 className="mt-3">Welcome !</h4>
				<p>Log in to your exiting account.</p>
			</div>

			<div className={loginStyle.formStyle}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit(e);
					}}
				>
					{/* Input email */}
					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email address
						</label>
						<div className={loginStyle.wrapper}>
							<FiUser className={loginStyle.iconUser} size={20} color="#18172B" />
							<input type="email" className="form-control form-control-lg" placeholder="examplexxx@gmail.com" id="email" required value={values.email} onChange={handleChange} onBlur={handleBlur} />
						</div>
						{errors.email && touched.email ? <p style={{ color: "red" }}>{errors.email}</p> : null}
					</div>

					{/* Input password */}
					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<div className={loginStyle.wrapper}>
							<CgLock className={loginStyle.iconUser} size={20} color="#18172B" />
							<input type="password" className="form-control form-control-lg" placeholder="Password" id="password" required value={values.password} onChange={handleChange} onBlur={handleBlur} />
							{errors.password && touched.password ? <p style={{ color: "red" }}>{errors.name}</p> : null}
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
