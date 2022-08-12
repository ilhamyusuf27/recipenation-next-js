/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import EditProfileStyle from "../../styles/pages/editprofile.module.scss";

import { FiUser, FiImage } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";

import axios from "axios";
import Swal from "sweetalert2";

function EditProfile() {
	const router = useRouter();
	const { profile, token } = useSelector((state) => state?.auth);

	const [name, setName] = React.useState("");
	const [phone_number, setPhone] = React.useState("");
	const [photo_profil, setPhoto] = React.useState("");
	const [nameImage, setNameImage] = React.useState("");

	const [isLoading, setIsLoading] = React.useState(false);

	const handleUpdate = (e) => {
		e.preventDefault();
		// const { user_id } = JSON.parse(localStorage.getItem("data"));
		setIsLoading(true);
		const formData = new FormData();
		formData.append("user_id", profile?.user_id);
		formData.append("name", name);
		formData.append("phone_number", phone_number);
		formData.append("photo_profil", photo_profil);

		axios
			.put(`https://recipenation-app.herokuapp.com/users/update`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-type": "multipart/form-data",
				},
			})
			.then(() => {
				setIsLoading(false);
				Swal.fire({
					icon: "success",
					title: "Berhasil di Update",
				}).then(() => router.push("/profile"));
			})
			.catch((err) => {
				setIsLoading(false);
				console.log(err);
			});
	};

	return (
		<>
			<div className={EditProfileStyle.RegisterContainer}>
				<div className={EditProfileStyle.RegisterContain}>
					<div className={EditProfileStyle.back}>
						<Link href="/edit" passHref>
							<a>
								<BiArrowBack size={30} color="#999999" />
							</a>
						</Link>
					</div>
					<div className={EditProfileStyle.register}>
						<div className={EditProfileStyle.formStyle}>
							<form onSubmit={handleUpdate}>
								{/* Input name */}
								<div className="mb-4">
									<div className={EditProfileStyle.wrapper}>
										<FiUser className={EditProfileStyle.iconUser} size={20} color="#18172B" />
										<input type="text" className="form-control form-control-lg" placeholder="Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
									</div>
								</div>

								{/* Input Phone Number */}
								<div className="mb-4">
									<div className={EditProfileStyle.wrapper}>
										<BsTelephone className={EditProfileStyle.iconUser} size={20} color="#18172B" />
										<input type="text" className="form-control form-control-lg" placeholder="Phone Number" id="phone" value={phone_number} onChange={(e) => setPhone(e.target.value)} />
									</div>
								</div>

								<div className="mb-4">
									<div className={EditProfileStyle.wrapper}>
										<FiImage className={EditProfileStyle.iconUser2} size={20} color="#18172B" />
										<label htmlFor="formFile" className="form-label" style={{ color: nameImage ? "black" : "#7D858C" }}>
											{nameImage ? nameImage : "No File Chosen"}
										</label>
										<input
											className={EditProfileStyle.inputImage}
											type="file"
											id="formFile"
											onChange={(e) => {
												setPhoto(e.target.files[0]);
												setNameImage(e.target.files[0].name);
											}}
										/>
									</div>
								</div>

								{/* Button Update */}
								<div className="d-grid gap-2">
									<button className="btn btn-primary btn-lg" type="submit" disabled={isLoading}>
										{isLoading ? "Loading..." : "Update"}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default EditProfile;
