'use client'
import styles from './AddNoteComponent.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";

export default function AddNoteComponent() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<any>();

    const onSubmit = handleSubmit(async (data) => {
        
      });

    return (
        <form onSubmit={onSubmit} className={styles.formBase}>
            <Image src={'/add-post.png'} alt='Icono para indicar un nuevo vendedor' width={80} height={80} />
            <p>Nuevo Recordatorio</p>
            <input type="text" placeholder='Fecha' {...register("name", { required: true, pattern: /^[A-Za-z ]+$/i })} />
            <input type="text" placeholder='Detalle' {...register("phone", { required: true, pattern: /^[0-9]{0,20}/i })} />
            <input type="text" placeholder='Asignar Color' {...register("address", { required: true })} />
            <div>
                <button id="formSubmit" type="submit" ><Link href='/note'>Cancelar</Link></button>
                <button id="formSubmit" type="submit" >Guardar</button>
            </div>
        </form>
    )
  }