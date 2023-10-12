import MenuFormComponent from '@/components/common/menuForm/MenuFormComponent';
import { MenuFormData } from '@/models/MenuFormData';

export default function SellersMenuComponent() {
  const clientMenuData:MenuFormData = {
    imageName:'/images/image_301.png',
    title:'Vendedores',
    returnUrl:'/',
    options:[
      {
        optionsImage: '/images/image_261.png',
        optionHref: '/sellers/add',
        optionDescription: 'Nuevo vendedor'
      },
      {
        optionsImage: '/images/image_321.png',
        optionHref: '/sellers/list',
        optionDescription: 'Listar vendedores'
      },
      {
        optionsImage: '/images/image_271.png',
        optionHref: '/sellers/commission',
        optionDescription: 'Comisiones'
      },
      {
        optionsImage: '/images/image_281.png',
        optionHref: '/sellers/commission/history',
        optionDescription: 'H. Comisiones pagadas'
      }
    ]
  }
  return (
    <MenuFormComponent {...clientMenuData}/>
  )
  
}