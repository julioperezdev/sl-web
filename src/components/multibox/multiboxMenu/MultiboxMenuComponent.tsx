import MenuFormComponent from '@/components/common/menuForm/MenuFormComponent';
import { MenuFormData } from '@/models/MenuFormData';

export default function MultiboxMenuComponent() {
  const multiboxMenuData:MenuFormData = {
    imageName:'/images/cajas.png',
    title:'Cajas',
    returnUrl:'/',
    options:[
      {
        optionsImage: '/images/cajenpesos.png',
        optionHref: '/multibox/list/PESO',
        optionDescription: 'Caja en Pesos'
      },
      {
        optionsImage: '/images/image_37.png',
        optionHref: '/multibox/foreign-currency',
        optionDescription: 'Caja de Divisas'
      },
      {
        optionsImage: '/images/deudaoficina.png',
        optionHref: '/multibox/list/PESO_OFFICE',
        optionDescription: 'Deuda Oficina'
      },{
        optionsImage: '/images/balance.png',
        optionHref: '/multibox/balance',
        optionDescription: 'Balance'
      },
      {
        optionsImage: '/images/caja1.png',
        optionHref: '/multibox/box/1',
        optionDescription: 'Caja 1'
      },
      {
        optionsImage: '/images/caja1.png',
        optionHref: '/multibox/box/2',
        optionDescription: 'Caja 2'
      }
    ]
  }
  return (
    <MenuFormComponent {...multiboxMenuData}/>
  )
}