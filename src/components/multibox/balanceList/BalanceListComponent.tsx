'use client'
import styles from './BalanceListComponent.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { CurrencyBox, CurrencyBoxResponse } from '@/models/MultiboxModel';
import { useRouter } from 'next/navigation';
import { BalanceResponse } from '@/models/BalanceModel';
import { convertCurrencyMask } from '@/helper/numberConverter/NumberConverter';

export default function BalanceListComponent() {
    const [selected, setSelected] = useState<string | null>(null)
    const [balanceList, setBalanceList] = useState<BalanceResponse[]>([])
    const router = useRouter();


    async function getMultiboxByName() {
        const response = await fetch(`${process.env.apiUrl}/v1/box/balance/get`, {
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
        let balanceData: BalanceResponse[] = responseValue;
        setBalanceList(balanceData)
    }
    useEffect(() => {
        getMultiboxByName();
    }, [])

    function isSelected(id: string): boolean {
        return id == selected;
    }
    
    function isIngressOrEgressOperation(operationType: string) {
       
            //ingreso true
            if (operationType === 'ganancia final')return true;

            //egreso false
            else if (operationType === 'asignar caja') return false;
            //else if (operationType === 'asignar caja 2') return false;
    }

    function redirectAuxPage(){
        router.replace(`/multibox/auxiliar/BALANCE`)
    }

    function returnOperationType(operationString:string){
        if(operationString == 'ganancia final') return 'Ganancia Final';
        else if(operationString == 'asignar caja') return 'Comisión Caja';
        else if(operationString == 'asignar caja 2') return 'Comisión Caja 2';
        else return operationString;
        
    }
    return (
        <div className={styles.listSellerBase}>
            <button onClick={redirectAuxPage} className={styles.auxiliarButton}>Boton auxiliar</button>
            <p>Balance</p>
            <p className={styles.boxQuantity}>Saldo: {balanceList.length > 0 ? convertCurrencyMask(balanceList[0].profit) : 0}</p>
            <div className={styles.listDataBase}>
                <div className={styles.listTitles}>
                    <p>Fecha</p>
                    <p>Hora</p>
                    <p>Movimiento</p>
                    {/* <p>Estatus</p> */}
                    <p>Ingreso</p>
                    <p>Egreso</p>
                    <p>Saldo Acumulado</p>
                </div>
                <div className={styles.dataContainer}>
                    {
                        balanceList.length > 0 ? balanceList.map(box => (
                            <div className={isSelected(box.id) ? styles.listDataSelected : styles.listData} key={box.id} onClick={() => setSelected(box.id)}>
                                <p>{format(parseISO(box.updatedAt!), 'd/MM/yyyy')}</p>
                                <p>{format(parseISO(box.updatedAt!), 'hh:mm:ss')}</p>
                                <p>{returnOperationType(box.operationType)}</p>
                                <p>{isIngressOrEgressOperation(box.operationType) ? convertCurrencyMask(box.quantityOperation) : '-'}</p>
                                <p>{isIngressOrEgressOperation(box.operationType) ? '-' : convertCurrencyMask(box.quantityOperation)}</p>
                                <p>{convertCurrencyMask(box.profit)}</p>
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