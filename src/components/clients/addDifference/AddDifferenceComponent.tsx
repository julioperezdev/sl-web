'use client'
import { AddDifferenceForm, AddDifferenceRequest } from '@/models/DifferenceClientModel';
import styles from './AddDifferenceComponent.module.css';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { v4 as uuid } from 'uuid'
import toast, { Toaster } from 'react-hot-toast';
import { Client } from '@/models/ClientModel';
import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { ONLY_NUMBERS_ON_STRING } from '@/models/RegexConsts';
import { useRouter } from 'next/navigation';
import { ONE_SECOUND, sleep } from '@/helper/sleepInMilli/Sleep';

export default function AddDifferenceComponent() {

    const [items, setItems] = useState<Array<string>>([]);
    const [query, setQuery] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<AddDifferenceForm>();
    const router = useRouter();

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            return item.toLowerCase().includes(query.toLowerCase())
        })
    }, [items, query])


    async function onClickNameSelected(selected: string) {
        setQuery(selected)
        setClientName(selected);
        await getClientByName(selected)
        setShow(false)

    }
    const onClickDiffernece = handleSubmit(async (data) => {
        try {
            const dataValidated = converFormData(data);
            const response = await sendForm(dataValidated);
            if (response.status == 201) {
                reset();
                toast.success('Se ha guardado exitosamente la diferencia del cliente', { duration: 5000 })
                await sleep(ONE_SECOUND)
                router.replace(`/clients/difference`)
            } else {
                toast.error('Ops... No se pudo guardar la diferencia del cliente', { duration: 5000 })
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo guardar la diferencia del cliente', { duration: 5000 })
        }
    }
    );

    function converFormData(data: AddDifferenceForm): AddDifferenceRequest {
        return {
            id: uuid(),
            clientId: client?.id!,
            amount: data.amount,
            description: data.description,
            differenceType: data.differenceType
        }
    }

    function sendForm(addDifferenceRequest: AddDifferenceRequest) {
        return fetch(process.env.apiUrl + '/v1/client/difference/create', {
            method: 'POST',
            body: JSON.stringify(addDifferenceRequest),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
    }

    const [client, setClient] = useState<Client | null>(null)
    const [clientName, setClientName] = useState<string | null>(null)

    // async function getClientByName(name: string) {
    //     const response = await fetch(`${process.env.apiUrl}/v1/client/get/name/${name}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
    //         }
    //     });
    //     if (response.status == 204) {
    //         toast.error('Ops... No se pudo encontrar un cliente con ese nombre', { duration: 5000 })
    //         return
    //     } else if (response.status == 302) {
    //         toast.success('Se encontró el cliente, falta completar los otros datos', { duration: 5000 })
    //     }
    //     let clientData: Client = await response.json();
    //     //setClient(clientData)
    //     setItems(clientsNames)
    // }

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
            setClient(null)
            return
        } else if (response.status == 302) {
            toast.success('Se encontró el cliente, falta completar los otros datos', { duration: 5000 })
            setShow(false)
        }
        let clientData: any = await response.json();
        setClient(clientData)
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

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && clientName != null && clientName?.trim() != "") {
            getClientByName(clientName!)
        }
    }
    const onChangeName = (event: any) => {
        if (client != null) {
            setClient(null)
        }
        setClientName(event.target.value);
        setQuery(event.target.value)
        setShow(true)
    }

    useEffect(()=>{
        getClientsName();
    },[])

    return (
        <div className={styles.formBase}>
            <p>Nueva Diferencia</p>
            <div>
                <div>
                    <p className={styles.date}>{format(new Date(), 'dd/MM/yyyy')}</p>
                    <div>
                        <input type="text" onKeyDown={handleKeyDown} placeholder='Apodo Cliente' onChange={onChangeName} value={query}/>
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
                    <select {...register("differenceType", { required: true })}>
                        <option value="Faltante">Faltante</option>
                        <option value="Sobrante">Sobrante</option>
                    </select>
                    <input type="text" placeholder='Importe' {...register("amount", { required: true, pattern: ONLY_NUMBERS_ON_STRING, maxLength: 40 })} />
                    {errors.amount && (errors.amount.type === "pattern" || errors.amount.type === "required") && (<span>Es obligatorio y solo son números</span>)}
                    {errors.amount && errors.amount.type === "maxLength" && (<span>Máximo de 40 dígitos</span>)}
                </div>
                <textarea placeholder='Detalle Inconveniente' className={styles.description} {...register("description", { required: true, maxLength: 100 })} />
                <br />
                {errors.description && errors.description.type === "required" && (<span>La descripción es obligatoria</span>)}
                {errors.description && errors.description.type === "maxLength" && (<span>Máximo de 100 dígitos</span>)}
            </div>
            <div>
                <button ><Link href='/clients/difference'>Cancelar</Link></button>
                <button onClick={onClickDiffernece} >Guardar</button>
            </div>
            <Toaster 
            position="bottom-left"
            reverseOrder={false}/>
        </div>
    )
}