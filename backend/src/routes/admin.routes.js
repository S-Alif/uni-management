import {batchRoutes, userRoutes} from "./routeLists/lists.admin.routes.js"


// route lists
const routeList = [
    {path: "/users", route: userRoutes},
    {path: "/batch", route: batchRoutes}
]


export default routeList