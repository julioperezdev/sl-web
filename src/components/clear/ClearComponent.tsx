'use client'
import styles from './ClearComponent.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'

export default function ClearComponent() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<any>();

    const onClickClear = () => {
        Swal.fire({
            text: `Esta a punto de borrar los datos, 
            presiones “Si” para continuar y 
            “No” para cancelar.`,
            showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
            confirmButtonColor: '#FB0000',
            cancelButtonColor: '#008CFF',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Borrado', '', 'success')
            }
        })
    }

    const onSubmit = handleSubmit(async (data) => {

    });

    return (
        <div onSubmit={onSubmit} className={styles.formBase}>
            <Image src={'/trash.png'} alt='Icono para indicar un nuevo vendedor' width={80} height={80} />
            <p>Borrar Datos</p>
            <div>
                <p className={styles.descriptionOver}>Confirme Usuario</p>
                <input type="text" placeholder='Confirme Usuario' {...register("name", { required: true, pattern: /^[A-Za-z ]+$/i })} />
                <p className={styles.descriptionOver}>Confirme Contraseña</p>
                <input type="password" placeholder='Confirme Contraseña' {...register("phone", { required: true, pattern: /^[0-9]{0,20}/i })} />
            </div>
            <div className={styles.buttonBase}>
                <button><Link href='/'>Cancelar</Link></button>
                <button onClick={onClickClear}>Guardar</button>
            </div>
        </div>
    )
}