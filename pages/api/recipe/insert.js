import axios from "axios";

export default function handler(req, res) {
	const { user_id, title, ingredients, recipe_images, video_link } = req.body;
	const token = req?.headers?.authorization;

	axios
		.get(
			`${process.env.API_URL}/recipes/add`,
			{
				user_id,
				title,
				ingredients,
				recipe_images,
				video_link,
			},
			{
				headers: {
					authorization: token,
				},
			}
		)
		.then((response) => {
			res.status(200).json(response?.data);
		})
		.catch((err) => {
			res.status(400).json(err.response.data);
		});
}
