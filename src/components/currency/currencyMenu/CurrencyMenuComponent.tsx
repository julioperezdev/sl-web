import MenuFormComponent from '@/components/common/menuForm/MenuFormComponent';
import { MenuFormData } from '@/models/MenuFormData';

export default function CurrencyMenuComponent() {
  const clientMenuData:MenuFormData = {
    imageName:'/currency.png',
    title:'Cotización',
    returnUrl:'/',
    options:[
      {
        optionsImage: '/notes.png',
        optionHref: '/currency/update',
        optionDescription: 'Actualizar Cotización'
      },
      {
        optionsImage: '/menu.png',
        optionHref: '/currency/list',
        optionDescription: 'Historico de Actualizaciones'
      }
    ]
  }
  return (
    <MenuFormComponent {...clientMenuData}/>
  )
}