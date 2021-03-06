export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [{
      path: '/user',
      redirect: '/user/login',
    },
      {
        path: '/user/login',
        component: './User/Login',
      },
      {
        path: '/user/register',
        component: './User/Register',
      },
      {
        path: '/user/register-result',
        component: './User/RegisterResult',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      {
        path: '/',
        redirect: '/dashboard',
      },
      {
        icon: 'dashboard',
        path: '/dashboard',
        name: 'dashboard',
        component: './Dashboard/Analysis',
      },
      //goods
      {
        path: '/goods',
        name: 'goods',
        icon: 'shopping',
        routes: [{
          path: '/goods/list',
          name: 'list',
          component: './Goods/List',
        }, {
          path: '/goods/edit',
          name: 'edit',
          component: './Goods/Edit',
          hideInMenu: true,
        }],
      }
    ],
  },
  //exception
  {
    path: '/exception',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/exception/403',
        component: './Exception/403',
      },
      {
        path: '/exception/404',
        component: './Exception/404',
      },
      {
        path: '/exception/500',
        component: './Exception/500',
      },
    ],
  },
];
