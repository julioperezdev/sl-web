'use client'
import styles from './CurrencyHomeComponent.module.css'
import Link from 'next/link';
import Image from 'next/image';
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
        <div className={styles.currencyHomeBase}>
            <div>
                {!currency ?
                    <div className={styles.currencyUsd}>
                        <Image src={'/SL-logo-transparent.png'} alt='fff' width={50} height={50} />
                        <h3 className={styles.title}>DÓLAR GRANDE</h3>
                        <div>
                            <p className={styles.buyPrice}>$000.00</p>
                            <p className={styles.sellPrice}>$000.00</p>
                            <p className={styles.currencyDescription}>Compra</p>
                            <p className={styles.currencyDescription}>Venta</p>
                        </div>
                        <p className={styles.dates}>Actualizado: {format(new Date(), 'd/MM/yyyy hh:mm:ss')}</p>
                    </div> :
                    <div className={styles.currencyUsd}>
                        <Image src={'/SL-logo-transparent.png'} alt='fff' width={50} height={50} />
                        <h3 className={styles.title}>DÓLAR GRANDE</h3>
                        <div>
                            <p className={styles.buyPrice}>${currency?.buyPrice}.00</p>
                            <p className={styles.sellPrice}>${currency?.sellPrice}.00</p>
                            <p className={styles.currencyDescription}>Compra</p>
                            <p className={styles.currencyDescription}>Venta</p>
                        </div>
                        <p className={styles.dates}>Actualizado: {format(parseISO(currency?.updateAt!), 'd/MM/yyyy hh:mm:ss')}</p>
                    </div>
                }
                <div>
                    <iframe src="https://dolarhoy.com/i/cotizaciones/dolar-blue">
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
            </div>

            <Link href={'/currency/update'}>Actualizar Cotización</Link>

        </div >
    )
}