import React from "react";
import axios from "axios";
import Responsive from "../../layout/Responsive";

import detailStyle from "../../styles/pages/detail.module.scss";
import popularStyle from "../../styles/pages/popular.module.scss";
import { Tabs, Tab } from "react-bootstrap";

import { BiLike, BiArrowBack } from "react-icons/bi";
import { IoBookmarkOutline } from "react-icons/io5";
import { FiPlay } from "react-icons/fi";
import { useSelector } from "react-redux";

import { useRouter } from "next/router";

function Detail(props) {
	const { profile, token } = useSelector((state) => state?.auth);

	const [comment, setComment] = React.useState("");
	const router = useRouter();
	const { title, ingredients, recipe_images, video_link, author, user_id, recipe_id } = props?.data?.result[0];
	const [isLoading, setIsLoading] = React.useState(false);
	const [commentData, setCommentData] = React.useState({});
	const [dataSave, setDataSave] = React.useState(props?.data?.result[0]);

	React.useEffect(() => {
		axios.get(`http://localhost:8000/get-comment/${props?.id}`).then((res) => {
			setCommentData(res?.data?.result);
			console.log(res);
		});
	}, []);
	// console.log(dataSave);

	const handleSave = (user_id, recipe_id) => {
		axios
			.patch(
				"http://localhost:3000/api/save/detailsave",
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
				// setDataSave(res?.data?.result);
				// console.log(res);
			});
	};

	const handleUnSave = (user_id, recipe_id) => {
		axios
			.patch(
				"http://localhost:3000/api/save/detailunsave",
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
				// setDataSave(res?.data?.result);
				// console.log(res);
			})
			.catch((err) => console.log(err));
	};

	const handleComment = (e) => {
		e.preventDefault();
		setIsLoading(true);
		fetch(`http://localhost:3000/api/comment/${props?.id}`, {
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
				setIsLoading(false);
				setCommentData(result?.result);
			})
			.catch((err) => {
				// console.log(err);
				setIsLoading(false);
			});
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

						{/* Like and Save */}
						{/* <div className="col-4 p-0">
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
							) : null} */}

						{/* <button type="button" className="btn btn-primary">
									<IoBookmarkOutline size={20} />
								</button> */}
						{/* {profile ? (
								<button type="button" className="btn btn-primary">
									<BiLike size={20} />
								</button>
							) : null} */}
						{/* </div> */}
						{/* </div> */}
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
					</Tabs>
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
														<img src={item?.avatar ?? "/images/user.jpg"} alt="test" className={detailStyle.avatar} />
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
				</div>
			</div>
		</Responsive>
	);
}

export async function getStaticPaths() {
	const request = await fetch("http://localhost:8000/recipes/all").then((res) => res.json());

	return {
		paths: request?.result.map((item) => ({ params: { id: item?.recipe_id?.toString() } })),
		fallback: false,
	};
}

export async function getStaticProps(context) {
	const { id } = context.params;

	const data = await fetch(`http://localhost:8000/recipe/id/${id}`).then((res) => res.json());
	// const comment = await fetch(`http://localhost:8000/get-comment/${id}`).then((res) => res.json());

	return { props: { data, id } };
}

export default Detail;
