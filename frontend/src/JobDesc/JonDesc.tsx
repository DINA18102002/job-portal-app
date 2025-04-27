import {  Button, Divider } from "@mantine/core";
import { ActionIcon } from '@mantine/core';
import { IconAdjustments, IconBookmark, IconMapPin } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { card, desc, skills } from "../Data/JobDescData";
//@ts-ignore
import DOMPurify from 'dompurify';

const JobDesc = () =>{
    const data = DOMPurify.sanitize(desc);
    return(
        <div className="w-3/4">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-3 bg-mine-shaft-800 rounded-xl">
                        <img className="h-14 " src={`/Icons/Google.png`} alt="" />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-semibold text-2xl">Software Engineer</div>
                        <div className="text-lg text-mine-shaft-300">Google &bull; 3 days ago &bull; 48 Applicants</div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <Link to="/apply-job">
                        <Button color="bright-sun.4" size="sm" variant="light" >Apply</Button>
                    </Link>
                    <IconBookmark className="text-bright-sun-400 cursor-pointer"/>
                </div>
            </div>
            <div className="flex justify-between mt-5">
                {
                    card.map((item:any, index:any) =><div key={index} className="flex flex-col items-center gap-1">
                        <ActionIcon color="bright-sun.4" className="!h-12 !w-12" variant="light" radius="xl" aria-label="Settings">
                          <item.icon className="h-4/5 w-4/5" stroke={1.5} />
                        </ActionIcon>
                        <div className="text-mine-shaft-300 text-sm">{item.name}</div>
                        <div className="font-semibold ">{item.value}</div>
                </div>)
                }
                
            </div>
            
            <Divider my="xl"/>
            <div>
                <div className="text-xl font-semibold mb-5">Required Skills</div>
                <div className="flex flex-wrap gap-2">
                    {
                        skills.map((item:any, index:any) => <ActionIcon key={index} color="bright-sun.4" className="!h-fit !w-fit !font-medium !text-sm" variant="light" p='xs' radius="xl" aria-label="Settings">
                        {item}
                      </ActionIcon>)
                    }
                </div>
            </div>
            <Divider my="xl"/>
            <div className="[&_h4]:text-xl [&_h4]:my-5 [&_h4]:font-semibold [&_*]:text-mine-shaft-300 [&_li]:marker:text-bright-sun-400 [&_li]:mb-1 [&_h4]:text-mine-shaft-200 [&_p]:text-justify " dangerouslySetInnerHTML={{__html:data}}>

            </div>
            <Divider my="xl"/>
            <div>
            <div className="text-xl font-semibold mb-5">About Company</div>
            <div className="flex justify-between mb-3">
                <div className="flex gap-2 items-center">
                    <div className="p-3 bg-mine-shaft-800 rounded-xl">
                        <img className="h-8 " src={`/Icons/Google.png`} alt="" />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-semibold text-lg">Google</div>
                        <div className=" text-mine-shaft-300">10k+ Employees</div>
                    </div>
                </div>
                    <Link to="/company">
                        <Button color="bright-sun.4" size="sm" variant="light" >Company Page</Button>
                    </Link>
                
            </div>
            <div className="text-mine-shaft-300 text-justify">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit cumque, expedita vitae ipsa illo, debitis unde voluptas inventore dignissimos nesciunt impedit aliquid a veniam nostrum minima obcaecati consequatur minus quae quasi nemo. Ducimus beatae excepturi expedita asperiores incidunt magni ipsam?</div>
            </div>
        </div>
    );
}
export default JobDesc;