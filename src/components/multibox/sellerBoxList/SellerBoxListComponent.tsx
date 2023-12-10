'use client'
import styles from './SellerBoxListComponent.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { SellerBoxResponse } from '@/models/SellerBoxModel';
import { convertCurrencyMask } from '@/helper/numberConverter/NumberConverter';

export default function SellerBoxListComponent(props: { name: string }) {
    const [selected, setSelected] = useState<string | null>(null)
    const [boxList, setBoxList] = useState<SellerBoxResponse[]>([])
    const router = useRouter();


    async function getMultiboxByName() {
        const response = await fetch(`${process.env.apiUrl}/v1/box/seller-box/get/${props.name}`, {
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
        let currencyBoxData: SellerBoxResponse[] = responseValue;
        setBoxList(currencyBoxData)
    }
    useEffect(() => {
        getMultiboxByName();
    }, [])

    function isSelected(id: string): boolean {
        return id == selected;
    }
    
    function isIngressOrEgressOperation(operationType: string) {
    
            //ingreso true
            if (operationType === 'asignar caja') return true;
            else if (operationType === 'ingreso efectivo') return true;

            //egreso false
            else if (operationType === 'egreso efectivo') return false;
    }

    function redirectAuxPage(){
        router.replace(`/multibox/auxiliar/SELLER_BOX_${props.name}`)
    }

    function returnOperationType(operationString:string){
        if(operationString == 'asignar caja') return 'Asignar caja';
        else if(operationString == 'ingreso efectivo') return 'Ingreso Manual';
        else if(operationString == 'egreso efectivo') return 'Egreso Manual';
        else return operationString;
        
    }
    return (
        <div className={styles.listSellerBase}>
            <button onClick={redirectAuxPage} className={styles.auxiliarButton}>Boton auxiliar</button>
            <p> Caja {props.name}</p>
            <p className={styles.boxQuantity}>Saldo: {boxList.length > 0 ? convertCurrencyMask(boxList[0].quantity) : 0}</p>
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
                            <div className={isSelected(box.id) ? styles.listDataSelected : styles.listData} key={box.id} onClick={() => setSelected(box.id)}>
                                <p>{format(parseISO(box.updatedAt!), 'd/MM/yyyy')}</p>
                                <p>{format(parseISO(box.updatedAt!), 'hh:mm:ss')}</p>
                                <p>{returnOperationType(box.operationType)}</p>
                                <p>{isIngressOrEgressOperation(box.operationType) ? convertCurrencyMask(box.quantityOperation) : '-'}</p>
                                <p>{isIngressOrEgressOperation(box.operationType) ? '-' : convertCurrencyMask(box.quantityOperation)}</p>
                                <p>{convertCurrencyMask(box.quantity)}</p>
                            </div>
                        ))
                            : <p>NO HAY DATOS</p>
                    }
                </div>
            </div>
            <div className={styles.buttonBase}>
                <button><Link href={`/multibox`}>Atrás</Link></button>
            </div>
        </div>
    )
}