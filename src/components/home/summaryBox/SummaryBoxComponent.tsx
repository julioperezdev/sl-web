'use client'
import styles from "./SummaryBoxComponent.module.css"
import { SummaryMultiboxResponse } from "@/models/MultiboxModel";
import { useEffect, useState } from "react";
import ParticularSummaryBoxComponent from "./ParticularSummaryBoxComponent";


export default function SummaryBoxComponent() {

    const [summary, setSummary] = useState<SummaryMultiboxResponse | null>(null)

    async function getSummary() {
        const response = await fetch(process.env.apiUrl + '/v1/box/shared/summary', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
        let summaryData: SummaryMultiboxResponse = await response.json();
        console.log(summaryData)
        setSummary(summaryData);

    }

    useEffect(() => {
        getSummary()
    }, [])


    return (
        <div>
            {summary
                ? <div className={styles.base}>
                    <p className={styles.text}>Cajas</p>
                    <ParticularSummaryBoxComponent
                        name="Balance"
                        value={summary.balance} />
                    <div className={styles.boxes}>
                        <ParticularSummaryBoxComponent
                            name="Pesos"
                            value={summary.pesosBox} />
                        <ParticularSummaryBoxComponent
                            name="Oficina"
                            value={summary.officeBox} />
                        <ParticularSummaryBoxComponent
                            name="Dolar Grande"
                            value={summary.dollarHigh} />
                        <ParticularSummaryBoxComponent
                            name="Dolar Chico"
                            value={summary.dollarLow} />
                        <ParticularSummaryBoxComponent
                            name="Euro"
                            value={summary.euro} />
                        <ParticularSummaryBoxComponent
                            name="Real"
                            value={summary.real} />
                        <ParticularSummaryBoxComponent
                            name="Caja 1"
                            value={summary.sellerBox1} />
                        <ParticularSummaryBoxComponent
                            name="Caja 2"
                            value={summary.sellerBox2} />
                    </div>

                </div>
                : <></>}
        </div>
    )
}