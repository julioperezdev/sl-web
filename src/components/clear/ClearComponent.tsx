'use client'
import styles from './ClearComponent.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";

export default function ClearComponent() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<any>();

    const onSubmit = handleSubmit(async (data) => {

    });

    return (
        <div onSubmit={onSubmit} className={styles.formBase}>
            <Image src={'/trash.png'} alt='Icono para indicar un nuevo vendedor' width={80} height={80} />
            <p>Borrar Datos</p>
            <div>
                <input type="text" placeholder='Confirme Usuario' {...register("name", { required: true, pattern: /^[A-Za-z ]+$/i })} />
                <input type="text" placeholder='Confirme Contraseña' {...register("phone", { required: true, pattern: /^[0-9]{0,20}/i })} />
            </div>
            <div className={styles.buttonBase}>
                <button><Link href='/'>Cancelar</Link></button>
                <button>Guardar</button>
            </div>
        </div>
    )
}