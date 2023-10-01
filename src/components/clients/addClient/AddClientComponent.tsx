'use client'
import { AddClient, AddClientRequest } from '@/models/AddClient';
import styles from './AddClientComponent.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { v4 as uuid } from 'uuid'
import toast, { Toaster } from 'react-hot-toast';
import { ONLY_NUMBERS_ON_STRING, ONLY_LETTERS_ON_STRING } from '@/models/RegexConsts';
import { useRouter } from 'next/navigation';
import { sleep } from '@/helper/sleepInMilli/Sleep';


export default function AddClientComponent() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<AddClient>();
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const dataValidated = converFormData(data);
            const response = await sendForm(dataValidated);
            if (response.status == 201) {
                reset();
                toast.success('Se ha guardado exitosamente el Cliente')
                await sleep(2000);
                router.replace(`/clients`)
            } else {
                toast.error('Ops... No se pudo guardar el Cliente')
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo guardar el Cliente')
        }
    }
    );

    function converFormData(data: AddClient): AddClientRequest {
        return {
            id: uuid(),
            name: data.name,
            phone: data.phone,
            address: data.address,
            description: data.description
        }
    }

    function sendForm(addClientRequest: AddClientRequest) {
        return fetch(process.env.apiUrl + '/v1/client/create', {
            method: 'POST',
            body: JSON.stringify(addClientRequest),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
    }

    return (
        <div onSubmit={onSubmit} className={styles.formBase}>
            <p>Nuevo Cliente</p>
            <div className={styles.data}>
                <input type="text" placeholder='Ingrese Apodo' {...register("name", { required: true, pattern: ONLY_LETTERS_ON_STRING })} />
                {errors.name && (errors.name.type === "required" || errors.name.type === "pattern") && (<span>Solo acepta letras y espacios</span>)}
                <input type="text" placeholder='Número de teléfono' {...register("phone", { required: true, pattern: ONLY_NUMBERS_ON_STRING, maxLength: 20 })} />
                {errors.phone && (errors.phone.type === "required" || errors.phone.type === "pattern") && (<span>Solo acepta números</span>)}
                {errors.phone && errors.phone.type === "maxLength" && (<span>Máximo de 20 dígitos</span>)}
                <input type="text" placeholder='Dirección' {...register("address", { required: true, maxLength: 50 })} />
                {errors.address && errors.address.type === "required" && (<span>La direccion es obligatoria</span>)}
                {errors.address && errors.address.type === "maxLength" && (<span>Máximo de 50 dígitos</span>)}
                <textarea placeholder='Descripción' className={styles.description} {...register("description", { required: true, maxLength: 100 })} />
                {errors.description && errors.description.type === "required" && (<span>La descripción es obligatoria</span>)}
                {errors.description && errors.description.type === "maxLength" && (<span>Máximo de 100 dígitos</span>)}
            </div>
            <div className={styles.linkBase}>
                <Link href='/clients'>Cancelar</Link>
                <button onClick={onSubmit} >Guardar</button>
            </div>
            <Toaster />
        </div>
    )
}