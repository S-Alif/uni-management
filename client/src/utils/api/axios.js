import axios from "axios"
import { baseUrl } from "./apiConstants"
import UserStore from "@/stores/UserStore"

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
                let result = await api.post("/api/v1/public/refresh")
                console.log(result)

                // save the accesstoken in state
                UserStore.getState().setAccessToken(result.data.accessToken)

                originalRequest.headers["Authorization"] = "Bearer " + result.data.accessToken

                isRefreshing = false
                onRefreshed()

                return api(originalRequest)
            }
            catch(err){
                console.log(err)
                UserStore.getState().logout()
                isRefreshing = false
                refreshSubscribers = []
                window.location.href = window.location.host + "/auth/login"
                return Promise.reject(err)
            }
        }
        return Promise.reject(error)
    }
)

export default api