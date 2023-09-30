'use client'
import styles from './LoginFormComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";

export default function LoginFormComponent() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<any>();

    const onSubmit = handleSubmit(async (data) => {
        
      });

    return (
        <form onSubmit={onSubmit} className={styles.formBase}>
            <Image src={'/SL-logo-transparent.png'} alt='Icono para indicar login' width={80} height={80} />
            <input type="text" placeholder='Nombre de Usuario' {...register("name", { required: true, pattern: /^[A-Za-z ]+$/i })} />
            <input type="text" placeholder='Contraseña' {...register("phone", { required: true, pattern: /^[0-9]{0,20}/i })} />
            {/* <button id="formSubmit" type="submit" >Entrar</button> */}
            <Link href={'/'}>Entrar</Link>
        </form>
    )
}