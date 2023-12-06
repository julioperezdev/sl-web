'use client'
import styles from './ListPendingOperationComponent.module.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { BuyOperation, BuyOperationResponse, GetBuyAndSellOperationResponseDto, GetOperationResponseDto } from '@/models/OperationModel';
import toast, { Toaster } from 'react-hot-toast';
import ListParticularPendingOperationComponent from './ListParticularPendingOperationComponent';

export default function ListPendingOperationComponent() {
    const [selected, setSelected] = useState<number>(1)

    //const [operations, setOperations] = useState<GetBuyAndSellOperationResponseDto | null>(null)
    const [hasData, setHasData] = useState<boolean>(false)
    const [buyOperations, setBuyOperations] = useState<GetOperationResponseDto[] | null>(null)
    const [sellOperations, setSellOperations] = useState<GetOperationResponseDto[] | null>(null)
    const [totalBuyPending, setTotalBuyPending] = useState<number | null>(null)
    const [totalSellPending, setTotalSellPending] = useState<number | null>(null)

    async function getOperations() {
        const response = await fetch(process.env.apiUrl + '/v1/operation/get/pending', {
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
        console.log(responseValue)
        setHasData(true);
        let pendingOperationData: GetBuyAndSellOperationResponseDto = responseValue;
        if(pendingOperationData.buyOperation) setBuyOperations(pendingOperationData.buyOperation)
        if(pendingOperationData.sellOperation) setSellOperations(pendingOperationData.sellOperation)
        totalByPendingOperation(pendingOperationData);
    }
    useEffect(() => {
        getOperations();
    }, [])


    function totalByPendingOperation(pendingOperationData:GetBuyAndSellOperationResponseDto){
        if(pendingOperationData.buyOperation){
            let totalBuy = pendingOperationData.buyOperation
            .map(particular => particular.total)
            .reduce((previous,current) => previous+current, 0);

            setTotalBuyPending(totalBuy);
        }
        if(pendingOperationData.sellOperation){
            let totalSell = pendingOperationData.sellOperation
            .map(particular => particular.total)
            .reduce((previous,current) => previous+current, 0);

            setTotalSellPending(totalSell);
        }
    }

    async function onHadleClickExecute() {
        console.log('click', selected)
        if (selected == null) {
            toast.error('Debes seleccionar una operación para poder ejecutarla', { duration: 5000 })
            return
        }
        try {
            const requestBody = { operationId: selected, operationTypeValue: 'comprar' };
            console.log(requestBody)
            const response = await fetch(process.env.apiUrl + '/v1/operation/pending', {
                method: 'PUT',
                body: JSON.stringify(requestBody),
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
            if (responseValue === true) toast.success('Se pudo ejecutar la operación', { duration: 5000 })
        } catch (error) {
            toast.error('No se pudo realizar la operación', { duration: 5000 })
        }
    }

        async function onHadleClickCancel() {
            console.log('click', selected)
            if (selected == null) {
                toast.error('Debes seleccionar una operación para poder ejecutarla', { duration: 5000 })
                return
            }
            try {
                const requestBody = { operationId: selected, operationTypeValue: 'comprar' };
                console.log(requestBody)
                const response = await fetch(process.env.apiUrl + '/v1/operation/cancel', {
                    method: 'PUT',
                    body: JSON.stringify(requestBody),
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
                if (responseValue === true) toast.success('Se pudo ejecutar la operación', { duration: 5000 })
            } catch (error) {
                toast.error('No se pudo realizar la operación', { duration: 5000 })
            }


        }
        //debe existir un diseño para diferenciar las solicitudes pendientes y realizadas, o agregarle el campo en la lista

        function showScreenByNumber(){
            // if(selected == 0) return <div className={styles.blankDiv}></div>
            if(selected == 1) return <ListParticularPendingOperationComponent operation={buyOperations} operationType='comprar' setOperation={setBuyOperations} totalPending={totalBuyPending}/>
            if(selected == 2) return <ListParticularPendingOperationComponent operation={sellOperations} operationType='vender'setOperation={setSellOperations} totalPending={totalSellPending}/>
        }
        return (
            <div className={styles.listSellerBase}>
                <p>Operaciones pendiente</p>
                <div className={styles.panelBase}>
                    <p className={styles.buyText} onClick={()=>setSelected(1)}>Compras</p>
                    <p className={styles.sellText} onClick={()=>setSelected(2)}>Ventas</p>
                </div>
                {showScreenByNumber()}
            </div>
        )
    }
