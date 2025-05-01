import { Anchor, Button, Checkbox, Group, PasswordInput, Radio, rem, TextInput } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconMail, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isConditionalExpression } from "typescript";
import { registerUser } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";

const form = {
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    accountType:"APPLICANT"

}

const SignUp = () =>{
    
    const [data, setData] = useState<{[key:string]:string}>(form);
    const [formError, setFormError] = useState<{[key:string]:string}>(form);
    const navigate = useNavigate();

    const handleChange=(event:any)=>{
        if(typeof(event)=="string"){
            setData({...data, accountType:event});
            return;
        }
        let name = event.target.name, value = event.target.value;
        setData({...data, [name]:value});
        setFormError({...formError, [name]:signupValidation(name, value)})
        if(name === "password" && data.confirmPassword!==""){
            let err="";
            if(data.confirmPassword!=value) err="Passwords donot match.";
            setFormError({...formError, [name]:signupValidation(name, value), confirmPassword:err})
        }
        if(name == "confirmPassword"){
            if(data.password != value) setFormError({...formError, [name]:"Passwords donot match."})
            else setFormError({...formError, confirmPassword:""})
        }
    }
    const handleSubmit = () =>{
        let valid = true, newFormError:{[key:string]:string}={};
        for(let key in data){
            if(key=="accountType")continue;
            if(key!=="confirmPassword") newFormError[key] = signupValidation(key, data[key]);
            else if(data[key]!=data["password"])newFormError[key]="passwords donot match."
            if(newFormError[key])valid= false;
        }
        setFormError(newFormError);
        
        if(valid===true){  
            registerUser(data).then((res)=>{
                console.log(res);
                setData(form);
                notifications.show({
                    title: 'Registered Successfully',
                    message: 'Redirecting to login page...',
                    withCloseButton: true,
                    icon: <IconCheck style={{width:"90%", height:"90%"}}/>,
                    color: 'teal',
                    withBorder: true,
                    className:"!border-green-500"
                  })
                  setTimeout(()=>{
                    navigate("/login");
                  }, 4000)
                
            }).catch((err)=>{
                console.log(err);
                notifications.show({
                    title: 'Registeration faliled',
                    message: err.response.data.errrorMessage,
                    withCloseButton: true,
                    icon: <IconX style={{width:"90%", height:"90%"}}/>,
                    color: 'red',
                    withBorder: true,
                    className:"!border-red-500"
                  })
            })
        }
    }

    return(
        <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
            <div className="text-2xl font-semibold">Create Account</div>
            <TextInput  
              value={data.name}
              error={formError.name}
              name="name"
              onChange={handleChange}
              label="Full Name" 
              placeholder="Your Name"
              withAsterisk
            />        
            <TextInput  
              value={data.email}
              error={formError.email}
              name="email"
              onChange={handleChange}
              leftSection={<IconMail style={{ width: rem(16), height: rem(16) }} />} 
              label="Email" 
              placeholder="Your email"
              withAsterisk
            />   
            <PasswordInput  
              value={data.password}
              error={formError.password}
              name="password"
              onChange={handleChange}
                leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                label="Password" 
                placeholder="Password"
                withAsterisk
            />     
            <PasswordInput  
              value={data.confirmPassword}
              name="confirmPassword"
              error={formError.confirmPassword}
              onChange={handleChange}
                leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                label="Confirm Password" 
                placeholder="Confirm Password"
                withAsterisk
            />  
            <Radio.Group
                value={data.accountType}
                
              onChange={handleChange}
                label="You are?"
                withAsterisk
                >
                <Group mt="xs">
                    <Radio className="py-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg" autoContrast value="APPLICANT" label="Applicant" />
                    <Radio className="py-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg"  autoContrast value="EMPLOYER" label="Employer" />
                </Group>
            </Radio.Group>
            <Checkbox
                label={<>I accept{` `}<Anchor>terms and Conditions.</Anchor>  </>}
                autoContrast
            />
            <Button onClick={handleSubmit} variant="filled" autoContrast>SignUp</Button>
            <div className="mx-auto">have an Account? <span onClick={()=>{navigate("/login"); setFormError(form); setData(form)}} className="text-bright-sun-400 hover:underline cursor-pointer">Login</span></div>
            </div>
    )
}
export default SignUp;