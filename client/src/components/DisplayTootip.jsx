import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from './ui/tooltip'

const DisplayTootip = ({tooltipText = "do something", trigger = null}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {trigger}
                </TooltipTrigger>
                <TooltipContent className="bg-secondary dark:bg-primary dark:text-white">
                    <p>{tooltipText}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default DisplayTootip