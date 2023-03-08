/**
 * @name useFormChange
 * 1 控制每一个表单的值。 
 * 2 具有表单提交，获取整个表单数据功能。 
 * 3 点击重置，重置表单功能.
 */

import {useRef, useState, useMemo} from 'react';

/* 表单/表头搜素hooks */
export default function useFormChange() {
  const formData = useRef({})
  const [, forceUpdate] = useState(null) // 用useState单独做更新，不需要读取useState状态
  // 用useMemo来优化setFormItem ,resetForm方法，避免重复声明，带来的性能开销
  const handerForm = useMemo(()=>{
    /* 改变表单单元项 */
    const setFormItem = (keys, value) => {      
      const form = formData.current
      form[keys] = value
      forceUpdate(value)
    }
    /* 重置表单 */
    const resetForm = () => {
      const current = formData.current
      for (let name in current) {
        current[name] = ''
      }
      forceUpdate('')
    }
    return [ setFormItem ,resetForm ]
  }, [])

  return [ formData.current ,...handerForm ]
}
