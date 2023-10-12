import { MenuFormData } from '@/models/MenuFormData';
import styles from './MenuFormComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';



export default function MenuFormComponent(menuFormData:MenuFormData) {
    return (

        <div className={styles.clientMenuBase}>
            <Image src={menuFormData.imageName} alt='' width={90} height={90} />
            <p>{menuFormData.title}</p>
            {
                menuFormData.options.map(particular => (
                    <div key={particular.optionDescription} className={styles.particularOption}>
                        <Image src={particular.optionsImage} alt='' width={40} height={40} />
                        <Link href={particular.optionHref}>{particular.optionDescription}</Link>
                    </div>
                ))
            }
            <Link href={menuFormData.returnUrl}>Atrás</Link>
        </div>

    )
}