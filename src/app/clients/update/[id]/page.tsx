

import UpdateClientComponent from "@/components/clients/updateClient/UpdateClientComponent"

export default function UpdateClientPage(props: any) {
    const idValue:string = props.params.id;
    return (
        <div>
            <UpdateClientComponent idValue={idValue}/>
        </div>
    )
}