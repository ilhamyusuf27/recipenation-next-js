/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import saveStyle from "../styles/pages/save.module.scss";
import Responsive from "../layout/Responsive";
import Link from "next/link";

import { useRouter } from "next/router";
import Swal from "sweetalert2";

import { FiUser, FiTrash2, FiEdit3 } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import { BiLike } from "react-icons/bi";

function Myrecipe() {
	const router = useRouter();
	const { profile, token } = useSelector((state) => state?.auth);
	const [data, setData] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);

	const getData = () => {
		setIsLoading(true);
		axios
			.post(`${process.env.NEXT_URL}/api/recipe/user`, {
				user_id: profile?.user_id,
			})
			.then((res) => {
				setData(res?.data?.result);
				setFound(false);
			})
			.catch(() => setIsLoading(false));
	};

	React.useEffect(() => {
		getData();
	}, []);

	const handleDelete = (data) => {
		Swal.fire({
			title: "Do you want to delete this recipe?",
			showCancelButton: true,
			confirmButtonText: "Delete",
		}).then((result) => {
			if (result.isConfirmed) {
				setIsLoading(true);
				axios
					.delete(`${process.env.API_URL}/delete/recipe/${data?.recipe_id}`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then(() => {
						Swal.fire("Delete!", `Success delete ${data?.title}`, "success");
						setIsLoading(false);
						getData();
					})
					.catch((err) => {
						console.log(err);
					});
			}
		});
	};

	return (
		<Responsive>
			<div className={saveStyle.titlePage}>
				<Link href="/profile" passHref>
					<div className={saveStyle.back}>
						<IoIosArrowBack size={25} />
					</div>
				</Link>
				<h3>My Recipe</h3>
			</div>

			<div className={saveStyle.recipeContainer}>
				{data?.length ? (
					<>
						{data?.map((item) => (
							<div key={item?.recipe_id} className={`${saveStyle.recipe} mb-3`}>
								<div className="row">
									<Link href={`/recipes/${item?.recipe_id}`}>
										<div className="col-3">
											<div className={saveStyle.image} style={{ backgroundImage: `url(${item?.recipe_images})` }} />
										</div>
									</Link>
									<div className="col-5">
										<div className={`${saveStyle.detail}`}>
											<Link href={`/recipes/${item?.recipe_id}`}>
												<h5 className="m-0">{item.title}</h5>
											</Link>
											<div className="d-flex align-items-center">
												<FiUser />
												<p className="ms-1 mb-0">{item?.author}</p>
											</div>
											<div className="row">
												<div className="col-lg-4 col-4 d-flex align-items-center">
													<IoBookmarkOutline /> {" " + item?.save.length}
												</div>
												<div className="col-lg-4 col-4 d-flex align-items-center">
													<BiLike /> {" " + item?.likes.length}
												</div>
											</div>
										</div>
									</div>
									<div className="col-4">
										<div className="w-100 h-100 d-flex justify-content-around align-items-center">
											<div className={saveStyle.buttonEdit} onClick={() => router.push(`/recipes/edit/${item?.recipe_id}`)}>
												<FiEdit3 color="white" />
											</div>
											<div className={saveStyle.buttonDelete} onClick={() => handleDelete(item)}>
												<FiTrash2 color="white" />
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</>
				) : isLoading ? (
					<>
						<div className="d-flex align-items-center justify-content-center">
							<img src="/animation/loading2.gif" alt="loading" />
						</div>
					</>
				) : (
					<h3 className="text-center text-muted">Belum ada recipe</h3>
				)}
			</div>
		</Responsive>
	);
}

export default Myrecipe;
