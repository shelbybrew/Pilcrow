const routes = [
  {
    path: "/",
    component: () => import("layouts/App.vue"),
    children: [
      {
        path: "/",
        component: () => import("layouts/PublicLayout.vue"),
        children: [
          { path: "", component: () => import("pages/Index.vue") },
          { path: "register", component: () => import("pages/Register.vue") },
          { path: "login", component: () => import("pages/Login.vue") }
        ]
      },
      {
        path: "/",
        component: () => import("layouts/MainLayout.vue"),
        children: [
          {
            path: "account/",
            component: () => import("pages/Account/AccountLayout.vue"),
            children: [
              {
                path: "profile",
                component: () => import("pages/Account/Profile.vue")
              }
            ]
          }
        ]
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;