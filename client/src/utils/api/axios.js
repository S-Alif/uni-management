import axios from "axios"
import { baseUrl } from "./apiConstants"

const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true
})

let isRefreshing = false
let refreshSubscribers = []

const onRefreshed = () => {
    refreshSubscribers.forEach(cb => cb())
    refreshSubscribers = []
}

api.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error?.config
        if(!originalRequest) return

        if(error?.response?.status == 401 && !originalRequest?._retry){
            if(isRefreshing){
                return new Promise(resolve => {
                    refreshSubscribers.push(() => {
                        resolve(api(originalRequest))
                    })
                })
            }

            originalRequest._retry = true
            isRefreshing = true

            try{
                let result = await api.post("/refresh")

                // save the accesstoken in state

                isRefreshing = false
                onRefreshed()

                return api(originalRequest)
            }
            catch(err){
                isRefreshing = false
                refreshSubscribers = []
                return Promise.reject(err)
            }
        }
        return Promise.reject(error)
    }
)

export default api