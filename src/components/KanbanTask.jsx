import { useState } from 'react'
import KanbanTaskEditor from './KanbanTaskEditor'
import KanbanTaskViewer from './KanbanTaskViewer'

const KanbanTask = ({task, index}) => {

  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className='group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-2 shadow-sm hover:shadow-md transition-all duration-200'>
      <div>
        {
          isEditing 
            ? <KanbanTaskEditor
                taskId={task.id}
              />
            : <KanbanTaskViewer 
                content={task.content}
                createdAt={task.createdAt}
              />
        }
      </div>
    </div>
  )
}

export default KanbanTask 
