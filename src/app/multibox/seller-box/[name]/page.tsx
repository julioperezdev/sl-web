import SellerBoxListComponent from "@/components/multibox/sellerBoxList/SellerBoxListComponent";
export default function MultiboxSellerBoxPage(props: any) {
    const sellerBoxName:string = props.params.name;
    return (
      <SellerBoxListComponent name={sellerBoxName}/>
    )
  }