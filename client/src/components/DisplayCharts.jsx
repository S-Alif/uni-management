import PieCharts from "./charts/PieChart"
import BarCharts from "./charts/BarChart"

const chartConfigs = {
    "Student Genders": {
        type: "pie",
        labelKey: "label",
        valueKey: "value",
        colorKey: "fill",
        title: "Student Genders",
    },
    "Teacher Genders": {
        type: "pie",
        labelKey: "label",
        valueKey: "value",
        colorKey: "fill",
        title: "Teacher Genders",
    },
    "Students By Department": {
        type: "bar",
        labelKey: "label",
        valueKey: "value",
        colorKey: "fill",
        title: "Students by Department",
    },
    "Teachers By Department": {
        type: "bar",
        labelKey: "label",
        valueKey: "value",
        colorKey: "fill",
        title: "Teachers by Department",
    },
    "Departments By Faculty": {
        type: "bar",
        labelKey: "label",
        valueKey: "value",
        colorKey: "fill",
        title: "Departments by Faculty",
    },
}

const colorMap = {
    MALE: "hsl(var(--chart-1))",
    FEMALE: "hsl(var(--chart-2))",
    CSE: "hsl(var(--chart-1))",
    EEE: "hsl(var(--chart-2))",
    TEX: "hsl(var(--chart-3))",
    BBA: "hsl(var(--chart-4))",
    ENG: "hsl(var(--chart-5))",
    CEN: "hsl(var(--chart-6))",
    FDT: "hsl(var(--chart-7))",
    "The faculty of Business Studies": "hsl(var(--chart-1))",
    "The faculty of Humanities, Social Sciences & Law": "hsl(var(--chart-2))",
    "The faculty of Science and Engineering": "hsl(var(--chart-3))",
}

function transformChartData(data) {
    return data.map((item) => {
        const label =
            item._id || item.departmentName || item.facultyName || "Other"
        // console.log(label, item)
        return {
            label,
            value: item.count,
            fill: colorMap[label] || "hsl(var(--chart-other))",
        }
    })
}

const DisplayCharts = ({ chart }) => {
    const config = chartConfigs[chart.name]
    if (!config) return null

    const chartData = transformChartData(chart.data)
    console.log(chartData)

    if (config.type === "pie") {
        return (
            <PieCharts
                title={config.title}
                data={chartData}
                subtitle={"As of today"}
                dataKey="value"
                nameKey="label"
                config={config}
            />
        )
    } else if (config.type === "bar") {
        return (
            <BarCharts
                title={config.title}
                data={chartData}
                subtitle={"As of today"}
                dataKey="value"
                nameKey="label"
                config={config}
            />
        )
    }

    return null
}

export default DisplayCharts
