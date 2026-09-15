import { useState } from 'react'
import KanbanColumn from './KanbanColumn'
import Button from './ui/Button'
import { Plus } from 'lucide-react'
import { DragDropContext } from '@hello-pangea/dnd'

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

  const addColumn = () => {
    setColumns([
      ...columns,
      { id: `column-${Date.now()}`, title: 'New Column', tasks: []}
    ])
  }

  const deleteColumn = (columnId) => {
    setColumns(columns.filter(col => col.id !== columnId))
  }

  const updateColumnTitle = (columnId, newTitle) => {
    setColumns(
      columns.map(col =>
        col.id === columnId ? {...col, title: newTitle} : col
      )
    )
  }

  const addTask = (columnId) => {
    const newTask = {
      id: `task-${Date.now()}`,
      content: 'New Task',
      createdAt: new Date()
    }

    setColumns(
      columns.map(col => col.id === columnId ? {...col, tasks: [...col.tasks, newTask]} : col )
    )
  }

  const updateTask = (taskId, newContent) => {
    setColumns(
      columns.map(col => ({
        ...col,
        tasks: col.tasks.map(task => 
          task.id === taskId ? {...task, content: newContent } : task
        )
      }))
    )
  }

  const deleteTask = (taskId) => {
    setColumns(
      columns.map(col => ({
        ...col,
        tasks: col.tasks.filter(task => task.id !== taskId)
      }))
    )
  }

  const handleDragEnd = result => {
    const { destination, source } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return

    const sourceColumn = columns.find(col => col.id === source.droppableId)

    const destColumn = columns.find(col => col.id === destination.droppableId)

    if (!sourceColumn || !destColumn) return

    const sourceTasks = [...sourceColumn.tasks]

    const [movedTask] = sourceTasks.splice(source.index, 1)

    if (sourceColumn === destColumn) {
      sourceTasks.splice(destination.index, 0, movedTask)

      setColumns(
        columns.map(col =>
          col.id === sourceColumn.id ? {...col, tasks: sourceTasks } : col
        )
      )
    } else {
      const destTasks = [...destColumn.tasks]

      destTasks.splice(destination.index, 0, movedTask)

      setColumns(
        columns.map(col => {
          if (col.id === sourceColumn.id)
            return { ...col, tasks: sourceTasks }

          if (col.id === destColumn.id)
            return { ...col, tasks: destTasks }

          return col
        })
      )
    }
  }

  return (
    <div className='w-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors'>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className='flex gap-6 overflow-x-auto pb-6 px-6 w-full'>
          {columns.map(column => (
            <KanbanColumn
              key={column.id}
              column={column}
              onDeleteColumn={deleteColumn}
              onAddTask={addTask}
              onUpdateTitle={updateColumnTitle}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
            />
          ))}

          <div className='flex-shrink-0'>
            <Button
              onClick={addColumn}
              className='h-12 px-6 rounded-md bg-white/50 dark:bg-gray-700 dark:text-white hover:bg-white/80 dark:hover:bg-gray-600 border-dashed border-2 border-gray-300 dark:border-gray-500 hover:border-gray-400 transition-all duration-200'
            >
              <Plus className='w-5 h-5 mr-2' />
              Add Column
            </Button>
          </div>
        </div>
      </DragDropContext>
    </div>
  )
}

export default KanbanBoard 
