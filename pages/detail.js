import React from "react";

import detailStyle from "../styles/pages/detail.module.scss";
import { Tabs, Tab } from "react-bootstrap";

import { BiLike, BiArrowBack } from "react-icons/bi";
import { IoBookmarkOutline } from "react-icons/io5";
import { FiPlay } from "react-icons/fi";

function detail() {
	return (
		<div>
			<div className={detailStyle.detailContent}>
				{/* Icon Back */}
				<div className={detailStyle.iconBack}>
					<BiArrowBack size={30} color="#F5F5F5" />
				</div>

				{/* Image */}
				<div className={detailStyle.imageContent}>
					<div className="row w-100">
						<div className="col-8">
							<h3>Sandwich with Egg</h3>
							<p>By Chef Ronald Humson</p>
						</div>
						<div className="col-4 p-0">
							<div className={detailStyle.buttonControl}>
								<button type="button" className="btn btn-primary">
									<IoBookmarkOutline size={20} />
								</button>
								<button type="button" className="btn btn-primary">
									<BiLike size={20} />
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Content */}
				<div className={detailStyle.content}>
					<Tabs defaultActiveKey="ingredients" id="uncontrolled-tab-example" className="mb-3" variant="pills">
						<Tab eventKey="ingredients" title="Ingredients">
							- 2 slices whole-grain bread (bakery-fresh recommended) - 1 tablespoon hummus - 2 slices tomato - 1/2 small cucumber, thinly sliced lengthwise - 1 slice low-fat cheese
						</Tab>

						<Tab eventKey="video-step" title="Video Step">
							<div className={detailStyle.playContainer}>
								<div className="row">
									<div className="col-4">
										<div className={detailStyle.buttonPlay}>
											<FiPlay size={30} color="#ffffff" />
										</div>
									</div>
									<div className="col-8">
										<h4>Step 1</h4>
										<p>Boil eggs for 3 minutes</p>
									</div>
								</div>
							</div>
							<div className={detailStyle.playContainer}>
								<div className="row">
									<div className="col-4">
										<div className={detailStyle.buttonPlay}>
											<FiPlay size={30} color="#ffffff" />
										</div>
									</div>
									<div className="col-8">
										<h4>Step 1</h4>
										<p>Boil eggs for 3 minutes</p>
									</div>
								</div>
							</div>
							<div className={detailStyle.playContainer}>
								<div className="row">
									<div className="col-4">
										<div className={detailStyle.buttonPlay}>
											<FiPlay size={30} color="#ffffff" />
										</div>
									</div>
									<div className="col-8">
										<h4>Step 1</h4>
										<p>Boil eggs for 3 minutes</p>
									</div>
								</div>
							</div>
							<div className={detailStyle.playContainer}>
								<div className="row">
									<div className="col-4">
										<div className={detailStyle.buttonPlay}>
											<FiPlay size={30} color="#ffffff" />
										</div>
									</div>
									<div className="col-8">
										<h4>Step 1</h4>
										<p>Boil eggs for 3 minutes</p>
									</div>
								</div>
							</div>
							<div className={detailStyle.playContainer}>
								<div className="row">
									<div className="col-4">
										<div className={detailStyle.buttonPlay}>
											<FiPlay size={30} color="#ffffff" />
										</div>
									</div>
									<div className="col-8">
										<h4>Step 1</h4>
										<p>Boil eggs for 3 minutes</p>
									</div>
								</div>
							</div>
							<div className={detailStyle.playContainer}>
								<div className="row">
									<div className="col-4">
										<div className={detailStyle.buttonPlay}>
											<FiPlay size={30} color="#ffffff" />
										</div>
									</div>
									<div className="col-8">
										<h4>Step 1</h4>
										<p>Boil eggs for 3 minutes</p>
									</div>
								</div>
							</div>
						</Tab>
					</Tabs>
				</div>
			</div>
		</div>
	);
}

export default detail;
