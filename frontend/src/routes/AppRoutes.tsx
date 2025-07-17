// src/routes.tsx

import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";

// import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
// import { SignIn, SignUp } from "@/pages/auth";
// import LoginForm from "../features/auth/components/LoginForm";


export const routes = [
//   {
//     layout: "dashboard",
//     pages: [
//       {
//         icon: <HomeIcon {...icon} />,
//         name: "dashboard",
//         path: "home",
//         element: <Home />,
//       },
//       {
//         icon: <UserCircleIcon {...icon} />,
//         name: "profile",
//         path: "profile",
//         element: <Profile />,
//       },
//       {
//         icon: <TableCellsIcon {...icon} />,
//         name: "tables",
//         path: "tables",
//         element: <Tables />,
//       },
//       {
//         icon: <InformationCircleIcon {...icon} />,
//         name: "notifications",
//         path: "notifications",
//         element: <Notifications />,
//       },
//     ],
//   },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        name: "sign in",
        path: "sign-in",
      },
    //   {
    //     icon: <RectangleStackIcon {...icon} />,
    //     name: "sign up",
    //     path: "sign-up",
    //     element: <SignUp />,
    //   },
    ],
  },
];

export default routes;
