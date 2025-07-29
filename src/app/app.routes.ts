import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "login",
    loadComponent: () => import("./pages/login/login.page").then( m => m.LoginPage)
  },
  {
    path: "register",
    loadComponent: () => import("./pages/register/register.page").then( m => m.RegisterPage)
  },
  {
    path: "home",
    loadComponent: () => import("./pages/home/home.page").then( m => m.HomePage)
  },
  {
    path: "search",
    loadComponent: () => import("./pages/search/search.page").then( m => m.SearchPage)
  },
  {
    path: "categories",
    loadComponent: () => import("./pages/categories/categories.page").then( m => m.CategoriesPage)
  },
  {
    path: "results",
    loadComponent: () => import("./pages/results/results.page").then( m => m.ResultsPage)
  },
  {
    path: "add-edit-service",
    loadComponent: () => import("./pages/add-edit-service/add-edit-service.page").then( m => m.AddEditServicePage)
  },
  {
    path: "profile/:id",
    loadComponent: () => import("./pages/profile/profile.page").then( m => m.ProfilePage)
  },
  {
    path: "user-profile",
    loadComponent: () => import("./pages/user-profile/user-profile.page").then( m => m.UserProfilePage)
  },
  {
    path: "professional/:id",
    loadComponent: () => import("./pages/profile/profile.page").then( m => m.ProfilePage)
  },
  {
    path: "professional/:id/edit",
    loadComponent: () => import("./pages/profile/profile.page").then( m => m.ProfilePage)
  }
];
