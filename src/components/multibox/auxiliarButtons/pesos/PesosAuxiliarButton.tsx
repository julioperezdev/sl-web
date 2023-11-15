'use client'
import styles from './PesosAuxiliarButton.module.css';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { ONLY_NUMBER_WITH_TWO_DECIMALS_ON_STRING } from '@/models/RegexConsts';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ONE_SECOUND, sleep } from '@/helper/sleepInMilli/Sleep';
import { format } from 'date-fns';
import { ManualTransactionForm, ManualTransactionRequest } from '@/models/ManualOperationMOdel';

export default function PesosBoxAuxiliarButton() {

   
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ManualTransactionForm>();
    const router = useRouter();

    const onClickProvider = handleSubmit(async (data) => {
        try {
            const dataValidated = converFormData(data);
            const response = await sendForm(dataValidated);
            if (response.ok) {
                reset();
                toast.success('Se ha actualizado exitosamente el Vendedor', { duration: 5000 })
                await sleep(ONE_SECOUND)
                router.replace(`/multibox/list/PESO`)
            } else {
                toast.error('Ops... No se pudo actualizar el Vendedor', { duration: 5000 })
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo actualizar el Vendedor', { duration: 5000 })
        }
    }
    );

    function converFormData(data: ManualTransactionForm): ManualTransactionRequest {
        return {
            currencyBoxName: 'PESO',
            manualOperationType: data.manualOperationType,
            quantity: data.quantity
        }
    }

    function sendForm(manualTransactionRequest: ManualTransactionRequest) {
        return fetch(process.env.apiUrl + '/v1/operation/manual/execute', {
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
            <button onClick={()=> router.replace(`/multibox/list/PESO`)}>Cancelar</button>
                <button id="formSubmit" type="submit" >Guardar</button>
            </div>
            <Toaster 
            position="bottom-left"
            reverseOrder={false}/>
        </form>
    )
}