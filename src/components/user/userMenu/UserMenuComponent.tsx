import MenuFormComponent from '@/components/common/menuForm/MenuFormComponent';
import { MenuFormData } from '@/models/MenuFormData';

export default function UserMenuComponent() {
  const clientMenuData:MenuFormData = {
    imageName:'/clientMenu.png',
    title:'Usuarios',
    returnUrl:'/',
    options:[
      {
        optionsImage: '/add-user.png',
        optionHref: '/user/add',
        optionDescription: 'Registrar Usuario'
      },
      {
        optionsImage: '/clipboard.png',
        optionHref: '/user/update',
        optionDescription: 'Asignar/Modificar Usuario'
      },
      {
        optionsImage: '/difference-user.png',
        optionHref: '/user/list',
        optionDescription: 'Lista de Usuarios'
      }
    ]
  }
  return (
    <MenuFormComponent {...clientMenuData}/>
  )
}