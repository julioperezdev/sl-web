'use client'
import styles from './MultiboxListComponent.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { CurrencyBox, CurrencyBoxResponse } from '@/models/MultiboxModel';
import { useRouter } from 'next/navigation';

export default function MultiboxListComponent(multiboxName: { multiboxName: string }) {
    const [selected, setSelected] = useState<string | null>(null)
    const [boxList, setBoxList] = useState<CurrencyBoxResponse[]>([])
    const router = useRouter();

    async function getMultiboxByName() {
        const response = await fetch(`${process.env.apiUrl}/v1/box/get/${multiboxName.multiboxName}`, {
            method: 'PUT',
        });
        if(response.status == 204){
            console.log('No hay datos')
            return 
        }
        let responseValue = await response.json();
        let currencyBoxData: CurrencyBoxResponse[] = responseValue;
        setBoxList(currencyBoxData)
    }
    useEffect(() => {
        getMultiboxByName();
    }, [])

    function isSelected(id:string):boolean{
        return id == selected;
    }
    function isForeignCurrency():boolean{
        const foreignCurrencyAvailables:string[] = ['USD HIGH','USD LOW','EURO','REAL'];
        let foreignCurrencyFiltered = foreignCurrencyAvailables.filter(particular => multiboxName.multiboxName == particular);
        return foreignCurrencyFiltered.length > 1;
    }
    return (
        <div className={styles.listSellerBase}>
            <p>Caja en {multiboxName.multiboxName}</p>
            <div className={styles.listDataBase}>
                <div className={styles.listTitles}>
                    <p>Fecha</p>
                    <p>Hora</p>
                    <p>Movimiento</p>
                    <p>Ingreso</p>
                    <p>Egreso</p>
                    <p>Saldo Acumulado</p>
                </div>
                <div className={styles.dataContainer}>
                {
                    boxList.length > 0 ? boxList.map(box => (
                        <div className={isSelected(box.id) ? styles.listDataSelected : styles.listData} key={box.id} onClick={()=> setSelected(box.id)}>
                            <p>{format(parseISO(box.updatedAt!), 'd/MM/yyyy')}</p>
                            <p>{format(parseISO(box.updatedAt!), 'hh:mm:ss')}</p>
                            <p>{box.operationType}</p>
                            <p>{box.operationType === 'comprar' ? '-' : box.quantityOperation}</p>
                            <p>{box.operationType === 'vender' ? '-' : box.quantityOperation}</p>
                            <p>{box.quantity}</p>
                        </div>
                    ))
                    : <p>NO HAY DATOS</p>
                }
                </div>
            </div>
            <div className={styles.buttonBase}>
                <button><Link href={isForeignCurrency() ? `/multibox/foreign-currency` : `/multibox`}>Atrás</Link></button>
                <button><Link href={`/multibox`}>Modificar</Link></button>
            </div>
        </div>
    )
}