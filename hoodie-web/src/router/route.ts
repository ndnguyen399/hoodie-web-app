// ~/router/route.ts

import type { ComponentType } from 'react';

// Page Public hiện tại
import { GuestLayout } from '../layouts';   // Layout dành cho khách (không đăng nhập, trang giới thiệu)
import { Introduction } from '../components/Introduction';
import { ProductSearch } from '../components/ProductSearch/ProductSearch';

// Page Private (bỏ comment khi cần)
// import CategoryPage from '~/views/Category';
// import Profile from '~/views/Profile';

// Page Public khác (sau này)
// import Home from '~/views/Home';
// import Login from '~/views/Login';
// import Register from '~/views/Register';
// import { AuthLayout } from '../layouts'; // nếu có layout riêng cho login/register

interface RouteItem {
  path: string;
  component: ComponentType;
  layout?: ComponentType<any> | null; // null = không layout, undefined = dùng default trong App.tsx
}

const PublicRoutes: RouteItem[] = [
  {
    path: '/',
    component: Introduction,
    layout: GuestLayout,               // ← Quan trọng: dùng GuestLayout cho trang giới thiệu
  },
  {
    path: '/product',
    component: ProductSearch,
    layout: GuestLayout,               // ← Quan trọng: dùng GuestLayout cho trang giới thiệu
  },
  // Ví dụ sau này:
  // {
  //   path: '/login',
  //   component: Login,
  //   layout: null,                    // không layout nào cả (full screen login)
  // },
  // {
  //   path: '/register',
  //   component: Register,
  //   layout: null,
  // },
];

const PrivateRoutes: RouteItem[] = [
  // {
  //   path: '/dashboard',
  //   component: Dashboard,
  //   layout: HomeLayout,              // dùng layout có header, sidebar...
  // },
  // {
  //   path: '/profile',
  //   component: Profile,
  // },
];

export { PublicRoutes, PrivateRoutes };