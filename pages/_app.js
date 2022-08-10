import App from "next/app";
import { useRouter } from "next/router";

import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap.css";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import { Provider, useSelector } from "react-redux";
import React from "react";

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

	React.useEffect(() => {
		if (router.pathname === "/login" && token) {
			router.replace("/");
		}

		if (router.pathname === "/register" && token) {
			router.replace("/");
		}
	}, []);

	return <Component {...pageProps} />;
}
