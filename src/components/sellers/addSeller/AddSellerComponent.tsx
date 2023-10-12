'use client'
import styles from './AddSellerComponent.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { v4 as uuid } from 'uuid'
import toast, { Toaster } from 'react-hot-toast';
import { ONLY_NUMBERS_ON_STRING, ONLY_LETTERS_ON_STRING } from '@/models/RegexConsts';
import { useRouter } from 'next/navigation';
import { ONE_SECOUND, sleep } from '@/helper/sleepInMilli/Sleep';
import { AddSeller, AddSellerRequest, Seller } from '@/models/SellerModel';
import { describe } from 'node:test';

export default function AddSellerComponent() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<AddSeller>();
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const dataValidated = converFormData(data);
            const response = await sendForm(dataValidated);
            if (response.status == 201) {
                reset();
                toast.success('Se ha guardado exitosamente el Vendedor')
                await sleep(ONE_SECOUND);
                router.replace(`/sellers`)
            } else {
                toast.error('Ops... No se pudo guardar el Vendedor')
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo guardar el Vendedor')
        }
    }
    );

    function converFormData(data: AddSeller): AddSellerRequest {
        return {
            id: uuid(),
            name: data.name,
            phone: data.phone,
            description: data.description
        }
    }

    function sendForm(sellerRequest: AddSellerRequest) {
        return fetch(process.env.apiUrl + '/v1/seller/create', {
            method: 'POST',
            body: JSON.stringify(sellerRequest),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
    }
    return (
        <div className={styles.formBase}>
            <p>Nuevo Vendedor</p>
            <div className={styles.formData}>
                <input type="text" placeholder='Ingrese Apodo' {...register("name", { required: true, pattern: ONLY_LETTERS_ON_STRING })} />
                {errors.name && (errors.name.type === "required" || errors.name.type === "pattern") && (<span>Solo acepta letras y espacios</span>)}
                <input type="text" placeholder='Número de teléfono' {...register("phone", { required: true, pattern: ONLY_NUMBERS_ON_STRING, maxLength: 25 })} />
                {errors.phone && (errors.phone.type === "required" || errors.phone.type === "pattern") && (<span>Solo acepta números</span>)}
                {errors.phone && errors.phone.type === "maxLength" && (<span>Máximo de 25 dígitos</span>)}
                <textarea placeholder='Descripción' className={styles.description} {...register("description", { required: true, maxLength: 100 })} />
                <br />
                {errors.description && errors.description.type === "required" && (<span>La descripción es obligatoria</span>)}
                {errors.description && errors.description.type === "maxLength" && (<span>Máximo de 100 dígitos</span>)}
            </div>
            <div>
                <button><Link href='/sellers'>Cancelar</Link></button>
                <button onClick={onSubmit}>Guardar</button>
            </div>
            <Toaster />
        </div>
    )
}