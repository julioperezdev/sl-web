'use client'
import { AddDifference } from '@/models/AddDifference';
import styles from './UpdateDifferenceComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";

export default function UpdateDifferenceComponent() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<AddDifference>();

    return (
        <div className={styles.formBase}>
            <Image src={'/clipboard.png'} alt='Icono para indicar una nueva diferencia' width={80} height={80} />
            <p>Modificar Diferencia</p>
            <div>
                <input type="text" placeholder='Fecha' {...register("date", { required: true })} />
                <input type="text" placeholder='Apodo Cliente' {...register("name", { required: true })} />
                <input type="text" placeholder='Faltante / Sobrante' {...register("differenceType", { required: true })} />
                <input type="text" placeholder='Importe' {...register("amount", { required: true })} />
            </div>
            <textarea placeholder='Detalle Inconveniente' className={styles.description} {...register("description", { required: true })} />
            <div>
                <button id="formSubmit" type="submit" ><Link href='/clients/difference'>Cancelar</Link></button>
                <button id="formSubmit" type="submit" >Guardar</button>
            </div>
        </div>
    )
}