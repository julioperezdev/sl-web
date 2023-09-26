import UpdateSellerComponent from "@/components/sellers/updateSeller/UpdateSellerComponent"

export default function UpdateSellersPage(props: any) {
  const idValue:string = props.params.id;
    return (
      <UpdateSellerComponent idValue={idValue}/>
    )
  }