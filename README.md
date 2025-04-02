# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- ~🚀 Server-side rendering~ **SINGLE PAGE APPLICATION ONLY**
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- ~🔒TypeScript by default~ (ejected from typescript)
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### PREREQUISITE

- Node v20+
- React v19

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

### DIY Deployment

THIS IS ONLY FOR SPA purposes.. **DONT WRITE SERVER SIDE CODE**

Make sure to deploy the output of `npm run build`

## Static host deployment

    run`npm run build`
    copy the build folder content to your static host server

```
├── app (root folder) 
│   ├── Components//   Global reusable components that can be use in different pages 
│   ├── Constants// Static/hard coded text,colors,themes or data
│   ├── Hooks//events folder for calling state or api   
│   | 	├── <Auth> //name the folder of what it's purpose, all the api call or any state events in folder
│   |	|   ├── useAuth.js // saving the details of the user inside the state
│   |	|   ├── useLoginMutation.js // hook for calling apis
│   |	|   └── useCreateUser.js
│   ├── Layouts / Layouts   
│   ├── Pages / Primary Page 
│   ├── <Page_name> // Primary Page 
│   |   ├── Components // Local Component folder to only be use on that specific page 
│   |   └── index.jsx // 
│   └── routes.ts / declare routes  
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client//   # Static assets
│   └── server//    # this is disabled
```

## Sample Routing

- offical docs: https://reactrouter.com/start/framework/routing

Routes are configured in app/routes.ts. Each route has two required parts: a URL pattern to match the URL, and a file path to the route module that defines its behavior.

```
import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("./home.tsx"),
  route("about", "./about.tsx"),

  layout("./auth/layout.tsx", [
    route("login", "./auth/login.tsx"),
    route("register", "./auth/register.tsx"),
  ]),

  ...prefix("concerts", [
    index("./concerts/home.tsx"),
    route(":city", "./concerts/city.tsx"),
    route("trending", "./concerts/trending.tsx"),
  ]),
] satisfies RouteConfig;

```

## Hooks

FOR REACT QUERY STANDARD NAMING CONVENTION FOR IT'S HOOKS

**Strctly adhere to this convention for alignment of code by the collaborators and easy maintainability**

1. **For Fetching Data** :

* `useQuery` ** hooks** : Use the prefix `use` followed by a descriptive name of the resource being fetched.Example:
  * `useUsers` for fetching user data.
  * `useUserDetails` for fetching details of a single user.

2. **For Mutating Data** :

* `useMutation` ** hooks** : Use the prefix `use` followed by an action-oriented verb and the name of the resource.Example:
  * `useAddUser` for adding a user.
  * `useDeleteUser` for deleting a user.
  * `useUpdateProfile` for updating a user's profile.

3. **For Query Keys** :

When defining **query keys** for identifying queries, they’re often arrays where:

* The first element is a descriptive string (e.g., `'users'`).
* Additional elements represent parameters or identifiers (e.g., `['users', userId]` for a single user query).

4. **For Custom Query Hooks** :

* Create custom hooks by combining the resource name and operation type.Example:

  * `useFetchPosts` (combining `fetch` and the resource `posts`).
  * `useCreatePost` for creating a new post.

**official docs: https://tanstack.com/query/latest/docs/framework/react/quick-start**

### Why use react-query

* Out of the box **CACHING!** Kahit mag pa lipat-lipat ka ng page. naka cache na yung data kapag binalikan mo yung page hindi mo na kailangan mag api call ulit, para makuha yung data mula sa api
* Automatic re-attempts failed api calls! sa background kahit mag failed yung api call, mag a-api call ulit ang react query several times to fetch data
* Mas simple mag api call `const { isLoading, isError, isSuccess, data, refetch } = useQuery()`  no need to `try cactch`
* You can refetch query in the background without user interaction.

```
import { apiClient } from "~/Constants/ApiClient";
import { useMutation } from "@tanstack/react-query";

const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (params) => {
      return apiClient.post("/Authentication/login", params);
    },
    onSuccess: (_) => {},
  });
};

export default useLoginMutation;

//ui page
const Login = () => {
  const loginMutation = useLoginMutation();

  /**
   * Handles form submission.
   * @param {Event} e - Form submit event.
   */
  const onManageLogin = async (e) => {
    setIsLoading(true);
    loginMutation.mutate(form, {
      onError: (error) => {
        console.error("Login failed:", error.response?.data?.message || error.message);
        showError(error);
        setIsLoading(false);
      },
      onSettled: (response) => {
        if (response.data.success) {
          setIsLoading(false);
          const token = response.data.body.token;
          //store user dtails in local storage
          auth.onSetUserDetails(response.data.body, response.data.body.token)
          navigate(StringRoutes.dashboard);
        }
      }
    });
  };

  return /*JSX Element*/
}

```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

## DEV NOTES

THIS IS THE INITIAL SETUP FOR THIS PROJECT
FEEL FREE TO COMMIT ANYTING IN `master` branch

Built with ❤️ using React Router.
