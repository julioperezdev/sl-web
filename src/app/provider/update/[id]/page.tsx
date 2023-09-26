import UpdateProviderComponent from "@/components/providers/updateProvider/UpdateProviderComponent"

export default function UpdateProviderPage(props: any) {
    const idValue:string = props.params.id;
    return (
        <div>
            <UpdateProviderComponent idValue={idValue}/>
        </div>
    )
}