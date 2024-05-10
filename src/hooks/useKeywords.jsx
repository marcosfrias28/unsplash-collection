import { useState } from 'react'

export function useKeywords () {
  const [keywords, setKeywords] = useState('')
  return { keywords, setKeywords }
}
