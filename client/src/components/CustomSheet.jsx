import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"


const CustomSheet = ({
    trigger = null,
    title = "Enter title",
    side = "right",
    children
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{trigger}</SheetTrigger>
            <SheetContent side={side} className="w-[400px] sm:!w-[540px] lg:!w-[640px]">
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                </SheetHeader>

                {children}
            </SheetContent>
        </Sheet>
    )
}

export default CustomSheet