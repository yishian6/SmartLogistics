<template>
    <div class="topbar">
        <div class="container">
            <div class="logo"><span class="name">智邮</span>
                <img src="@/assets/images/nanyou.jpg" class="schimg" alt="">
                <img src="@/assets/images/zhiyou.png" class="logoimg" alt="">
            </div>
            <span class="applet">小程序<img src="@/assets/images/Top-two.png" class="right" alt=""></span>
        </div>
    </div>
</template>

<style scoped>
.topbar {
    margin-top: 10px;
    box-sizing: border-box;
    height: 100px;
    font-size: 22px;
    background-color: #fff;
}

.container {
    display: flex;
    justify-content: space-between;
    width: 80.26%;
    margin: 0 auto;
}

.logo {
    display: flex;
    align-items: center;
    font: 800;
    font-size: 30px;
}

.name {
    margin-right: 20px;
    font-size: 40px;
    font-family: "微软雅黑", "宋体", "黑体", Arial;
    color: rgb(223, 173, 175);
}

.logoimg {
    width: 100px;
    padding-top: 10px;
}

.schimg {
    width: 70px;
    padding-top: 10px;
}

.applet {
    display: flex;
    align-items: center;
    color: rgb(223, 173, 175);
    padding-right: 2px;
}

.right {
    margin-top: 8px;
    margin-left: 10px;
}
</style>