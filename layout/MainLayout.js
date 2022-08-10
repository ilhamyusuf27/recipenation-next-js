import React from "react";
// import style from "../styles/layouts/Mainlayout.module.css";
import navbarStyle from "../styles/components/navbar.module.scss";
import { useRouter } from "next/router";

import { FiHome } from "react-icons/fi";
import { MdOutlineAddBox } from "react-icons/md";
import { FiUser, FiMessageCircle } from "react-icons/fi";

import Responsive from "./Responsive";

function MainLayout(props) {
	const router = useRouter();

	return (
		<>
			<Responsive>
				<div>{props.children}</div>
				<div>
					<nav className={`${navbarStyle.navbar} navbar navbar-expand navbar-dark bg-primary text-white fixed-bottom`}>
						<ul className="navbar-nav nav-justified w-100">
							<li className="nav-item">
								<a>
									<FiHome size={30} onClick={() => router.push("/")} color={router.pathname === "/" ? "#EFC81A" : "#6E80B0"} />
								</a>
							</li>
							<li className="nav-item" onClick={() => router.push("/input")}>
								<a>
									<MdOutlineAddBox size={30} color={router.pathname === "/input" ? "#EFC81A" : "#6E80B0"} />
								</a>
							</li>
							<li className="nav-item">
								<a>
									<FiMessageCircle size={30} color={router.pathname === "/chat" ? "#EFC81A" : "#6E80B0"} />
								</a>
							</li>
							<li className="nav-item" onClick={() => router.push("/profile")}>
								<a>
									<FiUser size={30} color={router.pathname === "/profile" ? "#EFC81A" : "#6E80B0"} />
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</Responsive>
		</>
	);
}

export default MainLayout;
