import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"


const DisplayDialog = ({
    trigger = null,
    heading = null,
    description = null,
    children
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
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