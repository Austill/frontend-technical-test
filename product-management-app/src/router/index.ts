import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAuthStore } from "../stores/auth";
import LoginPage from "../pages/login/LoginPage.vue";
import ProductsPage from "../pages/products/ProductsPage.vue";
import ProductDetailsPage from "../pages/products/ProductPage.vue";
import AddProductPage from "../pages/products/NewProductPage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: { guestOnly: true },
  },
  {
    path: "/",
    redirect: "/products",
  },
  {
    path: "/products",
    name: "products",
    component: ProductsPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/products/new",
    name: "product-new",
    component: AddProductPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/products/:id",
    name: "product-details",
    component: ProductDetailsPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const auth = useAuthStore();
  if (!auth.accessToken) auth.restoreSession();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({ name: "login" });
  }
  if (to.meta.guestOnly && auth.isAuthenticated) {
    return next({ name: "products" });
  }
  next();
});

export default router;
