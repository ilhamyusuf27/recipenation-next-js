import React from "react";
import Responsive from "../../../layout/Responsive";
import MainLayout from "../../../layout/MainLayout";

import { useSelector } from "react-redux";

import { useRouter } from "next/router";

function Detail(props) {
	const { profile, token } = useSelector((state) => state?.auth);

	const [comment, setComment] = React.useState("");
	const router = useRouter();

	const { link } = router.query;
	const codeLink = link.substring(32, link.length);
	// console.log();
	const { title, ingredients, recipe_images, video_link, author, user_id } = props?.data?.result[0];
	const [isLoading, setIsLoading] = React.useState(false);
	// let commentData = props?.comment?.result;
	const [commentData, setCommentData] = React.useState(props?.comment?.result);
	// console.log(commentData);

	const handleComment = (e) => {
		e.preventDefault();
		setIsLoading(true);
		fetch(`http://localhost:3000/api/comment/${props?.id}`, {
			method: "POST",
			headers: new Headers({
				Authorization: `Bearer ${token}`,
			}),
			body: JSON.stringify({
				comment,
				user_id: profile?.user_id,
			}),
		})
			.then((res) => res.json())
			.then((result) => {
				setIsLoading(false);
				setCommentData(result?.result);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	};
	return (
		<Responsive>
			<MainLayout>
				<iframe
					width="100%"
					height="315"
					src={`https://www.youtube.com/embed/${codeLink}`}
					title="YouTube video player"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</MainLayout>
		</Responsive>
	);
}

export async function getStaticPaths() {
	const request = await fetch("http://localhost:8000/recipes/all").then((res) => res.json());

	return {
		paths: request?.result.map((item) => ({ params: { id: item?.recipe_id?.toString() } })),
		fallback: false,
	};
}

export async function getStaticProps(context) {
	const { id } = context.params;

	const data = await fetch(`http://localhost:8000/recipe/id/${id}`).then((res) => res.json());
	// const comment = await fetch(`http://localhost:3000/api/comment/recipe/${id}`).then((res) => res.json());

	return { props: { data, id } };
}

export default Detail;
