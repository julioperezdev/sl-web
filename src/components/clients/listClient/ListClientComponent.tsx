'use client'
import { Client } from '@/models/ClientModel';
import styles from './ListClientComponent.module.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';

export default function ListClientComponent() {

    const [selected, setSelected] = useState<string | null>(null)
    const [clients, setClients] = useState<Client[]>([])

    async function getClients() {
        const response = await fetch(`${process.env.apiUrl}/v1/client/get`, {
            method: 'POST',
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
        let clientsData: Client[] = responseValue;
        setClients(clientsData)
    }

    useEffect(() => {
        getClients();
    }, [])

    function isSelected(id:string):boolean{
        return id == selected;
    }
    return (
        <div className={styles.listClientBase}>
        
            <p>Lista de Clientes</p>
            <div className={styles.listDataBase}>
                <div className={styles.listTitles}>
                    <p>Fecha Registro</p>
                    <p>Fecha Modificacion</p>
                    <p>Apodo Cliente</p>
                    <p>Teléfono</p>
                    <p>Dirección</p>
                    <p>Descripción</p>
                    <p>ID</p>
                </div>
                <div className={styles.dataContainer} >
                {clients.length > 0 ? clients.map(client => (
                    <div className={isSelected(client.id) ? styles.listDataSelected : styles.listData} key={client.id} onClick={()=> setSelected(client.id)}>
                        <p>{format(parseISO(client.createdAt), 'd/MM/yyyy')}</p>
                        <p>{format(parseISO(client.updatedAt), 'd/MM/yyyy')}</p>
                        <p>{client.name}</p>
                        <p>{client.phone}</p>
                        <p>{client.address}</p>
                        <p className={styles.descriptionClass}>{client.description}</p>
                        <p className={styles.descriptionClass}>{client.id}</p>
                    </div>
                )) : <p>NO HAY DATOS</p>}
                </div>
            </div>
            <div className={styles.buttonBase}>
                <button><Link className={styles.particularLink} href='/clients'>Atrás</Link></button>
                <button><Link className={styles.particularLink} href={`/clients/update/${selected}`}>Modificar</Link></button>
            </div>
        </div>
    )
}