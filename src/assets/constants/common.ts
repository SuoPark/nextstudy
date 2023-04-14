import { IOptions } from '@/types/common'

/*사용여부*/
const useYn: IOptions[] = Object.seal([
  { label: '사용', value: 'Y' },
  { label: '미사용', value: 'N' }
])

/*전시여부*/
const displayYn: IOptions[] = Object.seal([
  { label: '노출', value: 'Y' },
  { label: '노출안함', value: 'N' }
])

const showYn: IOptions[] = Object.seal([
  { label: '노출', value: 'Y' },
  { label: '노출안함', value: 'N' }
])

/*상시여부*/
const allTimeDisplayYn: IOptions[] = Object.seal([
  { label: '상시', value: 'Y' },
  { label: '기간 설정', value: 'N' }
])

const searchType: IOptions[] = Object.seal([
  { label: '제목', value: 'title' },
  { label: '등록자', value: 'creatorName' },
  { label: '전체', value: ' all' }
])

const currentStatus: IOptions[] = Object.seal([
  { label: '진행중', value: 'currentStatusIng' },
  { label: '대기', value: 'currentStatusWait' },
  { label: '종료', value: ' currentStatusEnd' }
])

const displayOption: IOptions[] = Object.seal([
  {
    value: 'Y',
    label: 'APP'
  },
  {
    value: 'N',
    label: 'PC'
  }
])

const imageType: IOptions[] = Object.seal([
  { label: '이미지', value: 'IMAGE' },
  { label: 'HTML', value: 'HTML' }
])

const lineUpMethod: IOptions[] = Object.seal([
  { label: '등록순', value: 'CREATE_DATETIME' },
  { label: '지정(노출순번)', value: 'DISPLAY_SEQ' },
  { label: '판매순', value: 'SALES_COUNT' }
])

const linkOpenType: IOptions[] = Object.seal([
  { label: '새창', value: 'NEW' },
  { label: '판매자창', value: 'SELF' }
])

const dateType: IOptions[] = Object.seal([
  { label: '생성일', value: 'create' },
  { label: '수정일', value: 'modify' }
])

const displaySectionKind: IOptions[] = Object.seal([
  { label: '상품', value: 'PRODUCT' },
  { label: '배너', value: 'BANNER' },
  { label: '기획전', value: 'EXHIBITION' }
])

const bannerSectionType: IOptions[] = Object.seal([
  { label: '슬라이드이미지', value: 'SLIDE_IMAGE' },
  { label: '아이콘버튼', value: 'ICON_BUTTON' }
])

const productSectionType: IOptions[] = Object.seal([
  { label: '1XN(4/5)', value: 'TYPE1XN' },
  { label: '2X3(4/5)', value: 'TYPE2X3' },
  { label: '2X3랭킹(4/5)', value: 'TYPE2X3_RANKING' }
])

const imageUseYn: IOptions[] = Object.seal([
  { label: '이미지등록', value: 'Y' },
  { label: '텍스트입력', value: 'N' }
])

const exhibitionSectionType: IOptions[] = Object.seal([{ label: '기획전', value: 'EXHIBITION' }])

export default {
  imageUseYn,
  bannerSectionType,
  productSectionType,
  exhibitionSectionType,
  displaySectionKind,
  linkOpenType,
  lineUpMethod,
  imageType,
  displayOption,
  currentStatus,
  useYn,
  searchType,
  displayYn,
  dateType,
  allTimeDisplayYn,
  showYn
}
