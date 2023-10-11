import MenuFormComponent from '@/components/common/menuForm/MenuFormComponent';
import { MenuFormData } from '@/models/MenuFormData';

export default function MultiboxMenuComponent() {
  const multiboxMenuData:MenuFormData = {
    imageName:'/clientMenu.png',
    title:'Cajas',
    returnUrl:'/',
    options:[
      {
        optionsImage: '/add-user.png',
        optionHref: '/multibox/list/PESO',
        optionDescription: 'Caja en Pesos'
      },
      {
        optionsImage: '/menu.png',
        optionHref: '/multibox/foreign-currency',
        optionDescription: 'Cajas de Divisas'
      },
      {
        optionsImage: '/difference-user.png',
        optionHref: '/multibox/list/PESO_OFFICE',
        optionDescription: 'Deuda Oficina'
      },{
        optionsImage: '/add-user.png',
        optionHref: '/multibox/balance',
        optionDescription: 'Balance'
      },
      {
        optionsImage: '/menu.png',
        optionHref: '/multibox/box/1',
        optionDescription: 'Caja 1'
      },
      {
        optionsImage: '/menu.png',
        optionHref: '/multibox/box/2',
        optionDescription: 'Caja 2'
      }
    ]
  }
  return (
    <MenuFormComponent {...multiboxMenuData}/>
  )
}