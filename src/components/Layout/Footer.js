import { Link } from 'react-router-dom';
import IconFacebook from '../../assets/icons/IconFacebook';
import IconLinkedin from '../../assets/icons/IconLinkedin';
import IconThreads from '../../assets/icons/IconThreads';
import IconTwitter from '../../assets/icons/IconTwitter';

const footerMenus = [
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Contact',
    path: '/contact',
  },
  {
    name: 'Cookie Policy',
    path: '/cookie-policy',
  },
  {
    name: 'Privacy Policy',
    path: '/privacy-policy',
  },
  {
    name: 'Terms of Use',
    path: '/terms-of-use',
  },
];

const footerSocials = [
  {
    url: 'https://facebook.com',
    icon: <IconFacebook />,
  },
  {
    url: 'https://twitter.com',
    icon: <IconTwitter />,
  },
  {
    url: 'https://www.threads.net',
    icon: <IconThreads />,
  },
  {
    url: 'https://linkedin.com',
    icon: <IconLinkedin />,
  },
];

const Footer = () => {
  return (
    <footer className="bg-black text-gray-200 w-full ">
      <div className="max-w-[1072px] xl:max-w-[1422px] w-full mx-auto py-10 px-4 flex justify-center flex-col items-center gap-6 ">
        <ul className="inline-flex gap-4 md:gap-8 flex-wrap justify-center">
          {footerMenus.map((menu) => (
            <li key={menu.path}>
              <Link to={menu.path} className="hover:text-gray-400">
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="inline-flex gap-8">
          {footerSocials.map((menu) => (
            <li key={menu.url}>
              <a href={menu.url} target="_blank" className="text-white hover:text-gray-400" rel="noreferrer">
                {menu.icon}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-white text-center">© {new Date().getFullYear()} SomeCompany, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
