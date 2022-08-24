import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Responsive from "../layout/Responsive";

import popularStyle from "../styles/pages/popular.module.scss";

import { IoIosArrowBack } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import { BiLike } from "react-icons/bi";
import { FiUser } from "react-icons/fi";

import { useSelector } from "react-redux";

import { Snackbar, Alert } from "@mui/material";

function Popular() {
	const router = useRouter();
	const { profile, token } = useSelector((state) => state?.auth);
	const [save, setSave] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const [msg, setMessage] = React.useState("");
	console.log(save);

	React.useEffect(() => {
		if (!token) {
			router.push("/login");
		}

		fetch(`${process.env.NEXT_URL}/api/recipe/allrecipe`)
			.then((res) => res.json())
			.then((result) => {
				setSave(result.result);
			});
	}, []);

	const handleSave = (user_id, recipe_id) => {
		axios
			.patch(
				`${process.env.NEXT_URL}/api/save/save`,
				{
					user_id,
					recipe_id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				setMessage("Recipe berhasil di save");
				setOpen(true);
				setSave(res?.data?.result);
			});
	};

	const handleUnSave = (user_id, recipe_id) => {
		axios
			.patch(
				`${process.env.NEXT_URL}/api/save/unsave`,
				{
					user_id,
					recipe_id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				setMessage("Recipe berhasil di un-save");
				setOpen(true);
				setSave(res?.data?.result);
			})
			.catch((err) => console.log(err));
	};

	const handleLike = (user_id, recipe_id) => {
		axios
			.patch(
				`${process.env.NEXT_URL}/api/like/like`,
				{
					user_id,
					recipe_id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				setMessage("Recipe berhasil di like");
				setOpen(true);
				setSave(res?.data?.result);
			});
	};

	const handleUnLike = (user_id, recipe_id) => {
		axios
			.patch(
				`${process.env.NEXT_URL}/api/like/unlike`,
				{
					user_id,
					recipe_id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				setMessage("Recipe berhasil di un-like");
				setOpen(true);
				setSave(res?.data?.result);
			})
			.catch((err) => console.log(err));
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};
	return (
		<Responsive>
			{/* Title Menu */}
			<div className={popularStyle.titlePage}>
				<div className={popularStyle.back} onClick={() => router.push("/")}>
					<IoIosArrowBack size={25} />
				</div>
				<h3>Popular Menu</h3>
			</div>

			{/* Popular Menu */}
			<div className={popularStyle.contentContainer}>
				{save.map((item) => (
					// eslint-disable-next-line react/jsx-key
					<div className="mb-3">
						<div className="row">
							<div className="col-3">
								<div
									className={popularStyle.imageContent}
									style={{ backgroundImage: `url(${item.recipe_images ?? "https://www.dirtyapronrecipes.com/wp-content/uploads/2015/10/food-placeholder.png"})` }}
								></div>
							</div>
							<div className="col-5">
								<div className={popularStyle.contentText}>
									<h5 style={{ width: "13ch", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{item.title}</h5>
									<div className="d-flex align-items-center">
										<FiUser />
										<p className="ms-1 mb-0">{item?.author}</p>
									</div>
									<div className="row">
										<div className="col-lg-3 col-3 d-flex align-items-center">
											<IoBookmarkOutline /> {" " + item?.save.length}
										</div>
										<div className="col-lg-3 col-3 d-flex align-items-center">
											<BiLike /> {" " + item?.likes.length}
										</div>
									</div>
								</div>
							</div>
							<div className="col-4 d-flex">
								{/* Save */}
								{item?.save?.includes(profile.user_id.toString()) ? (
									<div className={popularStyle.buttonControl}>
										<button type="button" className="btn btn-primary" onClick={() => handleUnSave(profile.user_id, item.recipe_id)}>
											<IoBookmarkOutline size={20} />
										</button>
									</div>
								) : (
									<div className={popularStyle.unButtonControl}>
										<button type="button" className="btn btn-outline-warning" onClick={() => handleSave(profile.user_id, item.recipe_id)}>
											<IoBookmarkOutline size={20} />
										</button>
									</div>
								)}

								{/* Like */}

								{item?.likes?.includes(profile.user_id.toString()) ? (
									<div className={popularStyle.buttonControl}>
										<button type="button" className="btn btn-primary" onClick={() => handleUnLike(profile.user_id, item.recipe_id)}>
											<BiLike size={20} />
										</button>
									</div>
								) : (
									<div className={popularStyle.unButtonControl}>
										<button type="button" className="btn btn-outline-warning" onClick={() => handleLike(profile.user_id, item.recipe_id)}>
											<BiLike size={20} />
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
			<Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
				<Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
					{msg}
				</Alert>
			</Snackbar>
		</Responsive>
	);
}

export default Popular;
