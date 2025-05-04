import { ActionIcon, Button, Divider, TagsInput, Textarea } from "@mantine/core";
import { IconBriefcase, IconDeviceFloppy, IconMapPin, IconPencil, IconPlus } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useEffect, useState } from "react";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import ExpInput from "./ExpInput";
import CertiInput from "./CertiInput";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../Services/ProfileService";
import Info from "./Info";
import { setProfile } from "../Slices/ProfileSlice";

const Profile = (props:any) =>{
    const dispatch = useDispatch();
    const select = fields;
    const user = useSelector((state:any)=>state.user);
    const profile = useSelector((state:any)=>state.profile);
    const [edit, setEdit] = useState([false, false, false, false, false]);
    const  [about, setAbout] = useState(props.about);
    const [skills, setSkills] = useState(props.skills);
    const [addExp, setAddExp] = useState(false);
    const [addCerti, setAddCerti] = useState(false);
    const handleEdit = (index:any)=>{
        const newEdit = [...edit];
        newEdit[index] = !newEdit[index];
        setEdit(newEdit);
    }
    useEffect(()=>{
        getProfile(user.id).then((data:any)=>{
            dispatch(setProfile(data));
        }).catch((error:any)=>{
            console.log(error);
        })
    },[])
    return(
        <div className="w-4/5 mx-auto">
            <div className="relative">
                <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
                <img className="h-48 w-48 rounded-full -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8" src="/avatar.png" alt="" />
            </div>
            <div className="px-3 mt-16 pt-10">
                <Info/>
                </div>
            <Divider mx="xs" my="xl"/>
            <div className="px-3">
                <div className="text-2xl font-semibold mb-3 flex justify-between">About <ActionIcon onClick={()=>handleEdit(1)} size="lg" color="bright-sun.4" variant="subtle" > 
                        {edit[1]?<IconDeviceFloppy className="h-4/5 w-4/5"/>:<IconPencil className="h-4/5 w-4/5"/> }
                    </ActionIcon> </div>
                    {
                            edit[1]? <Textarea
                            value={about}
                            autosize
                            minRows={3}
                            placeholder="Enter about yoursel..."
                            onChange={(event) => setAbout(event.currentTarget.value)}
                        /> : 
                                <div className="text-sm text-mine-shaft-300 text-justify">
                        {profile?.about}
                        </div>
                    }
                        
    
                
            </div>
            <Divider mx="xs" my="xl"/>
            <div className="px-3">
                <div className="text-2xl font-semibold mb-3 flex justify-between">Skills <ActionIcon onClick={()=>handleEdit(2)} size="lg" color="bright-sun.4" variant="subtle" > 
                        {edit[2]?<IconDeviceFloppy className="h-4/5 w-4/5"/>:<IconPencil className="h-4/5 w-4/5"/> }
                    </ActionIcon> </div>
                        {
                            edit[2]? <TagsInput
                            placeholder="Add skill"
                            value={skills}
                            onChange={setSkills}
                            splitChars={[',',' ', ', ']}
                        /> : 
                        <div className="flex flex-wrap gap-2">
                        {
                            profile?.skills?.map((skill:any, index:number) => <div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">{skill}</div>)
                        }
                    </div>
                        }
                    
                
            </div>
            <Divider mx="xs" my="xl"/>
            <div className="px-3 ">
                <div className="text-2xl font-semibold mb-5 flex justify-between">Experience <div className="flex gap-2"> <ActionIcon onClick={()=>setAddExp(true)} size="lg" color="bright-sun.4" variant="subtle" > 
                    <IconPlus className="h-4/5 w-4/5"/> 
                    </ActionIcon>  <ActionIcon onClick={()=>handleEdit(3)} size="lg" color="bright-sun.4" variant="subtle" > 
                        {edit[3]?<IconDeviceFloppy className="h-4/5 w-4/5"/>:<IconPencil className="h-4/5 w-4/5"/> }
                    </ActionIcon> </div> </div>

                <div className="flex flex-col gap-8">
                    {
                        profile?.experience?.map((exp:any, index:number) => <ExpCard key={index} {...exp} edit={edit[3]}/>)
                    }
                    {addExp && <ExpInput add setAddExp={props.setAddExp}/>}
                </div>
            </div>
            <Divider mx="xs" my="xl"/>
            <div className="px-3 ">
                <div className="text-2xl font-semibold mb-5 flex justify-between">Certifications <div className="flex gap-2"> <ActionIcon onClick={()=>setAddCerti(true)} size="lg" color="bright-sun.4" variant="subtle" > 
                    <IconPlus className="h-4/5 w-4/5"/> 
                    </ActionIcon>  <ActionIcon onClick={()=>handleEdit(4)} size="lg" color="bright-sun.4" variant="subtle" > 
                        {edit[4]?<IconDeviceFloppy className="h-4/5 w-4/5"/>:<IconPencil className="h-4/5 w-4/5"/> }
                    </ActionIcon> </div> </div>
                <div className="flex flex-col gap-8">
                    {
                        profile?.certifications?.map((certi:any, index:number) => <CertiCard key={index} edit={edit[4]} {...certi}/>)
                    }
                    {
                        addCerti && <CertiInput setAddCerti={setAddCerti}/>
                    }
                </div>
            </div>
        </div>
    );
}
export default Profile;