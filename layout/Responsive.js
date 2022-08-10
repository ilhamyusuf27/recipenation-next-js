import React from "react";
import responsiveStyle from "../styles/responsive.module.scss";

function Responsive(props) {
	return (
		<>
			<div className={responsiveStyle.responsiveContainer}>
				<div className={responsiveStyle.responsiveContain}>{props.children}</div>
			</div>
		</>
	);
}

export default Responsive;
