import { ClassNames } from "@emotion/react";
import { IconAnchor , IconBell, IconSettings } from '@tabler/icons-react';
import { Indicator, Avatar } from '@mantine/core';
import NavLinks from "./NavLinks";

function Header(){
    return(
        <div className="w-full bg-mine-shaft-950 h-20 text-white flex justify-between px-6 items-center font-['poppins']">
            <div className="flex gap-3 items-center text-bright-sun-400">
                <IconAnchor className="h-8 w-8" stroke={2.5} />
                <div className="text-3xl font-semibold">JobHook</div>
            </div>
            <NavLinks/>
            <div className="flex gap-5 items-center">
                <div className="flex items-center gap-2">
                    <div>Karthyk</div>
                    <Avatar src="avatar.jpg" alt="it's me" />
                </div>
                <div className="bg-mine-shaft-900 p-1.5 rounded-full">
                <Indicator color="bright-sun.5" offset={6} size={8} processing>
                    <IconBell stroke={1.5} />
                </Indicator>

                </div>
                <div className="bg-mine-shaft-900 p-1.5 rounded-full">
                    <IconSettings stroke={1.5} />
                </div>
                
            </div>
        </div>
    );
    
}
export default Header;