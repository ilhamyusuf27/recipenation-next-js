import React from "react";
import { useRouter } from "next/router";
import Responsive from "../../layout/Responsive";
import MainLayout from "../../layout/MainLayout";

import homeStyle from "../../styles/pages/home.module.scss";
import { FiSearch } from "react-icons/fi";

function Search(props) {
	const router = useRouter();
	const { recipes } = props;

	const [search, setSearch] = React.useState("");
	console.log(search);

	const handleSearch = (e) => {
		e.preventDefault();
		router.push(`/search/${search}`);
	};

	return (
		<Responsive>
			<MainLayout>
				<div className={homeStyle.home}>
					<div className={`${homeStyle.search} mb-4`}>
						<form onSubmit={handleSearch}>
							<div className={homeStyle.wrapper}>
								<FiSearch className={homeStyle.iconUser} size={20} color="#C4C4C4" />
								<input type="text" className="form-control form-control-lg" placeholder="Search Pasta, Bread, etc" id="search" values={search} onChange={(e) => setSearch(e.target.value)} />
							</div>
						</form>
					</div>

					<div>
						<div className={homeStyle.popularRecipes}>
							{typeof recipes !== "string" ? (
								recipes?.map((item) => (
									<>
										<div className={homeStyle.contentPopularRecipes} onClick={() => router.push(`/recipes/${item.recipe_id}`)}>
											<div className="row w-100 h-100">
												<div className="col-3 p-0 d-flex align-items-center">
													<img
														src={item?.recipe_images ?? "https://www.dirtyapronrecipes.com/wp-content/uploads/2015/10/food-placeholder.png"}
														className={homeStyle.imageContainer}
														alt="foot-images"
													/>
												</div>
												<div className="col-9 pt-2">
													<h4>{item?.title}</h4>
													<p>spicy, salted</p>
													{/* {item?.likes.length > 0 ? (
												<div className="d-flex align-items-center">
													<BsFillStarFill />
													<span className="ms-2">{(item?.likes.length / props.user) * 5}</span>
												</div>
											) : null} */}
												</div>
											</div>
										</div>
									</>
								))
							) : (
								<h3 className="text-center">{recipes}</h3>
							)}
						</div>
					</div>
				</div>
			</MainLayout>
		</Responsive>
	);
}

export async function getServerSideProps(context) {
	const { search } = context.params;
	const recipes = await fetch(`${process.env.NEXT_URL}/api/recipe/search/${search}`).then((res) => res.json());

	return { props: { recipes, search } };
}

export default Search;
