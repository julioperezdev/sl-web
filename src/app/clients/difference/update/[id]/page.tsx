import UpdateDifferenceComponent from "@/components/clients/updateDifference/UpdateDifferenceComponent"

export default function UpdateDifferencePage(props: any) {
    const idValue:string = props.params.id;
    return (
        <div>
            <UpdateDifferenceComponent idValue={idValue}/>
        </div>
    )
}