'use client'
import styles from './ListParticularPendingOperationComponent.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { BuyOperation, BuyOperationResponse, GetOperationResponseDto } from '@/models/OperationModel';
import toast, { Toaster } from 'react-hot-toast';


export default function ListParticularPendingOperationComponent(props:{operationType:string, operation:GetOperationResponseDto[]|null}) {
    const [selected, setSelected] = useState<string | null>(null)

    function isSelected(id: string): boolean {
        return id == selected;
    }
    async function onHadleClickExecute() {
        console.log('click', selected)
        if (selected == null) {
            toast.error('Debes seleccionar una operación para poder ejecutarla')
            return
        }
        try {
            const requestBody = { operationId: selected, operationTypeValue: props.operationType };
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
                const requestBody = { operationId: selected, operationTypeValue: props.operationType };
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

        function defineTextByOperationType(){
            return props.operationType == 'comprar' ? 'Compra':'Venta'
        }

        function defineStyleByOperationType(id:string){
            if(props.operationType == 'comprar'){
                return isSelected(id) ? styles.listDataSelected : styles.listDataCompra;
            }else if(props.operationType == 'vender'){
                return isSelected(id) ? styles.listDataSelected : styles.listDataVenta;
            }
        }


        return (
            <div className={styles.listSellerBase}>
                <p>De {defineTextByOperationType()}</p>
                <div className={styles.listDataBase}>
                    <div className={styles.listTitles}>
                        <p>Fecha</p>
                        <p>Hora</p>
                        <p>Apodo Cliente</p>
                        <p>Tipo de Divisa</p>
                        <p>Precio {defineTextByOperationType()}</p>
                        <p>Cantidad a {defineTextByOperationType()}</p>
                        <p>Total</p>
                    </div>
                    <div className={styles.dataContainer}>
                        {
                            props.operation && props.operation.length > 0 ? props.operation.map(operation => (
                                <div className={defineStyleByOperationType(operation.id)} key={operation.id} onClick={() => setSelected(operation.id)}>
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
                    <button onClick={() => onHadleClickExecute()}>Ejecutar</button>
                    <button onClick={() => onHadleClickCancel()}>Cancelar</button>
                    {/* <button><Link href={`/`}>Ejecutar</Link></button> */}
                </div>
                <Toaster />
            </div>
        )
    }
