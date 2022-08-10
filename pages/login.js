/* eslint-disable react/no-unescaped-entities */
import React from "react";
import LoginComponents from "../components/LoginComponents/LoginComponents";
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import loginStyle from "../styles/pages/login.module.scss";

function login() {
	return (
		<div className={loginStyle.loginContainer}>
			<div className={loginStyle.loginContain}>
				<LoginComponents />
			</div>
		</div>
	);
}

export default login;
