import { Anchor, Button, Checkbox, PasswordInput, rem, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../Services/UserService";

const form = {
    email:"",
    password:""

}

const Login = () =>{
    const [data, setData] = useState(form);

    const handleChange=(event:any)=>{
        setData({...data, [event.target.name]:event.target.value});
    }
    const handleSubmit = () =>{
        loginUser(data).then((res)=>{
            console.log(res);
        }).catch((err)=>console.log(err.response.data));
    }
    return(
        <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
            <div className="text-2xl font-semibold">Create Account</div>
                  
            <TextInput   
              value={data.email}
              name="email"
              onChange={handleChange}
              leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />} 
              label="Email" 
              placeholder="Your email"
              withAsterisk
            />   
            <PasswordInput
              value={data.password}
              name="password"
              onChange={handleChange}
                leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                label="Password" 
                placeholder="Password"
                withAsterisk
            />     
              
            <Button onClick={handleSubmit} variant="filled" autoContrast>Login</Button>
            <div className="mx-auto">Don't have an Account? <Link to="/signup" className="text-bright-sun-400 hover:underline">SignUp</Link></div>
            </div>
    )
}
export default Login;