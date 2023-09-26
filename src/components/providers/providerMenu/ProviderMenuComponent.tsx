import { MenuFormData } from '@/models/MenuFormData';
import MenuFormComponent from '@/components/common/menuForm/MenuFormComponent';

export default function ProviderMenuComponent() {
  const clientMenuData:MenuFormData = {
    imageName:'/providerMenu.png',
    title:'Proveedor',
    returnUrl:'/',
    options:[
      {
        optionsImage: '/sellerNew.png',
        optionHref: '/provider/add',
        optionDescription: 'Nuevo proveedor'
      },
      {
        optionsImage: '/menu.png',
        optionHref: '/provider/list',
        optionDescription: 'Lista de proveedores'
      }
    ]
  }
  return (
    <MenuFormComponent {...clientMenuData}/>
  )
}