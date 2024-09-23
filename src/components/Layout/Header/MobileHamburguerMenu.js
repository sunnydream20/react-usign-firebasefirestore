import IconMenu from "../../../assets/icons/IconMenu";
import LanguageSelector from "./LanguageSelector";
import { NavMobile } from "./Nav";
import TouchableWithoutFeedback from "./TouchableWithoutFeedback";

const HamburguerMenu = ({ setIsOpenSidebarMenu }) => (
    <div className="flex flex-row items-center">
        <button
            onClick={setIsOpenSidebarMenu}
            className="text-lightGrey1"
        >
            <IconMenu className="h-8 w-8 ml-0 md:-ml-1" />
        </button>
    </div>
)

const OpenMobileMenu = ({ isOpenSidebarMenu, setIsOpenSidebarMenu, ...rest }) => {
    return isOpenSidebarMenu && (
        <div className="relative" {...rest}>
            <div className="w-full flex items-center justify-center absolute bg-black z-20 pb-3">
                <div className="w-first md:w-second pb-4 shadow-lg flex flex-col gap-4 text-xl text-lightGrey2">
                    <NavMobile />
                    <LanguageSelector />
                </div>
            </div>
            <TouchableWithoutFeedback action={setIsOpenSidebarMenu} classes="top-0" />
        </div>
    )
}

export { HamburguerMenu, OpenMobileMenu };
