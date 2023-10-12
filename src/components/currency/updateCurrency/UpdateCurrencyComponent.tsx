'use client'
import styles from './UpdateCurrencyComponent.module.css'
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { Currency, CurrencyForm, CurrencyRequest } from '@/models/CurrencyModel';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ONE_SECOUND, sleep } from '@/helper/sleepInMilli/Sleep';
import { v4 as uuid } from 'uuid'
import { ONLY_NUMBERS_ON_STRING } from '@/models/RegexConsts';

export default function UpdateCurrencyComponent() {

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<CurrencyForm>();
    const [currencies, setCurrencies] = useState<Currency[] | null>(null)
    const [currencySelected, setCurrencySelected] = useState<string>('')
    const router = useRouter();


    const onClickDifference = handleSubmit(async (data) => {
        try {
            const validation = validateFormData(data);
            if(!validation){
                toast.error('Para actualizar se debe modificar la información')
                return;
            }
            const dataValidated = converFormData(data);
            const response = await sendForm(dataValidated);
            if (response.ok) {
                reset();
                toast.success('Se ha actualizado exitosamente la Diferencia de Cliente')
                await sleep(ONE_SECOUND)
                router.replace(`/currency`)
            } else {
                toast.error('Ops... No se pudo actualizar a Diferencia de Cliente')
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo actualizar a Diferencia de Cliente')
        }
    }
    );
    function validateFormData(data: CurrencyForm): boolean {
        let currencyFiltered:Currency = currencies?.find(particular => particular.name == currencySelected)!
        return !(data.name === currencyFiltered.name &&
        data.buyPrice === currencyFiltered.buyPrice &&
        data.sellPrice === currencyFiltered.sellPrice)
    }

    function converFormData(data: CurrencyForm): CurrencyRequest {
        return {
            id: uuid(),
            name: data.name,
            buyPrice: data.buyPrice,
            sellPrice: data.sellPrice
        }
    }

    function sendForm(updateCurrencyRequest: CurrencyRequest) {
        return fetch(process.env.apiUrl + '/v1/currency/update', {
            method: 'PUT',
            body: JSON.stringify(updateCurrencyRequest),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
    }


    async function getLasUpdatedCurrencies() {
        const response = await fetch(`${process.env.apiUrl}/v1/currency/get/last-updated`, {
            method: 'PUT',
        });
        let currenciesData: Currency[] = await response.json();
        setCurrencySelected(currenciesData[0].name)
        setValue('name', currenciesData[0].name)
        setValue('buyPrice', currenciesData[0].buyPrice)
        setValue('sellPrice', currenciesData[0].sellPrice)
        setCurrencies(currenciesData)

    }

    const handleChange = (event: { target: { value: string; }; }):any => {
        const currencyEvent :string = event.target.value;
        setCurrencySelected(currencyEvent);
        let currencyFiltered:Currency = currencies?.find(particular => particular.name == currencyEvent)!
        setValue('name', currencyFiltered.name)
        setValue('buyPrice', currencyFiltered.buyPrice)
        setValue('sellPrice', currencyFiltered.sellPrice)
      };

    useEffect(() => {
        getLasUpdatedCurrencies();
    }, [])

    return (
        <form className={styles.formBase}>
            <p>Actualizar Cotizacion</p>
            {
                !currencies ? <p>Cargando</p>
                    : <>
                        <select {...register("name", { required: true })} onChange={handleChange} value={currencySelected!}>
                            {currencies.map(currency =>(
                                <option key={currency.id} value={currency.name}>{currency.name}</option>
                            ))}
                        </select>
                        <div className={styles.priceBase}>
                            <p className={styles.descriptionOver}>Precio Compra</p>
                            <p className={styles.descriptionOver}>Precio Venta</p>
                            <input className={styles.priceToBuy} type="text" placeholder='Importe' {...register("buyPrice", { required: true, pattern: ONLY_NUMBERS_ON_STRING, maxLength: 20 })} />
                            {errors.buyPrice && (errors.buyPrice.type === "pattern" || errors.buyPrice.type === "required") && (<span>Es obligatorio y solo son números</span>)}
                            {errors.buyPrice && errors.buyPrice.type === "maxLength" && (<span>Máximo de 20 dígitos</span>)}
                            <input className={styles.priceToSell} type="text" placeholder='Importe' {...register("sellPrice", { required: true, pattern: ONLY_NUMBERS_ON_STRING, maxLength: 20 })} />
                            {errors.sellPrice && (errors.sellPrice.type === "pattern" || errors.sellPrice.type === "required") && (<span>Es obligatorio y solo son números</span>)}
                            {errors.sellPrice && errors.sellPrice.type === "maxLength" && (<span>Máximo de 20 dígitos</span>)}
                        </div></>
            }
            <div className={styles.buttonBase}>
                <button><Link href='/currency'>Cancelar</Link></button>
                <button onClick={onClickDifference}>Guardar</button>
            </div>
            <Toaster />
        </form>
    )
}