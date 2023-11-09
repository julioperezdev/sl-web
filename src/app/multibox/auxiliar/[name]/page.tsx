import BalanceAuxiliarButton from "@/components/multibox/auxiliarButtons/balance/BalanceAuxiliarButton";
import ForeignCurrencyAuxiliarButton from "@/components/multibox/auxiliarButtons/foreign-currecy/ForeignCurrencyAuxiliarButton";
import OfficeDebtAuxiliarButton from "@/components/multibox/auxiliarButtons/officeDebt/OfficeDebtAuxiliarButton";
import PesosBoxAuxiliarButton from "@/components/multibox/auxiliarButtons/pesos/PesosAuxiliarButton";
import SellerBoxAuxiliarButton from "@/components/multibox/auxiliarButtons/sellerBox/SellerBoxAuxiliarButton";
export default function AuxiliarMultiboxPage(props: any) {
    const multiboxName:string = props.params.name;
    
    function defineAuxiliarButton(){
        if(multiboxName == 'PESO') return <PesosBoxAuxiliarButton/>
        else if(multiboxName == 'PESO_OFFICE') return <OfficeDebtAuxiliarButton/>
        else if(isForeignCurrencyByName(multiboxName)) return <ForeignCurrencyAuxiliarButton currencyName={multiboxName}/>
        else if(multiboxName == 'BALANCE') return <BalanceAuxiliarButton/>
        else if(multiboxName == 'SELLER_BOX_1') return <SellerBoxAuxiliarButton number="1"/>
        else if(multiboxName == 'SELLER_BOX_2') return <SellerBoxAuxiliarButton number="2"/>
        else return <h1>Nombre mal asignado</h1>
    }

    function isForeignCurrencyByName(currencyNameToValidate: string): boolean {
      const foreignCurrencyAvailables: string[] = ['USD_HIGH', 'USD_LOW', 'EURO', 'REAL'];
      let foreignCurrencyFiltered = foreignCurrencyAvailables.filter(particular => currencyNameToValidate == particular);
      return foreignCurrencyFiltered.length === 1;
  }
    return (
      <>{defineAuxiliarButton()}</>
    )
  }