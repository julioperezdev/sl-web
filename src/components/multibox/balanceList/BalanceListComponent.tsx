'use client'
import styles from './BalanceListComponent.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { CurrencyBox, CurrencyBoxResponse } from '@/models/MultiboxModel';
import { useRouter } from 'next/navigation';

export default function BalanceListComponent() {
    const [selected, setSelected] = useState<string | null>(null)
    const [boxList, setBoxList] = useState<CurrencyBoxResponse[]>([])
    const router = useRouter();


    async function getMultiboxByName() {
        const response = await fetch(`${process.env.apiUrl}/v1/box/get/balance`, {
            method: 'PUT',
        });
        if (response.status == 204) {
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

    function isSelected(id: string): boolean {
        return id == selected;
    }
    
    function isIngressOrEgressOperation(operationType: string, operationStatus: string) {
       
            //ingreso true
            if (operationType === 'comprar' && operationStatus != 'cancelado' || operationType === 'ingreso efectivo') return true;
            else if (operationType === 'vender' && operationStatus == 'cancelado') return true;

            //egreso false
            else if (operationType === 'comprar' && operationStatus == 'cancelado') return false;
            else if (operationType === 'vender' && operationStatus != 'cancelado') return false;
    }

    function redirectAuxPage(){
        //router.replace(`/multibox/${multiboxName.multiboxName}/aux`)
    }

    function returnOperationType(operationString:string){
        if(operationString == 'comprar') return 'Compra';
        else if(operationString == 'vender') return 'Venta';
        else if(operationString == 'ingreso efectivo') return 'Ingreso Manual';
        else if(operationString == 'pago deuda') return 'Pago Deuda Oficina';
        else return operationString;
        
    }
    return (
        <div className={styles.listSellerBase}>
            <button onClick={redirectAuxPage} className={styles.auxiliarButton}>Boton auxiliar</button>
            <p>Balance</p>
            <div className={styles.listDataBase}>
                <div className={styles.listTitles}>
                    <p>Fecha</p>
                    <p>Hora</p>
                    <p>Estatus</p>
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
                                <p>{box.status}</p>
                                <p>{returnOperationType(box.operationType)}</p>
                                <p>{isIngressOrEgressOperation(box.operationType, box.status) ? box.quantityOperation : '-'}</p>
                                <p>{isIngressOrEgressOperation(box.operationType, box.status) ? '-' : box.quantityOperation}</p>
                                <p>{box.quantity}</p>
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