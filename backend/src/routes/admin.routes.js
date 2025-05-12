import {batchRoutes, batchSectionsRoutes, deptRoutes, facultyRoutes, schedulesRoutes, semesterRoutes, subjectRoutes, timeSlotRoutes, userRoutes} from "./routeLists/lists.admin.routes.js"


// route lists
const routeList = [
    {path: "/users", route: userRoutes},
    {path: "/faculty", route: facultyRoutes},
    {path: "/department", route: deptRoutes},
    {path: "/batch", route: batchRoutes},
    {path: "/section", route: batchSectionsRoutes},
    {path: "/subjects", route: subjectRoutes},
    {path: "/semester", route: semesterRoutes},
    {path: "/time", route: timeSlotRoutes},
    {path: "/schedule", route: schedulesRoutes},
]


export default routeList