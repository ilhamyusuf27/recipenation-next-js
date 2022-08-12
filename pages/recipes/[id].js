import React from "react";
import axios from "axios";
import Responsive from "../../layout/Responsive";
import Image from "next/image";

import detailStyle from "../../styles/pages/detail.module.scss";
import { Tabs, Tab } from "react-bootstrap";
import { Snackbar, Alert } from "@mui/material";

import { BiArrowBack } from "react-icons/bi";
import { FiPlay } from "react-icons/fi";
import { useSelector } from "react-redux";

import { useRouter } from "next/router";

function Detail(props) {
	const { profile, token } = useSelector((state) => state?.auth);

	const router = useRouter();
	const { recipe_images, user_id } = props?.data?.result[0];

	const [comment, setComment] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	const [commentData, setCommentData] = React.useState(props?.comment?.result);
	const [dataSave, setDataSave] = React.useState(props?.data?.result[0]);
	const [open, setOpen] = React.useState(false);
	const [msg, setMessage] = React.useState("");

	// const handleSave = (user_id, recipe_id) => {
	// 	axios
	// 		.patch(
	// 			"http://localhost:3000/api/save/detailsave",
	// 			{
	// 				user_id,
	// 				recipe_id,
	// 			},
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${token}`,
	// 				},
	// 			}
	// 		)
	// 		.then((res) => {
	// 			// setDataSave(res?.data?.result);
	// 			// console.log(res);
	// 		});
	// };

	// const handleUnSave = (user_id, recipe_id) => {
	// 	axios
	// 		.patch(
	// 			"http://localhost:3000/api/save/detailunsave",
	// 			{
	// 				user_id,
	// 				recipe_id,
	// 			},
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${token}`,
	// 				},
	// 			}
	// 		)
	// 		.then((res) => {
	// 			// setDataSave(res?.data?.result);
	// 			// console.log(res);
	// 		})
	// 		.catch((err) => console.log(err));
	// };

	const handleComment = (e) => {
		e.preventDefault();
		setIsLoading(true);
		fetch(`${process.env.NEXT_URL}/api/comment/${props?.id}`, {
			method: "POST",
			headers: new Headers({
				Authorization: `Bearer ${token}`,
			}),
			body: JSON.stringify({
				comment,
				user_id: profile?.user_id,
			}),
		})
			.then((res) => res.json())
			.then((result) => {
				setOpen(true);
				setMessage("Comment berhasil ditambah");
				setIsLoading(false);
				setComment("");
				setCommentData(result?.result);
			})
			.catch((err) => {
				setIsLoading(false);
			});
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<Responsive>
			<div className={detailStyle.detailContent}>
				{/* Icon Back */}
				<div className={detailStyle.iconBack}>
					<BiArrowBack size={30} color="#F5F5F5" onClick={() => router.back()} />
				</div>

				{/* Image */}
				<div className={detailStyle.imageContent} style={{ backgroundImage: `url(${recipe_images ?? "https://www.dirtyapronrecipes.com/wp-content/uploads/2015/10/food-placeholder.png"})` }}>
					<div className="row w-100">
						<div className="col-8">
							<h3>{dataSave?.title}</h3>
							<p>By {dataSave?.author}</p>
						</div>

						{/* Like and Save
						<div className="col-4 p-0">
							{profile ? (
								dataSave?.save?.includes(profile.user_id.toString()) ? (
									<button type="button" className="btn btn-primary" onClick={() => handleUnSave(profile.user_id, recipe_id)}>
										<IoBookmarkOutline size={20} />
									</button>
								) : (
									<button type="button" className="btn btn-outline-warning" onClick={() => handleSave(profile.user_id, recipe_id)}>
										<IoBookmarkOutline size={20} />
									</button>
								)
							) : null}

						<button type="button" className="btn btn-primary">
									<IoBookmarkOutline size={20} />
								</button>
						{profile ? (
								<button type="button" className="btn btn-primary">
									<BiLike size={20} />
								</button>
							) : null}
						</div>
						</div> */}
					</div>
				</div>

				{/* Content */}
				<div className={detailStyle.content}>
					<Tabs defaultActiveKey="ingredients" id="uncontrolled-tab-example" className="mb-3" variant="pills">
						<Tab eventKey="ingredients" title="Ingredients">
							{dataSave.ingredients}
						</Tab>

						<Tab eventKey="video-step" title="Video Step">
							{dataSave?.video_link
								? dataSave?.video_link.map((item, index) => (
										<>
											<div className={detailStyle.playContainer} onClick={() => router.push(`/recipes/video/${props?.id}?link=${item}`)}>
												<div className="row">
													<div className="col-4">
														<div className={detailStyle.buttonPlay}>
															<FiPlay size={30} color="#ffffff" />
														</div>
													</div>
													<div className="col-8 d-flex align-items-center">
														<h4>Step {index + 1}</h4>
														{/* <p>Boil eggs for 3 minutes</p> */}
													</div>
												</div>
											</div>
										</>
								  ))
								: null}
						</Tab>
						<Tab eventKey="comment" title="Comment">
							{profile ? (
								<>
									{profile.user_id === user_id ? null : (
										<>
											{/* Comment */}
											<div className="mt-5">
												<form>
													<textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Comments" value={comment} onChange={(e) => setComment(e.target.value)} />
													<div className="d-grid gap-2 mt-3">
														<button className="btn btn-warning text-white" type="submit" onClick={handleComment} disabled={isLoading}>
															Post Comment
														</button>
													</div>
												</form>
											</div>
										</>
									)}

									{/* Comment section */}
									<div className="mt-3">
										<span>Comment:</span>
										{commentData ? (
											commentData.map((item) => (
												<>
													<div className={detailStyle.commentContainer}>
														<div className="row">
															<div className="col-2">
																<Image src={item?.avatar ?? "/images/user.jpg"} alt="test" className={detailStyle.avatar} width="50px" height="50px" />
															</div>
															<div className="col-10">
																<h6>{item?.author}</h6>
																<span>{item?.comment}</span>
															</div>
														</div>
													</div>
												</>
											))
										) : (
											<h4 className="text-center mt-3">Tidak ada komentar</h4>
										)}
									</div>
								</>
							) : null}
						</Tab>
					</Tabs>
				</div>
			</div>
			<Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
				<Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
					{msg}
				</Alert>
			</Snackbar>
		</Responsive>
	);
}

export async function getStaticPaths() {
	const request = await fetch(`${process.env.API_URL}/recipes/all`).then((res) => res.json());

	return {
		paths: request?.result.map((item) => ({ params: { id: item?.recipe_id?.toString() } })),
		fallback: false,
	};
}

export async function getStaticProps(context) {
	const { id } = context.params;

	const data = await fetch(`${process.env.API_URL}/recipe/id/${id}`).then((res) => res.json());
	const comment = await fetch(`${process.env.API_URL}/get-comment/${id}`).then((res) => res.json());

	return { props: { data, id, comment }, revalidate: 2 };
}

export default Detail;
