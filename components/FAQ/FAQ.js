import React, { useState } from "react";
import faqstyles from "../../styles/faq.module.scss";
const FAQ = ({ title, content }) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className={faqstyles.accordionItem}>
			<div
				className={faqstyles.accordionTitle}
				onClick={() => setIsActive(!isActive)}
			>
				<div>{title}</div>
			</div>
			{isActive && <div className={faqstyles.accordionContent}>{content}</div>}
		</div>
	);
};

export default FAQ;
