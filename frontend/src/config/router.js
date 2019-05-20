import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from '@/components/auth/Auth'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import Students from '@/components/pages/students/Students'
import RegisterStudent from '@/components/pages/students/RegisterStudent'
import EditStudent from '@/components/pages/students/EditStudent'
import ViewStudent from '@/components/pages/students/ViewStudent'
import RemoveStudent from '@/components/pages/students/RemoveStudent'
import ListEnrollments from '@/components/pages/enrollment/ListEnrollments'
import NewEnrollment from '@/components/pages/enrollment/NewEnrollment'
import ListCourses from '@/components/pages/courses/ListCourses'
import ListClasses from '@/components/pages/classes/ListClasses'
import RegisterClass from '@/components/pages/classes/RegisterClass'
import EditClass from '@/components/pages/classes/EditClass'
import RemoveClass from '@/components/pages/classes/RemoveClass'
import ListSubjects from '@/components/pages/subjects/ListSubjects'
import ListTeachers from '@/components/pages/teachers/ListTeachers'
import RegisterTeacher from '@/components/pages/teachers/RegisterTeacher'
import EditTeacher from '@/components/pages/teachers/EditTeacher'
import RemoveTeacher from '@/components/pages/teachers/RemoveTeacher'

Vue.use(VueRouter)

const routes = [{
    name: 'auth',
    path: '/auth',
    component: Auth
}, 
{ // rotas ADMIN
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages
}, {
    name: 'students',
    path: '/students',
    component: Students
}, {
    name: 'registerStudent',
    path: '/students/register',
    component: RegisterStudent
}, {
    name: 'editStudent',
    path: '/students/edit/:id',
    component: EditStudent
}, {
    name: 'viewStudent',
    path: '/students/view/:id',
    component: ViewStudent
}, {
    name: 'removeStudent',
    path: '/students/remove/:id',
    component: RemoveStudent
}, 
{ // rotas matriculas
    name: 'listEnrollments',
    path: '/enrollments',
    component: ListEnrollments
}, {
    name: 'newEnrollment',
    path: '/enrollments/new',
    component: NewEnrollment
},
{ // rotas cursos
    name: 'listCourses',
    path: '/courses',
    component: ListCourses
},
{ // rotas turmas
    name: 'listClasses',
    path: '/classes',
    component: ListClasses
}, {
    name: 'registerClass',
    path: '/classes/register',
    component: RegisterClass
}, {
    name: 'editClass',
    path: '/classes/edit/:id',
    component: EditClass
}, {
    name: 'removeClass',
    path: '/classes/remove/:id',
    component: RemoveClass
},
{ // rotas disciplinas
    name: 'listSubjects',
    path: '/subjects',
    component: ListSubjects
}, // rotas professor
{
    name: 'listTeachers',
    path: '/teachers',
    component: ListTeachers
}, {
    name: 'registerTeachers',
    path: '/teachers/register',
    component: RegisterTeacher
}, {
    name: 'editTeacher',
    path: '/teachers/edit/:id',
    component: EditTeacher
}, {
    name: 'removeTeacher',
    path: '/teachers/remove/:id',
    component: RemoveTeacher
}]

export default new VueRouter({
    mode: 'history',
    routes
})