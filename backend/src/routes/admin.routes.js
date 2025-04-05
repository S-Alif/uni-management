import {batchRoutes, batchSectionsRoutes, deptRoutes, facultyRoutes, userRoutes} from "./routeLists/lists.admin.routes.js"


// route lists
const routeList = [
    {path: "/users", route: userRoutes},
    {path: "/faculty", route: facultyRoutes},
    {path: "/department", route: deptRoutes},
    {path: "/batch", route: batchRoutes},
    {path: "/section", route: batchSectionsRoutes},
]


export default routeList