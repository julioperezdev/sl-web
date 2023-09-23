import MenuFormComponent from '@/components/common/menuForm/MenuFormComponent';
import { MenuFormData } from '@/models/MenuFormData';

export default function DifferenceMenuComponent() {
    const clientMenuData:MenuFormData = {
        imageName:'/difference-user.png',
        title:'Diferencia de Clientes',
        returnUrl:'/clients',
        options:[
          {
            optionsImage: '/add-list.png',
            optionHref: '/clients/difference/add',
            optionDescription: 'Nueva diferencia'
          },
          {
            optionsImage: '/menu.png',
            optionHref: '/clients/difference/list',
            optionDescription: 'Histórico de Diferencias'
          }
        ]
      }
      return (
        <MenuFormComponent {...clientMenuData}/>
      )
}