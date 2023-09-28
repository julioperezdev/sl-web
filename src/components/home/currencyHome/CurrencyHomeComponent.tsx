'use client'
import styles from './CurrencyHomeComponent.module.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { Currency } from '@/models/CurrencyModel';

export default function CurrencyHomeComponent() {
    const [currency, setCurrency] = useState<Currency | null>(null)

    async function getCurrencyByName() {
        const response = await fetch(`http://localhost:8081/api/v1/currency/get/name/usd`, {
            method: 'PUT',
        });
        let currenciesData: Currency = await response.json();
        console.log(currenciesData)
        setCurrency(currenciesData)
    }
    useEffect(() => {
        getCurrencyByName();
    }, [])

    return (
        <div>
            {!currency ? <p>CARGANDO...</p>:
            <div className={styles.currencyUsd}>
            <p>DOLAR GRANDE</p>
            <div>
                <p>${currency?.buyPrice}</p>
                <p>${currency?.sellPrice}</p>
            </div>
            <p>${format(parseISO(currency?.updateAt!), 'd/MM/yyyy')}</p>
        </div>
            }
            <div>
                <iframe src="https://dolarhoy.com/i/cotizaciones/dolar-blue" frameBorder="0">
                <style jsx>
                    {`
                    iframe{
                        width:320px;
                        height:260px;
                        border-radius:10px;
                        box-shadow:2px 4px 4px rgb(0 0 0 / 25%);
                        display:flex;
                        justify-content:center;
                        border:1px solid #bcbcbc; 
                    }
                    `}
                </style>
                </iframe>
            </div>
          
        </div >
    )
}