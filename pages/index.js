// eslint-disable-next-line @next/next/no-img-element

import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";

import { useRouter } from "next/router";

import { FiSearch, FiUser } from "react-icons/fi";
import { BsFillStarFill } from "react-icons/bs";
import { IoBookmarkOutline } from "react-icons/io5";
import { BiLike } from "react-icons/bi";

import homeStyle from "../styles/pages/home.module.scss";

import MainLayout from "../layout/MainLayout";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home(props) {
	const router = useRouter();
	const [search, setSearch] = React.useState("");

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
						<h3 className="mb-3">New Recipes</h3>
					</div>
					<Slider {...settings}>
						{props?.trending?.result.map((item) => (
							<>
								<div
									className={`${homeStyle.cardNewRecipe} cardNewRecipe`}
									style={{
										backgroundImage: `url(${item?.recipe_images ?? "https://www.dirtyapronrecipes.com/wp-content/uploads/2015/10/food-placeholder.png"})`,
										backgroundSize: "cover",
										backgroundPosition: "center",
									}}
									onClick={() => router.push(`/recipes/${item.recipe_id}`)}
								>
									<h5>{item?.title}</h5>
								</div>
							</>
						))}
					</Slider>
				</div>

				<div>
					<div className={homeStyle.contentTitle}>
						<h3 className="mb-3">Popular Recipes</h3>
						<Link href="/popular" passHref>
							<a>More info</a>
						</Link>
					</div>
					<div className={homeStyle.popularRecipes}>
						{props?.allRecipes?.result.map((item) => (
							<>
								<Link href={`/recipes/${item.recipe_id}`} passHref>
									<div className={homeStyle.contentPopularRecipes}>
										<div className="row w-100 h-100">
											<div className="col-3 p-0 d-flex align-items-center">
												<img src={item?.recipe_images ?? "https://www.dirtyapronrecipes.com/wp-content/uploads/2015/10/food-placeholder.png"} className={homeStyle.imageContainer} alt="foot-images" />
											</div>
											<div className="col-9 py-2 d-flex flex-column justify-content-between">
												<h4>{item?.title}</h4>
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
							</>
						))}
					</div>
				</div>
			</div>
		</MainLayout>
	);
}

export async function getServerSideProps() {
	const trending = await fetch(`http://localhost:3000/api/recipe/newrecipes`).then((res) => res.json());
	const recipes = await fetch("http://localhost:3000/api/recipe/popular").then((res) => res.json());
	const users = await fetch("http://localhost:3000/api/user").then((res) => res.json());

	return { props: { trending, allRecipes: recipes, user: users?.total_data } };
}

export default Home;
