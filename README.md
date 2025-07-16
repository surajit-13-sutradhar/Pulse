This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Notes:
## Functions
{revalidatePath}: This function is used to revalidate the current path, ensuring that the latest data is fetched and displayed. It is particularly useful in server actions where you want to update the UI after a data mutation.

{auth(), currentUser()}: App Router-specific helpers that you can use inside of your Route Handlers, Middleware, Server Components, and Server Actions.
The auth() helper will return the 
Auth object of the currently active user.

The currentUser() helper will return the 
Backend User object of the currently active user, which includes helpful information like the user's name or email address. It does count towards the Backend API request rate limit so it's recommended to use the useUser() hook on the client side when possible and only use currentUser() when you specifically need user data in a server context. For more information on this helper, see the 
currentUser()
 reference.