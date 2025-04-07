import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"


const DisplayDialog = ({
    trigger = null,
    heading = null,
    description = null,
    openState = null,
    setOpenstate = null,
    dialogClassName = "",
    children
}) => {

    const [open, setOpen] = useState(false)

    return (
        <Dialog open={openState || open} onOpenChange={setOpenstate || setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className={dialogClassName}>
                {
                    heading && 
                    <DialogHeader>
                        <DialogTitle>{heading}</DialogTitle>
                        {
                            description &&
                            <DialogDescription>{description}</DialogDescription>
                        }
                    </DialogHeader>
                }
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default DisplayDialog