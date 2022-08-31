// eslint-disable-next-line @next/next/no-img-element

import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";

import { useRouter } from "next/router";

import { FiSearch, FiUser } from "react-icons/fi";
import { IoBookmarkOutline } from "react-icons/io5";
import { BiLike } from "react-icons/bi";

import homeStyle from "../styles/pages/home.module.scss";
import { Skeleton } from "@mui/material";
import MainLayout from "../layout/MainLayout";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { Stack } from "react-bootstrap";
// import axios from "axios";

function Home(props) {
	const router = useRouter();
	const [search, setSearch] = React.useState("");
	// const [trending, setTrending] = React.useState([]);
	// const [recipes, setRecipes] = React.useState([]);

	// const getTrending = () => {
	// 	axios
	// 		.get(`${process.env.NEXT_URL}/api/recipe/newrecipes`)
	// 		.then((res) => {
	// 			setTrending(res?.data?.result);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	// const getRecipes = () => {
	// 	axios
	// 		.get(`${process.env.NEXT_URL}/api/recipe/popular`)
	// 		.then((res) => {
	// 			setRecipes(res?.data?.result);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	// const getUser = () => {
	// 	axios
	// 		.get(`${process.env.NEXT_URL}/api/recipe/popular`)
	// 		.then((res) => {
	// 			setRecipes(res?.data?.result);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	// React.useEffect(() => {
	// 	getTrending();
	// 	getRecipes();
	// }, []);

	const handleSearch = (e) => {
		e.preventDefault();
		router.push(`/search/${search}`);
	};

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 2.5,
		slidesToScroll: 1,
	};
	return (
		<MainLayout>
			<div className={`${homeStyle.home}`}>
				{/* Search bar */}
				<div className={`${homeStyle.search} mb-4`}>
					<form onSubmit={handleSearch}>
						<div className={homeStyle.wrapper}>
							<FiSearch className={homeStyle.iconUser} size={20} color="#C4C4C4" />
							<input type="text" className="form-control form-control-lg" placeholder="Search Pasta, Bread, etc" id="search" values={search} onChange={(e) => setSearch(e.target.value)} />
						</div>
					</form>
				</div>

				{/* Content Popular for you */}
				{/* <div className={homeStyle.popular}>
					<h3 className="mb-3">Popular for You</h3>
					<div className="row">
						<div className={homeStyle.popularIcon}>
							<div className="col-3 d-flex align-items-center flex-column">
								<Image src="/images/soup-icon.png" alt="icon" width={80} height={80} />
								<p>Soup</p>
							</div>
							<div className="col-3 d-flex align-items-center flex-column">
								<Image src="/images/chicken-icon.png" alt="icon" width={80} height={80} />
								<p>chicken</p>
							</div>
							<div className="col-3 d-flex align-items-center flex-column">
								<Image src="/images/seafood-icon.png" alt="icon" width={80} height={80} />
								<p>Seafood</p>
							</div>
							<div className="col-3 d-flex align-items-center flex-column">
								<Image src="/images/chicken-icon.png" alt="icon" width={80} height={80} />
								<p>Dessert</p>
							</div>
						</div>
					</div>
				</div> */}

				{/* New Recipe */}
				<div className={`${homeStyle.sliderContainer} mb-4`}>
					<div className={homeStyle.contentTitle}>
						<h3 className="mb-3" style={{ fontWeight: "700" }}>
							New Recipes
						</h3>
					</div>
					<Slider {...settings}>
						{props?.trending?.result.slice(0, 5).map((item, index) => (
							<div key={`T${(index + 1).toString()}`} item className={`${homeStyle.cardNewRecipe} cardNewRecipe`} onClick={() => router.push(`/recipes/${item.recipe_id}`)}>
								<Image
									src={item?.recipe_images ?? "/images/food-placeholder.png"}
									layout="fill"
									alt="new-recipe"
									sizes="(min-width: 75em) 33vw, (min-width: 48em) 50vw, 100vw"
									className={homeStyle.cardImage}
								/>
								<div className={homeStyle.titleCard}>
									<h5>{item?.title}</h5>
								</div>
							</div>
						))}
					</Slider>
				</div>

				<div>
					<div className={homeStyle.contentTitle}>
						<h3 className="mb-3" style={{ fontWeight: "700" }}>
							Popular Recipes
						</h3>
						<Link href="/popular" passHref>
							<a>More info</a>
						</Link>
					</div>
					<div className={homeStyle.popularRecipes}>
						{props?.allRecipes?.result.map((item, index) =>
							!item ? (
								<Skeleton variant="rounded" width={418} height={100} className="mt-1 ms-1 mb-3" key={`S${(index + 1).toString()}`} item="true" />
							) : (
								<div key={`D${(index + 1).toString()}`}>
									<Link href={`/recipes/${item.recipe_id}`} passHref>
										<div className={homeStyle.contentPopularRecipes}>
											<div className="row w-100 h-100">
												<div className="col-3 p-0 d-flex align-items-center">
													<Image
														src={item?.recipe_images ?? "https://www.dirtyapronrecipes.com/wp-content/uploads/2015/10/food-placeholder.png"}
														className={homeStyle.imageContainer}
														alt="foot-images"
														width={"100%"}
														height={"85%"}
													/>
												</div>
												<div className="col-9 py-2 d-flex flex-column justify-content-between">
													<h5 className="m-0">{item?.title}</h5>
													<div className="d-flex align-items-center">
														<FiUser />
														<p className="ms-1">{item?.author}</p>
													</div>
													<div className="row">
														<div className="col-lg-2 col-3 d-flex align-items-center">
															<IoBookmarkOutline /> {" " + item?.save.length}
														</div>
														<div className="col-lg-2 col-3 d-flex align-items-center">
															<BiLike /> {" " + item?.likes.length}
														</div>
													</div>
													{/* {item?.likes?.length > 0 ? (
													<div className="d-flex align-items-center">
														<BsFillStarFill />
														<span className="ms-2">{(item?.likes.length / props.user) * 5}</span>
													</div>
												) : null} */}
												</div>
											</div>
										</div>
									</Link>
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</MainLayout>
	);
}

export async function getServerSideProps() {
	const trending = await fetch(`${process.env.NEXT_URL}/api/recipe/newrecipes`).then((res) => res.json());
	const recipes = await fetch(`${process.env.NEXT_URL}/api/recipe/popular`).then((res) => res.json());

	return { props: { trending, allRecipes: recipes } };
}

export default Home;
