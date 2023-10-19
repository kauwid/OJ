<template>
  <a-row
    id="globalHead"
    style="margin-bottom: 16px"
    align="center"
    :wrap="false"
  >
    <a-col flex="auto">
      <!--通用不固定-->
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="menuItemClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <!-- 这是一个logo-->
          <div id="title-bar">
            <img class="logo" src="@/assets/google_logo.svg" alt="logo" />
          </div>
        </a-menu-item>
        <!--菜单栏-->
        <a-menu-item v-for="item in menuRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <!--    显示最右侧用户是否登录-->
    <a-col flex="100px">
      <a-space size="large">
        <a-dropdown
          @select="handleSelect"
          :popup-max-height="false"
          trigger="hover"
          v-if="store.state.user?.loginUser?.userAvatar !== ''"
        >
          <a-avatar :imageUrl="store.state.user?.loginUser?.userAvatar">
            {{ store.state.user?.loginUser?.userAvatar }}
          </a-avatar>
          <template #content>
            <a-doption>个人中心</a-doption>
            <a-doption>退出登录</a-doption>
          </template>
        </a-dropdown>
        <div class="userName">
          {{ store.state.user?.loginUser?.userName }}
        </div>
        <!-- 如果用户没有登录点击 触发事件回调跳转到登录-->
        <a-avatar
          style="margin-right: 30px"
          @click="
            (event) => {
              router.push('/user/login');
            }
          "
          v-if="store.state.user?.loginUser?.userAccount === ''"
        >
          点击登录
        </a-avatar>
      </a-space>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { routes } from "@/router/routers";
import { useStore } from "vuex";
import checkAccess from "@/access/CheckAccess";
import { Message } from "@arco-design/web-vue";
// import { Notification } from "@arco-design/web-vue";
const router = useRouter();
const store = useStore();
console.log(store);
// 默认选中的菜单项
const selectedKeys = ref(["/"]);

// 下拉菜单选中事件
const handleSelect = async (key: string) => {
  if (key === "退出登录") {
    // 清空登录用户信息
    await store.dispatch("user/logout");
    // 路由到登录页面
    await router.push({
      path: "/user/login",
    });
  } else {
    // todo
    Message.warning("正在开发中!");
  }
};
// 从路由中过滤出不需要隐藏的菜单项，使用计算属性，当路由发生变化时，自动更新菜单项
const menuRoutes = computed(() => {
  return routes.filter((item) => {
    // true表示不隐藏，false表示隐藏 因为过滤出来的菜单项是需要显示的，所以默认为true
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单项,使用全局的权限配置，如果有权限，则显示，没有权限，则不显示
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

// 菜单项点击事件
const menuItemClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
#title-bar {
  display: flex;
  align-items: center;
}

#title-bar .logo {
  height: 48px;
}

.userName {
  font-size: 16px;
  /*向左移动一点*/
  margin-right: 20px;
  white-space: nowrap;
  font-weight: bold; /*字体加粗*/
}

#title-bar .title {
  margin-left: 10px;
  color: #18191c;
}
</style>
