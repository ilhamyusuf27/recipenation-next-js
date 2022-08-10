import axios from "axios";

export default function handler(req, res) {
	const { user_id, name, phone_number, photo_profile } = req.body;
	const token = req?.headers?.authorization;

	console.log(user_id);
	console.log(req);

	axios
		.patch(
			`${process.env.API_URL}/users/update`,
			{
				user_id,
				name,
				phone_number,
				photo_profile,
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
