import axios from "axios";

export default function handler(req, res) {
	const { user_id, recipe_id } = req.body;
	const token = req?.headers?.authorization;

	axios
		.patch(
			`${process.env.API_URL}/recipes/like`,
			{
				user_id,
				recipe_id,
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
