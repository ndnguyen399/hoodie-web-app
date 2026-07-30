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
import { Cart } from '../components/Cart';
import ProfileLayout from '../layouts/ProfileLayout';
import { Checkout } from '../components/Checkout';
import { PaymentSuccess } from '../components/PaymentSuccess';
import { ProductDetail } from '../components/ProductDetail';
import { Profile } from '../components/Profile';
import { OrderDetail } from '../components/OrderDetail';
import { OrderSearch } from '../components/ManageOrder/OrderSeach';
import { VoucherSearch } from '../components/ManageVoucher/VoucherSearch';
import { VoucherRegistration } from '../components/ManageVoucher/VoucherRegistration';

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
    component: ProductSearchView,
    // component: Introduction,
    layout: GuestLayout,
  },
  // {
  //   path: '/product',
  //   component: ProductSearchView,
  //   layout: GuestLayout,
  // },
  {
    path: '/product/detail',
    component: ProductDetail,
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
  {
    path: '/user/product/view-detail',
    component: OrderDetail,
    layout: ProfileLayout,
  },
  {
    path: '/user/profile',
    component: Profile,
    layout: ProfileLayout,
  },
  {
    path: '/cart',
    component: Cart,
    layout: ProfileLayout,
  },
  {
    path: '/checkout',
    component: Checkout,
    layout: ProfileLayout,
  },
  {
    path: '/payment/success',
    component: Cart,
    layout: PaymentSuccess,
  },
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
  {
    path: '/manage-order-search',
    component: OrderSearch,
    layout: HomeLayout,
  },
  {
    path: '/manage-voucher-search',
    component: VoucherSearch,
    layout: HomeLayout,
  },
  {
    path: '/manage-voucher-registration',
    component: VoucherRegistration,
    layout: HomeLayout,
  },
];

export { PublicRoutes, PrivateRoutes };