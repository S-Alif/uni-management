const baseUrl = "http://localhost:9010"

// paths
const admin = "admin"
const teachers = "teachers"
const students = "students"
const publicEndpoint = "public"
const users = "users"

// methods
const GET = "GET"
const POST = "POST"
const PATCH = "PATCH"
const DELETE_METHOD = "DELETE"

const createRoute = (paths, route, method) => {
    return {
        url: paths ? `${baseUrl}/api/v1/${paths}/${route}` : `${baseUrl}/api/v1/${route}`,
        method: method,
    }
}

// public routes
const publicRoutes = {
    login: createRoute(publicEndpoint, "login", POST),
    register: createRoute(publicEndpoint, "register", POST),
    sendOtp: createRoute(publicEndpoint, "otp", POST),
    verifyOtp: createRoute(publicEndpoint, "otp", PATCH),
    updatePass: createRoute(publicEndpoint, "update-pass", PATCH),
    logout: createRoute(null, "users/logout", PATCH),
    faculty: createRoute(publicEndpoint, "faculty", GET),
    department: createRoute(publicEndpoint, "departments", GET),
    teachers: createRoute(publicEndpoint, "teachers", GET),
    subjects: createRoute(publicEndpoint, "subjects", GET),
    teacherProfile: createRoute(publicEndpoint, "users", GET),
    studentProfile: createRoute(null, "users", GET),
}

// admin routes
const administrationRoutes = {
    // administration
    user: `${baseUrl}/api/v1/${admin}/users`,
    batch: `${baseUrl}/api/v1/${admin}/batch`,
    department: `${baseUrl}/api/v1/${admin}/department`,
    faculty: `${baseUrl}/api/v1/${admin}/faculty`,
    sections: `${baseUrl}/api/v1/${admin}/section`,
    subjects: `${baseUrl}/api/v1/${admin}/subjects`,
    semester: `${baseUrl}/api/v1/${admin}/semester`,
    timeSlot: `${baseUrl}/api/v1/${admin}/time`,
    schedule: `${baseUrl}/api/v1/${admin}/schedule`,


    // for users
    teachers: `${baseUrl}/api/v1/${admin}/${users}/teachers`,
    students: `${baseUrl}/api/v1/${admin}/${users}/students`,
}

// student routes
const studentRoutes = {
    user: `${baseUrl}/api/v1/${students}`,
    classmates: `${baseUrl}/api/v1/${students}/classmates`,
    schedules: `${baseUrl}/api/v1/${students}/schedules`,
}

// teacher routes
const teacherRoutes = {
    user: `${baseUrl}/api/v1/${teachers}`,
    schedules: `${baseUrl}/api/v1/${teachers}/schedules`,
}


export {
    baseUrl,
    publicRoutes,
    GET,
    POST,
    PATCH,
    DELETE_METHOD,
    administrationRoutes,
    studentRoutes,
    teacherRoutes
}