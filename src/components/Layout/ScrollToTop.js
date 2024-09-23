import _ from 'lodash';
import { useEffect, useState } from "react";
import IconChevronUp from "../../assets/icons/IconChevronUp";

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false)

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};

	useEffect(() => {
		const toggleVisibility = () => setIsVisible(window.pageYOffset > 500 ? true : false)
		window.addEventListener("scroll", _.debounce(toggleVisibility, 100));

		return () => window.removeEventListener("scroll", toggleVisibility);
	}, [])

	return (
		<button className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-lightGrey fixed bottom-3 right-3 flex items-center justify-center" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity ease-out 0.2s' }} onClick={scrollToTop}>
			<IconChevronUp color="#404040" className="absolute w-4 h-4 md:w-6 md:h-6 mb-1" />
		</button>
	)
}

export default ScrollToTop;