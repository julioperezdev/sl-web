import MenuFormComponent from '@/components/common/menuForm/MenuFormComponent';
import { MenuFormData } from '@/models/MenuFormData';

export default function ClientsMenuComponent() {
  const clientMenuData:MenuFormData = {
    imageName:'/images/image_29.png',
    title:'Clientes',
    returnUrl:'/',
    options:[
      {
        optionsImage: '/images/image_28.png',
        optionHref: '/clients/add',
        optionDescription: 'Nuevo cliente'
      },
      {
        optionsImage: '/images/image_30.png',
        optionHref: '/clients/list',
        optionDescription: 'Lista de clientes'
      },
      {
        optionsImage: '/images/image_26.png',
        optionHref: '/clients/difference',
        optionDescription: 'Diferencia de clientes'
      },
    ]
  }
  return (
    <MenuFormComponent {...clientMenuData}/>
  )
}