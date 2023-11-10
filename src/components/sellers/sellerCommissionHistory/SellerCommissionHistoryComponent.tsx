'use client'
import styles from './SellerCommissionHistoryComponent.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';

import { useRouter } from 'next/navigation';
import { SellerCommission } from '@/models/SellerCommissionModel';

export default function SellerCommissionHistoryComponent() {
    const [selected, setSelected] = useState<string | null>(null)
    const [sellerCommission, setSellerCommission] = useState<SellerCommission[]>([])
    const router = useRouter();

    async function getSellerCommission(){
        const response = await fetch(`${process.env.apiUrl}/v1/seller/commission/get/done`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
        if (response.status == 204) {
            console.log('No hay datos')
            return
        }
        let responseValue = await response.json();
        let sellerCommissionResponse: SellerCommission[] = responseValue;
        setSellerCommission(sellerCommissionResponse)
    }

    useEffect(()=>{
        getSellerCommission();
    },[])

    function isSelected(id: string): boolean {
        return id == selected;
    }
   
    return (
        <div className={styles.listSellerBase}>
            <p>Histórico de Comisiones Pagadas</p>
            <div className={styles.listDataBase}>
                <div className={styles.listTitles}>
                    <p>Fecha</p>
                    <p>Apodo Vendedor</p>
                    <p>Pesos</p>
                    <p>Cantidad Vendida</p>
                    <p>Ganancia Vendedor</p>
                    <p>ID Operación</p>
                    <p>Estado</p>
                </div>
                <div className={styles.dataContainer}>
                    {
                        sellerCommission.length > 0 ? sellerCommission.map(particular => (
                            <div className={isSelected(particular.id) ? styles.listDataSelected : styles.listData} key={particular.id} onClick={() => setSelected(particular.id)}>
                                <p>{format(parseISO(particular.date!), 'd/MM/yyyy')}</p>
                                <p>{particular.sellerName}</p>
                                <p>{particular.pesos}</p>
                                <p>{particular.quantity}</p>
                                <p>{particular.sellerProfit}</p>
                                <p>{particular.operationId}</p>
                                <p>{particular.status}</p>
                            </div>
                        ))
                            : <p>NO HAY DATOS</p>
                    }
                </div>
            </div>
            <div className={styles.buttonBase}>
                <button><Link href={`/sellers`}>Atrás</Link></button>
                <button>Pagar</button>
            </div>
        </div>
    )
}