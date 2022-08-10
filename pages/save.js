import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import saveStyle from "../styles/pages/save.module.scss";
import Responsive from "../layout/Responsive";
import Link from "next/link";

import { useRouter } from "next/router";

import { IoIosArrowBack } from "react-icons/io";

function MySave() {
	const router = useRouter();
	const { profile, token } = useSelector((state) => state?.auth);
	const [data, setData] = React.useState({});

	React.useEffect(() => {
		axios.get(`http://localhost:3000/api/save/recipe/${profile.user_id}`).then((res) => {
			setData(res?.data?.result);
		});
	}, []);

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
							<>
								<div className={saveStyle.recipe}>
									<div className="row">
										<div className="col-3">
											<div className={saveStyle.image} style={{ backgroundImage: `url(${item.recipe_images})` }} />
										</div>
										<div className="col-9">
											<div className={saveStyle.detail}>
												<h4>{item.title}</h4>
												<p>in Veg Pizza</p>
												<h5>Spicy</h5>
											</div>
										</div>
									</div>
								</div>
							</>
						))}
					</>
				) : (
					<h3 className="text-center">Belum menyimpan recipe</h3>
				)}
			</div>
		</Responsive>
	);
}

export default MySave;
