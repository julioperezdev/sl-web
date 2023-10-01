'use client'
import styles from './UpdateProviderComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import { ONLY_NUMBERS_ON_STRING } from '@/models/RegexConsts';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { sleep } from '@/helper/sleepInMilli/Sleep';
import { Provider, UpdateProviderForm, UpdateProviderRequest } from '@/models/ProviderModel';

export default function UpdateProviderComponent(idValue: { idValue: string }) {

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<UpdateProviderForm>();
    const [provider, setProvider] = useState<Provider | null>(null)
    const router = useRouter();

    const onClickProvider = handleSubmit(async (data) => {
        try {
            const dataValidated = converFormData(data);
            const response = await sendForm(dataValidated);
            if (response.ok) {
                reset();
                toast.success('Se ha actualizado exitosamente el Vendedor')
                await sleep(2000)
                router.replace(`/provider/list`)
            } else {
                toast.error('Ops... No se pudo actualizar el Vendedor')
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo actualizar el Vendedor')
        }
    }
    );

    function converFormData(data: UpdateProviderForm): UpdateProviderRequest {
        return {
            id: provider!.id,
            phone: data.phone,
            address: data.address
        }
    }

    function sendForm(updateProviderRequest: UpdateProviderRequest) {
        return fetch('http://localhost:8081/api/v1/provider/update', {
            method: 'PUT',
            body: JSON.stringify(updateProviderRequest),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
    }


    async function getProviderById() {
        const response = await fetch(`http://localhost:8081/api/v1/provider/get/${idValue.idValue}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
        let providerData: Provider = await response.json();
        setValue('phone', providerData.phone)
        setValue('address', providerData.address)
        setProvider(providerData)
    }

    useEffect(() => {
        getProviderById();
    }, [])
    return (
        <form onSubmit={onClickProvider} className={styles.formBase}>
            <p>Modificar Proveedor</p>
            <div className={styles.formData}>
                <p className={styles.descriptionOver}>Apodo Proveedor</p>
                <p className={styles.name}>{provider?.name}</p>
                <p className={styles.descriptionOver}>Teléfono</p>
                <input type="text" placeholder='Número de teléfono' {...register("phone", { required: true, pattern: ONLY_NUMBERS_ON_STRING })} />
                {errors.phone && (errors.phone.type === "pattern" || errors.phone.type === "required") && (<span>Es obligatorio y solo son números</span>)}
                {errors.phone && errors.phone.type === "maxLength" && (<span>Máximo de 20 dígitos</span>)}
                <p className={styles.descriptionOver}>Dirección</p>
                <input type="text" placeholder='Dirección' {...register("address", { required: true, maxLength: 50 })} />
                {errors.address && errors.address.type === "required" && (<span>La direccion es obligatoria</span>)}
                {errors.address && errors.address.type === "maxLength" && (<span>Máximo de 50 dígitos</span>)}
            </div>
            <div>
                <button><Link href='/provider'>Cancelar</Link></button>
                <button id="formSubmit" type="submit" >Guardar</button>
            </div>
            <Toaster />
        </form>
    )
}