'use client'
import styles from './BalanceAuxiliarButton.module.css';
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
import { AssignSellerBoxForm, AssignSellerBoxRequest } from '@/models/BalanceModel';

export default function BalanceAuxiliarButton() {

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<AssignSellerBoxForm>();
    const [provider, setProvider] = useState<Provider | null>(null)
    const router = useRouter();

    const onClickProvider = handleSubmit(async (data) => {
        try {
            const dataValidated = converFormData(data);
            const response = await sendForm(dataValidated);
            if (response.ok) {
                reset();
                toast.success('Se ha actualizado exitosamente el Vendedor')
                await sleep(ONE_SECOUND)
                router.replace('/multibox/balance')
            } else {
                toast.error('Ops... No se pudo actualizar el Vendedor')
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo actualizar el Vendedor')
        }
    }
    );

    function converFormData(data: AssignSellerBoxForm): AssignSellerBoxRequest {
        return {
            quantity:data.quantity,
            sellerBoxName:data.sellerBoxName
        }
    }

    function sendForm(assignSellerBoxRequest: AssignSellerBoxRequest) {
        return fetch(process.env.apiUrl + '/v1/box/balance/auxiliar', {
            method: 'PUT',
            body: JSON.stringify(assignSellerBoxRequest),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
    }

    return (
        <form onSubmit={onClickProvider} className={styles.formBase}>
            <p>Asignar Caja</p>
            <div className={styles.formData}>
                <p className={styles.descriptionOver}>Fecha</p>
                <p className={styles.name}>{format(new Date(), 'dd/MM/yyyy')}</p>
                <p className={styles.descriptionOver}>Hora</p>
                <p className={styles.name}>{format(new Date(), 'hh:mm:ss')}</p>
                <p className={styles.descriptionOver}>Movimiento</p>
                <p className={styles.name}>Asignar Caja</p>
                <p className={styles.descriptionOver}>Asignar Caja</p>
                <select {...register("sellerBoxName", { required: true })}>
                    <option value="1">Caja 1</option>
                    <option value="2">Caja 2</option>
                </select>
                <p className={styles.descriptionOver}>Importe</p>
                <input type="text"  {...register("quantity", { required: true, pattern:ONLY_NUMBER_WITH_TWO_DECIMALS_ON_STRING, maxLength: 40 })} />
                {errors.quantity && errors.quantity.type === "required" && (<span>El importe es obligatoria</span>)}
                {errors.quantity && errors.quantity.type === "maxLength" && (<span>Máximo de 40 dígitos</span>)}
            </div>
            <div>
                <button onClick={()=> router.replace('/multibox/balance')}>Cancelar</button>
                <button id="formSubmit" type="submit" >Guardar</button>
            </div>
            <Toaster />
        </form>
    )
}