'use client'
import { Client } from '@/models/Client';
import styles from './ListClientComponent.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function ListClientComponent() {

    const [selected, setSelected] = useState<string | null>(null)
    const [clients, setClients] = useState<Client[]>([])
    const router = useRouter();

    async function getClients() {
        const response = await fetch('http://localhost:8081/api/v1/client/get', {
            method: 'POST',
        });
        let clientsData: Client[] = await response.json();
        setClients(clientsData)
    }

    function redirectById(id:string){
        console.log(id)
        router.replace(`/clients/update/${id}`)
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
                    <p>Fecha R.</p>
                    <p>Apodo Cliente</p>
                    <p>Teléfono</p>
                    <p>Dirección</p>
                    <p>Descripción</p>
                    <p>ID</p>
                </div>
                <div className={styles.dataContainer} >
                {clients.length > 0 && clients.map(client => (
                    <div className={isSelected(client.id) ? styles.listDataSelected : styles.listData} key={client.id} onClick={()=> setSelected(client.id)}>
                        <p>{format(parseISO(client.createdAt), 'd/MM/yyyy')}</p>
                        <p>{client.name}</p>
                        <p>{client.phone}</p>
                        <p>{client.address}</p>
                        <p className={styles.descriptionClass}>{client.description}</p>
                        <p className={styles.descriptionClass}>{client.id}</p>
                    </div>
                ))}
                </div>
            </div>
            <div className={styles.buttonBase}>
                <Link href='/clients'>Atrás</Link>
                <Link href={`/clients/update/${selected}`}>Modificar</Link>
            </div>
        </div>
    )
}