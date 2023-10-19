// 路由跳转之前拦截
import router from "@/router";
import store from "@/store";
import AccessEnum from "@/access/AccessEnum";
import checkAccess from "@/access/CheckAccess";

router.beforeEach(async (to, from, next) => {
  // console.log("登陆用户信息1", store.state.user.loginUser);
  //debugger;
  let loginUser = store.state.user.loginUser;
  // // 如果之前没登陆过，自动登录
  if (!loginUser || !loginUser.userRole) {
    // 加 await 是为了等用户登录成功之后，再执行后续的代码
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }
  const needAccess = (to.meta?.access as string) ?? AccessEnum.NOT_LOGIN;
  // 要跳转的页面需要登陆后才能访问
  if (needAccess !== AccessEnum.NOT_LOGIN) {
    // 如果没登陆，跳转到登录页面
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === AccessEnum.NOT_LOGIN
    ) {
      // next(`/user/login?redirect=${to.fullPath}`);
      next(`/error`);
      return;
    }
    // 如果已经登陆了，但是权限不足，那么跳转到无权限页面，需要的权限是admin，但是用户不是admin返回false
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
