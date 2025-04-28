import { Button, TextInput } from "@mantine/core";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";

const CertiInput = (props:any) =>{
    const select = fields;
    const [issueDate, setIssueDate] = useState<Date | null>(new Date());
   return(
        <div className="flex flex-col gap-3">
            <div className="text-lg font-semibold">Add Certificate</div>
            <div className="flex gap-10 [&>*]:w-1/2">
                <TextInput
                    label="Title"
                    withAsterisk
                    placeholder="Enter Title"
                />
                <SelectInput {...select[1]}/>
            </div>
            <div className="flex gap-10 [&>*]:w-1/2">
                <MonthPickerInput
                    label="Issue date"
                    withAsterisk
                    maxDate={new Date()}
                    minDate={issueDate || undefined}
                    placeholder="Pick Date"
                    value={issueDate}
                    onChange={setIssueDate}
                />
                <TextInput
                    label="Certificate ID"
                    withAsterisk
                    placeholder="Enter Certificate ID"
                />
            </div>
            <div className="flex gap-5">
                <Button color="bright-sun.4" onClick={()=>props.setEdit(false)}>Save</Button>
                <Button color="red.7" onClick={()=>props.setEdit(false)} variant="light">Cancel</Button>
            </div>
        </div>
   )
}
export default CertiInput;