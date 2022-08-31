import axios from "axios";

export default function handler(req, res) {
	const { comment, user_id } = JSON.parse(req.body);
	const { id } = req.query;
	const token = req?.headers?.authorization;

	axios
		.post(
			`${process.env.API_URL}/recipe/comments/${id}`,
			{
				comment,
				user_id,
			},
			{
				headers: {
					authorization: token,
				},
			}
		)
		.then((response) => {
			console.log(response);
			res.status(200).json(response?.data);
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json(err.response.data);
		});
}
