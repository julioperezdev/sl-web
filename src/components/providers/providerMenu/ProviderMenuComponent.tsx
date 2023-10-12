import { MenuFormData } from '@/models/MenuFormData';
import MenuFormComponent from '@/components/common/menuForm/MenuFormComponent';

export default function ProviderMenuComponent() {
  const clientMenuData:MenuFormData = {
    imageName:'/images/image_33.png',
    title:'Proveedores',
    returnUrl:'/',
    options:[
      {
        optionsImage: '/images/image_34.png',
        optionHref: '/provider/add',
        optionDescription: 'Nuevo proveedor'
      },
      {
        optionsImage: '/images/image_35.png',
        optionHref: '/provider/list',
        optionDescription: 'Lista de proveedores'
      }
    ]
  }
  return (
    <MenuFormComponent {...clientMenuData}/>
  )
}