'use client'
import styles from './UpdateCurrencyComponent.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";

export default function UpdateCurrencyComponent() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<any>();

    const onSubmit = handleSubmit(async (data) => {
        
      });

    return (
        <form onSubmit={onSubmit} className={styles.formBase}>
            <Image src={'/notes.png'} alt='Icono para indicar una nueva cotizacion' width={80} height={80} />
            <p>Actualizar Cotizacion</p>
            <select>
                <option value="">Dolar Grande</option>
                <option value="">Dolar Chico</option>
                <option value="">Euro</option>
                <option value="">Real</option>
                
            </select>
            <div className={styles.priceBase}>
                <p className={styles.priceToBuy}>$780</p>
                <p className={styles.priceToSell}>$787</p>
            </div>
            <div>
                <button id="formSubmit" type="submit" ><Link href='/currency'>Cancelar</Link></button>
                <button id="formSubmit" type="submit" >Guardar</button>
            </div>
        </form>
    )
  }