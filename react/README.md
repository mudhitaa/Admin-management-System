# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```










lint
built 



react-cms
website-nextjs
connection -api


hook
props 
state 
effect



react router
pnpm i react-router
login redirect
forgot password page
login page
error


## Storage
-Webstorage (cookies,localstorage,sessionstorage)

-cookies 
  -cookies are client side data which are kept in string with key:value format
  -a domain can have atmost 50 cookies and each cookies can have ~4096chars(~200kb)
  -domain and path dependent
  -self mature and upon maturity self deleted
  -cookies are passed with request
  -document.cookies="name=value; expires =IS0D; path=/; domain=domainUrl;
  -Cookies are small text files stored by browsers to enhance website functionality, primarily used for session management (keeping users logged in), personalization (remembering site preferences like language or theme), and tracking (analyzing user behavior to improve site performance and deliver tailored advertising). 

-localstorage
  -name:value paired data stored in string format
  -up to 5-10b
  -only domain dependent
  -no maturity
  -no self destruction manual destruction required
  -'localStorage.setItem('name','value'),
  -'localStorage.getItem('name'),
  -'localStorage.removeItem('name'),
  -'localStorage.clear(),

-sessionstorage
  -name:value paired data stored in string format
  -up to 5-10b
  -only domain dependent
  -no maturity
  -no self destruction manual destruction required
  -only set for tab and gets destroyed when tab is closed
  -'sessionStorage.setItem('name','value'),
  -'sessionStorage.getItem('name'),
  -'sessionStorage.removeItem('name'),
  -'sessionStorage.clear(),




### Global state management
  ## context
  ## redux



### Rest Api
-create
  -content create =>'post' (form creation submit)
-read
  -to fetch data from server => 'get'
-update
  -to edit existing content
  -'put' or 'patch'
  -'put' = accepts all input (changed or unchanged)
  -'patch' = only changed value
-delete
  -to delete resources from server -> 'delete'


## Axios
Axios is a popular, promise-based HTTP client library for Node.js and browsers that simplifies making asynchronous API requests. It enables developers to send GET, POST, PUT, and DELETE requests, automatically transforms JSON data, and supports interceptors for modifying requests/responses. 

# Axios inastance
- `await axiosInstance.get(url,config)`
- `await axiosInstance.post(url,payload,config)`
- `await axiosInstance.put(url,payload,config)`
- `await axiosInstance.patch(url,payload,config)`
- `await axiosInstance.delete(url,config)`

-all returns an  instance of promise resolve or reject



UI (FormInput)
   ↓
react-hook-form (state manager)
   ↓
Zod (validation gate)
   ↓
axios (API call)
   ↓
Backend (auth)

React Hook Form collects data, Axios sends it, DummyJSON replies.



redux is a js library
reducer is a combo of 3 things
- global state
- state manipulation function
- main state handlaling tool