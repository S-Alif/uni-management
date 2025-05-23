import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Cell
} from "recharts"

const BarCharts = ({ title, subtitle, data, dataKey, nameKey, config }) => {
    // const chartData = data.map(item => ({
    //     [dataKey]: item.value,
    //     [nameKey]: item.label,
    //     fill: item.fill || "hsl(var(--chart-5))"
    // }))

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={config}>
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey={nameKey}
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 5)}
                        />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey={dataKey} radius={[4, 4, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`bar-cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default BarCharts