import React from "react";
import { useRouter } from "next/router";
import Responsive from "../layout/Responsive";
import editStyle from "../styles/pages/edit.module.scss";

import { IoIosArrowBack } from "react-icons/io";

function Edit() {
	const router = useRouter();
	return (
		<Responsive>
			<div className={editStyle.titlePage}>
				<div className={editStyle.back} onClick={() => router.push("/profile")}>
					<IoIosArrowBack size={25} />
				</div>
				<h3>Edit Profile</h3>
			</div>

			<div className={editStyle.editMenu}>
				<div className={editStyle.menuContainer} onClick={() => router.push("/edit/profile")}>
					<a>Change Profile</a>
				</div>

				{/* <div className={editStyle.menuContainer}>
					<a>Change Password</a>
				</div> */}
			</div>
		</Responsive>
	);
}

export default Edit;
