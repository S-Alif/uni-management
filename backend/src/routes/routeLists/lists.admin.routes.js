// controllers
import fileUpload from "express-fileupload"
import batchController from "../../controllers/batch/batch.controller.js"
import deptController from "../../controllers/departments/dept.controller.js"
import userController from "../../controllers/users/users.controller.js"
import fileCheck from "../../middlewares/fileChecker.middlewares.js"
import { fileExt } from "../../constants/rolesAndFiles.constants.js"
import facultyController from "../../controllers/faculty/faculty.controller.js"
import batchSectionController from "../../controllers/batch/batch-sections/batchSection.controller.js"
import subjectController from "../../controllers/subjects/subject.controller.js"
import semesterController from "../../controllers/semesters/semester.controller.js"

const fileUp = fileUpload({ createParentPath: true })

// user routes
const userRoutes = [
    {path: "/", method: "post", middleware: [fileUp, fileCheck([fileExt.JPG, fileExt.PNG], 1)], controller: userController.registerUser},
    {path: "/teachers", method: "get", controller: userController.getTeacherList},
    {path: "/students", method: "get", controller: userController.getStudentList},
    {path: "/:id", method: "get", controller: userController.getUser},
    {path: "/:id", method: "patch",middleware: [fileUp, fileCheck([fileExt.JPG, fileExt.PNG], 0)], controller: userController.updateUser},
    // {path: "/faculty", method: "get", controller: ""},
    // {path: "/departments", method: "get", controller: ""},
    // {path: "/faculty/departments", method: "get", controller: ""},
    // {path: "/faculty/departments/offered-programs", method: "get", controller: ""},
    // {path: "/faculty/departments/teachers", method: "get", controller: ""},
    // {path: "/subjects", method: "get", controller: ""},
]

// faculty
const facultyRoutes = [
    { path: "/", method: "post", middleware: [fileUp, fileCheck([fileExt.JPG, fileExt.PNG], 2)], controller: facultyController.saveFaculty },
    { path: "/:id", method: "patch", middleware: [fileUp, fileCheck([fileExt.JPG, fileExt.PNG], 0)], controller: facultyController.saveFaculty },
    { path: "/:id", method: "delete", controller: facultyController.removeFaculty },
    { path: "/", method: "get", controller: facultyController.getFacultyList },
    { path: "/:id", method: "get", controller: facultyController.getFaculty },
]

// department routes
const deptRoutes = [
    { path: "/", method: "post", middleware: [fileUp, fileCheck([fileExt.JPG, fileExt.PNG], 2)], controller: deptController.saveDept },
    { path: "/:id", method: "patch", middleware: [fileUp, fileCheck([fileExt.JPG, fileExt.PNG], 0)], controller: deptController.saveDept },
    { path: "/:id", method: "delete", controller: deptController.removeDept },
    { path: "/", method: "get", controller: deptController.getDeptList },
    { path: "/:id", method: "get", controller: deptController.getDept },
]

// batch routes
const batchRoutes = [
    { path: "/", method: "post", controller: batchController.saveBatch },
    { path: "/:id", method: "patch", controller: batchController.saveBatch },
    { path: "/:id", method: "delete", controller: batchController.removeBatch },
    { path: "/", method: "get", controller: batchController.getBatchList },
]

// batch sections routes
const batchSectionsRoutes = [
    { path: "/", method: "post", controller: batchSectionController.saveSection },
    { path: "/:id", method: "patch", controller: batchSectionController.saveSection },
    { path: "/:id", method: "delete", controller: batchSectionController.removeSection },
    { path: "/", method: "get", controller: batchSectionController.getSectionList },
]

// subject routes
const subjectRoutes = [
    { path: "/", method: "post", controller: subjectController.saveSubject },
    { path: "/:id", method: "patch", controller: subjectController.saveSubject },
    { path: "/:id", method: "delete", controller: subjectController.removeSubject },
    { path: "/", method: "get", controller: subjectController.subjectList },
]

// semester routes
const semesterRoutes = [
    { path: "/", method: "post", controller: semesterController.saveSemester },
    { path: "/:id", method: "patch", controller: semesterController.saveSemester },
    { path: "/:id", method: "delete", controller: semesterController.removeSemester  },
    { path: "/", method: "get", controller: semesterController.getAllSemesters },
    { path: "/:id", method: "get", controller: semesterController.getSemester },
]


export {
    userRoutes,
    facultyRoutes,
    deptRoutes,
    batchRoutes,
    batchSectionsRoutes,
    subjectRoutes,
    semesterRoutes
}