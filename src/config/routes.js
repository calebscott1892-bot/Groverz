import SiteLayout from '@/components/layout/SiteLayout';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';

export const defaultPageKey = 'Home';

export const pageRegistry = {
  About: AboutPage,
  Contact: ContactPage,
  Home: HomePage,
  Services: ServicesPage,
};

export function getPagePath(pageKey) {
  return pageKey === defaultPageKey ? '/' : `/${pageKey}`;
}

export const pageRoutes = [
  { path: '/', pageKey: 'Home', Component: HomePage },
  { path: '/About', pageKey: 'About', Component: AboutPage },
  { path: '/Services', pageKey: 'Services', Component: ServicesPage },
  { path: '/Contact', pageKey: 'Contact', Component: ContactPage },
];

export const redirectRoutes = [{ path: '/Home', to: '/' }];

export { SiteLayout };
