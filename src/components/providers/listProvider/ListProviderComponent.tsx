'use client'
import styles from './ListProviderComponent.module.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { Provider } from '@/models/ProviderModel';

export default function ListProviderComponent() {

    const [selected, setSelected] = useState<string | null>(null)
    const [providers, setProviders] = useState<Provider[]>([])

    async function getProviders() {
        const response = await fetch('http://localhost:8081/api/v1/provider/get', {
            method: 'PUT',
        });
        let providerData: Provider[] = await response.json();
        setProviders(providerData)
    }
    useEffect(() => {
        getProviders();
    }, [])

    function isSelected(id:string):boolean{
        return id == selected;
    }

    return(
        <div className={styles.listProviderBase}>
            <p>Lista de Proveedor</p>
            <div className={styles.listDataBase}>
                <div className={styles.listTitles}>
                    <p>Fecha R.</p>
                    <p>Apodo Proveedor</p>
                    <p>Número de Teléfono</p>
                    <p>Dirección</p>
                    <p>ID</p>
                </div>
                <div className={styles.dataContainer}>
                {
                    providers.map(provider => (
                        <div className={isSelected(provider.id) ? styles.listDataSelected : styles.listData} key={provider.id} onClick={()=> setSelected(provider.id)}>
                            <p>{format(parseISO(provider.createdAt!), 'd/MM/yyyy')}</p>
                            <p>{provider.name}</p>
                            <p>{provider.phone}</p>
                            <p>{provider.address}</p>
                            <p>{provider.id}</p>
                        </div>
                    ))
                }
                </div>
            </div>
            <div className={styles.buttonBase}>
                <Link href='/provider'>Atrás</Link>
                <Link href={`/provider/update/${selected}`}>Modificar</Link>
            </div>
        </div>
    )
}