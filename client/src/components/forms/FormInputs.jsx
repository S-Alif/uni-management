import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../ui/input-otp"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"



const FormInputs = ({
    form,
    fieldType = "text",
    fieldData
}) => {
    // console.log("fieldData", fieldData)
    return (
        <FormField
            control={form.control}
            name={fieldData?.name || "noName"}
            render={({field}) => (
                <FormItem className="mb-5">
                    <FormLabel className="text-base">{fieldData?.label || "No name"}</FormLabel>

                    {/* select fields */}
                    {
                        fieldType === "select" &&
                        <Select
                            onValueChange={field?.onChange}
                            defaultValue={field.value}
                            className="capitalize"
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={fieldData?.placeholder || "Select something"} />
                                </SelectTrigger>
                            </FormControl>

                            <SelectContent>
                                {
                                    fieldData?.selectItems &&
                                    fieldData?.selectItems.length > 0 &&
                                    fieldData?.selectItems.map((e, index) => {
                                        return (
                                            <SelectItem
                                                value={e?._id}
                                                key={index}
                                                className="hover:cursor-pointer hover:!bg-primary hover:!text-white"
                                            >
                                                {e?.name}
                                            </SelectItem>
                                        )
                                    })
                                }
                            </SelectContent>

                        </Select>
                    }

                    {/* textarea */}
                    {
                        fieldType === "textarea" &&
                        <FormControl>
                            <Textarea placeholder={fieldData?.placeholder || "Write something"} {...field} />
                        </FormControl>
                    }

                    {/* input fields */}
                    {
                        (fieldType !== "select" && 
                        fieldType !== "textarea" && 
                        fieldType !== "richText" && 
                        fieldType !== "otp" && fieldType !== "file") &&
                        <FormControl>
                            <Input type={fieldType} placeholder={fieldData?.placeholder || "Write something"} {...field} />
                        </FormControl>
                    }

                    {
                        fieldType == "file" &&
                        <FormControl>
                            <Input
                                type="file"
                                placeholder={fieldData?.placeholder || "Write something"}
                                onChange={(e) => {
                                    const file = e?.target?.files[0]
                                    if(!file) return
                                    field.onChange(file)

                                    const reader = new FileReader()
                                    reader.onload = () => {
                                        const dataUrl = reader.result
                                        if(fieldData?.setFile){
                                            fieldData?.setFile(dataUrl)
                                        }
                                    }
                                    reader.readAsDataURL(file)
                                }}
                            />
                        </FormControl>
                    }

                    {/* input otp */}
                    {
                        fieldType == "otp" &&
                        <FormControl>
                            <InputOTP maxLength={6} {...field} className="max-w-fit">
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </FormControl>
                    }
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default FormInputs