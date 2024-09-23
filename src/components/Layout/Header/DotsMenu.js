import { Link } from "react-router-dom";
import IconDotsHorizontal from "../../../assets/icons/IconDotsHorizontal";
import TouchableWithoutFeedback from "./TouchableWithoutFeedback";

const dropDownMenus = [
	{
		name: "Contact",
		path: "/contact",
	},
	{
		name: "About",
		path: "/about",
	},
];

const DotsMenu = ({ isOpenMenuDropDown, setIsOpenMenuDropDown }) => {
	const handleToggle = () => setIsOpenMenuDropDown(!isOpenMenuDropDown)
	return (
		<button
			onClick={handleToggle}
			className="text-gray-400 bg-darkGrey flex items-center justify-center rounded-full"
		>
			<IconDotsHorizontal className="h-10 w-10 fill-lightGrey2" />
		</button>
	)
}

const OpenDotsDropdownMenu = ({ isOpenMenuDropDown, setIsOpenMenuDropDown }) => {
	return (
		isOpenMenuDropDown ? (
			<div className="absolute right-0 ">
				<div className="relative bg-neutral-50 text-black my-2 rounded-lg w-40 p-4 shadow flex flex-col whitespace-nowrap gap-2" id="dotsMenu">
					{dropDownMenus.map((menu) => (
						<Link to={menu.path} key={menu.path} className="z-50">
							{menu.name}
						</Link>
					))}
					<TouchableWithoutFeedback action={setIsOpenMenuDropDown} classes="-top-16 -right-32 md:-right-24" />
				</div>
			</div>
		) : null
	)
}

export { DotsMenu, OpenDotsDropdownMenu };
