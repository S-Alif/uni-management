import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"


const DashboardCards = ({item}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {item.name}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl">{item?.count}</p>
            </CardContent>
        </Card>
    )
}

export default DashboardCards