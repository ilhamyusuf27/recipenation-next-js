import App from "next/app";
import { useRouter } from "next/router";
import Router from "next/router";

import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap.css";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import { Provider, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Responsive from "../layout/Responsive";

export default class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<MainApp Component={Component} pageProps={pageProps} />
				</PersistGate>
			</Provider>
		);
	}
}

function MainApp({ Component, pageProps }) {
	const router = useRouter();
	const { token } = useSelector((state) => state?.auth);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		if (router.pathname === "/login" && token) {
			router.replace("/");
		}

		if (router.pathname === "/register" && token) {
			router.replace("/");
		}
	}, []);

	useEffect(() => {
		const start = () => {
			setLoading(true);
		};
		const end = () => {
			setLoading(false);
		};
		Router.events.on("routeChangeStart", start);
		Router.events.on("routeChangeComplete", end);
		Router.events.on("routeChangeError", end);
		return () => {
			Router.events.off("routeChangeStart", start);
			Router.events.off("routeChangeComplete", end);
			Router.events.off("routeChangeError", end);
		};
	}, []);

	return (
		<>
			{loading ? (
				<Responsive>
					<div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: "#F1F1F2", height: "100vh" }}>
						<img src="/animation/loading.gif" alt="loading" />
					</div>
				</Responsive>
			) : (
				<Component {...pageProps} />
			)}
		</>
	);
}
