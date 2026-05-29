# Patient Dashboard

## Live in: https://challenge-lightit.vercel.app/

---

## How to run locally

- create .env file with VITE_API_URL as endpoint URL
- npm install
- npm run dev

---

## Stack and tools used:

- React
- TypeScript
- Vite
- React Router Dom
- React Hook Form
- Framer Motion
- React Hot Toast
- ESLint

---

## Features:

- View list of patients fetched from an API
- Add new patients
- Edit existing patients
- Delete patients (with confirmation modal)
- Expandable patient cards for more details
- Form validation with error feedback on add/edit modals
- Animated UI interactions (Framer Motion)
- Toasts on important actions (success and error in add, delete, edit)
- Dynamic URL pagination based on patient list size
- Reponsive column layout (Desktop: 3 columns, tablet: 2 columns, mobile: 1 column)

---

## Design Decisions:

- Simple, clean color palette for readability
- Minimal UI to keep focus on data
- Button variants used to clearly distinguish actions (edit / delete / primary actions)
- Subtle animations for better user experience without distraction

---

## Architecture decisions:

- Custom hooks for data management (usePatients, usePagination)
- Form handling with React Hook Form
- Component-based architecture with reusable UI elements
- Clean separation of UI and logic