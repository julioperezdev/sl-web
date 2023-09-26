'use client'
import styles from './AddSellerComponent.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { v4 as uuid } from 'uuid'
import toast, { Toaster } from 'react-hot-toast';
import { ONLY_NUMBERS_ON_STRING, ONLY_LETTERS_ON_STRING } from '@/models/RegexConsts';
import { useRouter } from 'next/navigation';
import { sleep } from '@/helper/sleepInMilli/Sleep';
import { AddSeller, Seller } from '@/models/SellerModel';

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
                await sleep(2000);
                router.replace(`/sellers`)
            } else {
                toast.error('Ops... No se pudo guardar el Vendedor')
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo guardar el Vendedor')
        }
    }
    );

    function converFormData(data: AddSeller): Seller {
        return {
            id: uuid(),
            name: data.name,
            phone: data.phone
        }
    }

    function sendForm(sellerRequest: Seller) {
        return fetch('http://localhost:8081/api/v1/seller/create', {
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
        <form onSubmit={onSubmit} className={styles.formBase}>
            <Image src={'/sellerNew.png'} alt='Icono para indicar un nuevo vendedor' width={80} height={80} />
            <p>Nuevo Vendedor</p>
            <input type="text" placeholder='Ingrese Apodo' {...register("name", { required: true, pattern: ONLY_LETTERS_ON_STRING })} />
            {errors.name && (errors.name.type === "required" || errors.name.type === "pattern") && (<span>Solo acepta letras y espacios</span>)}
            <input type="text" placeholder='Número de teléfono' {...register("phone", { required: true, pattern: ONLY_NUMBERS_ON_STRING, maxLength: 20 })} />
            {errors.phone && (errors.phone.type === "required" || errors.phone.type === "pattern") && (<span>Solo acepta números</span>)}
            {errors.phone && errors.phone.type === "maxLength" && (<span>Máximo de 20 dígitos</span>)}
            <div>
                <button><Link href='/sellers'>Cancelar</Link></button>
                <button id="formSubmit" type="submit" >Guardar</button>
            </div>
            <Toaster/>
        </form>
    )
}