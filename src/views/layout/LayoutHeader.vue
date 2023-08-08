<template>
    <div class="sidebar" style="background-color:rgb(228, 143, 137)">
        <div class="container">
            <el-menu class="sidebar-el-menu" :default-active="router.path" :collapse="collapse"
                background-color="rgb(228, 143, 137)" text-color="#fff" active-text-color="#FFCC99" mode="horizontal"
                router>
                <template v-for="item in items" :key="item.index">
                    <template v-if="item.subs">
                        <el-sub-menu :index="item.index" :key="item.index">
                            <template #title>
                                <i :class="item.icon"></i><span>{{ item.title }}</span>
                            </template>
                            <template v-for="subItem in item.subs">
                                <el-sub-menu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                    <template #title>{{ subItem.title }}</template>
                                    <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                        {{ threeItem.title }}
                                    </el-menu-item>
                                </el-sub-menu>
                                <el-menu-item v-else :index="subItem.index" :key="subItem.index + 1">
                                    {{ subItem.title }}
                                </el-menu-item>
                            </template>
                        </el-sub-menu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.index">
                            <i :class="item.icon"></i>{{ item.title }}
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </div>
    </div>
</template>



<script setup>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
const collapse = ref(false)
const router = useRoute()
const items = reactive([
    {
        title: '首页',
        index: 'index',
    },
    {
        title: '岗位招聘',
        index: 'job',
    },
    {
        title: '新闻传递',
        index: 'news',
    },
    {
        title: '联系我们',
        index: 'aboutus',
    },
    {
        title: '个人中心',
        index: 'center',
    }
])

</script>
<style scoped>
.el-menu {
    display: flex;
    justify-content: space-around;
}

.el-menu-item {
    margin-left: 7.5%;
    font-size: 20px;
}

.el-menu-item.is-active {
    border-bottom: 0px;
}

.container {
    width: 81.26%;
    margin-left: 30px;
}
</style>