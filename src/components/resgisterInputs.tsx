import {
    Button,
    Input
} from "@nextui-org/react";
import {useState, FormEvent} from 'react';
import {Select, SelectItem} from "@nextui-org/react";
import Swal from "sweetalert2";
import { createUserSchema } from "@/schemas/schemas";
import { createUserType } from "@/dto/users";
import { useRouter } from "next/navigation";
import { json } from "node:stream/consumers";

const RegisterInputs=()=>{
    
    const [formData, setFormData] = useState<createUserType>({
        username: '',
        name: '',
        password: '',
        lastname: '',
        rol:0
    });
    const[cpassword,setCpassword]=useState<String>('')
    
    const router = useRouter()


    async function sendData() {
        if(formData.password!==cpassword){
            Swal.fire(
            'No coinciden las contraseñas',
            'Verifique sus datos',
            'error'
            )
            return
        }
        let datos;
        const res = await fetch('http://localhost:3005/users/create',{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(formData),
         }).then(response => response.json()).then(data => datos=data)
        console.log(res);
         if (res.err) {
            // This will activate the closest `error.js` Error Boundary
            // throw new Error('Failed to fetch data')
            Swal.fire(
            'Registro de usuario fallido!',
            res.err,
            'error'
            )
        }else{
            localStorage.setItem('token',res.token)
            Swal.fire(
            'Creación de usuario exitoso!',
            '',
            'success'
            ).then(function(){router.push("/")})
        }
        
        return
    }

    const handleChange = (e:any) => {
        if(e.target.name=='rol'){
            setFormData({ ...formData, [e.target.name]: Number(e.target.value)});
        }else{
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleChangeConfirm = (e:any) => {
        setCpassword(e.target.value);
    };
    
    const rol=[{value:0,label:'Lector'}, {value:1,label:'Escritor'}]

    return <>
        <div className='flex flex-col justify-center mx-7 w-full gap-4'>
            <div className="flex flex-wrap gap-4  md:gap-2 md:flex-nowrap">
                <Input className="border-2 border-sky-600 rounded-[13px]" type='text' name="name" radius = {"md"} placeholder='Nombres' onChange={handleChange} isRequired />
                <Input className="border-2 border-sky-600 rounded-[13px]" type='text' name="lastname" placeholder='Apellidos' onChange={handleChange} isRequired />
            </div>
            <Input className=" mr-8 border-2 border-sky-600 rounded-[13px]" type='text' name="username" radius = {"md"} placeholder='Usuario' onChange={handleChange} isRequired />
            <Input className=" mr-8 border-2 border-sky-600 rounded-[13px]" type='password' name="password" placeholder='Contraseña' onChange={handleChange} isRequired />
            <Input className=" mr-8 border-2 border-sky-600 rounded-[13px]" type='password' name="cpassword" placeholder='Confirmar contraseña' onChange={handleChangeConfirm} isRequired />
            <Select 
                label="Seleccione el rol" 
                name='rol'
                className="border-2 border-sky-600 rounded-[13px]"
                onChange={handleChange} 
            >
                {rol.map((rol) => (
                <SelectItem key={rol.value} value={rol.value}>
                    {rol.label}
                </SelectItem>
                ))}
            </Select>
            <div className='flex justify-center'>
                <Button className='content-center my-4' onClick={sendData} color='primary'>Registrarse</Button>
            </div>
        </div>
    </>

}

export default RegisterInputs;