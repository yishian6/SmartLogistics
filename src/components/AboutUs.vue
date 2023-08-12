<template>
    <div class="monitor">
        <div class="header">
            <div class="cart-name">
                <span><i class="iconfont icon-lianxiwomen"></i></span><span class="aboutus">联系我们</span>
            </div>
            <div class="recommend">
                <div class="rectitle">
                    <div class="subtitle">商务合作</div>
                    <div class="first"><i class="iconfont icon-24gl-phoneLoudspeaker"></i>&nbsp;&nbsp;电话: 025-83535982
                    </div>
                    <div class="second"><i class="iconfont icon-youxiang"></i>&nbsp;&nbsp;邮箱: lwz@njupt.edu.cn</div>
                </div>
                <div class="rectitle">
                    <div class="subtitle">问题反馈&建议意见</div>
                    <div class="first">
                        <i class="iconfont icon-24gl-phoneLoudspeaker"></i>&nbsp;&nbsp;电话: 025-83535982
                    </div>
                    <div class="second"><i class="iconfont icon-youxiang"></i>&nbsp;&nbsp;邮箱: lwz@njupt.edu.cn</div>
                </div>
                <div class="rectitle">
                    <div class="subtitle">详细地址</div>
                    <div class="first"><i class="iconfont icon-dizhi"></i>&nbsp;&nbsp;地址: 新模范马路66号三牌楼校区行政北楼三楼</div>
                    <div class="second"><i class="iconfont icon-gongsiyoubian"></i>&nbsp;&nbsp;邮编: 210003</div>
                </div>
                <div class="connect">
                    <a href="https://github.com/yishian6/SmartLogistics" target="_blank"><i
                            class="iconfont icon-github"></i></a>
                    <i class="iconfont icon-weixin"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.aboutus {
    font-size: 26px;
    /* color: darkslategrey; */
    margin-left: 10px;
}

.monitor {
    background: #F5F7F9;
    width: 50%;
    margin: 0 auto;
    user-select: text;
    font-family: "得意黑 斜体";
}

.header {
    background: #ffffff;
    border: 2px solid #E6E6E6;
    border-radius: 5px;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
}

.cart-name {
    width: 90%;
    height: 50px;
    border-bottom: 2px solid #E6E6E6;
    line-height: 42px;
    /* color: #5C5C5C; */
    font-weight: bold;
    margin-top: 20px;
    margin-left: 9%;
    /* color: rgb(172, 102, 102); */
}


.recommend {
    width: 90%;
    margin-top: 20px;
    margin-left: 15%;
    display: flex;
    flex-direction: column;
    justify-content: left;
    /* color: rgb(172, 102, 102); */
}

.rectitle {
    margin-bottom: 30px;
}

.subtitle {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 10px;
}

.first,
.second {
    font-size: 18px;
    margin-left: 10px;
}

.connect {
    width: 25%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

.iconfont {
    font-size: 22px;
}

.icon-lianxiwomen {
    font-size: 26px;
}

/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
    font-family: "得意黑 斜体";
    font-weight: 400;
    src: url("//at.alicdn.com/wf/webfont/k5toPbh6v3n4/0AFtulmIX1EO.woff2") format("woff2"),
        url("//at.alicdn.com/wf/webfont/k5toPbh6v3n4/AgdYdqTCHKJs.woff") format("woff");
    font-display: swap;
}
</style>