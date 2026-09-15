import { Trash2 } from 'lucide-react'
import Button from './ui/Button'

const KanbanTaskEditor = ({
  taskId,
  tempContent,
  setTempContent,
  onSave,
  onCancel,
  textareaRef,
  onDelete
}) => {

  const handleKeydown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) onSave()
    else if (e.key === 'Escape') onCancel()
  }

  return (
    <div className='space-y-2'>
      <textarea 
        ref={textareaRef}
        value={tempContent}
        onChange={e => setTempContent(e.target.value)}
        autoFocus
        onKeyDown={handleKeydown}
        onBlur={onSave}
        className='w-full resize-none min-h-[70px] rounded-md border border-blue-200 dark:border-blue-500 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 thin-scrollbar'
      />

      <p className='text-xs text-gray-500 dark:text-gray-400'>
        Press Ctrl+Enter to save, Esc to cancel.{' '}
        <Button
          className='p-1 h-6 w-6 rounded-full text-red-600 hover:text-red-700 hover:bg-pink-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600 translate-y-[2px]'
          onClick={() => onDelete(taskId)}
        >
          <Trash2 className='w-4 h-4' />
        </Button>
      </p>
    </div>
  )
}

export default KanbanTaskEditor 
