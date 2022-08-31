/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import RegisterStyle from "../styles/pages/register.module.scss";

import { FiUser } from "react-icons/fi";
import { CgLock } from "react-icons/cg";
import { MdOutlineEmail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";

import axios from "axios";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import * as Type from "../redux/register/type";
import { useFormik } from "formik";
import * as yup from "yup";

function Register() {
	const router = useRouter();
	const dispatch = useDispatch();
	const data = useSelector((state) => state?.register);
	const [isLoading, setIsLoading] = React.useState(false);

	const handleRegister = (values) => {
		setIsLoading(true);

		axios
			.post("/api/auth/register", data)
			.then((res) => {
				dispatch({
					type: Type.CLEAR,
				});
				Swal.fire({
					icon: "success",
					title: res?.data?.message,
				}).then(() => router.replace("/login"));
			})
			.catch((err) => {
				setIsLoading(false);
				Swal.fire({
					icon: "error",
					title: err?.response?.data?.message,
				});
			});
	};

	const registerSchema = yup.object().shape({
		name: yup.string().required("Required"),
		phone: yup.string().max(14, "Phone number cannot be more than 14 digits").required("Required"),
		email: yup.string().email("Please enter a valid email").required("Required"),
		password: yup.string().min(6).max(20).required("Required"),
		confirmPass: yup
			.string()
			.oneOf([yup.ref("password"), null], "Password must match")
			.required("Required"),
	});

	const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
		initialValues: {
			name: "",
			email: "",
			phone: "",
			password: "",
			confirmPass: "",
		},
		validationSchema: registerSchema,
		onSubmit: handleRegister,
	});

	return (
		<>
			<div className={RegisterStyle.RegisterContainer}>
				<div className={RegisterStyle.RegisterContain}>
					<div className={RegisterStyle.back}>
						<Link href="/login" passHref>
							<a>
								<BiArrowBack size={30} color="#999999" />
							</a>
						</Link>
					</div>
					<div className={RegisterStyle.register}>
						<div className="mb-5 text-center">
							<h4 className="mt-3">Let’s Get Started !</h4>
							<p>Create new account to access all feautures</p>
						</div>
						<div className={RegisterStyle.formStyle}>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									handleRegister(e);
								}}
								autoComplete="off"
							>
								{/* Input name */}
								<div className="mb-4">
									<div className={RegisterStyle.wrapper}>
										<FiUser className={RegisterStyle.iconUser} size={20} color="#18172B" />
										<input
											type="text"
											className="form-control form-control-lg"
											placeholder="Name"
											id="name"
											required
											value={values.name}
											onChange={(e) => {
												dispatch({
													type: Type.SET_NAME,
													payload: {
														name: e.target.value,
													},
												});
												handleChange(e);
											}}
											onBlur={handleBlur}
										/>
									</div>
									{errors.name && touched.name ? <p style={{ color: "red" }}>{errors.name}</p> : null}
								</div>

								{/* Input email */}
								<div className="mb-4">
									<div className={RegisterStyle.wrapper}>
										<MdOutlineEmail className={RegisterStyle.iconUser} size={20} color="#18172B" />
										<input
											type="email"
											className="form-control form-control-lg"
											placeholder="E-Mail"
											id="email"
											required
											value={values.email}
											onChange={(e) => {
												dispatch({
													type: Type.SET_EMAIL,
													payload: {
														email: e.target.value,
													},
												});
												handleChange(e);
											}}
											onBlur={handleBlur}
										/>
									</div>
									{errors.email && touched.email ? <p style={{ color: "red" }}>{errors.email}</p> : null}
								</div>

								{/* Input Phone Number */}
								<div className="mb-4">
									<div className={RegisterStyle.wrapper}>
										<BsTelephone className={RegisterStyle.iconUser} size={20} color="#18172B" />
										<input
											type="text"
											className="form-control form-control-lg"
											placeholder="Phone Number"
											id="phone"
											required
											value={values.phone}
											onChange={(e) => {
												dispatch({
													type: Type.SET_PHONE,
													payload: {
														phone_number: e.target.value,
													},
												});
												handleChange(e);
											}}
											onBlur={handleBlur}
										/>
									</div>
									{errors.phone && touched.phone ? <p style={{ color: "red" }}>{errors.phone}</p> : null}
								</div>

								{/* Input password */}
								<div className="mb-4">
									<div className={RegisterStyle.wrapper}>
										<CgLock className={RegisterStyle.iconUser} size={20} color="#18172B" />
										<input
											type="password"
											className="form-control form-control-lg"
											placeholder="Create New Password"
											id="password"
											required
											value={values.password}
											onChange={(e) => {
												dispatch({
													type: Type.SET_PASS,
													payload: {
														password: e.target.value,
													},
												});
												handleChange(e);
											}}
											onBlur={handleBlur}
										/>
									</div>
									{errors.password && touched.password ? <p style={{ color: "red" }}>{errors.password}</p> : null}
								</div>

								<div className="mb-4">
									<div className={RegisterStyle.wrapper}>
										<CgLock className={RegisterStyle.iconUser} size={20} color="#18172B" />
										<input
											type="password"
											className="form-control form-control-lg"
											placeholder="Confirm Password"
											id="confirmPass"
											required
											value={values.confirmPass}
											onChange={(e) => {
												dispatch({
													type: Type.SET_CONFPASS,
													payload: {
														rePassword: e.target.value,
													},
												});
												handleChange(e);
											}}
											onBlur={handleBlur}
										/>
									</div>
									{errors.confirmPass && touched.confirmPass ? <p style={{ color: "red" }}>{errors.confirmPass}</p> : null}
								</div>

								{/* Button Login */}
								<div className="d-grid gap-2">
									<button className="btn btn-primary btn-lg" type="submit" disabled={isLoading}>
										{isLoading ? "Loading..." : "Create"}
									</button>
								</div>

								<p className={RegisterStyle.dontHaveAccount}>
									Already have account ?{" "}
									<Link href="/login" passHref>
										<a>Log in here</a>
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Register;
