/* eslint-disable @next/next/no-img-element */
import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import saveStyle from "../styles/pages/save.module.scss";
import Responsive from "../layout/Responsive";
import Link from "next/link";

import { useRouter } from "next/router";

import { FiUser } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import { BiLike } from "react-icons/bi";

function MySave() {
	const router = useRouter();
	const { profile, token } = useSelector((state) => state?.auth);
	const [data, setData] = React.useState({});
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(() => {
		setIsLoading(true);
		axios
			.get(`${process.env.NEXT_URL}/api/save/recipe/${profile.user_id}`)
			.then((res) => {
				setIsLoading(false);
				setData(res?.data?.result);
			})
			.catch(() => setIsLoading(false));
	}, [profile?.user_id]);

	return (
		<Responsive>
			<div className={saveStyle.titlePage}>
				<Link href="/profile" passHref>
					<div className={saveStyle.back}>
						<IoIosArrowBack size={25} />
					</div>
				</Link>
				<h3>Save Recipe</h3>
			</div>

			<div className={saveStyle.recipeContainer}>
				{data?.length ? (
					<>
						{data?.map((item) => (
							<div key={item?.recipe_id} className={`${saveStyle.recipe} mb-3`}>
								<Link href={`/recipes/${item?.recipe_id}`}>
									<div className="row">
										<div className="col-3">
											<div className={saveStyle.image} style={{ backgroundImage: `url(${item.recipe_images})` }} />
										</div>
										<div className="col-9">
											<div className={`${saveStyle.detail}`}>
												<h4 className="m-0">{item.title}</h4>
												<div className="d-flex align-items-center">
													<FiUser />
													<p className="ms-1 mb-0">{item?.author}</p>
												</div>
												<div className="row">
													<div className="col-lg-2 col-3 d-flex align-items-center">
														<IoBookmarkOutline /> {" " + item?.save.length}
													</div>
													<div className="col-lg-2 col-3 d-flex align-items-center">
														<BiLike /> {" " + item?.likes.length}
													</div>
												</div>
											</div>
										</div>
									</div>
								</Link>
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
					<h3 className="text-center text-muted">Belum menyimpan recipe</h3>
				)}
			</div>
		</Responsive>
	);
}

export default MySave;
