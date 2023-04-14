import { IOptions } from '@/types/common';

/*FAQ 유형*/
const faqType: IOptions[] = Object.seal([
  {label: '회원', value: 'MEMBER'},
  {label: '주문/결제', value: 'ORDER'},
  {label: '배송', value: 'DELIVERY'},
  {label: '취소/반품/교환', value: 'CANCEL'},
  {label: '기타', value: 'ETC'}
]);

/*공지유형*/
const noticeType: IOptions[] = Object.seal([
  {label: '일반', value: 'NORMAL'},
  {label: '이벤트', value: 'EVENT'}
]);

/*공지대상*/
const noticeTarget: IOptions[] = Object.seal([
  {label: '전체', value: 'ALL'},
  {label: '관리자', value: 'ADMIN'},
  {label: '고객', value: 'CUSTOMER'},
  {label: '판매자', value: 'SELLER'},
  {label: '셀럽', value: 'CELEBRITY'}
]);

/*공개유형*/
const openType: IOptions[] = Object.seal([
  {label: '공개', value: 'OPEN'},
  {label: '숨김', value: 'BLIND'},
  {label: '비밀글', value: 'SECRET'}
]);

const productReviewOpenType: IOptions[] = Object.seal([
  {label: '공개', value: 'OPEN'},
  {label: '숨김', value: 'BLIND'}
]);

/*최상단 고정 여부*/
const topFixYn: IOptions[] = Object.seal([
  { label: '사용', value: 'Y' },
  { label: '미사용', value: 'N' }
]);

/*답변상태*/
const questionStatus: IOptions[] = Object.seal([
  {label: '답변대기', value: 'WAIT'},
  {label: '답변완료', value: 'DONE'}
]);

/*문의유형*/
const questionType: IOptions[] = Object.seal([
  {label: '상품', value: 'PRODUCT'},
  {label: '주문/결제', value: 'ORDER'},
  {label: '환불', value: 'REFUND'},
  {label: '반품/취소', value: 'CANCEL'},
  {label: '교환', value: 'CHANGE'},
  {label: '배송', value: 'DELIVERY'},
  {label: '오류', value: 'ERROR'},
  {label: '기타', value: 'ETC'}
]);

/*리뷰유형*/
const reviewType: IOptions[] = Object.seal([
  {label: '일반', value: 'NORMAL'},
  {label: '포토', value: 'PHOTO'},
  {label: '영상', value: 'VIDEO'}
]);


export default {
  faqType,
  noticeType,
  noticeTarget,
  openType,
  questionStatus,
  questionType,
  reviewType,
  topFixYn,
  productReviewOpenType
}
