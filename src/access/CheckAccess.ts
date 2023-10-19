import AccessEnum from "@/access/AccessEnum";

/**
 * 检查是否有权限（检查当前登录的用户是否具有某些权限）
 * @param loginUser 当前登录用户
 * @param needAccess 页面需要的权限
 * @returns boolean 是否有权限
 */
const checkAccess = (loginUser: any, needAccess = AccessEnum.NOT_LOGIN) => {
  // 如果用户未登录，那么用户只能访问不需要登录就能访问的页面
  const loginUserAccess = loginUser?.UserRole ?? AccessEnum.NOT_LOGIN;
  if (needAccess === AccessEnum.NOT_LOGIN) {
    return true;
  }
  // 此页面只有用户登录了才能访问
  if (needAccess === AccessEnum.USER) {
    // 如果用户未登录，那么用户不能访问需要登录才能访问的页面
    if (loginUserAccess === AccessEnum.NOT_LOGIN) {
      return false;
    }
  }
  // 此页面只有管理员才能访问
  if (needAccess === AccessEnum.ADMIN) {
    // 用户虽然登录了，但是不是管理员，那么用户不能访问需要管理员才能访问的页面
    if (loginUserAccess !== AccessEnum.ADMIN) {
      return false;
    }
  }
  return true;
};
export default checkAccess;
