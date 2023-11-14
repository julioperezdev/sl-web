'use client'
import { SellerCommissionForm } from '@/models/SellOperationModel';
import styles from './AddSellerOperation.module.css'
import { useForm } from "react-hook-form";
import { useState , Dispatch, SetStateAction, useMemo, useEffect} from 'react';
import { ONLY_NUMBER_WITH_DECIMALS_ON_STRING } from '@/models/RegexConsts';
import { Seller } from '@/models/SellerModel';
import toast, { Toaster } from 'react-hot-toast';

interface AddSellerOperationProps {
    sellerSelected: Seller|null;
    setSellerSelected: Dispatch<SetStateAction<Seller | null>>;
    setSellerProfit:Dispatch<SetStateAction<number>>;
    sellerProfit:number;
    setPanelScreen:Dispatch<SetStateAction<number>>;
    quantityToSell:number;
  }

export default function AddSellerOperation(props:AddSellerOperationProps) {

    const { register, handleSubmit, formState: { errors } } = useForm<SellerCommissionForm>();
    const [sellerName, setSellerName] = useState<string | null>(null)
    const [calculated, setCalculated] = useState<boolean>(false)
    const [items, setItems] = useState<Array<string>>([]);
    const [query, setQuery] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);


    async function onClickNameSelected(selected:string){    
        setQuery(selected)    
        setSellerName(selected);
        await getSellerByName(selected)
        setShow(false)

    }

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            return item.toLowerCase().includes(query.toLowerCase())
        })
    }, [items, query])


    const onChangeName = (event: any) => {
        if (props.sellerSelected != null) {
            props.setSellerSelected(null)
        }
        //setClientName(event.target.value);
        setQuery(event.target.value)
        setShow(true)
    }
    const onChangeSellerName = (event: any) => {
        if (props.sellerSelected != null) {
            toast.loading('Haz cambiado al Vendedor, debes confirmar uno nuevo',{
                duration: 2500,
              })
            props.setSellerSelected(null)
        }
        setSellerName(event.target.value);
        setQuery(event.target.value)
        setShow(true)
    }
    async function getSellersName() {
        let response = await fetch(process.env.apiUrl + '/v1/seller/get/names', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
        if (response.status == 204) {
            toast.error("No se pudo obtener la lista de nombres de clientes")
            return
        } else if (response.status == 302) {
            const sellersNames = await response.json();
            setItems(sellersNames)
            console.log(sellersNames);
        }

    }



    function closeSellerAssigner(){
        if(props.sellerSelected == null){
            toast.error('Se debe seleccionar el Vendedor')
            return
        }
        props.setPanelScreen(1)
    }

    function cancelSellerAssigner(){
        props.setSellerProfit(0)
        props.setSellerSelected(null);
        props.setPanelScreen(1)
    }

    const onClickProvider = handleSubmit(async (data) => {
        try {
            console.log(data)
            props.setSellerProfit(data.priceByPeso * props.quantityToSell)
            setCalculated(true)
        } catch (error: any) {
            toast.error('Ops... No se pudo actualizar el Vendedor')
        }
    }
    );

    async function getSellerByName(name: string) {
        console.log('llega 1')
        const response = await fetch(`${process.env.apiUrl}/v1/seller/get/name/${name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
        if (response.status == 204) {
            toast.error('Ops... No se pudo encontrar un vendedor con ese nombre')
            props.setSellerSelected(null)
            return
        } else if (response.status == 302) {
            toast.success('Se encontró el vendedor, falta completar los otros datos')
            setShow(false)
        }
        let sellerData: Seller = await response.json();
        props.setSellerSelected(sellerData)
    }

    const onChangeSellerProfit = () => {
        if (calculated) {
            setCalculated(false)
        }
    }
    const handleKeyDownToSeller = (event: any) => {
        if (event.key === 'Enter' && sellerName != null && sellerName?.trim() != "") {
            getSellerByName(sellerName)
        }
    }

    useEffect(()=>{
        getSellersName()
    },[])
    return (
        <div className={styles.formBase}>
            <p>Asignar Vendedor</p>
            <div className={styles.formData}>
                <p className={styles.descriptionOver}>Apodo Vendedor</p>
                <input type="text" onKeyDown={handleKeyDownToSeller} onChange={onChangeSellerName}  value={query}/>
                {
                                query != '' && show
                                    ? <div className={styles.itemNameBase}>
                                        {filteredItems.map(item => (
                                            <div className={styles.itemNameParticular} key={item} onClick={() => onClickNameSelected(item)}>{item}</div>
                                        ))}
                                    </div>
                                    : <></>
                            }
                <p className={styles.descriptionOver}>Pesos</p>
                <input type="text" {...register("priceByPeso", { required: true, pattern: ONLY_NUMBER_WITH_DECIMALS_ON_STRING })} onChange={onChangeSellerProfit}/>
                {errors.priceByPeso && (errors.priceByPeso.type === "pattern" || errors.priceByPeso.type === "required") && (<span>Es obligatorio y solo son números</span>)}
                {errors.priceByPeso && errors.priceByPeso.type === "maxLength" && (<span>Máximo de 20 dígitos</span>)}
                <p className={styles.descriptionOver}>Cantidad a vender</p>
                <p className={styles.operationStringParagragh}>$ {props.quantityToSell}</p>
                <p className={styles.descriptionOver}>Ganancia vendedor</p>
                <p className={styles.operationStringParagragh}>$ {props.sellerProfit}</p>
            </div>
            <div>
                <button onClick={() =>cancelSellerAssigner()}>Cancelar</button>
                {!calculated 
                ? <button onClick={onClickProvider}>Calcular</button> 
                : <button onClick={() =>closeSellerAssigner()}>Asignar</button>}
            </div>
            <Toaster/>
        </div>
    )
}