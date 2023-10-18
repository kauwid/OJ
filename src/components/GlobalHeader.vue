<template>
  <div class="menu-demo">
    <!--
    mode ： 菜单的模式
    theme：菜单的主题
    default-selected-keys：默认选中的菜单项 key 数组
       -->

    <a-row class="grid-demo" align="center" :wrap="false">
      <a-col flex="auto">
        <a-menu
          mode="horizontal"
          theme="dark"
          :selected-keys="selectedKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '50px' }"
            disabled
          >
            <div class="title-bar">
              <img class="logo" src="../assets/google_logo.svg" />
            </div>
          </a-menu-item>

          <a-menu-item v-for="item in visibleRoutes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="100px">
        <a-avatar imageUrl="" :size="64"
          >{{ store.state.user?.loginUser?.username ?? "未登录" }}
        </a-avatar>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { routes } from "@/router/routers";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/CheckAccess";
import accessEnum from "@/access/AccessEnum";

const router = useRouter();
const store = useStore();
const loginUser = store.state.user.loginUser;

// 展示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item) => {
    // hideInMenu: true  表示隐藏，false表示不隐藏
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单项,使用全局的权限配置，如果有权限，则显示，没有权限，则不显示
    if (!checkAccess(loginUser, item?.meta?.access as string)) {
      return false;
    }
    return true;
  });
});

const selectedKeys = ref(["/"]);
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
// store.dispatch("user/getLoginUser", {
//   username: "法外狂徒",
//   role: accessEnum.ADMIN,
// });
</script>
<style scoped>
.logo {
  height: 50px;
}

.grid-demo {
  background-color: #232324;
}
</style>
