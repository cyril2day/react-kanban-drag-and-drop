import { useState, useRef, useEffect } from 'react'
import KanbanTaskEditor from './KanbanTaskEditor'
import KanbanTaskViewer from './KanbanTaskViewer'

const KanbanTask = ({
  task, 
  index,
  onUpdate,
  onDelete
}) => {

  const [isEditing, setIsEditing] = useState(false)

  const [tempContent, setTempContent] = useState(task.content)

  const textareaRef = useRef(null)

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const textarea = textareaRef.current
      textarea.focus()
      textarea.setSelectionRange(
        textarea.value.length, textarea.value.length
      )
      textarea.scrollTop = textarea.scrollHeight
    }
  }, [isEditing])

  const handleSave = () => {
    onUpdate(task.id, tempContent)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempContent(task.content)
    setIsEditing(false)
  }

  return (
    <div className='group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-2 shadow-sm hover:shadow-md transition-all duration-200'>
      <div className='relative'>
        {
          isEditing 
          ? <KanbanTaskEditor
              taskId={task.id}
              tempContent={tempContent}
              setTempContent={setTempContent}
              onSave={handleSave}
              onCancel={handleCancel}
              textareaRef={textareaRef}
              onDelete={onDelete}
            />
          : <KanbanTaskViewer 
              content={task.content}
              createdAt={task.createdAt}
              onEdit={() => setIsEditing(true)}
              onDelete={() => onDelete(task.id)}
            />
        }
      </div>
    </div>
  )
}

export default KanbanTask 
