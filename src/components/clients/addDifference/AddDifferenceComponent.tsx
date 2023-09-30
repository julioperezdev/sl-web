'use client'
import { AddDifference } from '@/models/AddDifference';
import styles from './AddDifferenceComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { v4 as uuid } from 'uuid'
import toast, { Toaster } from 'react-hot-toast';
import { Client } from '@/models/Client';
import { useState } from 'react';
import { format } from 'date-fns';
import { ONLY_NUMBERS_ON_STRING } from '@/models/RegexConsts';
import { useRouter } from 'next/navigation';
import { sleep } from '@/helper/sleepInMilli/Sleep';

export default function AddDifferenceComponent() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<AddDifference>();
    const router = useRouter();
    const onClickDiffernece = handleSubmit(async (data) => {
        try {
            console.log('entra onsubmit')
            const dataValidated = converFormData(data);
            const response = await sendForm(dataValidated);
            if (response.status == 201) {
                reset();
                toast.success('Se ha guardado exitosamente la diferencia del cliente')
                await sleep(1500)
                router.replace(`/clients/difference`)
            } else {
                toast.error('Ops... No se pudo guardar la diferencia del cliente')
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo guardar la diferencia del cliente')
        }
    }
    );

    function converFormData(data: AddDifference): AddDifference {
        return {
            id: uuid(),
            clientId: client?.id!,
            amount: data.amount,
            description: data.description,
            differenceType:data.differenceType
        }
    }

    function sendForm(addDifferenceRequest: AddDifference) {
        return fetch('http://localhost:8081/api/v1/client/difference/create', {
            method: 'POST',
            body: JSON.stringify(addDifferenceRequest),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
    }

    const [client, setClient] = useState<Client | null>(null)
    const [clientName, setClientName] = useState<string | null>(null)

    async function getClientByName(name:string) {
        const response = await fetch(`http://localhost:8081/api/v1/client/get/name/${name}`,{
            method: 'PUT',
        });
        if (response.status == 204) {
            toast.error('Ops... No se pudo encontrar un cliente con ese nombre')
            return 
        } else if(response.status == 302){
            toast.success('Se encontró el cliente, falta completar los otros datos')
        }
        let clientData: Client = await response.json();
        setClient(clientData)
    }

    const handleKeyDown = (event:any) => {
        if (event.key === 'Enter' && clientName != null && clientName?.trim() != "") {
            getClientByName(clientName!)
        }
    }
    const onChangeName = (event:any) => {
        if(client!= null){
            setClient(null)
        }
        setClientName(event.target.value);        
    }

    return (
        <div className={styles.formBase}>
            <p>Nueva Diferencia</p>
            <div>
                <p>{format(new Date(), 'dd/MM/yyyy')}</p>
                <input type="text" onKeyDown={handleKeyDown} placeholder='Apodo Cliente' onChange={onChangeName} />
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
                <button onClick={onClickDiffernece} >Guardar</button>
            </div>
            <Toaster
            position="bottom-left"
            reverseOrder={false}/>
        </div>
    )
}