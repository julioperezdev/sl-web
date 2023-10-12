import MenuFormComponent from '@/components/common/menuForm/MenuFormComponent';
import { MenuFormData } from '@/models/MenuFormData';

export default function DifferenceMenuComponent() {
    const clientMenuData:MenuFormData = {
        imageName:'/images/image_26.png',
        title:'Diferencia de Clientes',
        returnUrl:'/clients',
        options:[
          {
            optionsImage: '/images/image_45.png',
            optionHref: '/clients/difference/add',
            optionDescription: 'Nueva diferencia'
          },
          {
            optionsImage: '/images/image_46.png',
            optionHref: '/clients/difference/list',
            optionDescription: 'Histórico de Diferencias'
          }
        ]
      }
      return (
        <MenuFormComponent {...clientMenuData}/>
      )
}