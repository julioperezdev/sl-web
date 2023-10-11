import MenuFormComponent from '@/components/common/menuForm/MenuFormComponent';
import { MenuFormData } from '@/models/MenuFormData';

export default function ForeignCurrencyMenuComponent() {
  const foreignCurrencyMenuData:MenuFormData = {
    imageName:'/clientMenu.png',
    title:'Cajas de Divisas',
    returnUrl:'/multibox',
    options:[
      {
        optionsImage: '/add-user.png',
        optionHref: '/multibox/foreign-currency/USD HIGH',
        optionDescription: 'Dólares Grandes'
      },
      {
        optionsImage: '/add-user.png',
        optionHref: '/multibox/foreign-currency/USD LOW',
        optionDescription: 'Dólar Chico y Cambio'
      },
      {
        optionsImage: '/add-user.png',
        optionHref: '/multibox/foreign-currency/EURO',
        optionDescription: 'Euros'
      },
      {
        optionsImage: '/add-user.png',
        optionHref: '/multibox/foreign-currency/REAL',
        optionDescription: 'Reales'
      }
    ]
  }
  return (
    <MenuFormComponent {...foreignCurrencyMenuData}/>
  )
}