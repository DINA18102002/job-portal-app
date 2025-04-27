import { ActionIcon } from "@mantine/core";
import { IconAdjustments, IconBookmark, IconExternalLink } from "@tabler/icons-react";


const CompanyCard = (props:any) =>{
    return(
        <div className="flex justify-between bg-mine-shaft-900 items-center rounded-lg p-4">
                <div className="flex gap-2 items-center">
                <div className="p-2 bg-mine-shaft-800 rounded-md">
                  <img className="h-7" src={`/Icons/${props.name}.png`} alt="" />
                </div>
                    <div className="flex flex-col">
                        <div className="font-semibold text-lg">{props.name}</div>
                        <div className="text-xs text-mine-shaft-300 font-semibold">{props.employees} Employees</div>
                    </div>
                </div>
                <ActionIcon color="bright-sun.4" variant="subtle" aria-label="settings">
                    <IconExternalLink style={{width:'70%', height:'70%'}} stroke={1.5}/>
                </ActionIcon>
            </div>
    )
}
export default CompanyCard;