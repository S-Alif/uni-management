import usersModels from "../../models/users.models.js"
import departmentsModels from "../../models/departments.models.js"
import facultyModels from "../../models/faculty.models.js";
import semestersModels from "../../models/semesters.models.js";
import subjectsModels from "../../models/subjects.models.js";
import batchesModels from "../../models/batches.models.js";
import batchSectionsModels from "../../models/batchSections.models.js";
import { roles } from "../../constants/rolesAndFiles.constants.js";
import { ApiResponse } from "../../utils/api/response/apiResponse.js";

const dashboardServices = {
    adminDashboard: async (req) => {
        // get summary of everything for cards
        const [students, teachers, departments, faculties, semesters, subjects, batches, sections] = await Promise.all([
            usersModels.countDocuments({ role: roles.STUDENTS }),
            usersModels.countDocuments({ role: roles.TEACHERS }),
            departmentsModels.countDocuments(),
            facultyModels.countDocuments(),
            semestersModels.countDocuments(),
            subjectsModels.countDocuments(),
            batchesModels.countDocuments(),
            batchSectionsModels.countDocuments()
        ])

        const studentGenders = await usersModels.aggregate([
            { $match: { role: roles.STUDENTS } },
            { $group: { _id: "$gender", count: { $sum: 1 } } }
        ])

        const teacherGenders = await usersModels.aggregate([
            { $match: { role: roles.TEACHERS } },
            { $group: { _id: "$gender", count: { $sum: 1 } } }
        ])

        const studentsBydept = await usersModels.aggregate([
            { $match: { role: roles.STUDENTS } },
            { $group: { _id: "$dept", count: { $sum: 1 } } },
            {
                $lookup: {
                    from: "departments",
                    localField: "_id",
                    foreignField: "_id",
                    as: "department"
                }
            },
            {
                $unwind: "$department"
            },
            {
                $project: {
                    _id: 0,
                    departmentName: "$department.shortName",
                    count: 1
                }
            }
        ])

        const teacherByDept = await usersModels.aggregate([
            { $match: { role: roles.TEACHERS } },
            { $group: { _id: "$dept", count: { $sum: 1 } } },
            {
                $lookup: {
                    from: "departments",
                    localField: "_id",
                    foreignField: "_id",
                    as: "department"
                }
            },
            { $unwind: "$department" },
            {
                $project: {
                    _id: 0,
                    departmentName: "$department.shortName",
                    count: 1
                }
            }
        ])

        const deptByFaculty = await departmentsModels.aggregate([
            { $group: { _id: "$faculty", count: { $sum: 1 } } },
            {
                $lookup: {
                    from: "faculties",
                    localField: "_id",
                    foreignField: "_id",
                    as: "faculty"
                }
            },
            { $unwind: "$faculty" },
            {
                $project: {
                    _id: 0,
                    facultyName: "$faculty.name",
                    count: 1
                }
            }
        ])

        return new ApiResponse(200, {
            cards: [
                {name: "Students", count: students},
                {name: "Teachers", count: teachers},
                {name: "Departments", count: departments},
                {name: "Faculties", count: faculties},
                {name: "Semesters", count: semesters},
                {name: "Subjects", count: subjects},
                {name: "Batches", count: batches},
                {name: "Sections", count: sections},
            ],
            charts: [
                {name: "Student Genders", data: studentGenders},
                {name: "Teacher Genders", data: teacherGenders},
                {name: "Students By Department", data: studentsBydept},
                {name: "Teachers By Department", data: teacherByDept},
                {name: "Departments By Faculty", data: deptByFaculty},
            ]
        }, "Dashboard loaded")
    },

    studentDashboard: async (req) => {
        
    },

    teacherDashboard: async (req) => {
        
    }
}

export default dashboardServices