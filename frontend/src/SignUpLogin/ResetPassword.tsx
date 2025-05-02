import { Button, Modal, PasswordInput, PinInput, TextInput } from "@mantine/core";
import { IconLock, IconMail } from "@tabler/icons-react";
import { useState } from "react";
import { sendOtp, verifyOtp } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";

const ResetPassword = (props:any) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [passErr, setPassErr] = useState("")
    const [otpSent, setOtpSent] = useState(false)
    const [otpSending, setOtpSending] = useState(false)
    const [verified, setverified] = useState(false)

    const handleSendOtp = ()=>{
        setOtpSending(true);
        sendOtp(email).then((res)=>{
            console.log(res);
            setOtpSent(true);
            setOtpSending(false);
        }).catch((err)=>{
            console.log(err);
            setOtpSending(false);
        })
    }

    const handleVerifyOTP = (otp:string) =>{
        verifyOtp(email, otp).then((res)=>{
            console.log(res);
            setverified(true);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const resendOtp = () =>{

    }

    const changeEmail = () =>{
        setOtpSent(false);
    }

    return(
        <Modal opened={props.opened} onClose={props.close} title="Reset Password">
            <div className="flex flex-col gap-6">
                <TextInput value={email} onChange={(e)=>setEmail(e.target.value)} 
                    leftSection={<IconMail size={16}/> } 
                    label="Email" 
                    withAsterisk
                    placeholder="Your Email"
                    rightSection={<Button size="xs" className="mr-1" loading={otpSending} onClick={handleSendOtp} autoContrast variant="filled" disabled={email==="" || otpSent} >Login</Button>}
                    rightSectionWidth="xl"
                    />
                {
                    otpSent && <PinInput onComplete={handleVerifyOTP} length={6} className="mx-auto" size="md" gap="lg" type="number" />
                }
                
                {
                    otpSent && !verified &&
                    <div className="flex gap-2">
                        <Button fullWidth color="bright-sun.4" loading={otpSending} onClick={resendOtp} autoContrast variant="light" >Resend</Button>
                        <Button fullWidth color="bright-sun.4" onClick={changeEmail} autoContrast variant="filled" >Change Email</Button>
                    </div>
                }
                {verified && (
                  <PasswordInput
                    value={password}
                    error={passErr}
                    name="password"
                    onChange={(e)=>{setPassword(e.target.value); setPassErr(signupValidation("password", e.target.value))}}
                    leftSection={<IconLock size={16} />}
                    label="Password"
                    withAsterisk
                    placeholder="Password"
                  />
                )}
                {
                    verified && <Button onClick={()=>{props.changePass(email, password)}} autoContrast variant="filled" >Change Password</Button>
                }

            </div>
        </Modal>
    )
}
export default ResetPassword;