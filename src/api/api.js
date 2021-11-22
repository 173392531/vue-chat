import { reqUrl } from '../content/content.js'
import { get, post} from './request.js'
export const collectDiscover = (params={})=>{
    return get(`${reqUrl}/discover/list`,params)
}
export const saveDiscover = (params = {})=>{
    return post(`${reqUrl}/discover/saveList`,params)
}
export const delDiscover = (params = {})=>{
    console.log('!!!params',params);
    return get(`${reqUrl}/discover/delete/?_id=${params}`)
}