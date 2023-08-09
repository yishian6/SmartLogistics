import http from "@/utils/http";


/**
 * @description:获取岗位页面数据
 * @param:batch_size: 表示岗位数量
 * @param:batch_num:表示岗位页数
 * @returns 
 */
export const getJobListAPI = (batch_size = 5, batch_num = 1) => {
    return http({
        url: '/job/index',
        method: 'GET',
        params: { batch_size, batch_num }
    })
}



/**
 * @description:获取岗位高级查询数据
 * @param:job_name: 表示岗位名称
 * @param:company_type: 表示公司类型
 * @param:location: 表示地理位置
 * @param:main_business: 表示主要业务
 * @param:batch_size: 表示岗位数量
 * @param:batch_num:表示岗位页数
 * @returns 
 */

export const getJobExploreAPI = (job_name = '', company_type = '', location = '', main_business = '', batch_size = 5, batch_num = 1) => {
    return http({
        url: '/job/explore',
        method: "POST",
        data: {
            job_name, company_type, location, main_business, batch_size, batch_num
        }
    })
}