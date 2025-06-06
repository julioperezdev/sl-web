'use client'
import { ONLY_LETTERS_ON_STRING, ONLY_NUMBERS_ON_STRING } from '@/models/RegexConsts';
import styles from './AddProviderComponent.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { ONE_SECOUND, sleep } from '@/helper/sleepInMilli/Sleep';
import { v4 as uuid } from 'uuid'
import toast, { Toaster } from 'react-hot-toast';
import { AddProviderRequest } from '@/models/ProviderModel';

export default function AddProviderComponent() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<AddProviderRequest>();
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const dataValidated = converFormData(data);
            const response = await sendForm(dataValidated);
            if (response.status == 201) {
                reset();
                toast.success('Se ha guardado exitosamente el Proveedor', { duration: 5000 })
                await sleep(ONE_SECOUND);
                router.replace(`/provider`)
            } else {
                toast.error('Ops... No se pudo guardar el Proveedor', { duration: 5000 })
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo guardar el Proveedor', { duration: 5000 })
        }
    }
    );

    function converFormData(data: AddProviderRequest): AddProviderRequest {
        return {
            id: uuid(),
            name: data.name,
            phone: data.phone,
            address: data.address
        }
    }

    function sendForm(addProviderRequest: AddProviderRequest) {
        return fetch(`${process.env.apiUrl}/v1/provider/create`, {
            method: 'PUT',
            body: JSON.stringify(addProviderRequest),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
    }

    return (
        <div className={styles.formBase}>
            <p>Nuevo Proveedor</p>
            <div className={styles.formData}>
                <input type="text" placeholder='Ingrese Apodo' {...register("name", { required: true, pattern: ONLY_LETTERS_ON_STRING })} />
                {errors.name && (errors.name.type === "required" || errors.name.type === "pattern") && (<span>Solo acepta letras y espacios</span>)}
                <input type="text" placeholder='Número de teléfono' {...register("phone", { required: true, pattern: ONLY_NUMBERS_ON_STRING, maxLength: 20 })} />
                {errors.phone && (errors.phone.type === "required" || errors.phone.type === "pattern") && (<span>Solo acepta números</span>)}
                {errors.phone && errors.phone.type === "maxLength" && (<span>Máximo de 20 dígitos</span>)}
                <input type="text" placeholder='Dirección' {...register("address", { required: true, maxLength: 50 })} />
                {errors.address && errors.address.type === "required" && (<span>La direccion es obligatoria</span>)}
                {errors.address && errors.address.type === "maxLength" && (<span>Máximo de 50 dígitos</span>)}
            </div>
            <div>
                <button ><Link href='/provider'>Atras</Link></button>
                <button onClick={onSubmit} >Guardar</button>
            </div>
            <Toaster 
            position="bottom-left"
            reverseOrder={false}/>
        </div>
    )
}