import http from "@/utils/http.js";

/**
 * @description:获取Index页面数据
 * @param:
 * @returns 
 */
export function getIndexInfoAPI() {
    return http({
        url: '/index',
        method: 'GET'
    })
}