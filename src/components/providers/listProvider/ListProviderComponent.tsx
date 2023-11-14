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
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
        if(response.status == 204){
            console.log('No hay datos')
            return 
        }
        let responseValue = await response.json();
        let providerData: Provider[] = responseValue;
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
            <p>Lista de Proveedores</p>
            <div className={styles.listDataBase}>
                <div className={styles.listTitles}>
                    <p>Fecha R.</p>
                    <p>Fecha Modificacion</p>
                    <p>Apodo Proveedor</p>
                    <p>Número de Teléfono</p>
                    <p>Dirección</p>
                    <p>ID</p>
                </div>
                <div className={styles.dataContainer}>
                {
                    providers.length > 0 ?  providers.map(provider => (
                        <div className={isSelected(provider.id) ? styles.listDataSelected : styles.listData} key={provider.id} onClick={()=> setSelected(provider.id)}>
                            <p>{format(parseISO(provider.createdAt!), 'd/MM/yyyy')}</p>
                            <p>{format(parseISO(provider.updatedAt!), 'd/MM/yyyy')}</p>
                            <p>{provider.name}</p>
                            <p>{provider.phone}</p>
                            <p>{provider.address}</p>
                            <p>{provider.id}</p>
                        </div>
                    ))
                    : <p>NO HAY DATOS</p>
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