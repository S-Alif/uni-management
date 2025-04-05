import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Form } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormInputs from './FormInputs'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

const FormLayout = ({
    formId = "give-a-form-id",
    onSubmit,
    formSchema,
    formFields = [],
    defaultValues,
    buttonClass = "",
    buttonText = "do something",
    resetForm = false,
    disabled = false
}) => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    })

    // reset form
    useEffect(() => {
        if(resetForm) form.reset(defaultValues)
    }, [resetForm])

    return (
        <div className="w-auto h-auto" id={`${formId}-form`}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {
                        formFields.length > 0 &&
                        formFields.map((field, index) => (
                            <FormInputs form={form} fieldType={field?.type} fieldData={field} key={index} />
                        ))
                    }
                    <Button 
                        type="submit"
                        size="lg"
                        className={cn("text-base", buttonClass)}
                        disabled={disabled}
                    >
                        {buttonText}
                        {disabled && <span className="ml-3 animate-spin w-6 h-6 border-4 rounded-t-full rounded-b-full border-l-transparent border-r-transparent border-white"></span>}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default FormLayout