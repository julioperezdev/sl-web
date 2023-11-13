'use client'
import { format } from "date-fns";
import styles from "./AddWishBuyOperation.module.css"

import { BuyOperationContinue } from "@/models/OperationModel";

interface AddWishBuyOperationsProps {
    listAddBuyOperation: BuyOperationContinue[];
    deleteWishOperationById: (idToDelete:string) => void;
}

export default function AddWishBuyOperations(props: AddWishBuyOperationsProps) {


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
                                <p>EUR {particular.quantity}</p>
                                <p>$ {particular.totalToPay}</p>
                                <p className={styles.x} onClick={() => props.deleteWishOperationById(particular.id)}>X</p>
                            </div>
                        ))
                    }
                    </div>
                </div>
                : <></>}
        </div>
    )
}
