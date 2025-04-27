import { Anchor, Button, Checkbox, PasswordInput, rem, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const SignUp = () =>{
    return(
        <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
            <div className="text-2xl font-semibold">Create Account</div>
            <TextInput  
              label="Full Name" 
              placeholder="Your Name"
              withAsterisk
            />        
            <TextInput 
              leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />} 
              label="Email" 
              placeholder="Your email"
              withAsterisk
            />   
            <PasswordInput
                leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                label="Password" 
                placeholder="Password"
                withAsterisk
            />     
            <PasswordInput
                leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                label="Confirm Password" 
                placeholder="Confirm Password"
                withAsterisk
            />  
            <Checkbox
                label={<>I accept{` `}<Anchor>terms and Conditions.</Anchor>  </>}
                autoContrast
            />
            <Button variant="filled" autoContrast>SignUp</Button>
            <div className="mx-auto">have an Account? <Link to="/login" className="text-bright-sun-400 hover:underline">Login</Link></div>
            </div>
    )
}
export default SignUp;