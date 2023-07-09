import React, { PureComponent } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Label,
} from "recharts";

const data = [
    {
        name: "오전 10:00",
        백광산업: 4000,
        amt: 2400,
    },
    {
        name: "오전 12:00",
        백광산업: 3000,
        
        amt: 2210,
    },
    {
        name: "오후 2:00",
        백광산업: 2000,
     
        amt: 2290,
    },
];

export default class Example extends PureComponent {
    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 65,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="백광산업"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                   

                    <Label
                        value="백광산업"
                        position="top"
                        offset={10}
                        style={{ fill: "black" }}
                    />
                    {data.map((entry, index) => (
                        <text
                            key={`label-${index}`}
                            x={90} // x 위치 조정
                            y={40} // y 위치 조정
                            textAnchor="middle"
                            fill="black"
                            style={{ fontSize: 20 }}
                        >
                            백광산업
                        </text>
                    ))}
                </LineChart>
            </ResponsiveContainer>
        );
    }
}

