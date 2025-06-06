'use client'
import styles from './SellOperationForm.module.css'
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { v4 as uuid } from 'uuid'
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect, Dispatch, SetStateAction, useMemo } from 'react';
import { format } from 'date-fns';
import { ONLY_NUMBERS_ON_STRING, ONLY_NUMBER_WITH_DECIMALS_ON_STRING, ONLY_NUMBER_WITH_TWO_DECIMALS_ON_STRING } from '@/models/RegexConsts';
import { useRouter } from 'next/navigation';
import { ONE_SECOUND, sleep } from '@/helper/sleepInMilli/Sleep';
import { Currency } from "@/models/CurrencyModel";
import { Client } from "@/models/ClientModel";
import { Seller } from '@/models/SellerModel';
import { ReserveOfBuyOperation, SellOperationForm, SellOperationRequest } from '@/models/SellOperationModel';

interface SellOperationFormProps {
    sellerSelected: Seller | null;
    setSellerSelected: Dispatch<SetStateAction<Seller | null>>;
    setSellerProfit: Dispatch<SetStateAction<number>>;
    sellerProfit: number;
    setPanelScreen: Dispatch<SetStateAction<number>>;
    setReserveOperation: Dispatch<ReserveOfBuyOperation[] | null>;
    reserveOperationSelected: ReserveOfBuyOperation | null;
    quantityToSell: number;
    setQuantityToSell: Dispatch<SetStateAction<number>>;
    clientSelected: Client | null;
    setClientSelected: Dispatch<SetStateAction<Client | null>>;
    sellPrice:number;
    setSellPrice:Dispatch<SetStateAction<number>>;
}
export default function SellOperationFormComponent(props: SellOperationFormProps) {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<SellOperationForm>();
    const [currencies, setCurrencies] = useState<Currency[] | null>(null)
    const [currencyNameSelected, setCurrencyNameSelected] = useState<string>('')
    const [currencySelected, setCurrencySelected] = useState<Currency | null>(null)
    const [clientName, setClientName] = useState<string | null>(null)
    const [profitIncludingSeller, setProfitIncludingSeller] = useState<number>(0);
    const [totalProfit, setTotalProfit] = useState<number>(0)
    const [totalToPay, setTotalToPay] = useState<number>(0)
    const [calculated, setCalculated] = useState<boolean>(false)
    const [items, setItems] = useState<Array<string>>([]);
    const [query, setQuery] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const router = useRouter();

    async function onClickNameSelected(selected:string){    
        setQuery(selected)    
        setClientName(selected);
        await getClientByName(selected)
        setShow(false)

    }

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            return item.toLowerCase().includes(query.toLowerCase())
        })
    }, [items, query])


    const onChangeName = (event: any) => {
        if (props.clientSelected != null) {
            props.setClientSelected(null)
        }
        //setClientName(event.target.value);
        setQuery(event.target.value)
        setShow(true)
    }

    const onChangeClientName = (event: any) => {
        if (props.clientSelected != null) {
            toast.loading('Haz cambiado del Cliente, debes confirmar uno nuevo', { duration: 5000 })
            props.setClientSelected(null)
        }
        setClientName(event.target.value);
        setQuery(event.target.value)
        setShow(true)
    }
    async function getClientsName() {
        let response = await fetch(process.env.apiUrl + '/v1/client/get/names', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
        if (response.status == 204) {
            toast.error("No se pudo obtener la lista de nombres de clientes", { duration: 5000 })
            return
        } else if (response.status == 302) {
            const clientsNames = await response.json();
            setItems(clientsNames)
            console.log(clientsNames);
        }

    }



    function assignFunctionToTrue() {
        if (props.reserveOperationSelected == null) {
            toast.error('Se debe seleccionar una reserva para asignar un vendedor', { duration: 5000 })
            return false;
        }
        if (props.quantityToSell <= 0) {
            toast.loading('Debes colocar la cantidad a vender primero', { duration: 5000 })
            return;
        }
        if (props.reserveOperationSelected.reserve < props.quantityToSell) {
            toast.error('Debes colocar una cantidad menor a la reserva seleccionada', { duration: 5000 })
            return false;
        }
        props.setPanelScreen(3)
    }

    function deleteSellerAssigned() {
        props.setSellerProfit(0)
        props.setSellerSelected(null)
    }

    function validateIfFormIsComplete(data: SellOperationForm) {
        if (props.clientSelected == null) {
            toast.error('Se debe seleccionar un Cliente para realizar la operacion', { duration: 5000 })
            return false;
        }
        if (props.reserveOperationSelected == null) {
            toast.error('Se debe seleccionar una reserva para realizar la operacion', { duration: 5000 })
            return false;
        }
        if (props.reserveOperationSelected.reserve < data.quantity) {
            toast.error('Debes colocar una cantidad menor a la reserva seleccionada', { duration: 5000 })
            return false;
        }
        if (props.sellerProfit == 0 && props.sellerSelected != null) {
            toast.error('Hay un error al asignar los datos del vendedor', { duration: 5000 })
            return false;
        }
        return true;
    }
    const onClickBuyOperation = handleSubmit(async (data) => {
        try {
            let valid = validateIfFormIsComplete(data);
            if (!valid) return;
            let totalToPayData = props.quantityToSell * data.sellPrice;
            setTotalToPay(totalToPayData);
            let totalBuyPrice = props.quantityToSell * props.reserveOperationSelected?.buyPrice!;
            setTotalProfit(totalToPayData - totalBuyPrice);
            setProfitIncludingSeller(totalToPayData - totalBuyPrice - props.sellerProfit);
            const dataValidated = converFormData(data);
            const response = await sendForm(dataValidated);
            if (response.status == 201) {
                reset();
                toast.success('Se ha guardado exitosamente la operación, queda en pendiente', { duration: 5000 })
                await sleep(ONE_SECOUND)
                router.replace(`/operation`)
            } else {
                toast.error('Ops... No se pudo realizar la operacion de venta', { duration: 5000 })
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo realizar la operacion de venta', { duration: 5000 })
        }
    }
    );

    function converFormData(data: SellOperationForm): SellOperationRequest {
        let sellerIsPresent = props.sellerSelected != null;
        return {
            id: uuid(),
            clientId: props.clientSelected!.id,
            sellOperationData: [{
                hasSeller: sellerIsPresent,
                sellerId: sellerIsPresent ? props.sellerSelected?.id : undefined,
                sellerCommission: sellerIsPresent ? props.sellerProfit : 0,
                operationType: "vender",
                currencyMultiBox: convertCurrencyNameToCurrencyMultiboxValue(data.currencyMultiBox),
                buyPrice: props.reserveOperationSelected?.buyPrice!,
                buyOperationId: props.reserveOperationSelected?.id!,
                sellPrice: data.sellPrice,
                quantityToSell: data.quantity
            }]
        }
    }

    function convertCurrencyNameToCurrencyMultiboxValue(currencyNameToConvert: string): string {
        let result;
        let availableCurrencyName: string[] = ['Dolar Grande', 'Dolar Chico y Cambio', 'Euro', 'Real'];
        let resultOfFilter = availableCurrencyName.filter(particular => particular == currencyNameToConvert);
        if (resultOfFilter.length != 1) {
            toast.error("no se ha colocado un Tipo de Divisa habilitada", { duration: 5000 })
            throw new Error("Currency Name does not exist as available name");
        } else if (resultOfFilter.length > 1) {
            toast.error("no se pueden usar dos Tipos de Divisas a la vez", { duration: 5000 })
            throw new Error("Currency Name only can be one");
        }
        let resultOfFiltered: string = resultOfFilter[0];

        if (resultOfFiltered === 'Dolar Grande') result = 'USD_HIGH'
        else if (resultOfFiltered === 'Dolar Chico y Cambio') result = 'USD_LOW'
        else if (resultOfFiltered === 'Euro') result = 'EURO'
        else if (resultOfFiltered === 'Real') result = 'REAL'
        return result!;
    }
    function sendForm(sellOperationRequest: SellOperationRequest) {
        return fetch(process.env.apiUrl + '/v1/operation/sell/create', {
            method: 'PUT',
            body: JSON.stringify(sellOperationRequest),
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
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
        if (response.status == 204) {
            toast.error('Ops... No se pudo encontrar un cliente con ese nombre', { duration: 5000 })
            props.setClientSelected(null)
            return
        } else if (response.status == 302) {
            toast.success('Se encontró el cliente, falta completar los otros datos', { duration: 5000 })
            setShow(false)
        }
        let clientData: any = await response.json();
        props.setClientSelected(clientData)
        await validateIfHasDifference(clientData.id)
    }

    async function validateIfHasDifference(clientId:string){
        const response = await fetch(`${process.env.apiUrl}/v1/client/difference/get/by/client/id/${clientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
        if (response.status == 302) {
            toast.loading('Cliente está registrado en diferencia de clientes', { duration: 5000 })
        }
    }

    const handleKeyDownClient = (event: any) => {
        if (event.key === 'Enter' && clientName != null && clientName?.trim() != "") {
            getClientByName(clientName!)
        }
    }

    async function getLasUpdatedCurrencies() {
        const response = await fetch(`${process.env.apiUrl}/v1/currency/get/last-updated`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
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
        console.log('entra')
        props.setReserveOperation(null)
        if(props.reserveOperationSelected != null) {
            console.log('entra 2')
            props.setReserveOperation(null)
            if(calculated){
                props.setQuantityToSell(0)
                props.setSellerProfit(0)
                props.setSellerSelected(null)
            }
        }

    };

    

    function changeCurrencyName() {
        let result: string;
        if (currencyNameSelected === 'Dolar Grande') result = 'USD_HIGH'
        else if (currencyNameSelected === 'Dolar Chico y Cambio') result = 'USD_LOW'
        else if (currencyNameSelected === 'Euro') result = 'EURO'
        else if (currencyNameSelected === 'Real') result = 'REAL'
        return result!;
    }

    async function showListReserveByCurrencyExchange(event: any) {
        let currencyToFindDoneOperationsByName = changeCurrencyName();
        const response = await fetch(`${process.env.apiUrl}/v1/operation/get/done/reserve/${currencyToFindDoneOperationsByName}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
        if (response.status == 204) {
            return
        }
        let responseValue = await response.json();
        let buyOperationData: ReserveOfBuyOperation[] = responseValue;
        props.setReserveOperation(buyOperationData)
        props.setPanelScreen(2);
    }

    useEffect(() => {
        getLasUpdatedCurrencies();
        getClientsName();
        if (props.quantityToSell != 0) {
            setValue('quantity', props.quantityToSell)
            setValue('sellPrice', props.sellPrice)
        }
    }, [])

    const onChangeQuantityToSell = (event: any) => {
        props.setQuantityToSell(event.target.value);
        if (props.sellerSelected != null) {
            props.setSellerSelected(null)
            props.setSellerProfit(0)
            toast.loading('Se debe volver a asignar al vendedor por cambiar la cantidad', { duration: 5000 })
        }
        if (calculated) {
            setCalculated(false)
        }
    }

    const onChangeSellPrice = (event: any) => {
        if (calculated) {
            setCalculated(false)
        }
        let value = event.target.value;
        if(ONLY_NUMBER_WITH_DECIMALS_ON_STRING.test(value)){
            let numberValue:number = value;
            props.setSellPrice(numberValue)
        }
        
    }


    const onClickCalculate = handleSubmit(async (data) => {
        try {
            let valid = validateIfFormIsComplete(data);
            if (!valid) return;
            let totalToPayData = props.quantityToSell * data.sellPrice;
            setTotalToPay(totalToPayData);
            let totalBuyPrice = props.quantityToSell * props.reserveOperationSelected?.buyPrice!;
            setTotalProfit(totalToPayData - totalBuyPrice);
            setProfitIncludingSeller(totalToPayData - totalBuyPrice - props.sellerProfit);
            setCalculated(true)
        } catch (error: any) {
            toast.error('Ops... No se pudo actualizar el Vendedor', { duration: 5000 })
        }
    }
    );

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
                        ? <button className={styles.sellerButton} onClick={() => assignFunctionToTrue()}>{'Asignar Vendedor'}</button>
                        : <button className={styles.sellerButton} onClick={() => deleteSellerAssigned()}>{'Quitar Vendedor'}</button>}
                </div>
                <div className={styles.operationFormBase}>
                    <h3>Realizar Venta</h3>
                    <div className={styles.operationStringData}>
                        <div>
                            {/* <p className={styles.descriptionOver}>Apodo Cliente</p>
                            <input className={styles.operationStringParagragh} type="text" onKeyDown={handleKeyDownClient} onChange={onChangeClientName} value={props.clientSelected?.name} /> */}
                            <div>
                            <p className={styles.descriptionOver}>Apodo Cliente</p>
                            <input className={styles.operationStringParagragh} type="text" onKeyDown={handleKeyDownClient} onChange={onChangeClientName} value={props.clientSelected?.name} />
                            </div>
                            {
                                query != '' && show
                                    ? <div className={styles.itemNameBase}>
                                        {filteredItems.map(item => (
                                            <div className={styles.itemNameParticular} key={item} onClick={() => onClickNameSelected(item)}>{item}</div>
                                        ))}
                                    </div>
                                    : <></>
                            }
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
                                <input type="text" {...register("quantity", { required: true, pattern: ONLY_NUMBER_WITH_TWO_DECIMALS_ON_STRING, maxLength: 40 })} onChange={onChangeQuantityToSell} />
                                {errors.quantity && (errors.quantity.type === "pattern" || errors.quantity.type === "required") && (<span>Es obligatorio y solo son números</span>)}
                                {errors.quantity && errors.quantity.type === "maxLength" && (<span>Máximo de 40 dígitos</span>)}
                            </div>
                            <div>
                                <p className={styles.descriptionOver}>Precio Venta</p>
                                <input type="text" {...register("sellPrice", { required: true, pattern: ONLY_NUMBER_WITH_TWO_DECIMALS_ON_STRING, maxLength: 40 })} onChange={onChangeSellPrice}/>
                                {errors.sellPrice && (errors.sellPrice!.type === "pattern" || errors.sellPrice!.type === "required") && (<span>Es obligatorio y solo son números</span>)}
                                {errors.sellPrice && errors.sellPrice!.type === "maxLength" && (<span>Máximo de 40 dígitos</span>)}
                            </div>
                        </div>
                        <div>
                            {props.sellerSelected != null ?
                                <div>
                                    <p className={styles.descriptionOver}>Apodo Vendedor</p>
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
                    {!calculated
                        ? <button onClick={onClickCalculate}>Calcular</button>
                        : <>
                            <button onClick={onClickBuyOperation} >Abrir operación</button>
                            <button onClick={onClickBuyOperation} >Continuar</button>
                        </>}
                </div>
                <Toaster 
                position="bottom-left"
                reverseOrder={false}/>
            </div>
        </div>
    )
}