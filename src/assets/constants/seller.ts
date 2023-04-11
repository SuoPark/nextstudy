import { IOptions } from '@/types/common'

/*상품판매상태*/
const approvalStatusCode: IOptions[] = Object.seal([
  { label: '승인', value: 'ADMIT' },
  { label: '요청', value: 'REQUEST' },
  { label: '반려', value: 'REJECT' }
])

const customerStatusCode: IOptions[] = Object.seal([
  { label: '활성', value: 'ACTIVE' },
  { label: '비활성(휴면)', value: 'INACTIVE' },
  { label: '탈퇴', value: 'EXIT' }
])

const CommissionTypeCode: IOptions[] = Object.seal([
  { label: '정액', value: 'AMOUNT' },
  { label: '정률', value: 'RATE' }
])

// 택배사 추후 추가해야함
const deliveryCompanyCode: IOptions[] = Object.seal([
  { label: '롯대택배', value: 'HYUNDAI' },
  { label: '로젠택배', value: 'KGB' },
  { label: '우체국', value: 'EPOST' },
  { label: '한진택배', value: 'HANJIN' },
  { label: 'CJ대한통운', value: 'CJGLS' },
  { label: '경동택배', value: 'KDEXP' },
  { label: '천일특송', value: 'CHUNIL' },
  { label: '우편등기', value: 'REGISTPOST' }
])

const deliveryPriceType: IOptions[] = Object.seal([
  { label: '무료', value: 'FREE' },
  { label: '유료', value: 'PAY' },
  { label: '조건부 무료', value: 'CONDITIONAL' }
])

const deliveryAddPriceUseYn: IOptions[] = Object.seal([
  { label: '없음', value: 'N' },
  { label: '있음', value: 'Y' }
])

const salesTypeCode: IOptions[] = Object.seal([
  { label: '일반', value: 'PST01' },
  { label: '공동구매', value: 'PST02' },
  { label: '경매', value: 'PST03' }
])

const saleStatusCode: IOptions[] = Object.seal([
  { label: '임시저장', value: 'PS010' },
  { label: '승인요청', value: 'PS020' },
  { label: '승인반려', value: 'PS029' },
  { label: '판매중', value: 'PS030' },
  { label: '일시품절', value: 'PS080' },
  { label: '판매중지', value: 'PS090' },
  { label: '판매종료', value: 'PS099' }
])

const taxTypeCode: IOptions[] = Object.seal([
  { label: '과세', value: 'TAX' },
  { label: '영세', value: 'ZERO' },
  { label: '면세', value: 'TAXFREE' }
])

const corporationType: IOptions[] = Object.seal([
  { label: '개인사업자', value: 'PERSON' },
  { label: '법인사업자', value: 'CORPORATION' }
])

export default {
  CommissionTypeCode,
  approvalStatusCode,
  customerStatusCode,
  deliveryCompanyCode,
  deliveryPriceType,
  deliveryAddPriceUseYn,
  salesTypeCode,
  saleStatusCode,
  taxTypeCode,
  corporationType
}
