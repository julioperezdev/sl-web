'use client'
import styles from './UpdateNoteComponent.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { v4 as uuid } from 'uuid'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { sleep } from '@/helper/sleepInMilli/Sleep';
import { Note, NoteRequestForm, UpdateNoteRequest } from '@/models/NoteModel';
import { useEffect, useState } from 'react';

export default function UpdateNoteComponent(idValue: {idValue:string}) {

    const { register, handleSubmit, reset,setValue, formState: { errors } } = useForm<NoteRequestForm>();
    const [note, setNote] = useState<Note | null>(null)

    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const dataValidated = converFormData(data);
            const response = await sendForm(dataValidated);
            if (response.ok) {
                reset();
                toast.success('Se ha actualizado exitosamente el Recordatorio')
                await sleep(2000);
                router.replace(`/note/list`)
            } else {
                toast.error('Ops... No se pudo actualizar el Recordatorio')
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo actualizar el Recordatorio')
        }
    }
    );

    function converFormData(data: NoteRequestForm): UpdateNoteRequest {
        return {
            id: note!.id,
            description: data.description,
            color: data.color
        }
    }

    function sendForm(updateNodeRequest: UpdateNoteRequest) {
        return fetch('http://localhost:8081/api/v1/note/update', {
            method: 'PUT',
            body: JSON.stringify(updateNodeRequest),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
    }

    async function getNoteById() {
        const response = await fetch(`http://localhost:8081/api/v1/note/get/${idValue.idValue}`,{
            method: 'PUT',
        });
        let noteData: Note = await response.json();
        setValue('description', noteData.description)
        setValue('color', noteData.color)
        setNote(noteData)
    }

    useEffect(() => {
        getNoteById();
    }, [])

    return (
        <form onSubmit={onSubmit} className={styles.formBase}>
            <Image src={'/add-post.png'} alt='Icono para indicar una modificacion del recordatorio' width={70} height={70} />
            <p>Modificar Recordatorio</p>
            <input type="text" placeholder='Detalle' {...register("description", { required: true, maxLength: 30 })} />
            {errors.description && errors.description.type === "required" && (<span>La descripción es obligatoria</span>)}
            {errors.description && errors.description.type === "maxLength" && (<span>Máximo de 30 dígitos</span>)}
            <select {...register("color", { required: true })}>
                <option value="#f2f2f2">Blanco</option>
                <option value="#e3ebff">Azul</option>
                <option value="#ffe3e3">Rojo</option>
                <option value="#fcfcde">Amarillo</option>
            </select>
            <div>
                <Link href='/note/list'>Atras</Link>
                <button id="formSubmit" type="submit" >Guardar</button>
            </div>
            <Toaster />
        </form>
    )
}