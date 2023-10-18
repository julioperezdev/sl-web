'use client'
import styles from "./AddSellOperationComponent.module.css";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { v4 as uuid } from 'uuid'
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect, SetStateAction } from 'react';
import { format } from 'date-fns';
import { ONLY_NUMBERS_ON_STRING } from '@/models/RegexConsts';
import { useRouter } from 'next/navigation';
import { ONE_SECOUND, sleep } from '@/helper/sleepInMilli/Sleep';
import { Currency } from "@/models/CurrencyModel";
import { Client } from "@/models/ClientModel";
import { BuyOperationForm, BuyOperationRequest, BuyOperationResponse } from "@/models/OperationModel";
import AddSellerOperation from "./AddSellerOperation";
import SellOperationFormComponent from "./SellOperationForm";
import { Seller } from "@/models/SellerModel";
import ListReserveComponent from "./ListReserveComponen";
import { ReserveOfBuyOperation } from "@/models/SellOperationModel";

export default function AddSellOperationComponent() {

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<BuyOperationForm>();
    const [panelScreen, setPanelScreen] = useState<number>(1)
    const [currencies, setCurrencies] = useState<Currency[] | null>(null)
    const [currencyNameSelected, setCurrencyNameSelected] = useState<string>('')
    const [currencySelected, setCurrencySelected] = useState<Currency | null>(null)
    const [clientSelected, setClientSelected] = useState<Client | null>(null)
    const [clientName, setClientName] = useState<string | null>(null)
    const [sellerSelected, setSellerSelected] = useState<Seller | null>(null)
    const [sellerName, setSellerName] = useState<string | null>(null)
    const [assignSellerCommission, setAssignSellerCommission] = useState<boolean>(false);
    const [showSellerForm, setSellerForm] = useState(false);
    const [showSellOperation, setShowSellOperation] = useState(true);
    const [reserveOperation, setReserveOperation] = useState<ReserveOfBuyOperation[] |null>(null)
    const [reserveOperationSelected, setReserveOperationSelected] = useState<ReserveOfBuyOperation|null>(null)
    const [quantityToSell, setQuantityToSell] = useState<number>(0)
    const [buyPriceSelected, setBuyPriceSelected] = useState<number>(0)
    const [buyPrice, setBuyPrice] = useState<number>(0)
    const [quantityToBuy, setQuantityToBuy] = useState<number>(0)
    const [percentDolarSmall, setPercentDolarSmall] = useState<number>(0)
    const [amountToDolarSmall, setAmountToDolarSmall] = useState<number>(0)
    const [totalToPay, setTotalToPay] = useState<number>(0)
    const [sellerProfit, setSellerProfit] = useState<number>(0)
    const router = useRouter();


    const onClickBuyOperation = handleSubmit(async (data) => {
        try {
            if (clientSelected == null) {
                toast.error('Se debe seleccionar un Cliente para realizar la operacion')
                return;
            }
            const dataValidated = converFormData(data);
            const response = await sendForm(dataValidated);
            if (response.status == 201) {
                reset();
                toast.success('Se ha guardado exitosamente la diferencia del cliente')
                await sleep(ONE_SECOUND)
                router.replace(`/operation`)
            } else {
                toast.error('Ops... No se pudo realizar la operacion de compra')
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo realizar la operacion de compra')
        }
    }
    );

    function convertCurrencyNameToCurrencyMultiboxValue(currencyNameToConvert: string): string {
        let result;
        let availableCurrencyName: string[] = ['Dolar Grande', 'Dolar Chico y Cambio', 'Euro', 'Real'];
        let resultOfFilter = availableCurrencyName.filter(particular => particular == currencyNameToConvert);
        if (resultOfFilter.length != 1) {
            toast.error("no se ha colocado un Tipo de Divisa habilitada")
            throw new Error("Currency Name does not exist as available name");
        } else if (resultOfFilter.length > 1) {
            toast.error("no se pueden usar dos Tipos de Divisas a la vez")
            throw new Error("Currency Name only can be one");
        }
        let resultOfFiltered: string = resultOfFilter[0];

        if (resultOfFiltered === 'Dolar Grande') result = 'USD_HIGH'
        else if (resultOfFiltered === 'Dolar Chico y Cambio') result = 'USD_LOW'
        else if (resultOfFiltered === 'Euro') result = 'EURO'
        else if (resultOfFiltered === 'Real') result = 'REAL'
        return result!;
    }
    function converFormData(data: BuyOperationForm): any {
        return {
            id: uuid(),
            hasOfficeCheck: setAssignSellerCommission,
            clientId: clientSelected!.id,
            buyOperationData: [{
                operationType: "comprar",
                currencyMultiBox: convertCurrencyNameToCurrencyMultiboxValue(data.currencyMultiBox),
                buyPrice: data.buyPriceForm,
                quantity: data.quantity,
                percent: data.percent
            }]
        }
    }

    function sendForm(buyOperationRequest: BuyOperationRequest) {
        return fetch(process.env.apiUrl + '/v1/operation/create/buy', {
            method: 'PUT',
            body: JSON.stringify(buyOperationRequest),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
    }

    async function getClientByName(name: string) {
        const response = await fetch(`${process.env.apiUrl}/v1/client/get/name/${name}`, {
            method: 'PUT',
        });
        if (response.status == 204) {
            toast.error('Ops... No se pudo encontrar un cliente con ese nombre')
            setClientSelected(null)
            return
        } else if (response.status == 302) {
            toast.success('Se encontró el cliente, falta completar los otros datos')
        }
        let clientData: any = await response.json();
        setClientSelected(clientData)
    }

    async function getSellerByName(name: string) {
        console.log('llega 1')
        const response = await fetch(`${process.env.apiUrl}/v1/seller/get/name/${name}`, {
            method: 'PUT',
        });
        if (response.status == 204) {
            toast.error('Ops... No se pudo encontrar un vendedor con ese nombre')
            setSellerSelected(null)
            return
        } else if (response.status == 302) {
            toast.success('Se encontró el vendedor, falta completar los otros datos')
        }
        let sellerData: any = await response.json();
        setSellerSelected(sellerData)
    }

    const handleKeyDownClient = (event: any) => {
        if (event.key === 'Enter' && clientName != null && clientName?.trim() != "") {
            getClientByName(clientName!)
        }
    }

    const handleKeyDownToSeller = (event: any) => {
        if (event.key === 'Enter' && sellerName != null && sellerName?.trim() != "") {
            getSellerByName(sellerName)
        }
    }

    async function getLasUpdatedCurrencies() {
        const response = await fetch(`${process.env.apiUrl}/v1/currency/get/last-updated`, {
            method: 'PUT',
        });
        let currenciesData: Currency[] = await response.json();
        let dolarHigh = currenciesData.filter(particular => particular.name === 'Dolar Grande')
        setCurrencySelected(dolarHigh[0])
        setCurrencyNameSelected(dolarHigh[0].name)
        setCurrencies(currenciesData)

    }

    const handleChange = (event: { target: { value: string; }; }): any => {
        const currencyEvent: string = event.target.value;
        setCurrencyNameSelected(currencyEvent);
        let currencyFiltered: Currency = currencies?.find(particular => particular.name == currencyEvent)!
        setCurrencySelected(currencyFiltered)
    };

    const onChangeClientName = (event: any) => {
        if (clientSelected != null) {
            setClientSelected(null)
        }
        setClientName(event.target.value);
    }

    const onChangeSellerName = (event: any) => {
        if (sellerSelected != null) {
            setSellerSelected(null)
        }
        setSellerName(event.target.value);
    }

    async function eventToCalculateTotalToPay(event: any) {
        console.log(event.target.name)
        let attributeName = event.target.name;
        let value = event.target.value;
        const regexToValidateNumber = /^[0-9]+$/
        if (!regexToValidateNumber.test(value)) {
            toast.error('solo se aceptan numero en el formulario')
        } else {
            let valueTyped: number = value;
            if (attributeName == 'buyPriceForm') setBuyPrice(valueTyped);
            if (attributeName == 'quantity') setQuantityToBuy(valueTyped);
            if (attributeName == 'percent' && percentDolarSmall > 100) {
                toast.error('tiene un maximo de 100%')
            } else {
                setPercentDolarSmall(valueTyped);
            }
            if (buyPrice != 0 && quantityToBuy != 0) {
                calculateTotalToPay(buyPrice, quantityToBuy, percentDolarSmall);
            }
        }
    }

    function calculateTotalToPay(buyPrice: number, quantity: number, percent: number) {
        let result = buyPrice * quantity;
        if (percent > 0) {
            let newBuyPrice = buyPrice - ((buyPrice * percent) / 100);
            setAmountToDolarSmall(newBuyPrice);
            result = newBuyPrice * quantity
        }
        setTotalToPay(result);
    }

    useEffect(() => {
        getLasUpdatedCurrencies();
    }, [])

    function defineScreen() {
        if (panelScreen == 1) {
            return <SellOperationFormComponent
                setAssignSellerCommission={setAssignSellerCommission}
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
                setAssignSellerCommission={setAssignSellerCommission}
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