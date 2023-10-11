import MultiboxListComponent from "@/components/multibox/multiboxList/MultiboxListComponent"
export default function MultiboxListPage(props: any) {
    const multiboxName:string = props.params.name;
    return (
      <MultiboxListComponent multiboxName={multiboxName}/>
    )
  }