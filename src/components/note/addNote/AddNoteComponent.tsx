'use client'
import styles from './AddNoteComponent.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { v4 as uuid } from 'uuid'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { sleep } from '@/helper/sleepInMilli/Sleep';
import { AddNoteRequest, NoteRequestForm } from '@/models/NoteModel';
import { format } from 'date-fns'

export default function AddNoteComponent() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<NoteRequestForm>();

    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const dataValidated = converFormData(data);
            const response = await sendForm(dataValidated);
            if (response.status == 201) {
                reset();
                toast.success('Se ha guardado exitosamente el Recordatorio')
                await sleep(2000);
                router.replace(`/note`)
            } else {
                toast.error('Ops... No se pudo guardar el Recordatorio')
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo guardar el Recordatorio')
        }
    }
    );

    function converFormData(data: NoteRequestForm): AddNoteRequest {
        return {
            id: uuid(),
            description: data.description,
            color: data.color
        }
    }

    function sendForm(addNodeRequest: AddNoteRequest) {
        return fetch('http://localhost:8081/api/v1/note/create', {
            method: 'PUT',
            body: JSON.stringify(addNodeRequest),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
    }

    return (
        <div className={styles.formBase}>
            <p>Nuevo Recordatorio</p>
            <div>
                <p>{format(new Date(), 'd/MM/yyyy')}</p>
                <select {...register("color", { required: true })}>
                    <option value="#f2f2f2">Blanco</option>
                    <option value="#e3ebff">Azul</option>
                    <option value="#ffe3e3">Rojo</option>
                    <option value="#fcfcde">Amarillo</option>
                </select>
                <input type="text" placeholder='Detalle' {...register("description", { required: true, maxLength: 30 })} />
                {errors.description && errors.description.type === "required" && (<span>La descripción es obligatoria</span>)}
                {errors.description && errors.description.type === "maxLength" && (<span>Máximo de 30 dígitos</span>)}
            </div>
            <div>
                <button><Link href='/note'>Atras</Link></button>
                <button onClick={onSubmit} >Guardar</button>
            </div>
            <Toaster />
        </div>
    )
}