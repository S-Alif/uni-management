import {batchRoutes, deptRoutes, facultyRoutes, userRoutes} from "./routeLists/lists.admin.routes.js"


// route lists
const routeList = [
    {path: "/users", route: userRoutes},
    {path: "/batch", route: batchRoutes},
    {path: "/department", route: deptRoutes},
    {path: "/faculty", route: facultyRoutes},
]


export default routeList