import MenuFormComponent from '@/components/common/menuForm/MenuFormComponent';
import { MenuFormData } from '@/models/MenuFormData';

export default function SellersMenuComponent() {
  const clientMenuData:MenuFormData = {
    imageName:'/sellerMenu.png',
    title:'Vendedores',
    returnUrl:'/',
    options:[
      {
        optionsImage: '/sellerNew.png',
        optionHref: '/sellers/add',
        optionDescription: 'Nuevo vendedor'
      },
      {
        optionsImage: '/sellerUpdate.png',
        optionHref: '/sellers/list',
        optionDescription: 'Listar vendedores'
      },
      {
        optionsImage: '/sellerCommission.png',
        optionHref: '/sellers/commission',
        optionDescription: 'Comisiones'
      },
      {
        optionsImage: '/sellerCommissionPay.png',
        optionHref: '/sellers/commission/history',
        optionDescription: 'H. Comisiones pagadas'
      }
    ]
  }
  return (
    <MenuFormComponent {...clientMenuData}/>
  )
  
}