import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const AuthPageLayout = ({children, pageId, pageTitle}) => {
  return (
    <section 
        className="w-full min-h-[calc(100vh-80px)] py-10 flex justify-center items-center"
        id={pageId}
    >
        <div className="w-[500px] max-w-[calc(100%-20px)]">

            <Card className="max-h-[70vh] lg:max-h-[50vh] overflow-y-auto">
                <CardHeader>
                    <CardTitle className="text-2xl">{pageTitle}</CardTitle>
                </CardHeader>
                <hr className="mb-5" />
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </div>

    </section>
  )
}

export default AuthPageLayout