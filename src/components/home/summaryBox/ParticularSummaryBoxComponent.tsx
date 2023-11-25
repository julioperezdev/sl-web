import styles from "./ParticularSummaryBoxComponent.module.css"

interface ParticularSummaryBoxData {
    name: string;
    value: number;
}
export default function ParticularSummaryBoxComponent(props:ParticularSummaryBoxData) {

    
    return (
        <div className={styles.base}>
            <p className={styles.name}>{props.name}</p>
            <p className={styles.value}>{props.value}</p>
        </div>
    )
}