'use client'
import styles from './SellOperationForm.module.css'
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { v4 as uuid } from 'uuid'
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { format } from 'date-fns';
import { ONLY_NUMBERS_ON_STRING } from '@/models/RegexConsts';
import { useRouter } from 'next/navigation';
import { ONE_SECOUND, sleep } from '@/helper/sleepInMilli/Sleep';
import { Currency } from "@/models/CurrencyModel";
import { Client } from "@/models/ClientModel";
import { BuyOperationForm, BuyOperationRequest, BuyOperationResponse } from "@/models/OperationModel";
import AddSellerOperation from "./AddSellerOperation";
import { Seller } from '@/models/SellerModel';
import { ReserveOfBuyOperation, SellOperationForm } from '@/models/SellOperationModel';

interface SellOperationFormProps {
    sellerSelected: Seller|null;
    setSellerSelected: Dispatch<SetStateAction<Seller | null>>;
    setAssignSellerCommission: Dispatch<SetStateAction<boolean>>;
    setSellerProfit:Dispatch<SetStateAction<number>>;
    sellerProfit:number;
    setPanelScreen:Dispatch<SetStateAction<number>>;
    setReserveOperation:Dispatch<ReserveOfBuyOperation[] |null>;
    reserveOperationSelected: ReserveOfBuyOperation | null;
    quantityToSell:number;
    setQuantityToSell:Dispatch<SetStateAction<number>>;
    clientSelected:Client | null;
    setClientSelected:Dispatch<SetStateAction<Client | null>>;
  }
export default function SellOperationFormComponent(props:SellOperationFormProps) {
    const { register, handleSubmit, reset, setValue,watch, formState: { errors } } = useForm<SellOperationForm>();
    const [isSellerCommission, setIsSellerCommission] = useState<boolean>(false);
    const [currencies, setCurrencies] = useState<Currency[] | null>(null)
    const [currencyNameSelected, setCurrencyNameSelected] = useState<string>('')
    const [currencySelected, setCurrencySelected] = useState<Currency | null>(null)
    //const [clientSelected, setClientSelected] = useState<Client | null>(null)
    const [clientName, setClientName] = useState<string | null>(null)
    //const [sellerSelected, setSellerSelected] = useState<Client | null>(null)
    const [sellerName, setSellerName] = useState<string | null>(null)
    const [showSellerForm, setSellerForm] = useState(false);
    const [profitIncludingSeller, setProfitIncludingSeller] = useState<number>(0);

    // const [quantityToSell, setQuantityToSell] = useState<number>(0)
    const [buyPrice, setBuyPrice] = useState<number>(0)
    const [quantityToBuy, setQuantityToBuy] = useState<number>(0)
    const [percentDolarSmall, setPercentDolarSmall] = useState<number>(0)
    const [amountToDolarSmall, setAmountToDolarSmall] = useState<number>(0)
    const [totalProfit, setTotalProfit] = useState<number>(0)
    const [totalToPay, setTotalToPay] = useState<number>(0)
    const router = useRouter();


    function assignFunctionToTrue(){
        if(props.quantityToSell <= 0){
            toast.loading('Debes colocar la cantidad a vender primero',{duration:1500})
            return;
        }
        props.setPanelScreen(3)
    }

    function deleteSellerAssigned(){
        props.setSellerProfit(0)
        props.setSellerSelected(null)
    }

    function validateIfFormIsComplete(data: SellOperationForm){
        if (props.clientSelected == null) {
            toast.error('Se debe seleccionar un Cliente para realizar la operacion')
            return;
        }
        if(props.reserveOperationSelected == null){
            toast.error('Se debe seleccionar una reserva para realizar la operacion')
            return;
        }
        if(props.reserveOperationSelected.reserve < data.quantity){
            toast.error('Debes colocar una cantidad menor a la reserva seleccionada')
            return;
        }
        console.log('sp',props.sellerProfit)
        console.log('ss',props.sellerSelected)
        if(props.sellerProfit == 0 && props.sellerSelected != null){
            toast.error('Hay un error al asignar los datos del vendedor')
            return;
        }
        toast.success('llegó')
    }
    const onClickBuyOperation = handleSubmit(async (data) => {
        try {
            validateIfFormIsComplete(data);
            let totalToPayData = props.quantityToSell * data.sellPrice
            setTotalToPay(totalToPayData)
            let totalBuyPrice = props.quantityToSell * props.reserveOperationSelected?.buyPrice!;
            console.log('totalBuyPrice',totalBuyPrice)
            setTotalProfit(totalToPayData - totalBuyPrice)
            setProfitIncludingSeller(totalToPayData - totalBuyPrice - props.sellerProfit)
            return ;
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
    function converFormData(data: SellOperationForm): any {
        return {
            id: uuid(),
            hasOfficeCheck: isSellerCommission,
            clientId: props.clientSelected!.id,
            buyOperationData: [{
                operationType: "comprar",
                //currencyMultiBox: convertCurrencyNameToCurrencyMultiboxValue(data.currencyMultiBox),
               // buyPrice: data.buyPriceForm,
                //quantity: data.quantity,
                //percent: data.percent
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
            props.setClientSelected(null)
            return
        } else if (response.status == 302) {
            toast.success('Se encontró el cliente, falta completar los otros datos')
        }
        let clientData: any = await response.json();
        props.setClientSelected(clientData)
    }

    const handleKeyDownClient = (event: any) => {
        if (event.key === 'Enter' && clientName != null && clientName?.trim() != "") {
            getClientByName(clientName!)
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
        if (props.clientSelected != null) {
            toast.loading('Haz cambiado del Cliente, debes confirmar uno nuevo',{
                duration: 2500,
              })
              props.setClientSelected(null)
        }
        setClientName(event.target.value);
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

    function changeCurrencyName(){
        let result:string;
        if (currencyNameSelected === 'Dolar Grande') result = 'USD_HIGH'
        else if (currencyNameSelected === 'Dolar Chico y Cambio') result = 'USD_LOW'
        else if (currencyNameSelected === 'Euro') result = 'EURO'
        else if (currencyNameSelected === 'Real') result = 'REAL'
        return result!;
    }

    async function showListReserveByCurrencyExchange(event:any){
        let currencyToFindDoneOperationsByName = changeCurrencyName();
        const response = await fetch(`${process.env.apiUrl}/v1/operation/get/done/${currencyToFindDoneOperationsByName}`, {
            method: 'PUT',
        });
        if (response.status == 204) {
            console.log('No hay datos')
            return
        }
        let responseValue = await response.json();
        console.log(responseValue)
        let buyOperationData: ReserveOfBuyOperation[] = responseValue;
        props.setReserveOperation(buyOperationData)
        props.setPanelScreen(2);
    }
    useEffect(() => {
        getLasUpdatedCurrencies();
        if(props.quantityToSell != 0){
            setValue('quantity', props.quantityToSell)
        }
        if(props.clientSelected != null){
            
        }
        
    }, [])

    const onChangeQuantityToSell = (event: any) => {
        props.setQuantityToSell(event.target.value);
    }

    return (
        <div>
            <div className={styles.operationCurrencyBase}>
                <p className={styles.operationCurrencyTitle}>{currencyNameSelected}</p>
                <div>
                    <p className={styles.operationCurrencyDescription}>Precio Compra</p>
                    <p className={styles.priceToBuy}>${!currencySelected ? '000' : currencySelected.buyPrice}</p>
                </div>
                <div>
                    <p className={styles.operationCurrencyDescription}>Precio Venta</p>
                    <p className={styles.priceToSell}>${!currencySelected ? '000' : currencySelected.sellPrice}</p>
                </div>
            </div>
            <div className={styles.formBase}>
                <div className={styles.topData}>
                    <p>Fecha {format(new Date(), 'dd/MM/yyyy')}</p>
                    {props.sellerSelected == null
                    ?<button className={styles.sellerButton} onClick={() => assignFunctionToTrue()}>{'Asignar Vendedor'}</button>
                    :<button className={styles.sellerButton} onClick={() => deleteSellerAssigned()}>{'Quitar Vendedor'}</button>}
                    
                    
                </div>
                <div className={styles.operationFormBase}>
                    <h3>Realizar Venta</h3>
                    <div className={styles.operationStringData}>
                        <div>
                            <p className={styles.descriptionOver}>Apodo Cliente</p>
                            <input className={styles.operationStringParagragh} type="text" onKeyDown={handleKeyDownClient} onChange={onChangeClientName} value={props.clientSelected?.name}/>
                        </div>
                        <div>
                            <p className={styles.descriptionOver}>Número de Teléfono</p>
                            <p className={styles.operationStringParagragh}>{!props.clientSelected ? "" : props.clientSelected.phone}</p>
                        </div>
                        <div>
                            <p className={styles.descriptionOver}>Tipo de Divisa</p>
                            {!currencies ? <div className={styles.waitingCurrencyType}></div>
                                : <select {...register("currencyMultiBox", { required: true })} onChange={handleChange} value={currencyNameSelected!} className={styles.operationStringSelect}>
                                    {currencies && currencies.map(currency => (
                                        <option key={currency.id} value={currency.name}>{currency.name}</option>
                                    ))}
                                </select>}
                        </div>
                    </div>
                    <div className={styles.operationNumberData}>
                        <div className={styles.inputsPrices}>
                            <div>
                                <p className={styles.descriptionOver}>Precio Compra</p>
                                <p onClick={showListReserveByCurrencyExchange} className={styles.operationStringParagraghBuyPrice}>{props.reserveOperationSelected == null ? "Selecciona" : props.reserveOperationSelected.buyPrice}</p>
                            </div>
                            <div>
                                <p className={styles.descriptionOver}>Cantidad a Vender</p>
                                <input type="text" {...register("quantity", { required: true, pattern: ONLY_NUMBERS_ON_STRING, maxLength: 40 })} onChange={onChangeQuantityToSell} />
                                {errors.quantity && (errors.quantity.type === "pattern" || errors.quantity.type === "required") && (<span>Es obligatorio y solo son números</span>)}
                                {errors.quantity && errors.quantity.type === "maxLength" && (<span>Máximo de 40 dígitos</span>)}
                            </div>
                            <div>
                                <p className={styles.descriptionOver}>Precio Venta</p>
                                <input type="text" {...register("sellPrice", { required: true, pattern: ONLY_NUMBERS_ON_STRING, maxLength: 40 })} />
                                {errors.sellPrice && (errors.sellPrice!.type === "pattern" || errors.sellPrice!.type === "required") && (<span>Es obligatorio y solo son números</span>)}
                                {errors.sellPrice && errors.sellPrice!.type === "maxLength" && (<span>Máximo de 40 dígitos</span>)}
                            </div>
                        </div>
                        <div>

                            {props.sellerSelected != null ?
                                <div>
                                    <p className={styles.descriptionOver}>Apodo Vendedor</p>
                                    {/* <input className={styles.operationStringParagragh} type="text" onKeyDown={handleKeyDownToSeller} onChange={onChangeSellerName} /> */}
                                    <p className={styles.operationStringParagragh}>{props.sellerSelected?.name}</p>
                                </div> : null
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.totalToSellBase}>
                    <div className={styles.totaToPay}>
                        <p className={styles.descriptionOverTotal}>Total pesos a cobrar</p>
                        <p className={styles.totaToPayDescription}>$ {totalToPay}</p>
                    </div>
                    <div className={styles.totaToPay}>
                        <p className={styles.descriptionOverTotal}>Ganancia</p>
                        <p className={styles.totaToPayDescription}>$ {totalProfit}</p>
                    </div>
                    {props.sellerSelected ?
                        <div className={styles.totaToPay}>
                            <p className={styles.descriptionOverTotal}>Ganancia Vendedor</p>
                            <p className={styles.totaToPayDescription}>$ {props.sellerProfit}</p>
                        </div> : null
                    }
                    {props.sellerSelected ?
                        <div className={styles.totaToPay}>
                            <p className={styles.descriptionOverTotal}>Ganancia Final</p>
                            <p className={styles.totaToPayDescription}>$ {profitIncludingSeller}</p>
                        </div> : null
                    }
                </div>
                <div className={styles.buttonBase}>
                    <button ><Link href='/operation'>Cancelar</Link></button>
                    <button onClick={onClickBuyOperation} >Ejecutar</button>
                    <button onClick={onClickBuyOperation} >Continuar</button>
                </div>
                <Toaster />
            </div>
        </div>
    )
}