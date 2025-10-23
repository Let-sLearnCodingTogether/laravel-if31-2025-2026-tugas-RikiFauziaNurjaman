import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/login",
    lazy: {
      Component: async () => {
        const component = await import("../pages/auth/LoginPage");

        return component.default;
      },
    },
  },
  {
    path: "/register",
    lazy: {
      Component: async () => {
        const component = await import("../pages/auth/RegisterPage");

        return component.default;
      },
    },
  },

  {
    path: "/",
    lazy: {
      Component: async () => {
        const component = await import("../pages/master/items/ItemPage");

        return component.default;
      },
    },
  },

  {
    path: "/create-items",
    lazy: {
      Component: async () => {
        const component = await import("../pages/master/items/CreateFormItem");

        return component.default;
      },
    },
  },

  {
    path: "/update-items/:id",
    lazy: {
      Component: async () => {
        const component = await import("../pages/master/items/UpdateFormItem");

        return component.default;
      },
    },
  },
  {
    path: "/profile",
    lazy: {
      Component: async () => {
        const component = await import(
          "../pages/master/user-management/ProfilePage"
        );

        return component.default;
      },
    },
  },
]);

export default router;
