'use client'
import styles from './ListCurrencyComponent.module.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { Currency } from '@/models/CurrencyModel';

export default function ListCurrencyComponent() {
    const [selected, setSelected] = useState<string | null>(null)
    const [currencies, setCurrencies] = useState<Currency[]>([])

    async function getCurrencies() {
        const response = await fetch('http://localhost:8081/api/v1/currency/get', {
            method: 'PUT',
        });
        let currenciesData: Currency[] = await response.json();
        console.log(currenciesData)
        setCurrencies(currenciesData)
    }
    useEffect(() => {
        getCurrencies();
    }, [])

    function isSelected(id:string):boolean{
        return id == selected;
    }
    return(
        <div className={styles.listClientBase}>
            <p>Historico de Actualizaciones</p>
            <div className={styles.listDataBase}>
                <div className={styles.listTitles}>
                    <p>Fecha</p>
                    <p>Tipo de Divisa</p>
                    <p>Precio de Compra</p>
                    <p>Precio Venta</p>
                </div>
                {
                    currencies.map(currency => (
                        <div className={isSelected(currency.id) ? styles.listDataSelected : styles.listData} key={currency.id} onClick={()=> setSelected(currency.id)}>
                            <p>{format(parseISO(currency.updateAt), 'd/MM/yyyy hh:mm:ss')}</p>
                            <p>{currency.name}</p>
                            <p>${currency.buyPrice}</p>
                            <p>${currency.sellPrice}</p>
                        </div>
                    ))
                }
            </div>
            <Link href='/currency'>Atrás</Link>
        </div>
    )
}