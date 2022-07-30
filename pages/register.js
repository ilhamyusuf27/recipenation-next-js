/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from "next/link";

import RegisterStyle from "../styles/pages/register.module.scss";

import { FiUser } from "react-icons/fi";
import { CgLock } from "react-icons/cg";
import { MdOutlineEmail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";

function register() {
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
							<form>
								{/* Input name */}
								<div className="mb-4">
									<div className={RegisterStyle.wrapper}>
										<FiUser className={RegisterStyle.iconUser} size={20} color="#18172B" />
										<input type="email" className="form-control form-control-lg" placeholder="Name" id="name" required />
									</div>
								</div>

								{/* Input email */}
								<div className="mb-4">
									<div className={RegisterStyle.wrapper}>
										<MdOutlineEmail className={RegisterStyle.iconUser} size={20} color="#18172B" />
										<input type="email" className="form-control form-control-lg" placeholder="E-Mail" id="email" required />
									</div>
								</div>

								{/* Input Phone Number */}
								<div className="mb-4">
									<div className={RegisterStyle.wrapper}>
										<BsTelephone className={RegisterStyle.iconUser} size={20} color="#18172B" />
										<input type="email" className="form-control form-control-lg" placeholder="Phone Number" id="email" required />
									</div>
								</div>

								{/* Input password */}
								<div className="mb-4">
									<div className={RegisterStyle.wrapper}>
										<CgLock className={RegisterStyle.iconUser} size={20} color="#18172B" />
										<input type="password" className="form-control form-control-lg" placeholder="Create New Password" id="password" required />
									</div>
								</div>

								<div className="mb-4">
									<div className={RegisterStyle.wrapper}>
										<CgLock className={RegisterStyle.iconUser} size={20} color="#18172B" />
										<input type="password" className="form-control form-control-lg" placeholder="Confirm Password" id="password" required />
									</div>
								</div>

								{/* Button Login */}
								<div className="d-grid gap-2">
									<button className="btn btn-primary btn-lg" type="submit">
										Create
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

export default register;
