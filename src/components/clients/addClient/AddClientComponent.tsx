'use client'
import { AddClient } from '@/models/AddClient';
import styles from './AddClientComponent.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";


export default function AddClientComponent() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<AddClient>();

    const onSubmit = handleSubmit(async (data) => {
        // const dataValidated = converFormData(data);
        // const response = await sendForm(dataValidated);
        // if (response.ok) {
        //   reset();
        //   toast.success('¡Nos comunicaremos con usted lo antes posible!')
        // } else {
        //   toast.error('Ops... vuelve enviar el formulario mas tarde')
        // }
      });

    return (
        <form onSubmit={onSubmit} className={styles.formBase}>
            <Image src={'/add-user.png'} alt='Icono para indicar un nuevo cliente' width={80} height={80} />
            <p>Nuevo Cliente</p>
            <input type="text" placeholder='Ingrese Apodo' {...register("name", { required: true, pattern: /^[A-Za-z ]+$/i })} />
            <input type="text" placeholder='Número de teléfono' {...register("phone", { required: true, pattern: /^[0-9]{0,20}/i })} />
            <input type="text" placeholder='Dirección' {...register("address", { required: true })} />
            <textarea placeholder='Descripción' className={styles.description} {...register("description", { required: true })} />
            <div>
                <button id="formSubmit" type="submit" ><Link href='/clients'>Cancelar</Link></button>
                <button id="formSubmit" type="submit" >Guardar</button>
            </div>
        </form>
    )
}