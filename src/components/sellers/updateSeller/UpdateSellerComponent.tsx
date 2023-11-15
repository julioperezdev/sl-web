'use client'
import styles from './UpdateSellerComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import { ONLY_NUMBERS_ON_STRING } from '@/models/RegexConsts';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ONE_SECOUND, sleep } from '@/helper/sleepInMilli/Sleep';
import { Seller, UpdateSellerForm, UpdateSellerRequest } from '@/models/SellerModel';

export default function UpdateSellerComponent(idValue: { idValue: string }) {

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<UpdateSellerForm>();

    const [seller, setSeller] = useState<Seller | null>(null)
    const router = useRouter();


    const onClickDifference = handleSubmit(async (data) => {
        try {
            const dataValidated = converFormData(data);
            const response = await sendForm(dataValidated);
            if (response.ok) {
                reset();
                toast.success('Se ha actualizado exitosamente el Vendedor', { duration: 5000 })
                await sleep(ONE_SECOUND)
                router.replace(`/sellers/list`)
            } else {
                toast.error('Ops... No se pudo actualizar el Vendedor', { duration: 5000 })
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo actualizar el Vendedor', { duration: 5000 })
        }
    }
    );

    function converFormData(data: UpdateSellerForm): UpdateSellerRequest {
        return {
            id: seller!.id,
            phone: data.phone,
            description: data.description
        }
    }

    function sendForm(updateSellerRequest: UpdateSellerRequest) {
        return fetch(process.env.apiUrl + '/v1/seller/update', {
            method: 'PUT',
            body: JSON.stringify(updateSellerRequest),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
    }


    async function getSellerById() {
        const response = await fetch(`${process.env.apiUrl}/v1/seller/get/${idValue.idValue}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
        let sellerData: Seller = await response.json();
        setValue('phone', sellerData.phone)
        setValue('description', sellerData.description)
        setSeller(sellerData)
    }

    useEffect(() => {
        getSellerById();
    }, [])
    return (
        <form className={styles.formBase}>
            <h2>Modificar Vendedor</h2>
            <div className={styles.formData}>
                <p className={styles.descriptionOver}>Apodo Vendedor</p>
                <p className={styles.name}>{seller?.name}</p>
                <p className={styles.descriptionOver}>Teléfono</p>
                <input type="text" placeholder='Número de teléfono' {...register("phone", { required: true, pattern: ONLY_NUMBERS_ON_STRING, maxLength: 20 })} />
                {errors.phone && (errors.phone.type === "pattern" || errors.phone.type === "required") && (<span>Es obligatorio y solo son números</span>)}
                {errors.phone && errors.phone.type === "maxLength" && (<span>Máximo de 20 dígitos</span>)}
                <p className={styles.descriptionOver}>Descripción</p>
                <textarea placeholder='Descripción' className={styles.description} {...register("description", { required: true, maxLength: 100 })} />
                <br />
                {errors.description && errors.description.type === "required" && (<span>La descripción es obligatoria</span>)}
                {errors.description && errors.description.type === "maxLength" && (<span>Máximo de 100 dígitos</span>)}
            </div>
            <div>
                <button><Link href='/sellers/list'>Cancelar</Link></button>
                <button onClick={onClickDifference} >Guardar</button>
            </div>
            <Toaster 
            position="bottom-left"
            reverseOrder={false}/>
        </form>
    )
}