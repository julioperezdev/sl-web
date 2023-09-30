import MenuFormComponent from '@/components/common/menuForm/MenuFormComponent';
import { MenuFormData } from '@/models/MenuFormData';

export default function ClientsMenuComponent() {
  const clientMenuData:MenuFormData = {
    imageName:'/clientMenu.png',
    title:'Clientes',
    returnUrl:'/',
    options:[
      {
        optionsImage: '/add-user.png',
        optionHref: '/clients/add',
        optionDescription: 'Nuevo cliente'
      },
      {
        optionsImage: '/menu.png',
        optionHref: '/clients/list',
        optionDescription: 'Lista de clientes'
      },
      {
        optionsImage: '/difference-user.png',
        optionHref: '/clients/difference',
        optionDescription: 'Diferencia de clientes'
      },
    ]
  }
  return (
    <MenuFormComponent {...clientMenuData}/>
  )
}