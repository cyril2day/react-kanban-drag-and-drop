import { useState } from 'react'
import KanbanColumn from './KanbanColumn'
import Button from './ui/Button'

const KanbanBoard = () => {
  const defaultColumns = [
    {
      id: "todo",
      title: "To Do",
      tasks: [
        {
          id: "task-1",
          content: "Design new landing page",
          createdAt: new Date("2025-07-25T00:00:00"),
        },
        {
          id: "task-2",
          content: "Set up database schema",
          createdAt: new Date("2025-07-25T00:00:00"),
        },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: [
        {
          id: "task-3",
          content: "Implement user authentication",
          createdAt: new Date("2025-07-25T00:00:00"),
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      tasks: [
        {
          id: "task-4",
          content: "Create project structure",
          createdAt: new Date("2025-07-25T00:00:00"),
        },
      ],
    },
  ]

  const [columns, setColumns] = useState(defaultColumns)

  return (
    <div className='w-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors'>
      <div className='flex gap-6 overflow-x-auto pb-6 px-6 w-full'>
        {columns.map(column => (
          <KanbanColumn
            key={column.id}
            column={column}
          />
        ))}
      </div>
    </div>
  )
}

export default KanbanBoard 
