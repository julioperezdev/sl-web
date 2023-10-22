import PesosForm from "@/components/multibox/multiboxList/pesosForm/PesosForm";

export default function MultiboxAuxiliarPage(props: any) {
    const multiboxName:string = props.params.name;
    function showScreen(){
        if(multiboxName == 'PESO') return <PesosForm/>
        else return <h1>No esta habilitado por ahora</h1>
    }
    return (
        <div>
            {multiboxName}
        </div>
    )
  }