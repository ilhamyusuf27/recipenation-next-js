import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import axios from "axios";
import MainLayout from "../../../layout/MainLayout";
import addRecipeStyle from "../../../styles/pages/addRecipe.module.scss";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { FiBookOpen, FiVideo, FiImage } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";

import Swal from "sweetalert2";
import { useSelect } from "@mui/base";

function Input() {
	const router = useRouter();
	const { id } = router.query;

	const { profile, token } = useSelector((state) => state?.auth);
	const { user_id } = profile;

	const [recipe, setRecipe] = React.useState({});

	React.useEffect(() => {
		if (!token) {
			router.push("/login");
		}
	});

	const getRecipe = () => {
		axios
			.get(`${process.env.API_URL}/recipe/id/${id}`)
			.then((res) => {
				setRecipe(res?.data?.result[0]);
				const { title, ingredients, recipe_images, video_link } = res?.data?.result[0];
				setTitle(title);
				setDesc(ingredients);
				setNameImage(recipe_images);
				setLinkVideo(video_link);
			})
			.catch((err) => console.log(err));
	};

	React.useEffect(() => {
		getRecipe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [title, setTitle] = React.useState(recipe?.title);
	const [desc, setDesc] = React.useState("");
	const [recipeImage, setRecipeImage] = React.useState("");
	const [nameImage, setNameImage] = React.useState("");
	const [video, setVideo] = React.useState("");
	const [linkVideo, setLinkVideo] = React.useState([""]);
	const [isLoading, setIsLoading] = React.useState(false);

	// React.useEffect(() => {
	// 	if (profile?.user_id !== recipe?.user_id) {
	// 		router.replace("/");
	// 	}
	// }, [router, user_id, recipe?.user_id]);

	const handleChange = (index, e) => {
		let targetLinkVideo = [...linkVideo];
		targetLinkVideo[index] = e.target.value;
		setLinkVideo(targetLinkVideo);
	};

	const handleAdd = (e) => {
		e.preventDefault();
		setLinkVideo([...linkVideo, ""]);
	};

	const handleRemove = (i) => {
		let targetLinkVideo = [...linkVideo];
		targetLinkVideo.splice(i, 1);
		setLinkVideo(targetLinkVideo);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		// const { user_id } = JSON.parse(localStorage.getItem("data"));
		const linkConvert = `{${linkVideo.join(",")}}`;
		const formData = new FormData();
		formData.append("user_id", profile?.user_id);
		formData.append("title", title);
		formData.append("ingredients", desc);
		formData.append("recipe_images", recipeImage);
		formData.append("video_link", linkConvert);
		formData.append("recipe_id", id);

		axios
			.patch(`${process.env.API_URL}/recipes/edit`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"content-type": "multipart/form-data",
				},
			})
			.then(() => {
				setIsLoading(false);
				Swal.fire({
					icon: "success",
					title: "Berhasil Diupdate",
				}).then(() => router.push("/"));
			})
			.catch((err) => {
				setIsLoading(false);
				Swal.fire({
					icon: "error",
					title: err?.response?.data?.message,
				});
			});
	};
	return (
		<MainLayout>
			<div className={addRecipeStyle.container}>
				<h3 className="text-center">Edit Recipe</h3>
				<div className={`${addRecipeStyle.input} mb-4`}>
					<form onSubmit={handleSubmit} className={addRecipeStyle.form}>
						<div className={addRecipeStyle.wrapper}>
							<FiBookOpen className={addRecipeStyle.iconUser} size={20} color="#C4C4C4" />
							<input type="text" className="form-control form-control-lg" placeholder="Title" id="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
						</div>
						<div className={addRecipeStyle.wrapper}>
							<FiImage className={addRecipeStyle.iconUser2} size={20} color="#C4C4C4" />
							<label htmlFor="formFile" className="form-label" style={{ color: nameImage ? "black" : "#7D858C", overflow: "hidden" }}>
								{nameImage ? nameImage : "No File Chosen"}
							</label>
							<input
								className={addRecipeStyle.inputImage}
								type="file"
								id="formFile"
								onChange={(e) => {
									setRecipeImage(e.target.files[0]);
									setNameImage(e.target.files[0].name);
								}}
							/>
						</div>
						<div className={addRecipeStyle.wrapper}>
							<textarea rows="3" type="text" className="form-control form-control-lg" placeholder="Description" id="desc" required value={desc} onChange={(e) => setDesc(e.target.value)} />
						</div>
						{linkVideo?.map((item, index) =>
							index > 0 ? (
								<div className="d-flex align-items-center mt-4">
									<div className={addRecipeStyle.input}>
										<FiVideo className={addRecipeStyle.iconUser} size={20} color="#C4C4C4" />
										<input type="text" className="form-control form-control-lg" placeholder="Add Video" id="video" value={linkVideo[index]} onChange={(e) => handleChange(index, e)} />
									</div>
									<Stack>
										<IconButton aria-label="delete" size="large" onClick={() => handleRemove(index)}>
											<DeleteIcon fontSize="inherit" />
										</IconButton>
									</Stack>
								</div>
							) : (
								<div className="d-flex align-items-center mt-4">
									<div className={addRecipeStyle.input}>
										<FiVideo className={addRecipeStyle.iconUser} size={20} color="#C4C4C4" />
										<input type="text" className="form-control form-control-lg" placeholder="Add Video" id="video" value={linkVideo[index]} onChange={(e) => handleChange(index, e)} />
									</div>
								</div>
							)
						)}

						<button type="button" className="btn btn-outline-warning mt-3" onClick={handleAdd}>
							<IoIosAdd />
							Tambah Video
						</button>

						<div className="d-flex justify-content-center mt-5 mb-5">
							<button type="submit" className="btn btn-warning btn-lg text-light mb-5	" disabled={isLoading}>
								{isLoading ? "Loading..." : "Submit"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</MainLayout>
	);
}

export default Input;
