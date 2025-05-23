'use client'
import { DifferenceClient, DifferenceClientDtoResponse } from '@/models/DifferenceClientModel';
import styles from './ListDifferenceComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import toast from 'react-hot-toast';

export default function ListDifferenceComponent() {
    const [selected, setSelected] = useState<string | null>(null)
    const [differences, setDifferences] = useState<DifferenceClientDtoResponse[]>([])

    async function getDifferenceClients() {
        const response = await fetch(process.env.apiUrl + '/v1/client/difference/get', {
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
        let differenceData: DifferenceClientDtoResponse[] = responseValue;
        setDifferences(differenceData)
    }
    useEffect(() => {
        getDifferenceClients();
    }, [])

    function isSelected(id:string):boolean{
        return id == selected;
    }

    async function deleteDifferenceById(id:string){
        const response = await fetch(`${process.env.apiUrl}/v1/client/difference/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
        if(response.status == 501){
            toast.error('No se pudo borrar, intente nuevamente', { duration: 5000 })
            return;
        }
        let differencesFiltered = differences.filter(particular => particular.id != id);
        setDifferences(differencesFiltered)
    }
    return (
        <div className={styles.listDifferenceBase}>
            <p>Histórico de Diferencias</p>
            <div className={styles.listDataBase}>
                <div className={styles.listTitles}>
                    <p>Fecha Registro</p>
                    <p>Fecha Modificacion</p>
                    <p>Apodo Cliente</p>
                    <p>Faltante / Sobrante</p>
                    <p>Importe</p>
                    <p>Detalle Inconveniente</p>
                    <p>Estado</p>
                    <p>ID</p>
                </div>
                <div className={styles.dataContainer}>
                {
                    differences.length > 0 ? differences.map(difference => (
                        <div className={isSelected(difference.id) ? styles.listDataSelected : styles.listData} key={difference.id} onClick={()=> setSelected(difference.id)}>
                            <p>{format(parseISO(difference.createdAt), 'd/MM/yyyy')}</p>
                            <p>{format(parseISO(difference.updatedAt), 'd/MM/yyyy')}</p>
                            <p>{difference.clientName}</p>
                            <p>{difference.differenceType}</p>
                            <p>${difference.amount}</p>
                            <p>{difference.description}</p>
                            <p>{difference.differenceStatus}</p>
                            <p>{difference.id}</p>
                            <p className={styles.deleteButton} onClick={()=>deleteDifferenceById(difference.id)}>X</p>
                        </div>
                    ))
                    : <p>No hay datos</p>
                }
                </div>
            </div>
            <div className={styles.buttonBase}>
                <button><Link className={styles.particularLink} href='/clients/difference'>Atrás</Link></button>
                <button><Link className={styles.particularLink} href={`/clients/difference/update/${selected}`}>Modificar</Link></button>
            </div>
        </div>
    )
}