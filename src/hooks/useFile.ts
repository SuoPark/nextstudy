import { concat } from 'lodash'
import { ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast'

interface IProps {
  multiple?: boolean
  fileTypes?: string[]
  fileLength?: number
  volume?: number
}

const useFile = function ({ multiple = false, fileTypes, fileLength, volume }: IProps = {}) {
  const [files, setFiles] = useState<Array<string | File>>([])

  const isChecker = (fileList: FileList | null) => {
    if (fileList) {
      const allFiles = concat(files, Array.from(fileList || []))
      const stageFiles = concat(Array.from(fileList || []))
      if (fileTypes) {
        const confirmList = stageFiles.filter(({ name }) => {
          const type = name.split('.')[1]
          if (type) {
            return fileTypes.includes(type.toLocaleLowerCase())
          }
          return false
        })
        if (confirmList.length !== stageFiles.length) {
          toast.error('허용되지 않는 파일유형입니다.', { duration: 3000 })
          return false
        }
      }
      if (fileLength) {
        if (fileLength < allFiles.length) {
          toast.error(`파일 개수 는 최대 ${fileLength}개까지 등록하실 수 있습니다.`, { duration: 3000 })
          return false
        }
      }

      if (volume) {
        // byte 기준
        for (let i = 0; i < stageFiles.length; i++) {
          const file = stageFiles[i]
          if (volume < file.size) {
            toast.error('허용 가능 파일용량을 초과했습니다.', { duration: 3000 })
            return false
          }
        }
      }
    }

    return true
  }

  const onChange = function (e: ChangeEvent<HTMLInputElement>) {
    const {
      target: { files }
    } = e
    if (files) {
      if (!isChecker(files)) return

      if (multiple) {
        setFiles(prevValue => {
          const mergeItems = concat(prevValue, Array.from(files || []))
          return mergeItems
        })
      } else {
        setFiles(Array.from(files || []))
      }
    }
  }

  const handleRemoveFile = (file: File | string) => {
    const fileName = (() => {
      if (typeof file === 'string') {
        const stringArr = file.split('/')
        const name = stringArr[stringArr.length - 1] || ''

        return name
      } else {
        return file.name
      }
    })()

    const filtered: Array<File | string> = Array.from(files || []).filter((item: File | string) => {
      const isAttached = typeof item === 'string'
      if (isAttached) {
        const stringArr = item.split('/')
        if (stringArr.length > 0) {
          return stringArr[stringArr.length - 1] !== fileName
        }
      } else {
        const { name } = item
        return name !== fileName
      }
      return false
    })
    setFiles(filtered)
  }

  return {
    props: {
      files,
      onChange,
      handleRemoveFile
    },
    setFiles
  }
}

export default useFile
