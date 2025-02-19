import { toast } from "sonner"

const succesToast = (msg) => {
    toast.success(msg, {
        className: "text-base"
    })
}
const errorToast = (msg) => {
    toast.error(msg, {
        className: "text-base"
    })
}
const infoToast = (msg) => {
    toast.info(msg, {
        className: "text-base"
    })
}

export { succesToast, errorToast, infoToast }