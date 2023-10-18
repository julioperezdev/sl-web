'use client'
import { ReserveOfBuyOperation, ReserveOfBuyOperationProps } from '@/models/SellOperationModel';
import styles from './ListReserveComponent.module.css'
import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import toast from 'react-hot-toast';

export default function ListReserveComponent(props:ReserveOfBuyOperationProps) {

    const [selected, setSelected] = useState<string | null>(null)

    function isSelected(operationId:string): boolean {
        return operationId == selected;
    }

    function onClickSelectReserve(operationSelected:ReserveOfBuyOperation){
        setSelected(operationSelected.id);
        props.setReserveOperationSelected(operationSelected)
    }
    function onClickReserveOperation(){
        if(!selected){
            toast.loading('Debes seleccionar una operacion', {duration:1500})
            return;
        }
        props.setPanelScreen(1)
    }

    function onClickCancelListReserve(){
        if(selected || props.reserveOperation){
            setSelected(null);
            props.setReserveOperationSelected(null);
            props.setPanelScreen(1)
        }
    }

    return(
        <div className={styles.listProviderBase}>
            <p>Lista de Reserva</p>
            <div className={styles.listDataBase}>
                <div className={styles.listTitles}>
                    <p>Fecha Registro</p>
                    <p>Fecha Modificacion</p>
                    <p>Precio de Compra</p>
                    <p>Reserva</p>
                </div>
                <div className={styles.dataContainer}>
                {
                    props.reserveOperation!.length > 0 ?  props.reserveOperation!.map(operation => (
                        <div className={isSelected(operation.id) ? styles.listDataSelected : styles.listData} key={operation.id} onClick={()=> onClickSelectReserve(operation)}>
                            <p>{format(parseISO(operation.updatedAt!), 'd/MM/yyyy')}</p>
                            <p>{format(parseISO(operation.updatedAt!), 'hh:mm:ss')}</p>
                            <p>{operation.buyPrice}</p>
                            <p>{operation.reserve}</p>
                        </div>
                    ))
                    : <p>NO HAY DATOS</p>
                }
                </div>
            </div>
            <div className={styles.buttonBase}>
                <button onClick={()=>onClickCancelListReserve()}>Atrás</button>
                {!selected
                ? <button>Seleccionar</button>
                : <button onClick={()=>onClickReserveOperation()}>Aceptar</button>}
            </div>
        </div>
    )
}