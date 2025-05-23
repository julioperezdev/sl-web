'use client'
import styles from './ListSellerComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { Seller } from '@/models/SellerModel';

export default function ListSellerComponent() {
    const [selected, setSelected] = useState<string | null>(null)
    const [sellers, setSellers] = useState<Seller[]>([])

    async function getSellers() {
        const response = await fetch(process.env.apiUrl + '/v1/seller/get', {
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
        let sellerData: Seller[] = responseValue;
        setSellers(sellerData)
    }
    useEffect(() => {
        getSellers();
    }, [])

    function isSelected(id:string):boolean{
        return id == selected;
    }
    return (
        <div className={styles.listSellerBase}>
            <p>Lista de Vendedores</p>
            <div className={styles.listDataBase}>
                <div className={styles.listTitles}>
                    <p>Fecha Registro</p>
                    <p>Fecha Modificacion</p>
                    <p>Apodo Vendedor</p>
                    <p>Telefono</p>
                    <p>Descripción</p>
                    <p>ID</p>
                </div>
                <div className={styles.dataContainer}>
                {
                    sellers.length > 0 ? sellers.map(seller => (
                        <div className={isSelected(seller.id) ? styles.listDataSelected : styles.listData} key={seller.id} onClick={()=> setSelected(seller.id)}>
                            <p>{format(parseISO(seller.createdAt!), 'd/MM/yyyy')}</p>
                            <p>{format(parseISO(seller.updatedAt!), 'd/MM/yyyy')}</p>
                            <p>{seller.name}</p>
                            <p>{seller.phone}</p>
                            <p className={styles.description}>{seller.description}</p>
                            <p>{seller.id}</p>
                        </div>
                    ))
                    : <p>NO HAY DATOS</p>
                }
                </div>
            </div>
            <div className={styles.buttonBase}>
                <button><Link href='/sellers'>Atrás</Link></button>
                <button><Link href={`/sellers/update/${selected}`}>Modificar</Link></button>
            </div>
        </div>
    )
}