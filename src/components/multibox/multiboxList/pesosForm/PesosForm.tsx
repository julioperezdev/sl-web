'use client'
import { SellerCommissionForm } from '@/models/SellOperationModel';
import styles from './PesosForm.module.css'
import { useForm } from "react-hook-form";
import { useState, Dispatch, SetStateAction } from 'react';
import { ONLY_NUMBER_WITH_DECIMALS_ON_STRING } from '@/models/RegexConsts';
import { Seller } from '@/models/SellerModel';
import toast, { Toaster } from 'react-hot-toast';
import format from 'date-fns/format';

interface PesosFormProps {
    // sellerSelected: Seller|null;
    // setSellerSelected: Dispatch<SetStateAction<Seller | null>>;
    // setSellerProfit:Dispatch<SetStateAction<number>>;
    // sellerProfit:number;
    //setPanelScreen:Dispatch<SetStateAction<number>>;
    // quantityToSell:number;
}

export default function PesosForm(props: PesosFormProps) {

    const { register, handleSubmit, formState: { errors } } = useForm<any>();
    const [sellerName, setSellerName] = useState<string | null>(null)
    const [calculated, setCalculated] = useState<boolean>(false)


    function cancelSellerAssigner() {
       props.setPanelScreen(1);
    }

    const onClickProvider = handleSubmit(async (data) => {
        toast.success('se ha ejecutado')
    });

    return (
        <div className={styles.formBase}>
            <p>Realizar Movimiento</p>
            <div className={styles.formData}>
                <p className={styles.descriptionOver}>Fecha</p>
                <p className={styles.operationStringParagragh}>{format(new Date(), 'd/MM/yyyy')}</p>
                <p className={styles.descriptionOver}>Hora</p>
                <p className={styles.operationStringParagragh}>{format(new Date(), 'hh:mm:ss')}</p>
                <p className={styles.descriptionOver}>Movimiento</p>
                <p className={styles.operationStringParagragh}>Ingreso de movimiento</p>
                <p className={styles.descriptionOver}>Ingreso/Egreso</p>
                <select {...register("color", { required: true })}>
                    <option value="i">Ingreso</option>
                    <option value="e">Egreso</option>
                </select>
                <p className={styles.descriptionOver}>Importe</p>
                <input type="text" {...register("priceByPeso", { required: true, pattern: ONLY_NUMBER_WITH_DECIMALS_ON_STRING })} onChange={onChangeSellerProfit} />
                {errors.priceByPeso && (errors.priceByPeso.type === "pattern" || errors.priceByPeso.type === "required") && (<span>Es obligatorio y solo son números</span>)}
                {errors.priceByPeso && errors.priceByPeso.type === "maxLength" && (<span>Máximo de 20 dígitos</span>)}
            </div>
            <div>
                <button onClick={() => cancelSellerAssigner()}>Cancelar</button>
                <button onClick={onClickProvider}>Ejecutar</button>
            </div>
            <Toaster />
        </div>
    )
}