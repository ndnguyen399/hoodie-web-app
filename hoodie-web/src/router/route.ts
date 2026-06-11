/**
 * @author duynguyen © 2025
 */
// ~/router/route.ts
import type { ComponentType } from 'react';

// Page Public hiện tại
import { GuestLayout, HomeLayout } from '../layouts';
import { Introduction } from '../components/Introduction';
import { ProductSearch as ProductSearchView } from '../components/ProductSearch/ProductSearch';
import { Register } from '../components/Register';
import { Login } from '../components/Login';
import { CategorySearch } from '../components/ManageCategory/CategorySearch';
import { CategoryRegistration } from '../components/ManageCategory/CategoryRegistration';
import { ProductSearch } from '../components/ManageProduct/ProductSearch';
import { ProductRegistration } from '../components/ManageProduct/ProductRegistration';

// Page Private
// import CategoryPage from '~/views/Category';
// import Profile from '~/views/Profile';

// Page Public khác
// import Home from '~/views/Home';
// import Login from '~/views/Login';
// import Register from '~/views/Register';
// import { AuthLayout } from '../layouts';

interface RouteItem {
  path: string;
  component: ComponentType;
  layout?: ComponentType<any> | null;
}

const PublicRoutes: RouteItem[] = [
  {
    path: '/',
    component: Introduction,
    layout: GuestLayout,
  },
  {
    path: '/product',
    component: ProductSearchView,
    layout: GuestLayout,
  },
  {
    path: '/sign-in',
    component: Login,
    layout: GuestLayout,
  },
  {
    path: '/sign-up',
    component: Register,
    layout: GuestLayout,
  },
];

const PrivateRoutes: RouteItem[] = [
  // {
  //   path: '/dashboard',
  //   component: Dashboard,
  //   layout: HomeLayout,
  // },
  // {
  //   path: '/profile',
  //   component: Profile,
  // },
  {
    path: '/manage-category-search',
    component: CategorySearch,
    layout: HomeLayout,
  },
  {
    path: '/manage-category-registration',
    component: CategoryRegistration,
    layout: HomeLayout,
  },
  {
    path: '/manage-product-search',
    component: ProductSearch,
    layout: HomeLayout,
  },
  {
    path: '/manage-product-registration',
    component: ProductRegistration,
    layout: HomeLayout,
  },
];

export { PublicRoutes, PrivateRoutes };