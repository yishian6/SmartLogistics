import http from "@/utils/http";


/**
 * @description:获取岗位页面数据
 * @param:batch_size: 表示岗位数量
 * @param:batch_num:表示岗位页数
 * @returns 
 */
export const getJobListAPI = (batch_size = 8, batch_num = 1) => {
    return http({
        url: '/job/index',
        method: 'GET',
        params: { batch_size, batch_num }
    })
}