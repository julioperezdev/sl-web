import { MenuFormData } from '@/models/MenuFormData';
import MenuFormComponent from '@/components/common/menuForm/MenuFormComponent';

export default function NoteMenuComponent() {
  const clientMenuData:MenuFormData = {
    imageName:'/images/Recordatorios.png',
    title:'Recordatorios',
    returnUrl:'/',
    options:[
      {
        optionsImage: '/images/Nuevo_Recordatorio.png',
        optionHref: '/note/add',
        optionDescription: 'Nuevo Recordatorio'
      },
      {
        optionsImage: '/images/Historico_de_recordatorios.png',
        optionHref: '/note/list',
        optionDescription: 'Histórial de Recordatorios'
      }
    ]
  }
  return (
    <MenuFormComponent {...clientMenuData}/>
  )
}