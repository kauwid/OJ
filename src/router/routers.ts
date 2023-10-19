import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import AdminView from "@/views/AdminView.vue";
import ErrorView from "@/views/ErrorView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AccessEnum from "@/access/AccessEnum";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      // access: AccessEnum.ADMIN,
      hideInMenu: true,
    },
  },
  {
    path: "/",
    name: "题目浏览",
    component: HomeView,
  },
  {
    path: "/about",
    name: "个人中心",
    component: AboutView,
  },
  {
    path: "/admin",
    name: "管理员",
    component: AdminView,
    meta: {
      access: AccessEnum.ADMIN,
      // hideInMenu: true,
    },
  },
  {
    path: "/error",
    name: "无权限",
    component: ErrorView,
  },
];
