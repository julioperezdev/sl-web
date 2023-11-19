'use client'
import { format } from "date-fns";
import styles from "./AddWishBuyOperation.module.css"

import { BuyOperationContinue } from "@/models/OperationModel";
import { BaseSyntheticEvent } from "react";

interface AddWishBuyOperationsProps {
    listAddBuyOperation: BuyOperationContinue[];
    deleteWishOperationById: (idToDelete:string) => void;
    onClickExecuteOnlyWishList:() => Promise<void>;
}

export default function AddWishBuyOperations(props: AddWishBuyOperationsProps) {

    function shortCurrency(currencyBox: string): string {
        let result :string;
        if (currencyBox === 'Dolar Grande') result = 'USD'
        else if (currencyBox === 'Dolar Chico y Cambio') result = 'USD'
        else if (currencyBox === 'Euro') result = 'EUR'
        else if (currencyBox === 'Real') result = 'RE'
        return result!;

    }

    function totalInPesos(){
        return props.listAddBuyOperation.reduce((sum, current)=> sum + current.totalToPay, 0);
    }


    return (
        <div className={styles.AddWishBuyOperationsBase}>
            {props.listAddBuyOperation.length != 0
                ? <div className={styles.AddWishBuyOperationsExisting}>
                    <h3>Ordenes</h3>
                    <div>
                        {
                        props.listAddBuyOperation && props.listAddBuyOperation.map(particular =>(
                            <div key={particular.id} className={styles.particularWishBuyOperation}>
                                <p>{format(new Date(), 'dd/MM/yyyy')}</p>
                                <p>{particular.clientName}</p>
                                <p>{particular.clientPhone}</p>
                                <p>{particular.currencyMultiBox}</p>
                                <p>$ {particular.buyPrice}</p>
                                <p>{shortCurrency(particular.currencyMultiBox)} {particular.quantity}</p>
                                <p>$ {particular.totalToPay}</p>
                                <p className={styles.x} onClick={() => props.deleteWishOperationById(particular.id)}>X</p>
                            </div>
                        ))
                    }
                    </div>
                    {props.listAddBuyOperation 
                    ?<div className={styles.totalToPayStyle}>
                        Total en pesos : {totalInPesos()}
                    </div>
                    :<></>}
                    <div className={styles.buttonBase}>
                        <button onClick={props.onClickExecuteOnlyWishList} >Ejecutar</button>
                    </div>
                </div>
                : <></>}
        </div>
    )
}
