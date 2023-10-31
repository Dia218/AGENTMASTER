import './css/StockGraphChart.css';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer, ReferenceLine,
} from "recharts";
import React from "react";

export default function StockGraphChart({ GraphChartInput }) {
    // "stockPrice" 필드만 추출하여 새로운 배열 생성
    const stockPrices = GraphChartInput.map(data => data.stockPrice);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={stockPrices}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip wrapperStyle={{ color: "white" }}/>
                <Legend/>
                <ReferenceLine y={0} stroke="#000"/>
                <Bar dataKey={stockPrices} fill="blue"/>
            </BarChart>
        </ResponsiveContainer>
    );
}
