import Button from './ui/Button'

const KanbanTaskEditor = ({
  taskId,
  tempContent,
  setTempContent,
  onSave,
  onCancel
}) => {

  const handleKeydown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) onSave()
    else if (e.key === 'Escape') onCancel()
  }

  return (
    <div className='space-y-2'>
      <textarea 
        value={tempContent}
        onChange={e => setTempContent(e.target.value)}
        autoFocus
        onKeyDown={handleKeydown}
        onBlur={onSave}
        className='w-full resize-none min-h-[70px] rounded-md border border-blue-200 dark:border-blue-500 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400'
      />

      <p className='text-xs text-gray-500 dark:text-gray-400'>
      </p>
    </div>
  )
}

export default KanbanTaskEditor 
