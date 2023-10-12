import MenuFormComponent from '@/components/common/menuForm/MenuFormComponent';
import { MenuFormData } from '@/models/MenuFormData';

export default function CurrencyMenuComponent() {
  const clientMenuData:MenuFormData = {
    imageName:'/images/Cotizacion.png',
    title:'Cotización',
    returnUrl:'/',
    options:[
      {
        optionsImage: '/images/Actualizar_Cotizacion.png',
        optionHref: '/currency/update',
        optionDescription: 'Actualizar Cotización'
      },
      {
        optionsImage: '/images/Historico_de_Actualizaciones.png',
        optionHref: '/currency/list',
        optionDescription: 'Historico de Actualizaciones'
      }
    ]
  }
  return (
    <MenuFormComponent {...clientMenuData}/>
  )
}