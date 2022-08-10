import React from "react";
import Image from "next/image";
import Link from "next/link";

import profileStyle from "../styles/pages/profile.module.scss";
import MainLayout from "../layout/MainLayout";

import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import * as Type from "../redux/auth/type";

import { GrFormNext } from "react-icons/gr";
import { FiUser, FiAward, FiBookmark, FiLogOut } from "react-icons/fi";
import { BiLike } from "react-icons/bi";
import axios from "axios";

function Profile() {
	const { profile, token } = useSelector((state) => state?.auth);
	const router = useRouter();
	const dispatch = useDispatch();
	const [dataUser, setDataUser] = React.useState({});
	React.useEffect(() => {
		if (!token) {
			router.push("/login");
		}

		axios.get(`http://localhost:8000/users/${profile?.user_id}`).then((res) => setDataUser(res?.data?.result[0]));
	}, []);

	const handleLogOut = () => {
		dispatch({
			type: Type.REMOVE_AUTH,
		});

		router.push("/login");
	};

	return (
		<MainLayout>
			<div className={profileStyle.profileContain}>
				<div className={profileStyle.profileDesc}>
					<div className="text-center">
						<Image src={dataUser?.photo_profil ?? "/images/user.jpg"} alt="avatar" width={100} height={100} className={profileStyle.image} />
						<h3 className="mt-2">{dataUser?.name}</h3>
					</div>
				</div>

				<div className={profileStyle.profileMenu}>
					<Link href="/edit" passHref>
						<div className={profileStyle.menu}>
							<div className="row">
								<div className="col-1">
									<FiUser size={30} color="#EEC302" />
								</div>
								<div className="col-7">
									<p className="ps-3">Edit Profile</p>
								</div>
								<div className="col-4 text-end">
									<GrFormNext size={25} color="#979797" />
								</div>
							</div>
						</div>
					</Link>

					<Link href="/myrecipe" passHref>
						<div className={profileStyle.menu}>
							<div className="row">
								<div className="col-1">
									<FiAward size={30} color="#EEC302" />
								</div>
								<div className="col-7">
									<p className="ps-3">My Recipe</p>
								</div>
								<div className="col-4 text-end">
									<GrFormNext size={25} color="#979797" />
								</div>
							</div>
						</div>
					</Link>

					<div className={profileStyle.menu} onClick={() => router.push("/save")}>
						<div className="row">
							<div className="col-1">
								<FiBookmark size={30} color="#EEC302" />
							</div>
							<div className="col-7">
								<p className="ps-3">Saved Recipe</p>
							</div>
							<div className="col-4 text-end">
								<GrFormNext size={25} color="#979797" />
							</div>
						</div>
					</div>

					<div className={profileStyle.menu} onClick={() => router.push("/like")}>
						<div className="row">
							<div className="col-1">
								<BiLike size={30} color="#EEC302" />
							</div>
							<div className="col-7">
								<p className="ps-3">Liked Recipe</p>
							</div>
							<div className="col-4 text-end">
								<GrFormNext size={25} color="#979797" />
							</div>
						</div>
					</div>

					<div className={profileStyle.menu} onClick={handleLogOut}>
						<div className="row">
							<div className="col-1">
								<FiLogOut size={30} color="#EEC302" />
							</div>
							<div className="col-7">
								<p className="ps-3">Log Out</p>
							</div>
							<div className="col-4 text-end">
								<GrFormNext size={25} color="#979797" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
}

export default Profile;
