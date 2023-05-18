# Not-you-pod

This is a project for showing off how to work with auth in Nextjs13 and Firebase.

## Requirements

- Node version >= 18.0.0
- Copy `.env.template` to `.env` and fill in the values

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Firebase

This project uses Firebase for authentication and database. You can create a new project on [Firebase](https://firebase.google.com/) and fill in the values in `.env` file.

### Users collection schema

All fields are required and must be filled as string:

```
email: "an_email"
id: "uuid"
name: "your_name"
password :"$2b$10$ECvSuVcvZOwpHj1ToFTReO05wXhfJtzsbM3GXwYUc4q3Q9Ow6VdkO" (admin)
role: "admin|user"
username: "your_username"
```

### Podcasts collection schema

All fields are required and must be filled as string:

```
title: "a_title"
description: "a_description"
url: "a_url"
```

## Learn More

- [Material Tailwind UI](https://material-tailwind.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind UI](https://tailwindui.com/)
