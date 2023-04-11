import {IOptions} from '@/types/common';

/*회원 유형*/
const customerType: IOptions[] = Object.seal([
  {label: '일반', value: 'NORMAL'},
  {label: '판매자', value: 'SELLER'},
  {label: '셀럽', value: 'CELEBRITY'}
]);

/*계정상태 */
const customerStatusCode: IOptions[] = Object.seal([
  {label: '활성', value: 'ACTIVE'},
  {label: '비활성/휴면', value: 'INACTIVE'},
  {label: '탈퇴', value: 'EXIT'}
]);

/*회원 등급*/
const memberType:IOptions[] = Object.seal([
  {label: 'general', value: '1'},
  {label: 'SILVER', value: '2'},
  {label: 'GOLD', value: '5'}
]);

/*블랙 컨슈머 여부*/
const blackConsumerYn:IOptions[] = Object.seal([
  {label: '해당있음', value: 'Y'},
  {label: '해당없음', value: 'N'},
]);

/*제한사항 유형*/
const blockReasonCode : IOptions[] = Object.seal([
  {label: '욕설,음담패설', value: 'BAD_WORD'},
  {label: '강성클레임', value: 'HARD_CLAIM'},
  {label: '진행방해', value: 'INTERRUPT'},
  {label: '비정상적참가', value: 'CHEATING'},
])
/*제한기능 : 구매*/
const buyBlockYn: IOptions[] = Object.seal([
  { label: '구매', value: 'Y' },
])

/*제한기능 : 채팅*/
const commentBlockYn: IOptions[] = Object.seal([
  { label: '채팅', value: 'Y' },
])

/*성별*/
const gender : IOptions[] = Object.seal([
  {label:'남성',value:'M'},
  {label:'여성',value:'F'}
])

/*국적*/
const nationality : IOptions[] = Object.seal([
  {label:'내국인',value:'local'},
  {label:'외국인',value:'foreigner'}
])

export default {
  customerType,
  blockReasonCode,
  buyBlockYn,
  commentBlockYn,
  memberType,
  blackConsumerYn,
  customerStatusCode,
  gender,
  nationality,
}
