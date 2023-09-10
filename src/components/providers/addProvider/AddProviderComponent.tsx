'use client'
import styles from './AddProviderComponent.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";

export default function AddProviderComponent() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<any>();

    const onSubmit = handleSubmit(async (data) => {
        
      });

    return (
        <form onSubmit={onSubmit} className={styles.formBase}>
            <Image src={'/sellerNew.png'} alt='Icono para indicar un nuevo vendedor' width={80} height={80} />
            <p>Nuevo Proveedor</p>
            <input type="text" placeholder='Ingrese Apodo' {...register("name", { required: true, pattern: /^[A-Za-z ]+$/i })} />
            <input type="text" placeholder='Número de teléfono' {...register("phone", { required: true, pattern: /^[0-9]{0,20}/i })} />
            <input type="text" placeholder='Dirección' {...register("address", { required: true })} />
            <div>
                <button id="formSubmit" type="submit" ><Link href='/provider'>Cancelar</Link></button>
                <button id="formSubmit" type="submit" >Guardar</button>
            </div>
        </form>
    )
  }