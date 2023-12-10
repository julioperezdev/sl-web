'use client'
import styles from "./AddBuyOperationComponent.module.css";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { v4 as uuid } from 'uuid'
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect, useMemo, useRef } from 'react';
import { format } from 'date-fns';
import { ONLY_NUMBER_WITH_DECIMALS_ON_STRING, ONLY_NUMBER_WITH_TWO_DECIMALS_ON_STRING } from '@/models/RegexConsts';
import { useRouter } from 'next/navigation';
import { ONE_SECOUND, sleep } from '@/helper/sleepInMilli/Sleep';
import { Currency } from "@/models/CurrencyModel";
import { Client } from "@/models/ClientModel";
import { BuyOperationContinue, BuyOperationData, BuyOperationForm, BuyOperationRequest } from "@/models/OperationModel";
import AddWishBuyOperations from "./AddWishBuyOperation";
import { convertCurrencyMask } from "@/helper/numberConverter/NumberConverter";

export default function AddBuyOperationComponent() {

    const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm<BuyOperationForm>();
    const [isOfficeCheck, setIsOfficeCheck] = useState<boolean>(false);
    const [currencies, setCurrencies] = useState<Currency[] | null>(null)
    const [currencyNameSelected, setCurrencyNameSelected] = useState<string>('')
    const [currencySelected, setCurrencySelected] = useState<Currency | null>(null)
    const [clientSelected, setClientSelected] = useState<Client | null>(null)
    const [clientName, setClientName] = useState<string | null>(null)

    const [amountToDolarSmall, setAmountToDolarSmall] = useState<number>(0)
    const [totalToPay, setTotalToPay] = useState<number>(0)
    const [calculated, setCalculated] = useState<boolean>(false)
    const [listOperationsContinue, setListOperationsContinue] = useState<BuyOperationContinue[]>([]);
    const [totalPesosBox, setTotalPesosBox] = useState<number>(0)

    const [items, setItems] = useState<Array<string>>([]);
    const [query, setQuery] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);

    const router = useRouter();
    const countRef = useRef<BuyOperationContinue[]>()

    async function onClickNameSelected(selected: string) {
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
        if (clientSelected != null) {
            setClientSelected(null)
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
        }

    }

    async function getTotalPesosBox() {
        let response = await fetch(process.env.apiUrl + '/v1/box/pesos/get/total', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
        if (response.status == 202) {
            const totalPesosResponse = await response.json();
            setTotalPesosBox(totalPesosResponse)
        }

    }

    function deleteWishOperationById(idToDelete: string) {
        let wishListFiltered = listOperationsContinue.filter(particular => particular.id !== idToDelete);
        setListOperationsContinue(wishListFiltered)
    }

    const onClickContinueBuyOperation = handleSubmit(async (data) => {
        try {
            if (clientSelected == null) {
                toast.error('Se debe seleccionar un Cliente para realizar la operacion', { duration: 5000 })
                return;
            }
            const dataBuilded = converFormDataToContinue(data);
            setListOperationsContinue([...listOperationsContinue, dataBuilded]);
            setQuery("")
            setTotalToPay(0)
            setValue('buyPriceForm', undefined)
            setValue('quantity', undefined)
            setClientSelected(null)
            setCalculated(false)
            //setIsOfficeCheck(false)

        } catch (error: any) {
            toast.error('Ops... No se pudo realizar la operacion de compra', { duration: 5000 })
        }
    }
    );

    async function onClickExecuteOnlyWishList(){
        try{
            let dataConverted = converFormData(listOperationsContinue);
            const response = await sendForm(dataConverted);
            if (response.status == 201) {
                reset();
                toast.success('Se ha guardado exitosamente la diferencia del cliente', { duration: 5000 })
                await sleep(ONE_SECOUND)
                router.replace(`/operation`)
            } else {
                toast.error('Ops... No se pudo realizar la operacion de compra', { duration: 5000 })
            }
        } catch (error: any) {
            console.log(error)
            toast.error('Ops... No se pudo realizar la operacion de compra', { duration: 5000 })
        }
    }
    const onClickBuyOperation = handleSubmit(async (data) => {
        try {
            if (clientSelected == null) {
                toast.error('Se debe seleccionar un Cliente para realizar la operacion', { duration: 5000 })
                return;
            }
            const dataValidated = converFormDataToContinue(data);
            let listToConvert = [...listOperationsContinue, dataValidated];
            setListOperationsContinue([...listOperationsContinue, dataValidated]);
            let dataConverted = converFormData(listToConvert);
            const response = await sendForm(dataConverted);
            if (response.status == 201) {
                reset();
                toast.success('Se ha guardado exitosamente la diferencia del cliente', { duration: 5000 })
                await sleep(ONE_SECOUND)
                router.replace(`/operation`)
            } else {
                toast.error('Ops... No se pudo realizar la operacion de compra', { duration: 5000 })
            }
        } catch (error: any) {
            console.log(error)
            toast.error('Ops... No se pudo realizar la operacion de compra', { duration: 5000 })
        }
    }
    );

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

    function converFormDataToContinue(data: BuyOperationForm): BuyOperationContinue {

        return {
            id: uuid(),
            hasOfficeCheck: isOfficeCheck,
            clientId: clientSelected!.id,
            clientName: clientSelected?.name!,
            clientPhone: clientSelected?.phone!,
            operationType: "comprar",
            currencyMultiBox: data.currencyMultiBox,
            buyPrice: data.buyPriceForm!,
            quantity: data.quantity!,
            totalToPay: totalToPay,
            percent: data.percent
        }
    }

    function converFormData(listToConvert:BuyOperationContinue[]): BuyOperationData[] {
        let listConverted: BuyOperationData[] = [];
        listToConvert.forEach(particular => {
            let converted: BuyOperationData = {
                id: particular.id,
                hasOfficeCheck: particular.hasOfficeCheck,
                clientId: particular.clientId,
                operationType: "comprar",
                currencyMultiBox: convertCurrencyNameToCurrencyMultiboxValue(particular.currencyMultiBox),
                buyPrice: particular.buyPrice,
                quantity: particular.quantity,
                percent: particular.percent
            }
            listConverted = [...listConverted, converted]
        })
        return listConverted;
    }

    function sendForm(buyOperationData: BuyOperationData[]) {
        return fetch(process.env.apiUrl + '/v1/operation/buy/create', {
            method: 'PUT',
            body: JSON.stringify({buyOperationData:buyOperationData}),
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
            setClientSelected(null)
            return
        } else if (response.status == 302) {
            toast.success('Se encontró el cliente, falta completar los otros datos', { duration: 5000 })
            setShow(false)
        }
        let clientData: any = await response.json();
        setClientSelected(clientData)
        await validateIfHasDifference(clientData.id)
    }

    async function validateIfHasDifference(clientId: string) {
        const response = await fetch(`${process.env.apiUrl}/v1/client/difference/get/by/client/id/${clientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
        console.log(response)
        if (response.status == 302) {
            toast.loading('Cliente está registrado en diferencia de clientes', { duration: 5000 })
        }
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
            toast.error('Se debe seleccionar un Cliente para realizar la operacion', { duration: 5000 })
            return false;
        }
        if (data.quantity! <= 0) {
            toast.error('Debes colocar una cantidad', { duration: 5000 })
            return false;
        }
        if (data.buyPriceForm! <= 0) {
            toast.error('Se debe seleccionar un precio de compra', { duration: 5000 })
            return false;
        }
        if (isDolarSmall()) {
            if (data.percent! <= 0) {
                toast.error('Se debe seleccionar un porcentaje', { duration: 5000 })
                return false;
            }
        }
        return true;
    }
    const onClickCalculate = handleSubmit(async (data) => {
        try {
            let valid = validateIfFormIsComplete(data);
            if (!valid) return;
            let percentConverted = isDolarSmall() ? data.percent! : 0;
            let result = data.buyPriceForm! * data.quantity!;
            if (isDolarSmall() && percentConverted > 0) {
                let newBuyPrice = data.buyPriceForm! - ((data.buyPriceForm! * percentConverted) / 100);
                setAmountToDolarSmall(newBuyPrice);
                result = newBuyPrice * data.quantity!
            }
            setTotalToPay(result);
            setCalculated(true)
        } catch (error: any) {
            toast.error('Ops... Hubo un error al calcular ', { duration: 5000 })
        }
    }
    );

    const onChangeToUnCalculate = (event: any) => {
        if (calculated) {
            setCalculated(false)
            setTotalToPay(0)
            setAmountToDolarSmall(0)
        }
    }
    useEffect(() => {
        getLasUpdatedCurrencies();
        getClientsName();
        getTotalPesosBox();
    }, [])

    return (
        <div>
            <h4>Saldo de caja en Pesos</h4>
            <h3>{convertCurrencyMask(totalPesosBox)}</h3>
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
                            <div>
                                <p className={styles.descriptionOver}>Apodo Cliente</p>
                                <input className={styles.operationStringParagragh} type="text" onKeyDown={handleKeyDown} onChange={onChangeName} value={query} />
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
                                <p className={styles.descriptionOver}>Cantidad a Comprar</p>
                                <input type="text" {...register("quantity", { required: false, pattern: ONLY_NUMBER_WITH_TWO_DECIMALS_ON_STRING, maxLength: 40 })} onChange={onChangeToUnCalculate} />
                                {errors.quantity && (errors.quantity.type === "pattern" || errors.quantity.type === "required") && (<span>Es obligatorio y solo son números</span>)}
                                {errors.quantity && errors.quantity.type === "maxLength" && (<span>Máximo de 40 dígitos</span>)}
                            </div>
                            <div>
                                <p className={styles.descriptionOver}>Precio Compra</p>
                                <input type="text" {...register("buyPriceForm", { required: false, pattern: ONLY_NUMBER_WITH_TWO_DECIMALS_ON_STRING, maxLength: 40 })} onChange={onChangeToUnCalculate} />
                                {errors.buyPriceForm && (errors.buyPriceForm.type === "pattern" || errors.buyPriceForm.type === "required") && (<span>Es obligatorio y solo son números</span>)}
                                {errors.buyPriceForm && errors.buyPriceForm.type === "maxLength" && (<span>Máximo de 40 dígitos</span>)}
                            </div>
                        </div>
                        {isDolarSmall()
                            ? <div className={styles.inputsPrices}>
                                <div>
                                    <p className={styles.descriptionOver}>Ingrese porcentaje</p>
                                    <input type="text" {...register("percent", { required: false, pattern: ONLY_NUMBER_WITH_TWO_DECIMALS_ON_STRING, maxLength: 40 })} onChange={onChangeToUnCalculate} />
                                    {errors.percent && (errors.percent!.type === "pattern" || errors.percent!.type === "required") && (<span>Es obligatorio y solo son números con maximo 2 decimales</span>)}
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
                    <p className={styles.totaToPayDescription}>{convertCurrencyMask(totalToPay)}</p>
                </div>
                <div className={styles.buttonBase}>
                    <button ><Link href='/operation'>Cancelar</Link></button>
                    {!calculated
                        ? <button onClick={onClickCalculate}>Calcular</button>
                        : <>
                            <button onClick={onClickBuyOperation} >Ejecutar</button>
                            <button onClick={onClickContinueBuyOperation} >Continuar</button>
                        </>}
                </div>
                <Toaster 
                position="bottom-left"
                reverseOrder={false}/>
            </div>
            <AddWishBuyOperations
                listAddBuyOperation={listOperationsContinue}
                deleteWishOperationById={deleteWishOperationById}
                onClickExecuteOnlyWishList={onClickExecuteOnlyWishList} />
        </div>
    )
}