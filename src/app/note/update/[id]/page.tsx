import UpdateNoteComponent from "@/components/note/updateNote/UpdateNoteComponent";

export default function UpdateDifferencePage(props: any) {
    const idValue:string = props.params.id;
    return (
        <div>
            <UpdateNoteComponent idValue={idValue}/>
        </div>
    )
}