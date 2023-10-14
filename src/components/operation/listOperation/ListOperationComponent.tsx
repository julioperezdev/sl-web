'use client'
import styles from './ListOperationComponent.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { BuyOperation, BuyOperationResponse } from '@/models/OperationModel';

export default function ListOperationComponent() {
    const [selected, setSelected] = useState<string | null>(null)
    const [operations, setOperations] = useState<BuyOperationResponse[]>([])

    async function getOperations() {
        const response = await fetch(process.env.apiUrl + '/v1/operation/get', {
            method: 'PUT',
        });
        if(response.status == 204){
            console.log('No hay datos')
            return 
        }
        let responseValue = await response.json();
        console.log(responseValue)
        let buyOperationData: BuyOperationResponse[] = responseValue;
        setOperations(buyOperationData)
    }
    useEffect(() => {
        getOperations();
    }, [])

    function isSelected(id:string):boolean{
        return id == selected;
    }
    return (
        <div className={styles.listSellerBase}>
            <p>Operaciones pendiente</p>
            <p>De Compra</p>
            <div className={styles.listDataBase}>
                <div className={styles.listTitles}>
                    <p>Fecha</p>
                    <p>Hora</p>
                    <p>Apodo Cliente</p>
                    <p>Tipo de Divisa</p>
                    <p>Precio Compra</p>
                    <p>Cantidad a Comprar</p>
                    <p>Total</p>
                </div>
                <div className={styles.dataContainer}>
                {
                    operations.length > 0 ? operations.map(operation => (
                        <div className={isSelected(operation.id) ? styles.listDataSelected : styles.listData} key={operation.id} onClick={()=> setSelected(operation.id)}>
                            <p>{format(parseISO(operation.updatedAt!), 'd/MM/yyyy')}</p>
                            <p>{format(parseISO(operation.updatedAt!), 'hh:mm:ss')}</p>
                            <p>{operation.clientName}</p>
                            <p>{operation.currencyMultiBox}</p>
                            <p>{operation.price}</p>
                            <p>{operation.quantity}</p>
                            <p>{operation.total}</p>
                        </div>
                    ))
                    : <p>NO HAY DATOS</p>
                }
                </div>
            </div>
            <div className={styles.buttonBase}>
                <button><Link href='/operation'>Atrás</Link></button>
                {/* <button><Link href={`/sellers/update/${selected}`}>Modificar</Link></button> */}
                <button><Link href={`/`}>Ejecutar</Link></button>
            </div>
        </div>
    )
}