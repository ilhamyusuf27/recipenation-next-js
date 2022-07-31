import React from "react";
import Image from "next/image";
import Slider from "react-slick";

import { FiHome, FiSearch } from "react-icons/fi";
import { MdOutlineAddBox } from "react-icons/md";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { BsFillStarFill } from "react-icons/bs";

import homeStyle from "../styles/pages/home.module.scss";
import navbarStyle from "../styles/components/navbar.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function home() {
	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 2.5,
		slidesToScroll: 1,
	};
	return (
		<div className={`${homeStyle.home}`}>
			{/* Search bar */}
			<div className={`${homeStyle.search} mb-4`}>
				<form>
					<div className={homeStyle.wrapper}>
						<FiSearch className={homeStyle.iconUser} size={20} color="#C4C4C4" />
						<input type="email" className="form-control form-control-lg" placeholder="Search Pasta, Bread, etc" id="email" required />
					</div>
				</form>
			</div>

			{/* Content Popular for you */}
			<div className={homeStyle.popular}>
				<h3 className="mb-3">Popular for You</h3>
				<div className={homeStyle.popularIcon}>
					<div>
						<Image src="/images/chicken-icon.png" alt="icon" width={80} height={80} />
						<p>Soup</p>
					</div>
					<div>
						<Image src="/images/chicken-icon.png" alt="icon" width={80} height={80} />
						<p>Soup</p>
					</div>
					<div>
						<Image src="/images/chicken-icon.png" alt="icon" width={80} height={80} />
						<p>Soup</p>
					</div>
					<div>
						<Image src="/images/chicken-icon.png" alt="icon" width={80} height={80} />
						<p>Soup</p>
					</div>
				</div>
			</div>

			{/* New Recipe */}
			<div className="mb-4">
				<div className={homeStyle.contentTitle}>
					<h3 className="mb-3">New Recipes</h3>
				</div>
				<Slider {...settings}>
					<div className={`${homeStyle.cardNewRecipe} cardNewRecipe`}>
						<h5>Banana Lemonilo</h5>
					</div>
					<div className={`${homeStyle.cardNewRecipe} cardNewRecipe`}>
						<h5>Banana Lemonilo</h5>
					</div>
					<div className={`${homeStyle.cardNewRecipe} cardNewRecipe`}>
						<h5>Banana Lemonilo</h5>
					</div>
				</Slider>
			</div>

			<div>
				<div className={homeStyle.contentTitle}>
					<h3 className="mb-3">Popular Recipes</h3>
					<a>More info</a>
				</div>
				<div className={homeStyle.popularRecipes}>
					<div className={homeStyle.contentPopularRecipes}>
						<div className="row">
							<div className="col-4">
								<div className={homeStyle.imageContainer}></div>
							</div>
							<div className="col-8">
								<h4>Teriyaki Salmon</h4>
								<p>spicy, salted</p>
								<div className="d-flex">
									<BsFillStarFill />
									<p>4.7</p>
								</div>
							</div>
						</div>
					</div>

					<div className={homeStyle.contentPopularRecipes}>
						<div className="row">
							<div className="col-4">
								<div className={homeStyle.imageContainer}></div>
							</div>
							<div className="col-8">
								<h4>Teriyaki Salmon</h4>
								<p>spicy, salted</p>
								<div className="d-flex">
									<BsFillStarFill />
									<p>4.7</p>
								</div>
							</div>
						</div>
					</div>

					<div className={homeStyle.contentPopularRecipes}>
						<div className="row">
							<div className="col-4">
								<div className={homeStyle.imageContainer}></div>
							</div>
							<div className="col-8">
								<h4>Teriyaki Salmon</h4>
								<p>spicy, salted</p>
								<div className="d-flex">
									<BsFillStarFill />
									<p>4.7</p>
								</div>
							</div>
						</div>
					</div>

					<div className={homeStyle.contentPopularRecipes}>
						<div className="row">
							<div className="col-4">
								<div className={homeStyle.imageContainer}></div>
							</div>
							<div className="col-8">
								<h4>Teriyaki Salmon</h4>
								<p>spicy, salted</p>
								<div className="d-flex">
									<BsFillStarFill />
									<p>4.7</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div>
				<nav className={`${navbarStyle.navbar} navbar navbar-expand navbar-dark bg-primary text-white fixed-bottom`}>
					<ul className="navbar-nav nav-justified w-100">
						<li className="nav-item">
							<a>
								<FiHome size={30} color="#6E80B0" />
							</a>
						</li>
						<li className="nav-item">
							<a>
								<MdOutlineAddBox size={30} color="#6E80B0" />
							</a>
						</li>
						<li className="nav-item">
							<a>
								<IoChatbubbleOutline size={30} color="#6E80B0" />
							</a>
						</li>
						<li className="nav-item">
							<a>
								<FiUser size={30} color="#6E80B0" />
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}

export default home;
