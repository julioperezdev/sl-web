'use client'
import styles from './ListDoneOperationBase.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { BuyOperation, BuyOperationResponse, GetBuyAndSellOperationResponseDto, GetOperationResponseDto } from '@/models/OperationModel';
import toast, { Toaster } from 'react-hot-toast';
import ListParticularDoneOperation from './ListParticularDoneOperation';

export default function ListDoneOperationBase() {
    const [selected, setSelected] = useState<number>(1)

    //const [operations, setOperations] = useState<GetBuyAndSellOperationResponseDto | null>(null)
    const [hasData, setHasData] = useState<boolean>(false)
    const [buyOperations, setBuyOperations] = useState<GetOperationResponseDto[] | null>(null)
    const [sellOperations, setSellOperations] = useState<GetOperationResponseDto[] | null>(null)

    async function getOperations() {
        const response = await fetch(process.env.apiUrl + '/v1/operation/get/done', {
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
    }
    useEffect(() => {
        getOperations();
    }, [])

    async function onHadleClickExecute() {
        console.log('click', selected)
        if (selected == null) {
            toast.error('Debes seleccionar una operación para poder ejecutarla')
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
            if (responseValue === true) toast.success('Se pudo ejecutar la operación')
        } catch (error) {
            toast.error('No se pudo realizar la operación')
        }
    }

        async function onHadleClickCancel() {
            console.log('click', selected)
            if (selected == null) {
                toast.error('Debes seleccionar una operación para poder ejecutarla')
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
                if (responseValue === true) toast.success('Se pudo ejecutar la operación')
            } catch (error) {
                toast.error('No se pudo realizar la operación')
            }


        }
        //debe existir un diseño para diferenciar las solicitudes pendientes y realizadas, o agregarle el campo en la lista

        function showScreenByNumber(){
            // if(selected == 0) return <div className={styles.blankDiv}></div>
            if(selected == 1) return <ListParticularDoneOperation operation={buyOperations} operationType='comprar'/>
            if(selected == 2) return <ListParticularDoneOperation operation={sellOperations} operationType='vender'/>
        }
        return (
            <div className={styles.listSellerBase}>
                <p>Histórico de Operaciones</p>
                <div className={styles.panelBase}>
                    <p className={styles.buyText} onClick={()=>setSelected(1)}>Compras</p>
                    <p className={styles.sellText} onClick={()=>setSelected(2)}>Ventas</p>
                </div>
                {showScreenByNumber()}
            </div>
        )
    }
