'use client'
import styles from './AddUserComponent.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";

export default function AddUserComponent() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<any>();

    const onSubmit = handleSubmit(async (data) => {
        
      });

    return (
        <form onSubmit={onSubmit} className={styles.formBase}>
            <Image src={'/add-user.png'} alt='Icono para indicar un nuevo vendedor' width={80} height={80} />
            <p>Registrar Usuario</p>
            <input type="text" placeholder='Nombre de Usuario' {...register("name", { required: true, pattern: /^[A-Za-z ]+$/i })} />
            <input type="password" placeholder='Contraseña' {...register("phone", { required: true, pattern: /^[0-9]{0,20}/i })} />
            <input type="password" placeholder='Confirme Contraseña' {...register("address", { required: true })} />
            <div>
                <button id="formSubmit" type="submit" ><Link href='/user'>Cancelar</Link></button>
                <button id="formSubmit" type="submit" >Guardar</button>
            </div>
        </form>
    )
  }