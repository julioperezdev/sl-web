import { MenuFormData } from '@/models/MenuFormData';
import MenuFormComponent from '@/components/common/menuForm/MenuFormComponent';

export default function NoteMenuComponent() {
  const clientMenuData:MenuFormData = {
    imageName:'/notes.png',
    title:'Recordatorios',
    returnUrl:'/',
    options:[
      {
        optionsImage: '/add-post.png',
        optionHref: '/note/add',
        optionDescription: 'Nuevo Recordatorio'
      },
      {
        optionsImage: '/menu.png',
        optionHref: '/note/list',
        optionDescription: 'Historial de Recordatorios'
      }
    ]
  }
  return (
    <MenuFormComponent {...clientMenuData}/>
  )
}