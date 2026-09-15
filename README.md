# Kanban Board

A web based Kanban board for managing tasks. It lets users organize work into columns, add and edit tasks, and move tasks with drag and drop. The board is fully interactive. Users can create their own columns, write tasks in their own words, and arrange everything. Every change is kept in the browser, so the board looks the same on the next visit.

## Purpose

This project exists for two reasons. First, it is a practical exercise in React. Second, it serves as a showcase of the React skills gained over time. Users can freely experiment with the board. The board runs entirely in the browser and needs no backend.

## Tech Stack

| Technology | Role |
| --- | --- |
| React 19 | Building the user interface |
| Vite | Development and build tooling |
| Tailwind CSS 4 | Styling the interface |
| @hello-pangea/dnd | Drag and drop behavior |
| lucide-react | Icons |
| Oxlint | Code linting |

## React Features Used

- Functional components and component composition
- Hooks such as `useState`, `useEffect`, and `useRef`
- Lazy initialization of state
- Controlled inputs
- Conditional rendering
- Props for passing data and behavior between components
- Lifting state up to a common parent component
- Event handling for user actions

## How the React Features Work Together

The board state lives in a single place, the `KanbanBoard` component. It holds the array of columns and every task inside them. All operations, adding a column, deleting a column, renaming a column, adding a task, editing a task, deleting a task, and moving a task, are defined as functions in `KanbanBoard`. These functions are passed down to child components as props.

`KanbanBoard` passes each column to `KanbanColumn`. `KanbanColumn` renders the column header and the list of tasks. It also handles the inline editing of the column title with local `useState`. Each task is rendered by `KanbanTask`, which decides between two views. `KanbanTaskViewer` shows the task content and its creation date. `KanbanTaskEditor` shows a textarea while the user edits. The `useRef` hook gives direct access to the textarea so the app can focus it and move the cursor to the end when editing starts.

Two `useEffect` hooks run side effects. One saves the board to localStorage whenever the board changes. Another in the `ThemeToggle` component applies the chosen dark or light theme to the document and stores the preference. This keeps the interface responsive to user action without any server communication.

## How the Tech Stack Helped

- React made the interface easy to reason about. Each part of the board is a small component with one responsibility, and the state flows from the top down.
- Vite provides a fast development server and a simple production build. Hosting on GitHub Pages is straightforward because the build produces static files only.
- Tailwind CSS removed the need for separate stylesheet files. Utility classes keep styling close to the markup and made the dark theme simple to add.
- @hello-pangea/dnd handled the complicated parts of drag and drop, such as measuring positions and animating movement. The app only needs to reorder the data in the drag end handler.
- lucide-react supplied consistent icons for actions such as adding a column, deleting a task, and toggling the theme.
- Oxlint enforced React rules during development, such as following the rules of hooks.

## Project Structure

```
.
├── index.html
├── package.json
├── vite.config.js
└── src
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    └── components
        ├── KanbanBoard.jsx
        ├── KanbanColumn.jsx
        ├── KanbanTask.jsx
        ├── KanbanTaskEditor.jsx
        ├── KanbanTaskViewer.jsx
        ├── ThemeToggle.jsx
        └── ui
            └── Button.jsx
```

`main.jsx` mounts the app. `App.jsx` composes the top level components. The `components` folder holds every board component. The `ui` folder holds reusable pieces, currently one shared `Button`.

## Features

- Create and delete columns
- Rename a column by clicking its title
- Add tasks to any column
- Edit a task by clicking it
- Delete a task from the task viewer or the editor
- Drag and drop tasks within a column to reorder them
- Drag and drop tasks between columns to move them
- Show the task count for each column
- Show the creation date for each task
- Toggle between light and dark themes
- Save the board and the theme choice in localStorage
- Custom thin scrollbars for a cleaner look on long lists

## Educational Notes

This project was a chance to practice the fundamentals of React in a small but complete application. Building it taught the importance of state placement. Keeping the board state in the parent and passing handlers down kept every child simple. The drag and drop feature also showed how to deliver good interaction with an external library and small event handlers in one place.

## Credits

- React, https://react.dev
- Vite, https://vite.dev
- Tailwind CSS, https://tailwindcss.com
- @hello-pangea/dnd, https://github.com/hello-pangea/dnd
- lucide-react, https://lucide.dev
- Oxlint, https://oxc.rs
