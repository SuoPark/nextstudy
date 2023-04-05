/**
 * @constant MSG
 * @type {string}
 * @description
 * 클라이언트에서 사용하는 메시지,
 * @example
 * // src/assets/constants/messages.ts
 * const MSG = Object.assign({
 * ERROR: {
 *  SAMPLE_MSG: '에러 입니다.',
 *   {...}
 *  });
 * }
 */
const MSG = {
  SUCCESS: {
    POST: '저장이 완료되었습니다.',
    PUT: '수정이 완료되었습니다.',
    DELETE: '삭제가 완료되었습니다.'
  },
  ERROR: {
    REQUIRED: '필수값 입니다.',
    ID: '아이디 확인바랍니다.',
    PASSWORD: '비밀번호 확인바랍니다.',
    NAME: '이름 확인바랍니다.',
    EMAIL: '이메일 양식 확인바랍니다.',
    TYPE: '입력형식을 확인바랍니다.'
  },
  CONFIRM: {
    POST: '저장하시겠습니까?',
    PUT: '수정하시겠습니까?',
    DELETE: '삭제하시겠습니까?'
  },
  AUTH: {
    CONFIRM_PASSWORD: '신규 비밀번호가 동일하지 않습니다. 다시 확인해주세요.',
    RESET_PASSWORD: '비밀번호 변경이 완료되었습니다.\n개인정보보호를 위해 다시 로그인 해주세요'
  },
  MEMBER: {
    LIST_EXIT: '선택하신 회원을 탈퇴 처리 하시겠습니까?',
    LIST_PASSWORD_RESET: '비밀번호 초기화 하시겠습니까?',
    POINT_HISTORY_POST: '포인트를 적용하시겠습니까?',
    BLACK_CONSUMER_CANCEL: '블랩컨슈머를 해제하시겠습니까?',
  },
  PRODUCT: {
    REGISTRATION_LIST_SOLD_OUT: '판매중/판매종료인 상품만 일시품절로 변경됩니다.',
    REGISTRATION_FORM_REQUEST: '상품을 승인요청하시겠습니까?',
    NOTICE_DELETE: '사용여부가 [사용]으로 설정된 상품공지배너는 삭제할 수 없습니다.',
    COPY_CONFIRM: '현재 조회 중인 상품을 복사하시겠습니까?',
    COPY_SUCCESS: '상품복사가 완료되었습니다.',
    SALESTATUS_CONFIRM: '선택하신 판매상태로 변경하시겠습니까?',
    SALESTATUS_SUCCESS: '판매상태가 변경되었습니다.',
    AUCTION_SHUTDOWN_CONFIRM: '즉시 종료 하시겠습니까?',
    GROUP_FORCEQUIT_CONFIRM: '강제 취소 하시겠습니까?',
    FORM_PRODUCT_NAME: '상품명은 최대 100자 입력할 수 있습니다.',
    FORM_CONSUMER_PRICE: '권장소비자가는 1부터 입력할 수 있습니다.',
    FORM_SALE_PRICE: '판매가는 1부터 입력할 수 있습니다.',
    FORM_SUBSITUTE_TITLE: '판매가 대체문구는 최대 20자 입력할 수 있습니다.',
    FORM_MAX_ORDER_LIMIT_YN: '최대구매수량 타입을 선택하세요.',
    FORM_MAX_ORDER_LIMIT_QUANTITY: '최대구매수량은 1부터 입력할 수 있습니다.',
    FORM_DELIVERY_ADD_PRICE: '추가배송비 정보가 없습니다.'
  },
  ORDER: {
    CHANGE_PREPARING: '선택하신 주문 건을 상품준비 상태로 변경하시겠습니까?',
    CHANGE_DELIVERING: '선택하신 주문 건을 배송중 상태로 변경하시겠습니까?',
    CHANGE_DELIVERED: '선택하신 주문 건을 배송완료 상태로 변경하시겠습니까?',
    FINISH_CHANGE: '변경이 완료 되었습니다.',
    CANCEL_REJECT: '선택하신 주문 건을 취소거부 하시겠습니까?',
    CANCEL_WITHDRAW: '선택하신 주문 건을 취소철회 하시겠습니까?',
    CHANGE_CANCEL_COMPLETE: '선택하신 주문 건을 취소완료 하시겠습니까?',

    CHANGE_RETURN_RETURN: '선택하신 반품신청 건을 반품회수중 상태로 변경하시겠습니까?',
    CHANGE_RETURN_REJECT: '선택하신 반품신청 건을 반품거부 상태로 변경하시겠습니까?',
    CHANGE_RETURN_WITHDRAW: '선택하신 반품신청 건을 반품철회 상태로 변경하시겠습니까?',
    CHANGE_RETURN_RETURNED: '선택하신 반품신청 건을 환불대기 상태로 변경하시겠습니까?',
    CHANGE_RETURN_COMPLETE: '선택하신 반품신청 건을 반품완료 상태로 변경하시겠습니까?',

    CHANGE_EXCHANGE_RETURN: '선택하신 교환신청건을 교환회수중 상태로 변경하시겠습니까?',
    CHANGE_EXCHANGE_SHIPPING: '선택하신 교환신청건을 재배송준비중 상태로 변경하시겠습니까?',
    CHANGE_EXCHANGE_WITHDRAW: '선택하신 교환신청건을 교환철회 상태로 변경하시겠습니까?',
    CHANGE_EXCHANGE_REJECT: '선택하신 교환신청건을 교환거부 상태로 변경하시겠습니까?',
    CHANGE_EXCHANGE_RETURNED: '선택하신 교환신청건을 교환회수완료 상태로 변경하시겠습니까?',
    CHANGE_EXCHANGE_COMPLETE: '선택하신 교환신청건을 재배송완료 상태로 변경하시겠습니까?',
    CHANGE_EXCHANGE_RESEND: '선택하신 교환신청건을 재배송중 상태로 변경하시겠습니까?'
  },
  BROADCASTING: {
    CHANGE_LIVE_STATUS: '편성을 확정하시겠습니까?',
    CHANGE_STATUS_CONFIRN: '승인하시겠습니까?',
    CHANGE_STATUS_CANCEL: '반려하시겠습니까?',
    CHANGE_STATUS_CONFIRM_FAIL: '승인하실 방송을 선택해주세요.',
    CHANGE_STATUS_CANCEL_FAIL: '반려하실 방송을 선택해주세요.',
    CHANGE_LIVE_CANCEL: '방송을 취소하시겠습니까?'
  },
  DISPLAY: {},
  PROMOTION: {},
  COUPON: {},
  COUPON_ISSUE: {
    CHANGE_ISSUE_STATUS: '발급 취소하시겠습니까?'
  },
  POINT: {},
  CLIENT: {},
  CUSTOMER_SATISFACTION: {
    CHANGE_BLIND: '게시물을 블라인드 처리하시겠습니까',
    CHANGE_OPEN: '게시물 블라인드를 해제하시겠습니까',
    BEST_REVIEW_Y: '게시물을 베스트 후기 선정하시겠습니까',
    BEST_REVIEW_N: '게시물을 베스트 후기 해제하시겠습니까'
  },
  SETTLEMENT: {},
  STATISTICS: {},
  SITE: {},
  MEMBER_GRADE: {
    POST: '등록 하시겠습니까?',
    PUT: '저장하시겠습니까?',
    CHECK_USE_YN: '선택하신 회원등급을 미사용 처리 하시겠습니까?',
    EXIST_CHECK: '소속된 회원이 존재합니다. 회원 전환 후 다시 시도해 주세요.'
  },
  SYSTEM_AUTH: {
    POST: '등록하시겠습니까?',
    UPDATE: '저장하시겠습니까?',
    DELETE: '삭제하시겠습니까?',
  },
  SYSTEM_AUTH_MENU: {
    POST: '저장하시겠습니까?',
    DELETE: '선택된 권한을 삭제하시겠습니까?'
  },
  SYSTEM_AUTH_ADMIN: {
    POST: '저장하시겠습니까?',
    DELETE: '선택된 권한을 삭제하시겠습니까?'
  },
  SYSTEM_AUTH_MENU_BUTTON: {
    POST: '저장하시겠습니까?',
    DELETE: '선택된 권한을 삭제하시겠습니까?'
  },
  SYSTEM_MENU: {
    POST: '저장하시겠습니까?',
    PUT: '저장하시겠습니까?',
    DELETE: '삭제하시겠습니까?',
  },
  SYSTEM_MENU_BUTTON: {
    POST: '저장하시겠습니까?',
    DELETE: '삭제하시겠습니까?',
  },
  SYSTEM_ADMIN: {
    POST: '등록하시겠습니까?',
    PUT: '수정된 내용을 저장하시겠습니까?'
  },
  SYSTEM_COMMON_CODE: {
    POST: '상위 코드를 등록하시겠습니까?',
    PUT: '저장하시겠습니까?',
  },
  SUB_SYSTEM_COMMON_CODE: {
    POST: '하위 코드를 등록하시겠습니까?',
    DELETE: '하위 코드를 삭제하시겠습니까?',
  },
  POLICY_TERMS: {
    POST: '등록하시겠습니까?',
    PUT: '수정된 내용을 저장하시겠습니까?',
  },
  POLICY_USER: {
    PUT: '수정된 내용을 저장하시겠습니까?',
  },
  POLICY_REGION: {
    POST: '등록하시겠습니까?',
    DELETE: '선택하신 내용을 삭제하시겠습니까?',
  },
  BLACK_LIST: {
    POST: '블랙리스트를 추가하시겠습니까?',
    PUT: '수정하시겠습니까?',
    DELETE: '사용자를 블랙리스트에서 삭제처리하였습니다.',
  },
  PROFILE: {
    PUT: '저장하시겠습니까?',
    CANCEL: '취소 시 입력된 데이터는 모두 손실됩니다. 계속 진행하시겠습니까?',
  },
  BLACK_CONSUMER: {
    POST: '블랙컨슈머를 추가하시겠습니까?',
  }
}

export default MSG
