
import { Button, Checkbox, Textarea } from "@mantine/core";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { useState } from "react";
import { MonthPicker, MonthPickerInput } from "@mantine/dates";

const ExpInput = (props:any) =>{
    const select = fields;
    const [desc, setDesc] = useState("");
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [checked, setChecked] = useState(false);
    return(
        <div className="flex flex-col gap-3">
            <div className="text-lg font-semibold">{props.add ?"Add":"Edit"} experience</div>
            <div className="flex gap-10 [&>*]:w-1/2">
                <SelectInput {...select[0]}/>
                <SelectInput {...select[1]}/>
            </div>
                <SelectInput {...select[2]}/>
                <Textarea
                    value={desc}
                    autosize
                    withAsterisk
                    label="Job summary"
                    minRows={3}
                    placeholder="Enter Summary..."
                    onChange={(event) => setDesc(event.currentTarget.value)}
                />
            
            <div className="flex gap-10 [&>*]:w-1/2">
                <MonthPickerInput
                    label="Start date"
                    withAsterisk
                    maxDate={endDate || undefined}
                    placeholder="Pick Date"
                    value={startDate}
                    onChange={setStartDate}
                />
                <MonthPickerInput
                    label="End date"
                    disabled={checked}
                    withAsterisk
                    maxDate={new Date()}
                    minDate={startDate || undefined}
                    placeholder="Pick Date"
                    value={endDate}
                    onChange={setEndDate}
                />
            </div>      
                <Checkbox 
                    autoContrast
                    label="currently i'm working here"
                    checked={checked}
                    onChange={(event)=>setChecked(event.currentTarget.checked)}
                    />
                <div className="flex gap-5">
                    <Button color="bright-sun.4" onClick={()=>props.setEdit(false)}>Save</Button>
                    <Button color="red.7" onClick={()=>props.setEdit(false)} variant="light">Cancel</Button>
                </div>
        </div>
    );
}
export default ExpInput;