import {batchRoutes, batchSectionsRoutes, deptRoutes, facultyRoutes, semesterRoutes, subjectRoutes, userRoutes} from "./routeLists/lists.admin.routes.js"


// route lists
const routeList = [
    {path: "/users", route: userRoutes},
    {path: "/faculty", route: facultyRoutes},
    {path: "/department", route: deptRoutes},
    {path: "/batch", route: batchRoutes},
    {path: "/section", route: batchSectionsRoutes},
    {path: "/subjects", route: subjectRoutes},
    {path: "/semester", route: semesterRoutes},
]


export default routeList