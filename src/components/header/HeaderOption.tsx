import { HeaderOptionData } from '@/models/HeaderOptionData';
import styles from './HeaderOption.module.css'
import Image from 'next/image';
import Link from 'next/link';

export default function HeaderOption(headerOption:HeaderOptionData) {
    return (
        <Link href={headerOption.url} className={styles.headerOptionBase}>
            <div className={styles.imageBase}><Image src={headerOption.image} alt='' width={30} height={30} /></div>
            <div>
                <p className={styles.title}>{headerOption.title}</p>
                <p className={styles.description}>{headerOption.description}</p>
            </div>
        </Link>
    )
}