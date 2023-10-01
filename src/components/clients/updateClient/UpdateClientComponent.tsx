'use client'
import { Client } from '@/models/Client';
import styles from './UpdateClientComponent.module.css';
import { AddClient } from '@/models/AddClient';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { ONLY_NUMBERS_ON_STRING } from '@/models/RegexConsts';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { sleep } from '@/helper/sleepInMilli/Sleep';



export default function UpdateClientComponent(idValue: {idValue:string}) {
    const { register, handleSubmit, reset,setValue , formState: { errors } } = useForm<AddClient>();
    const [client, setClient] = useState<Client | null>(null)
    const router = useRouter();
    
    const onSubmit = handleSubmit(async (data) => {
        try {
            const dataValidated = converFormData(data);
            const response = await sendForm(dataValidated);
            if (response.ok) {
                reset();
                toast.success('Se ha actualizado exitosamente el Cliente')
                await sleep(1000)
                router.replace(`/clients`)
            } else {
                toast.error('Ops... No se pudo actualizar el Cliente')
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo actualizar el Cliente')
        }
    }
    );

    function converFormData(data: AddClient): Client {
        return {
            id: client!.id,
            name: client!.name,
            createdAt: client!.createdAt,
            phone: data.phone,
            address: data.address,
            description: data.description
        }
    }

    function sendForm(updateClientRequest: Client) {
        return fetch(process.env.apiUrl + '/v1/client/update', {
            method: 'PUT',
            body: JSON.stringify(updateClientRequest),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
    }

    async function getClientById() {
        const response = await fetch(`http://localhost:8081/api/v1/client/get/${idValue.idValue}`,{
            method: 'PUT',
        });
        let clientsData: Client = await response.json();
        setValue('phone', clientsData.phone)
        setValue('address', clientsData.address)
        setValue('description', clientsData.description)
        setClient(clientsData)
    }

    useEffect(() => {
        getClientById();
    }, [])

    return (
        <div className={styles.formBase}>
            <h2>Modificar Cliente</h2>
            <p className={styles.descriptionOver}>Apodo Cliente</p>
            <p className={styles.name}>{!client ? 'Cargando...' : client.name}</p>
            <p className={styles.descriptionOver}>Teléfono</p>
            <input type="text" placeholder='Número de teléfono' {...register("phone", { required: true, pattern: ONLY_NUMBERS_ON_STRING, maxLength: 20 })} />
            {errors.phone && (errors.phone.type === "required" || errors.phone.type === "pattern") && (<span>Solo acepta números</span>)}
            {errors.phone && errors.phone.type === "maxLength" && (<span>Máximo de 20 dígitos</span>)}
            <p className={styles.descriptionOver}>Dirección</p>
            <input type="text" placeholder='Dirección' {...register("address", { required: true, maxLength: 50 })} />
            {errors.address && errors.address.type === "required" && (<span>La direccion es obligatoria</span>)}
            {errors.address && errors.address.type === "maxLength" && (<span>Máximo de 50 dígitos</span>)}
            <p className={styles.descriptionOver}>Descripción</p>
            <textarea placeholder='Descripción' className={styles.description} {...register("description", { required: true, maxLength: 100 })} />
            {errors.description && errors.description.type === "required" && (<span>La descripción es obligatoria</span>)}
            {errors.description && errors.description.type === "maxLength" && (<span>Máximo de 100 dígitos</span>)}
            <div>
                <button><Link href='/clients'>Cancelar</Link></button>
                <button onClick={onSubmit} >Guardar</button>
            </div>
            <Toaster/>
        </div>
    )
}