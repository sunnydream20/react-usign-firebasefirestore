import { Link, useLocation } from 'react-router-dom';

const mainMenus = [
  {
    name: 'Home',
    path: '/',
    icon: null,
    class: '',
    active: true,
  },
  {
    name: 'Screener',
    path: '/screener',
    icon: null,
    class: '',
    active: true,
  },
  {
    name: 'Favorites',
    path: '/favorites',
    class: 'circle',
    active: false,
  },
  {
    name: 'Portfolio',
    path: '/portfolio',
    class: 'circle red',
    active: false,
  },
  {
    name: 'Chart',
    path: '/chart',
    class: '',
    active: false,
  },
];

const mainMobileMenus = [
  ...mainMenus,
  {
    name: 'Contact',
    path: '/contact',
    icon: <></>,
    active: false,
  },
  {
    name: 'About',
    path: '/about',
    icon: <></>,
    active: false,
  },
];

const handleMenuAdjustments = () => {
  const favorites = JSON.parse(localStorage.getItem('favouriteItems')) || [];
  const hasFavorites = Array.isArray(favorites) && favorites.length > 0;

  // add purple dot on menu of favorites
  const menuFavorites = mainMenus.find((menu) => menu.name === 'Favorites');
  if (menuFavorites) menuFavorites.class = ['circle', hasFavorites ? 'purple-dot' : 'gray-dot'].join(' ');
};

const NavMobile = () => {
  const { pathname } = useLocation();

  return mainMobileMenus.map((menu) => (
    <Link key={menu.path} className={`flex items-center gap-1 ${pathname === menu.path && 'text-white'} ${menu.class}`} to={menu.path}>
      {menu.icon} {menu.name}
    </Link>
  ));
};

const NavDesktop = () => {
  const { pathname } = useLocation();
  handleMenuAdjustments();

  return (
    <nav className="flex gap-3 text-xl text-lightGrey2">
      {mainMenus.map((menu) => (
        <Link key={menu.path} className={`flex items-center ${pathname === menu.path && 'text-white'} ${menu.class}`} to={menu.path}>
          {menu.icon}
          {menu.name}
        </Link>
      ))}
    </nav>
  );
};

export { NavDesktop, NavMobile };
