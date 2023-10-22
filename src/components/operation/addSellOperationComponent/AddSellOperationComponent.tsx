'use client'
import { useState} from 'react';
import { Client } from "@/models/ClientModel";
import AddSellerOperation from "./AddSellerOperation";
import SellOperationFormComponent from "./SellOperationForm";
import { Seller } from "@/models/SellerModel";
import ListReserveComponent from "./ListReserveComponen";
import { ReserveOfBuyOperation } from "@/models/SellOperationModel";

export default function AddSellOperationComponent() {

    const [panelScreen, setPanelScreen] = useState<number>(1)
    const [clientSelected, setClientSelected] = useState<Client | null>(null)
    const [sellerSelected, setSellerSelected] = useState<Seller | null>(null)
    const [reserveOperation, setReserveOperation] = useState<ReserveOfBuyOperation[] |null>(null)
    const [reserveOperationSelected, setReserveOperationSelected] = useState<ReserveOfBuyOperation|null>(null)
    const [quantityToSell, setQuantityToSell] = useState<number>(0)
    const [sellerProfit, setSellerProfit] = useState<number>(0)
    const [sellPrice, setSellPrice] = useState<number>(0)

    function defineScreen() {
        if (panelScreen == 1) {
            return <SellOperationFormComponent
                sellerSelected={sellerSelected}
                setSellerSelected={setSellerSelected}
                setSellerProfit={setSellerProfit}
                sellerProfit={sellerProfit}
                setPanelScreen={setPanelScreen} 
                setReserveOperation={setReserveOperation}
                reserveOperationSelected={reserveOperationSelected}
                quantityToSell={quantityToSell}
                setQuantityToSell={setQuantityToSell} 
                clientSelected={clientSelected}
                setClientSelected={setClientSelected}
                sellPrice={sellPrice}
                setSellPrice={setSellPrice}
            />
        } else if (panelScreen == 2) {
            return <ListReserveComponent
            setPanelScreen={setPanelScreen}
            setReserveOperationSelected={setReserveOperationSelected}
            reserveOperation={reserveOperation}/>
        } else if (panelScreen == 3) {
            return <AddSellerOperation
                setSellerSelected={setSellerSelected}
                sellerSelected={sellerSelected}
                setSellerProfit={setSellerProfit}
                sellerProfit={sellerProfit} 
                setPanelScreen={setPanelScreen} 
                quantityToSell={quantityToSell}
                />
        }
    }

    return (
        <>
            {defineScreen()}
        </>
    )
}