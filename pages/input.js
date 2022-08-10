import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import axios from "axios";
import MainLayout from "../layout/MainLayout";
import addRecipeStyle from "../styles/pages/addRecipe.module.scss";

import { FiBookOpen, FiVideo, FiImage } from "react-icons/fi";
import Swal from "sweetalert2";

function Input() {
	const router = useRouter();
	const { profile, token } = useSelector((state) => state?.auth);
	const [title, setTitle] = React.useState("");
	const [desc, setDesc] = React.useState("");
	const [recipeImage, setRecipeImage] = React.useState("");
	const [nameImage, setNameImage] = React.useState("");
	const [video, setVideo] = React.useState("");
	const [linkVideo, setLinkVideo] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(() => {
		if (!token) {
			router.push("/login");
		}
	});

	const handleAdd = (e) => {
		e.preventDefault();
		linkVideo.push(video);
		setVideo("");
	};

	// const handleDelete = (index) => {
	// 	console.log(index);
	// 	linkVideo.splice(index, 1);
	// };

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

		axios
			.post("http://localhost:8000/recipes/add", formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"content-type": "multipart/form-data",
				},
			})
			.then(() => {
				setIsLoading(false);
				Swal.fire({
					icon: "success",
					title: "Berhasil Ditambah",
				}).then(() => router.push("/"));
			})
			.catch((err) => console.log(err));
	};

	return (
		<MainLayout>
			<div className={addRecipeStyle.container}>
				<h3 className="text-center">Add Your Recipe</h3>
				<div className={`${addRecipeStyle.input} mb-4`}>
					<form onSubmit={handleSubmit}>
						<div className={addRecipeStyle.wrapper}>
							<FiBookOpen className={addRecipeStyle.iconUser} size={20} color="#C4C4C4" />
							<input type="text" className="form-control form-control-lg" placeholder="Title" id="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
						</div>
						<div className={addRecipeStyle.wrapper}>
							<FiImage className={addRecipeStyle.iconUser2} size={20} color="#C4C4C4" />
							<label htmlFor="formFile" className="form-label" style={{ color: nameImage ? "black" : "#7D858C" }}>
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
						<div className={addRecipeStyle.wrapper}>
							<FiVideo className={addRecipeStyle.iconUser} size={20} color="#C4C4C4" />
							<input type="text" className="form-control form-control-lg" placeholder="Add Video" id="video" value={video} onChange={(e) => setVideo(e.target.value)} />
							<button onClick={handleAdd} className={addRecipeStyle.add}>
								Tambah
							</button>
						</div>

						{linkVideo.length > 0 ? (
							<div className={addRecipeStyle.wrapper}>
								<div className={addRecipeStyle.linkContainer}>
									{linkVideo.map((item, index) => (
										<>
											<div
												className={addRecipeStyle.videoLink}
												// onClick={(e) => {
												// 	e.preventDefault;
												// 	handleDelete(index);
												// }}
											>
												<p>{item}</p>
											</div>
										</>
									))}
								</div>
							</div>
						) : null}
						<div className="d-flex justify-content-center mt-4">
							<button type="submit" className="btn btn-warning btn-lg text-light" disabled={isLoading}>
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
