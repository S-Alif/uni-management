const baseUrl = "http://localhost:9010"

// paths
const admin = "admin"
const teachers = "teachers"
const students = "students"
const publicEndpoint = "public"

// methods
const GET = "GET"
const POST = "POST"
const PATCH = "PATCH"
const DELETE_METHOD = "DELETE"

const createRoute = (paths, route, method) => {
    return {
        url: `${baseUrl}/api/v1/${paths}/${route}`,
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
}

export {
    baseUrl,
    publicRoutes,
    GET,
    POST,
    PATCH,
    DELETE_METHOD
}