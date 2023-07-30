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

export default function StockGraphChart({GraphChartInput}) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={GraphChartInput}
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
                <Tooltip
                    wrapperStyle={{color: "white"}}
                />
                <Legend/>
                <ReferenceLine y={0} stroke="#000"/>
                <Bar dataKey="pv" fill="blue"/>
                <Bar dataKey="uv" fill="red"/>
            </BarChart>
        </ResponsiveContainer>
    );
}