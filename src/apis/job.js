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


/**
 * @description:获取岗位推荐数据
 * @param:id: 岗位id
 * @returns 
 */

export const getJobRecommendAPI = (id) => {
    return http({
        url: '/job/recommend',
        method: 'POST',
        data: {
            id
        }
    })
}

/**
 * @description:薪水地区统计接口
 * @param:
 * @returns 
 */

export const getJobCountAPI = () => {
    return http({
        url: '/job/count',
        method: 'GET'
    })
}

/**
 * @description:获取岗位推荐数据
 * @param:job_reqiure: 岗位需求
 * @returns 
 */
export const getJobSmartRecAPI = (job_require) => {
    return http({
        url: "/job/smart/recommend",
        method: 'GET',
        params: { job_require }
    })
}

/**
 * @description:申请岗位
 * @param:job_id: 岗位id
 * @param:job_id: 用户id
 * @returns 
 */
export const postJobApplicationAPI = (job_id) => {
    return http({
        url: '/job/position/apply',
        method: 'POST',
        data: {
            job_id
        }
    })
}