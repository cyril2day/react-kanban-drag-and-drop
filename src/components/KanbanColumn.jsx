import { useState } from 'react'
import KanbanTask from './KanbanTask'
import Button from './ui/Button'
import { Trash2, Plus } from 'lucide-react'
import { Droppable } from '@hello-pangea/dnd'

const KanbanColumn = ({
  column, 
  onDeleteColumn, 
  onAddTask,
  onUpdateTitle,
  onUpdateTask,
  onDeleteTask
}) => {

  const [isEditingTitle, setIsEditingTitle] = useState(false)

  const [tempTitle, setTempTitle] = useState(column.title)

  const handleTitleSave = () => {
    onUpdateTitle(column.id, tempTitle)
    setIsEditingTitle(false)
  }

  const handleTitleCancel = () => {
    setTempTitle(column.title)
    setIsEditingTitle(false)
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') handleTitleSave()
    if (e.key === 'Escape') handleTitleCancel()
  }

  return (
    <div className='flex-shrink-0 w-80'>
      <div className='h-[85vh] overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col transition-colors'>
        <div className='px-4 py-1 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700'>
          <div className='flex items-center justify-between mb-2'>
            {
              isEditingTitle
              ? <input 
                  type='text' 
                  value={tempTitle}
                  onChange={e => setTempTitle(e.target.value)}
                  autoFocus
                  onBlur={handleTitleSave}
                  onKeyDown={handleKeyPress}
                  className='w-full text-lg font-semibold bg-transparent text-gray-800 dark:text-white focus:outline-none'
                />
              : <h3 
                  onClick={() => setIsEditingTitle(true)}
                  className='text-lg font-semibold text-gray-800 dark:text-white cursor-pointer hover:text-blue-600 dark:hover-text-blue-500 transition-colors'
                >
                  {column.title}
                </h3>
            }

            <Button
              className='h-12 w-12 p-0 rounded-full text-red-600 hover:text-red-700 hover:bg-pink-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600'
              onClick={() => onDeleteColumn(column.id)}
            >
              <Trash2 className='h-6 w-6' />
            </Button>
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-sm text-gray-500 dark:text-gray-400'>
              {column.tasks.length}{' '}
              {column.tasks.length === 1 ? 'task' : 'tasks'}
            </span>

            <Button 
              onClick={() => onAddTask(column.id)}
              className='h-8 px-2 rounded-md text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-500 dark:hover:text-blue-400 dark:hover:bg-blue-500/10'
            >
              <Plus className='w-4 h-4 mr-1' />
              Add
            </Button>
          </div>
        </div>

        <Droppable droppableId={column.id}>
          { (provided, snapshot) => (
            <div 
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={
                `p-4 overflow-y-auto flex-1 min-h-0 ${
                  snapshot.isDraggingOver
                  ? 'bg-blue-50 dark:bg-blue-500'
                  : ''
                }`
              }
            >
              <div className='space-y-3'>
                {column.tasks.map((task, index) => (
                  <KanbanTask
                    key={task.id}
                    task={task}
                    index={index}
                    onUpdate={onUpdateTask}
                    onDelete={onDeleteTask}
                  />
                ))}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </div>
  )
}

export default KanbanColumn 
