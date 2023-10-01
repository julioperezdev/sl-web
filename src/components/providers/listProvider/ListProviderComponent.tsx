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
        const response = await fetch(process.env.apiUrl + '/v1/provider/get', {
            method: 'PUT',
        });
        let providerDataP: Provider[] = await response.json();
        let providerData: Provider[] = [];
        
        for(let index = 0 ; index < 7 ; index++){
            console.log('iteracion ', index)
            providerData.push(...providerDataP)
        }
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
                <button><Link href='/provider'>Atrás</Link></button>
                <button><Link href={`/provider/update/${selected}`}>Modificar</Link></button>
            </div>
        </div>
    )
}