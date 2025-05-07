import UserStore from "@/stores/UserStore"
import { errorToast, succesToast } from "../toastNotification"
import api from "./axios"


const apiHandler = async (route, data = {}, showToast = false) => {
    const accessToken = UserStore.getState().accessToken || null
    try {
        let options = {
            url: route.url,
            method: route.method,
            data: data,
            ...(accessToken && {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        }

        let result = await api(options)
        const response = result?.data

        if (showToast) succesToast(response?.message || "Action success")

        return response?.data

    } catch (error) {
        console.log(error)
        const message = error?.response?.data?.message
        if(message){
            errorToast(message)
        }
        else{
            errorToast("An error occurred, please try again later")
        }

        if (error?.redirect && (error?.config?.url == "/api/v1/public/refresh" && !error?.config?.url.includes("/public"))) {
            window.location.href = "/auth/login"
            return false
        }
        return false
    }
}

export default apiHandler