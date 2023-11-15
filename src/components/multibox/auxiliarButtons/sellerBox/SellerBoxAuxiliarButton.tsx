'use client'
import styles from './SellerBoxAuxiliarButton.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import { ONLY_NUMBERS_ON_STRING, ONLY_NUMBER_WITH_TWO_DECIMALS_ON_STRING } from '@/models/RegexConsts';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ONE_SECOUND, sleep } from '@/helper/sleepInMilli/Sleep';
import { format } from 'date-fns';
import { Provider, UpdateProviderForm, UpdateProviderRequest } from '@/models/ProviderModel';
import { ManualTransactionForm, ManualTransactionRequest } from '@/models/ManualOperationMOdel';
import { ManualTransactionSellerBoxRequest, ManualTransactionSellerForm } from '@/models/SellerBoxModel';

export default function SellerBoxAuxiliarButton(props:{number:string}) {

    
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ManualTransactionSellerForm>();
    const router = useRouter();

    const onClickProvider = handleSubmit(async (data) => {
        try {
            const dataValidated = converFormData(data);
            const response = await sendForm(dataValidated);
            if (response.ok) {
                reset();
                toast.success('Se ha actualizado exitosamente el Vendedor', { duration: 5000 })
                await sleep(ONE_SECOUND)
                router.replace(`/multibox/seller-box/${props.number}`)
            } else {
                toast.error('Ops... No se pudo actualizar el Vendedor', { duration: 5000 })
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo actualizar el Vendedor', { duration: 5000 })
        }
    }
    );

    function converFormData(data: ManualTransactionSellerForm): ManualTransactionSellerBoxRequest {
        return {
            sellerBoxName: props.number,
            manualOperationType: data.manualOperationType,
            quantity: data.quantity
        }
    }

    function sendForm(manualTransactionRequest: ManualTransactionSellerBoxRequest) {
        return fetch(process.env.apiUrl + '/v1/box/seller-box/auxiliar', {
            method: 'PUT',
            body: JSON.stringify(manualTransactionRequest),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
    }

    return (
        <form onSubmit={onClickProvider} className={styles.formBase}>
            <p>Realizar Movimiento</p>
            <div className={styles.formData}>
                <p className={styles.descriptionOver}>Fecha</p>
                <p suppressHydrationWarning className={styles.name}>{format(new Date(), 'dd/MM/yyyy')}</p>
                <p className={styles.descriptionOver}>Hora</p>
                <p suppressHydrationWarning className={styles.name}>{format(new Date(), 'hh:mm:ss')}</p>
                <p className={styles.descriptionOver}>Movimiento</p>
                <p className={styles.name}>Ajuste Manual</p>
                <p className={styles.descriptionOver}>Ingreso / Egreso</p>
                <select {...register("manualOperationType", { required: true })}>
                    <option value="egreso efectivo">Egreso</option>
                    <option value="ingreso efectivo">Ingreso</option>
                </select>
                <p className={styles.descriptionOver}>Importe</p>
                <input type="text"  {...register("quantity", { required: true, pattern:ONLY_NUMBER_WITH_TWO_DECIMALS_ON_STRING, maxLength: 40 })} />
                {errors.quantity && errors.quantity.type === "required" && (<span>El importe es obligatoria</span>)}
                {errors.quantity && errors.quantity.type === "maxLength" && (<span>Máximo de 40 dígitos</span>)}
            </div>
            <div>
                <button onClick={()=> router.replace(`/multibox/seller-box/${props.number}`)}>Cancelar</button>
                <button id="formSubmit" type="submit" >Guardar</button>
            </div>
            <Toaster 
            position="bottom-left"
            reverseOrder={false}/>
        </form>
    )
}