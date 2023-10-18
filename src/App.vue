<template>
  <div id="app">
    <BasicLayout></BasicLayout>
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import AccessEnum from "@/access/AccessEnum";
import { onMounted } from "vue";

const router = useRouter();
const store = useStore();

/**
 * 全局初始化函数，有全局单次调用的代码，都可以写到这里
 */
/**
 * 全局初始化函数，有只需要执行一次的操作，可以放在这里
 */
const doinit = () => {
  // 初始化用户信息
  /*store.dispatch("user/initUser");
  // 初始化题目信息
  store.dispatch("problem/initProblem");
  // 初始化提交信息
  store.dispatch("submit/initSubmit");
  // 初始化比赛信息
  store.dispatch("contest/initContest");
  // 初始化比赛提交信息
  store.dispatch("contestSubmit/initContestSubmit");
  // 初始化比赛题目信息
  store.dispatch("contestProblem/initContestProblem");
  // 初始化比赛用户信息
  store.dispatch("contestUser/initContestUser");
  // 初始化比赛排名信息
  store.dispatch("contestRank/initContestRank");
  // 初始化比赛状态信息
  store.dispatch("contestStatus/initContestStatus");
  // 初始化比赛状态信息
  store.dispatch("contestClarification/initContestClarification");*/
};
// 使用钩子函数触发
onMounted(() => {
  doinit();
});

// 主要看这里，在路由跳转之前会进行监听

router.beforeEach((to, from, next) => {
  // 判断当前点击的组件是否加了权限
  if (to.meta.access === AccessEnum.ADMIN) {
    // 获取当前登录用户的角色信息，判断是否有权限访问该页面
    if (store.state.user?.loginUser?.role !== "admin") {
      next({ path: "/error" });
      return;
    }
    next();
    return;
  } else {
    next();
    return;
  }
});
</script>
