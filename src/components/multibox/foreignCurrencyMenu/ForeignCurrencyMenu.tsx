import MenuFormComponent from '@/components/common/menuForm/MenuFormComponent';
import { MenuFormData } from '@/models/MenuFormData';

export default function ForeignCurrencyMenuComponent() {
  const foreignCurrencyMenuData:MenuFormData = {
    imageName:'/images/image_37.png',
    title:'Cajas de Divisas',
    returnUrl:'/multibox',
    options:[
      {
        optionsImage: '/images/image_40.png',
        optionHref: '/multibox/foreign-currency/USD HIGH',
        optionDescription: 'Dólares Grandes'
      },
      {
        optionsImage: '/images/image_41.png',
        optionHref: '/multibox/foreign-currency/USD LOW',
        optionDescription: 'Dólar Chico y Cambio'
      },
      {
        optionsImage: '/images/image_39.png',
        optionHref: '/multibox/foreign-currency/EURO',
        optionDescription: 'Euros'
      },
      {
        optionsImage: '/images/image_38.png',
        optionHref: '/multibox/foreign-currency/REAL',
        optionDescription: 'Reales'
      }
    ]
  }
  return (
    <MenuFormComponent {...foreignCurrencyMenuData}/>
  )
}