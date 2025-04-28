import { ActionIcon, Button, Divider } from "@mantine/core";
import { IconBriefcase, IconDeviceFloppy, IconMapPin, IconPencil } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useState } from "react";
import SelectInput from "./SelectInput";
import { fields } from "../Data/PostJob";




const Profile = (props:any) =>{
    const select = fields;
    const [edit, setEdit] = useState([false, false, false, false, false]);
    const handleEdit = (index:any)=>{
        const newEdit = [...edit];
        newEdit[index] = !newEdit[index];
        setEdit(newEdit);
    }
    return(
        <div className="w-4/5 mx-auto">
            <div className="relative">
                <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
                <img className="h-48 w-48 rounded-full -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8" src="/avatar.png" alt="" />
            </div>
            <div className="px-3 mt-16 pt-10">
                <div className="text-3xl font-semibold flex justify-between">{props.name} 
                    <ActionIcon onClick={()=>handleEdit(0)} size="lg" color="bright-sun.4" variant="subtle" > 
                        {edit[0]?<IconDeviceFloppy className="h-4/5 w-4/5"/>:<IconPencil className="h-4/5 w-4/5"/> }
                    </ActionIcon> </div>
                
                    <div className="flex gap-10 [&>*]:w-1/2">
                        <SelectInput {...select[0]}/>
                        <SelectInput {...select[1]}/>
                    </div>
                    <div className="flex gap-10 [&>*]:w-1/2">
                        <SelectInput {...select[4]}/>
                    </div>

                <div className="text-xl flex gap-1 items-center"><IconBriefcase className="h-5 w-5" stroke={1.5}/>{props.role} &bull; {props.company}</div>
                <div className="text-lg flex gap-1 items-center text-mine-shaft-300"><IconMapPin className="h-5 w-5" stroke={1.5}/>{props.location}</div>
            
            </div>
            <Divider mx="xs" my="xl"/>
            <div className="px-3">
                <div className="text-2xl font-semibold mb-3">About</div>
                <div className="text-sm text-mine-shaft-300 text-justify">
                {props.about}
                </div>
            </div>
            <Divider mx="xs" my="xl"/>
            <div className="px-3">
                <div className="text-2xl font-semibold mb-3">Skills</div>
                <div className="flex flex-wrap gap-2">
                    {
                        props.skills.map((skill:any, index:any) => <div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">{skill}</div>)
                    }
                </div>
            </div>
            <Divider mx="xs" my="xl"/>
            <div className="px-3 ">
                <div className="text-2xl font-semibold mb-5">Experience</div>
                <div className="flex flex-col gap-8">
                    {
                        props.experience.map((exp:any, index:any) => <ExpCard key={index} {...exp}/>)
                    }
                </div>
            </div>
            <Divider mx="xs" my="xl"/>
            <div className="px-3 ">
                <div className="text-2xl font-semibold mb-5">Certifications</div>
                <div className="flex flex-col gap-8">
                    {
                        props.certifications.map((certi:any, index:any) => <CertiCard key={index} {...certi}/>)
                    }
                </div>
            </div>
        </div>
    );
}
export default Profile;