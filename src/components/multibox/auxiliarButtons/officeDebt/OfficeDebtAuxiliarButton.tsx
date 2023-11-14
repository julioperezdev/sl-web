'use client'
import styles from './OfficeDebtAuxiliarButton.module.css';
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
import { PayDebtForm, PayDebtRequest } from '@/models/OfficeDebtModel';

export default function OfficeDebtAuxiliarButton() {

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<PayDebtForm>();
    const [totalToPay, setTotalToPay] = useState<number>(0)
    const router = useRouter();

    const onClickProvider = handleSubmit(async () => {
        try {
            const dataValidated = converFormData();
            const response = await sendForm(dataValidated);
            if (response.ok) {
                reset();
                toast.success('Se ha pagado la deuda correctamente')
                await sleep(ONE_SECOUND)
                router.replace(`/multibox/list/PESO_OFFICE`)
            } else {
                toast.error('Ops... No se pudo pagar la deuda')
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo pagar la deuda')
        }
    }
    );

    function converFormData(): PayDebtRequest {
        return {
            debtAmount: totalToPay
        }
    }

    function sendForm(payDebtRequest: PayDebtRequest) {
        return fetch(process.env.apiUrl + '/v1/box/office-debt/auxiliar', {
            method: 'PUT',
            body: JSON.stringify(payDebtRequest),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
    }

    async function getTotalDebt() {
        const response = await fetch(`${process.env.apiUrl}/v1/box/office-debt/last-debt`, {
            method: 'PUT',
        });
        if (response.status != 202) {
            console.log('No hay datos')
            return
        }
        let responseValue = await response.json();
        let totalToPayResponse: number = responseValue;
        setTotalToPay(totalToPayResponse)
    }
    useEffect(() => {
        getTotalDebt();
    }, [])

    return (
        <form onSubmit={onClickProvider} className={styles.formBase}>
            <p>Pagar Deuda</p>
            <div className={styles.formData}>
                <p className={styles.descriptionOver}>Fecha</p>
                <p className={styles.name}>{format(new Date(), 'dd/MM/yyyy')}</p>
                <p className={styles.descriptionOver}>Hora</p>
                <p className={styles.name}>{format(new Date(), 'hh:mm:ss')}</p>
                <p className={styles.descriptionOver}>Movimiento</p>
                <p className={styles.name}>Pago Deuda</p>
                <p className={styles.descriptionOver}>Destino debito caja</p>
                <p className={styles.name}>Caja en Pesos</p>
                <p className={styles.descriptionOver}>Saldo Acumulado</p>
                <p className={styles.name}>{totalToPay}</p>
            </div>
            <div>
                <button><Link href='/multibox'>Cancelar</Link></button>
                <button id="formSubmit" type="submit" >Ejecutar</button>
            </div>
            <Toaster />
        </form>
    )
}