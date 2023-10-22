import { MenuFormData } from '@/models/MenuFormData';
import MenuFormComponent from '@/components/common/menuForm/MenuFormComponent';

export default function OperationMenuComponent() {
  const operationMenuData:MenuFormData = {
    imageName:'/images/image_11.png',
    title:'Operaciones',
    returnUrl:'/',
    options:[
      {
        optionsImage: '/images/image_17.png',
        optionHref: '/operation/buy',
        optionDescription: 'Realizar compra'
      },
      {
        optionsImage: '/images/image_16.png',
        optionHref: '/operation/sell',
        optionDescription: 'Realizar venta'
      },
      {
        optionsImage: '/images/image_14.png',
        optionHref: '/operation/pending',
        optionDescription: 'Operaciones pendientes'
      },
      {
        optionsImage: '/images/image_13.png',
        optionHref: '/operation/done',
        optionDescription: 'Histórico de operaciones'
      }
      
    ]
  }
  return (
    <MenuFormComponent {...operationMenuData}/>
  )
}