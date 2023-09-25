'use client'
import { AddDifference } from '@/models/AddDifference';
import styles from './UpdateDifferenceComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { DifferenceClient } from '@/models/DifferenceClient';
import { useEffect, useState } from 'react';
import { ONLY_NUMBERS_ON_STRING } from '@/models/RegexConsts';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { sleep } from '@/helper/sleepInMilli/Sleep';
import { parseISO, format } from 'date-fns';

export default function UpdateDifferenceComponent(idValue: {idValue:string}) {
    const { register, handleSubmit, reset,setValue, formState: { errors } } = useForm<AddDifference>();
    const [differenceClient, setDifferenceClient] = useState<DifferenceClient | null>(null)
    const router = useRouter();


    const onClickDifference = handleSubmit(async (data) => {
        try {
            const dataValidated = converFormData(data);
            const response = await sendForm(dataValidated);
            if (response.ok) {
                reset();
                toast.success('Se ha actualizado exitosamente la Diferencia de Cliente')
                sleep(3000)
                router.replace(`/clients/difference`)
            } else {
                toast.error('Ops... No se pudo actualizar a Diferencia de Cliente')
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo actualizar a Diferencia de Cliente')
        }
    }
    );


    function converFormData(data: AddDifference): DifferenceClient {
        return {
            id: differenceClient!.id,
            clientId: differenceClient!.clientId,
            differenceStatus:differenceClient!.differenceStatus,
            createdAt: differenceClient!.createdAt,
            differenceType: data.differenceType,
            description: data.description,
            amount:data.amount
        }
    }

    function sendForm(updateDifferenceClientRequest: DifferenceClient) {
        return fetch('http://localhost:8081/api/v1/client/difference/update', {
            method: 'PUT',
            body: JSON.stringify(updateDifferenceClientRequest),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
    }


    async function getDifferenceClientById() {
        const response = await fetch(`http://localhost:8081/api/v1/client/difference/get/${idValue.idValue}`,{
            method: 'PUT',
        });
        let differenceData: DifferenceClient = await response.json();
        setValue('differenceType', differenceData.differenceType)
        setValue('amount', differenceData.amount)
        setValue('description', differenceData.description)
        setDifferenceClient(differenceData)
    }

    useEffect(() => {
        getDifferenceClientById();
    }, [])
    return (
        <div className={styles.formBase}>
            <Image src={'/clipboard.png'} alt='Icono para indicar una nueva diferencia' width={80} height={80} />
            <p>Modificar Diferencia</p>
            <div>
                <p className={styles.name}>{!differenceClient ? 'Cargando...' : format(parseISO(differenceClient.createdAt), 'd/MM/yyyy')}</p>
                <p className={styles.name}>{!differenceClient ? 'Cargando...' : differenceClient.clientId}</p>
                <select {...register("differenceType", { required: true })}>
                    <option value="falta">Faltante</option>
                    <option value="sobra">Sobrante</option>
                </select>
                <input type="text" placeholder='Importe' {...register("amount", { required: true, pattern:ONLY_NUMBERS_ON_STRING, maxLength:40 })} />
                {errors.amount && (errors.amount.type === "pattern"|| errors.amount.type === "required") && (<span>Es obligatorio y solo son números</span>)}
                {errors.amount && errors.amount.type === "maxLength" && (<span>Máximo de 40 dígitos</span>)}
            </div>
            <textarea placeholder='Detalle Inconveniente' className={styles.description} {...register("description", { required: true, maxLength:30 })} />
            {errors.description && errors.description.type === "required" && (<span>La descripción es obligatoria</span>)}
            {errors.description && errors.description.type === "maxLength" && (<span>Máximo de 30 dígitos</span>)}
            <div>
                <button ><Link href='/clients/difference'>Cancelar</Link></button>
                <button onClick={onClickDifference} >Guardar</button>
            </div>
            <Toaster/>
        </div>
    )
}