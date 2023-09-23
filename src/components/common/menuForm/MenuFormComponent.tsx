import { MenuFormData } from '@/models/MenuFormData';
import styles from './MenuFormComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';



export default function MenuFormComponent(menuFormData:MenuFormData) {
    return (

        <div className={styles.clientMenuBase}>
            <Image src={menuFormData.imageName} alt='' width={80} height={80} />
            <p>{menuFormData.title}</p>
            {
                menuFormData.options.map(particular => (
                    <div key={particular.optionDescription}>
                        <Image src={particular.optionsImage} alt='' width={30} height={30} />
                        <Link href={particular.optionHref}>{particular.optionDescription}</Link>
                    </div>
                ))
            }
            <Link href={menuFormData.returnUrl}>Atrás</Link>
        </div>

    )
}