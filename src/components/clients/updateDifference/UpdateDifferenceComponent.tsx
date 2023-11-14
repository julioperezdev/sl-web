'use client'
import styles from './UpdateDifferenceComponent.module.css';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { DifferenceClientUpdateForm, DifferenceClientDtoResponse, DifferenceClientUpdateRequest } from '@/models/DifferenceClientModel';
import { useEffect, useState } from 'react';
import { ONLY_NUMBERS_ON_STRING } from '@/models/RegexConsts';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ONE_SECOUND, sleep } from '@/helper/sleepInMilli/Sleep';
import { parseISO, format } from 'date-fns';

export default function UpdateDifferenceComponent(idValue: { idValue: string }) {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<DifferenceClientUpdateForm>();
    const [differenceClient, setDifferenceClient] = useState<DifferenceClientDtoResponse | null>(null)
    const router = useRouter();


    const onClickDifference = handleSubmit(async (data) => {
        try {
            const dataValidated = converFormData(data);
            const response = await sendForm(dataValidated);
            if (response.ok) {
                reset();
                toast.success('Se ha actualizado exitosamente la Diferencia de Cliente')
                await sleep(ONE_SECOUND)
                router.replace(`/clients/difference`)
            } else {
                toast.error('Ops... No se pudo actualizar a Diferencia de Cliente')
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo actualizar a Diferencia de Cliente')
        }
    }
    );


    function converFormData(data: DifferenceClientUpdateForm): DifferenceClientUpdateRequest {
        return {
            id: differenceClient!.id,
            differenceStatus: differenceClient!.differenceStatus,
            differenceType: data.differenceType,
            description: data.description,
            amount: data.amount
        }
    }

    function sendForm(updateDifferenceClientRequest: DifferenceClientUpdateRequest) {
        return fetch(process.env.apiUrl + '/v1/client/difference/update', {
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
        const response = await fetch(`${process.env.apiUrl}/v1/client/difference/get/${idValue.idValue}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
        let differenceData: DifferenceClientDtoResponse = await response.json();
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
            <p>Modificar Diferencia</p>
            <div className={styles.data}>
                <div>
                    <p className={styles.dataOver}>Fecha de modificación</p>
                    <p className={styles.dataOver}>Apodo Cliente</p>
                    <p className={styles.name}>{!differenceClient ? 'Cargando...' : format(parseISO(differenceClient.createdAt), 'd/MM/yyyy')}</p>
                    <p className={styles.name}>{!differenceClient ? 'Cargando...' : differenceClient.clientName}</p>
                    <p className={styles.dataOver}>Faltante / Sobrante</p>
                    <p className={styles.dataOver}>Importe</p>
                    <select {...register("differenceType", { required: true })}>
                        <option value="Faltante">Faltante</option>
                        <option value="Sobrante">Sobrante</option>
                    </select>
                    <div>
                        <input type="text" placeholder='Importe' {...register("amount", { required: true, pattern: ONLY_NUMBERS_ON_STRING, maxLength: 40 })} />
                        <br />
                        {errors.amount && (errors.amount.type === "pattern" || errors.amount.type === "required") && (<span>Es obligatorio y solo son números</span>)}
                        {errors.amount && errors.amount.type === "maxLength" && (<span>Máximo de 40 dígitos</span>)}
                    </div>
                </div>
                <p className={styles.descriptionOver}>Descripción</p>
                <textarea placeholder='Detalle Inconveniente' className={styles.description} {...register("description", { required: true, maxLength: 100 })} />
                {errors.description && errors.description.type === "required" && (<span>La descripción es obligatoria</span>)}
                {errors.description && errors.description.type === "maxLength" && (<span>Máximo de 100 dígitos</span>)}
            </div>
            <div>
                <button ><Link href='/clients/difference/list'>Cancelar</Link></button>
                <button onClick={onClickDifference} >Guardar</button>
            </div>
            <Toaster />
        </div>
    )
}