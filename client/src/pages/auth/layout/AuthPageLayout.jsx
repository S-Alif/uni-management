import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import logo from "../../../assets/images/logo.png"

const AuthPageLayout = ({children, pageId, pageTitle}) => {
  return (
    <section 
        className="w-full min-h-screen py-10 flex justify-center items-center"
        id={pageId}
    >
        <div className="flex flex-col gap-5 w-[500px] max-w-[calc(100%-20px)]">
            <div>
                <img src={logo} alt="" />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">{pageTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </div>

    </section>
  )
}

export default AuthPageLayout