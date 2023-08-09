import http from "@/utils/http";

/**
 * @description:获取新闻页面数据
 * @param:news_type: 表示新闻种类
 * @param:batch_size: 表示新闻数量
 * @param:batch_num:表示新闻页数
 * @returns 
 */

export const getNewInfoAPI = (news_type, batch_size = 8, batch_num = 1) => {
    return http({
        url: '/news/index',
        method: "GET",
        params: {
            news_type, batch_size, batch_num
        }
    })
}


/**
 * @description:获取新闻高级查询数据
 * @param:news_type: 表示新闻种类
 * @param:batch_size: 表示新闻数量
 * @param:batch_num:表示新闻页数
 * @returns 
 */

export const getNewExploreAPI = (news_type, title = '', source_org = '', batch_size = 8, batch_num = 1) => {
    return http({
        url: '/news/explore',
        method: "POST",
        data: {
            news_type, title, source_org, batch_size, batch_num
        }
    })
}