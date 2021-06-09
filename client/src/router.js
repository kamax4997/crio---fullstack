import Vue from 'vue'
import Router from 'vue-router'
import messages from './locales/en'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: 'HomePage',
          path: '',
          component: () => import('@/views/pages/HomePage'),
        },
        {
          name: 'Login',
          path: 'login',
          component: () => import('@/views/pages/Login'),
        },
        {
          name: 'Contatti',
          path: 'contactti',
          component: () => import('@/views/pages/Contactus'),
        },
        {
          name: 'Chi Siamo',
          path: 'chisiamo',
          component: () => import('@/views/pages/Aboutus'),
        },
        {
          name: 'Register',
          path: 'register',
          component: () => import('@/views/pages/Register'),
        },
        {
          name: 'Verify',
          path: 'verify/:token',
          component: () => import('@/views/pages/Verify'),
        },
        {
          name: 'Forgot',
          path: 'forgot',
          component: () => import('@/views/pages/Forgot'),
        },
        {
          name: 'Forgot',
          path: 'forgot/:token',
          component: () => import('@/views/pages/ResetPassword'),
        },
      ],
    },
    {
      path: '/dashboard',
      meta: { authorize: [] },
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: messages.dashboardMenu,
          path: '/dashboard',
          meta: { authorize: [] },
          component: () => import('@/views/dashboard/Dashboard'),
        },
        {
          name: 'Email Template',
          path: 'email-template',
          component: () => import('@/views/dashboard/Editor'),
        },
        {
          name: messages.reportMenu,
          path: 'reports',
          meta: { authorize: [] },
          component: () => import('@/views/dashboard/Reports'),
        },
        {
          name: messages.notifyMenu,
          path: 'notifications',
          meta: { authorize: [] },
          component: () => import('@/views/dashboard/Notifications'),
        },
        {
          name: messages.fridgeMenu,
          path: 'manage',
          meta: { authorize: [] },
          component: () => import('@/views/dashboard/ManageFridges'),
        },
        {
          name: messages.purchaseMenu,
          path: 'purchase',
          meta: { authorize: [] },
          component: () => import('@/views/dashboard/PurchasePackage'),
        },
        // {
        //   name: messages.about,
        //   path: 'how-to',
        //   meta: { authorize: [] },
        //   component: () => import('@/views/dashboard/HowTo'),
        // },
        {
          name: messages.checkoutMenu,
          path: 'checkout/:id',
          meta: { authorize: [] },
          component: () => import('@/views/dashboard/Checkout'),
        },
        {
          name: messages.user_profile,
          path: 'profile',
          meta: { authorize: [] },
          component: () => import('@/views/dashboard/UserProfile'),
        },
        {
          name: messages.user_change_password,
          path: 'edit-password',
          meta: { authorize: [] },
          component: () => import('@/views/dashboard/EditPassword'),
        },
        {
          name: messages.Contactus,
          path: 'contactti',
          meta: { authorize: [] },
          component: () => import('@/views/pages/Contactus'),
        },
        {
          name: messages.Aboutus,
          path: 'chisiamo',
          meta: { authorize: [] },
          component: () => import('@/views/pages/Aboutus'),
        },
      ],
    },
    {
      path: '/admin',
      meta: { authorize: ['admin'] },
      component: () => import('@/views/admin/Index'),
      children: [
        // Dashboard
        {
          name: messages.dashboardMenu,
          path: '/admin',
          meta: { authorize: ['admin'] },
          component: () => import('@/views/admin/Dashboard'),
        },
        {
          name: messages.packageMenu,
          path: 'packages',
          component: () => import('@/views/admin/ManagePackages'),
        },
        {
          name: messages.userMenu,
          path: 'users',
          // component: () => import('@/views/admin/UserProfile'),
          component: () => import('@/views/admin/ManageUsers'),
        },
        {
          name: messages.adminMenu,
          path: 'admin-users',
          // component: () => import('@/views/admin/UserProfile'),
          component: () => import('@/views/admin/ManageAdmins'),
        },
        {
          name: messages.user_profile,
          path: 'profile',
          component: () => import('@/views/admin/UserProfile'),
        },
        {
          name: messages.user_change_password,
          path: 'edit-password',
          component: () => import('@/views/admin/EditPassword'),
        },
      ],
    },
    {
      path: '*',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: '404 Error',
          path: '',
          component: () => import('@/views/pages/Error'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  // const currentUser = authenticationService.currentUserValue;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  // console.log('router.beforeEach===>', authorize, currentUser)
  if (authorize) {
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      return next({ path: '/', query: { returnUrl: to.path } });
    }

    // check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.role)) {
      // console.log(authorize)
      // role not authorised so redirect to home page
      return next({ path: '/dashboard' });
    }

    // check if admin, then redirect to /admin
    if (!authorize.length && currentUser.role === "admin") {
      // role not authorised so redirect to home page
      return next({ path: '/admin' });
    }
  }

  next();
})
