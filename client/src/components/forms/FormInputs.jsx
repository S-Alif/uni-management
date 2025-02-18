import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
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
                        (fieldType !== "select" && fieldType !== "richText") &&
                        <FormControl>
                            <Input type={fieldType} placeholder={fieldData?.placeholder || "Write something"} className="h-12" {...field} />
                        </FormControl>
                    }
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default FormInputs