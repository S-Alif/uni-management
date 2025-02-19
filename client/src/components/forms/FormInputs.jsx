import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../ui/input-otp"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"



const FormInputs = ({
    form,
    fieldType = "text",
    fieldData
}) => {
    return (
        <FormField
            control={form.control}
            name={fieldData?.name || "noName"}
            render={({field}) => (
                <FormItem className="mb-5">
                    <FormLabel className="text-xl">{fieldData?.label || "No name"}</FormLabel>

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
                                    fieldData?.map((e, index) => (
                                        <SelectItem
                                            value={e?._id}
                                            key={index}
                                            className="hover:cursor-pointer hover:!bg-primary hover:!text-white"
                                        >

                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>

                        </Select>
                    }

                    {/* input fields */}
                    {
                        (fieldType !== "select" && fieldType !== "richText" && fieldType !== "otp") &&
                        <FormControl>
                            <Input type={fieldType} placeholder={fieldData?.placeholder || "Write something"} className="h-12" {...field} />
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