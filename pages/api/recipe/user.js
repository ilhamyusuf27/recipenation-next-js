import axios from "axios";

export default function handler(req, res) {
	const { user_id } = req.body;

	axios
		.post(`${process.env.API_URL}/recipe/id`, {
			user_id,
		})
		.then((response) => {
			res.status(200).json(response?.data);
		})
		.catch((err) => {
			res.status(400).json(err?.response?.data);
		});
}
