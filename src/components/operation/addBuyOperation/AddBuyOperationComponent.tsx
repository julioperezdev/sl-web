'use client'
import styles from "./AddBuyOperationComponent.module.css";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { v4 as uuid } from 'uuid'
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ONLY_NUMBERS_ON_STRING } from '@/models/RegexConsts';
import { useRouter } from 'next/navigation';
import { ONE_SECOUND, sleep } from '@/helper/sleepInMilli/Sleep';
import { Currency } from "@/models/CurrencyModel";
import { Client } from "@/models/ClientModel";
import { BuyOperationForm, BuyOperationRequest } from "@/models/OperationModel";

export default function AddBuyOperationComponent() {

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<BuyOperationForm>();
    const [isOfficeCheck, setIsOfficeCheck] = useState<boolean>(false);
    const [currencies, setCurrencies] = useState<Currency[] | null>(null)
    const [currencyNameSelected, setCurrencyNameSelected] = useState<string>('')
    const [currencySelected, setCurrencySelected] = useState<Currency | null>(null)
    const [clientSelected, setClientSelected] = useState<Client | null>(null)
    const [clientName, setClientName] = useState<string | null>(null)

    const [buyPrice, setBuyPrice] = useState<number>(0)
    const [quantityToBuy, setQuantityToBuy] = useState<number>(0)
    const [percentDolarSmall, setPercentDolarSmall] = useState<number>(0)
    const [amountToDolarSmall, setAmountToDolarSmall] = useState<number>(0)
    const [totalToPay, setTotalToPay] = useState<number>(0)
    const [calculated, setCalculated] = useState<boolean>(false)

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
    function converFormData(data: BuyOperationForm): BuyOperationRequest {
        return {
            id: uuid(),
            hasOfficeCheck: isOfficeCheck,
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

    const handleKeyDown = (event: any) => {
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
        if (calculated) {
            setCalculated(false)
            setTotalToPay(0)
            setAmountToDolarSmall(0)
        }
    };

    function isDolarSmall() {
        return currencyNameSelected != null && currencyNameSelected === 'Dolar Chico y Cambio';
    }

    const onChangeName = (event: any) => {
        if (clientSelected != null) {
            setClientSelected(null)
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
        if (isDolarSmall() && percent > 0) {
            let newBuyPrice = buyPrice - ((buyPrice * percent) / 100);
            setAmountToDolarSmall(newBuyPrice);
            result = newBuyPrice * quantity
        }
        setTotalToPay(result);
    }

    function validateIfFormIsComplete(data: BuyOperationForm) {
        if (clientSelected == null) {
            toast.error('Se debe seleccionar un Cliente para realizar la operacion')
            return false;
        }
        if (data.buyPriceForm <= 0) {
            toast.error('Se debe seleccionar un precio de compra')
            return false;
        }
        if (data.quantity <= 0) {
            toast.error('Debes colocar una cantidad')
            return false;
        }
        if (isDolarSmall()) {
            if (data.percent! <= 0) {
                toast.error('Se debe seleccionar un porcentaje')
                return false;
            }
            // if (<=0) {
            //     toast.error('Debes colocar una cantidad menor a la reserva seleccionada')
            //     return false;
            // }
        }
        return true;
    }
    const onClickCalculate = handleSubmit(async (data) => {
        try {
            let valid = validateIfFormIsComplete(data);
            if (!valid) return;
            let result = data.buyPriceForm * data.quantity;
            if (isDolarSmall() && data.percent! > 0) {
                let newBuyPrice = data.buyPriceForm - ((data.buyPriceForm * data.percent!) / 100);
                setAmountToDolarSmall(newBuyPrice);
                result = newBuyPrice * data.quantity
            }
            setTotalToPay(result);
            setCalculated(true)
        } catch (error: any) {
            toast.error('Ops... No se pudo actualizar el Vendedor')
        }
    }
    );

    // const onChangeQuantityToSell = (event: any) => {
    //     props.setQuantityToSell(event.target.value);
    //     if (props.sellerSelected != null) {
    //         props.setSellerSelected(null)
    //         props.setSellerProfit(0)
    //         toast.loading('Se debe volver a asignar al vendedor por cambiar la cantidad', { duration: 1500 })
    //     }
    //     if (calculated) {
    //         setCalculated(false)
    //     }
    // }

    const onChangeToUnCalculate = (event: any) => {
        if (calculated) {
            setCalculated(false)
            setTotalToPay(0)
            setAmountToDolarSmall(0)
        }
    }
    useEffect(() => {
        getLasUpdatedCurrencies();
    }, [])

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
                    <div className={styles.officeCheck} onClick={() => setIsOfficeCheck(!isOfficeCheck)}>
                        <p>Check Oficina</p>
                        <input type="checkbox" defaultChecked={isOfficeCheck} />
                    </div>
                </div>
                <div className={styles.operationFormBase}>
                    <h3>Realizar Compra</h3>
                    <div className={styles.operationStringData}>
                        <div>
                            <p className={styles.descriptionOver}>Apodo Cliente</p>
                            <input className={styles.operationStringParagragh} type="text" onKeyDown={handleKeyDown} onChange={onChangeName} />
                        </div>
                        <div>
                            <p className={styles.descriptionOver}>Número de Teléfono</p>
                            <p className={styles.operationStringParagragh}>{!clientSelected ? "" : clientSelected.phone}</p>
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
                                <input type="text" {...register("buyPriceForm", { required: true, pattern: ONLY_NUMBERS_ON_STRING, maxLength: 40 })} onChange={onChangeToUnCalculate}/>
                                {errors.buyPriceForm && (errors.buyPriceForm.type === "pattern" || errors.buyPriceForm.type === "required") && (<span>Es obligatorio y solo son números</span>)}
                                {errors.buyPriceForm && errors.buyPriceForm.type === "maxLength" && (<span>Máximo de 40 dígitos</span>)}
                            </div>
                            <div>
                                <p className={styles.descriptionOver}>Cantidad a Comprar</p>
                                <input type="text" {...register("quantity", { required: true, pattern: ONLY_NUMBERS_ON_STRING, maxLength: 40 })} onChange={onChangeToUnCalculate} />
                                {errors.quantity && (errors.quantity.type === "pattern" || errors.quantity.type === "required") && (<span>Es obligatorio y solo son números</span>)}
                                {errors.quantity && errors.quantity.type === "maxLength" && (<span>Máximo de 40 dígitos</span>)}
                            </div>
                        </div>
                        {isDolarSmall()
                            ? <div className={styles.inputsPrices}>
                                <div>
                                    <p className={styles.descriptionOver}>Ingrese porcentaje</p>
                                    <input type="text" {...register("percent", { required: true, pattern: ONLY_NUMBERS_ON_STRING, maxLength: 40 })} onChange={onChangeToUnCalculate}/>
                                    {errors.percent && (errors.percent!.type === "pattern" || errors.percent!.type === "required") && (<span>Es obligatorio y solo son números</span>)}
                                    {errors.percent && errors.percent!.type === "maxLength" && (<span>Máximo de 40 dígitos</span>)}
                                </div>
                                <div>
                                    <p className={styles.descriptionOver}>Valor a tomar</p>
                                    <p className={styles.inputsPricesParagraph}>$ {amountToDolarSmall}</p>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                </div>
                <div className={styles.totaToPay}>
                    <p className={styles.descriptionOverTotal}>Total pesos a pagar</p>
                    <p className={styles.totaToPayDescription}>$ {totalToPay}</p>
                </div>
                <div className={styles.buttonBase}>
                    <button ><Link href='/operation'>Cancelar</Link></button>
                    {!calculated
                        ? <button onClick={onClickCalculate}>Calcular</button>
                        : <>
                            <button onClick={onClickBuyOperation} >Ejecutar</button>
                            <button onClick={onClickBuyOperation} >Continuar</button>
                        </>}
                </div>
                <Toaster />
            </div>
        </div>
    )
}