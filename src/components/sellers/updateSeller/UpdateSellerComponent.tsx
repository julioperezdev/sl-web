'use client'
import styles from './UpdateSellerComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import { ONLY_NUMBERS_ON_STRING } from '@/models/RegexConsts';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { sleep } from '@/helper/sleepInMilli/Sleep';
import { Seller, UpdateSellerRequest } from '@/models/SellerModel';

export default function UpdateSellerComponent(idValue: {idValue:string}) {

    const { register, handleSubmit, reset,setValue, formState: { errors } } = useForm<{phone:string}>();

    const [seller, setSeller] = useState<Seller | null>(null)
    const router = useRouter();


    const onClickDifference = handleSubmit(async (data) => {
        try {
            const dataValidated = converFormData(data);
            const response = await sendForm(dataValidated);
            if (response.ok) {
                reset();
                toast.success('Se ha actualizado exitosamente el Vendedor')
                await sleep(2000)
                router.replace(`/sellers`)
            } else {
                toast.error('Ops... No se pudo actualizar el Vendedor')
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo actualizar el Vendedor')
        }
    }
    );

    function converFormData(data: {phone:string}): UpdateSellerRequest {
        return {
            id: seller!.id,
            phone:data.phone
        }
    }

    function sendForm(updateSellerRequest: UpdateSellerRequest) {
        return fetch('http://localhost:8081/api/v1/seller/update', {
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
        const response = await fetch(`http://localhost:8081/api/v1/seller/get/${idValue.idValue}`,{
            method: 'PUT',
        });
        let sellerData: Seller = await response.json();
        setValue('phone', sellerData.phone)
        setSeller(sellerData)
    }

    useEffect(() => {
        getSellerById();
    }, [])
    return (
        <form className={styles.formBase}>
            <Image src={'/sellerUpdate.png'} alt='Icono para indicar un nuevo vendedor' width={70} height={70} />
            <p>Modificar Cliente</p>
            <p className={styles.name}>{seller?.name}</p>
            <input type="text" placeholder='Número de teléfono' {...register("phone", { required: true, pattern: ONLY_NUMBERS_ON_STRING, maxLength:20})} />
            {errors.phone && (errors.phone.type === "pattern"|| errors.phone.type === "required") && (<span>Es obligatorio y solo son números</span>)}
                {errors.phone && errors.phone.type === "maxLength" && (<span>Máximo de 20 dígitos</span>)}
            <div>
                <button><Link href='/sellers/list'>Cancelar</Link></button>
                <button onClick={onClickDifference} >Guardar</button>
            </div>
            <Toaster/>
        </form>
    )
  }