const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
let route="home", noticeIndex=0;
let currentNoticeId = 1;
const noticesData = [
  { id: 1, title: "[긴급] 오늘 18시부터 2시간 단수 예정", date: "2026.06.26", content: "단지 내 저수조 청소 및 유입 밸브 교체 작업으로 인해 오늘 저녁 18시부터 20시까지 약 2시간 동안 전 세대 단수가 진행될 예정입니다. 입주민 여러분께서는 세수 및 취사에 필요한 생활용수를 미리 충분히 확보해 두시기 바라며, 단수 시간 중에는 세탁기 가동 및 비데 사용을 자제해 주시길 부탁드립니다. 단수 후 최초 통수 시 녹물이 나올 수 있으니 잠시 물을 흘려보낸 후 사용해 주세요." },
  { id: 2, title: "[공지] 헬스장 정기 점검 안내", date: "2026.06.25", content: "커뮤니티 센터 지하 1층에 위치한 주민 헬스장의 운동 기구 전반에 대한 정기 윤활 작업 및 안전 부품 점검이 6월 28일 일요일 오전 9시부터 오후 3시까지 진행됩니다. 해당 시간 동안에는 안전을 위해 헬스장 입장이 전면 통제되오니 이용에 참고하시기 바랍니다. 더욱 안전하고 쾌적한 피트니스 공간을 위해 정기 검사에 협조해 주셔서 대단히 감사합니다." },
  { id: 3, title: "[안내] 6월 관리비 고지서가 발행됐어요", date: "2026.06.24", content: "6월 아파트 관리비 고지서가 정상 발행되었습니다. 스마트홈 마이홈 리포트 메뉴에서 상세 사용 내역을 확인 및 전월 대비 증감 현황을 조회하실 수 있습니다. 관리비 납부 마감일은 6월 30일까지이며, 연체료가 발생하지 않도록 지정된 가상 계좌 또는 자동이체 계좌의 잔액을 점검해 주시길 당부드립니다. 문의 사항은 관리소 정산계로 연락해 주세요." },
  { id: 4, title: "[알림] 지하주차장 B2 청소 일정 안내", date: "2026.06.23", content: "단지 청결 유지를 위해 지하 주차장 2층 구역 물청소가 6월 29일 월요일 오전 10시부터 오후 4시까지 순차적으로 진행됩니다. 청소 시간 중에는 물 분사 및 청소 장비 작동으로 인해 차량 오염 및 미끄럼 사고 우려가 있으니, 가급적 해당 일시에 주차된 모든 차량을 지하 1층 주차 구역으로 미리 이동 주차해 주시기를 협조 부탁드립니다." }
];
const notices = noticesData.map(n => n.title);
const icon=name=>`<i class="fi fi-rr-${name}"></i>`;

let currentVoteId = 1;
let voteTab = "ing";
let votesData = [
  {
    id: 1,
    title: "제25기 입주자대표회의 동대표(102동) 선거",
    period: "2026.06.24 ~ 2026.06.30",
    status: "ing",
    myVoted: false,
    votedOptionId: null,
    options: [
      { id: 1, name: "기호 1번 김철수 (102동 402호)", description: "경력: 단지 조경 정비 위원회 위원장 / 공약: 주차 공간 및 단지 내 화단 집중 개선" },
      { id: 2, name: "기호 2번 이영희 (102동 1105호)", description: "경력: 부녀회 총무 3년 / 공약: 커뮤니티 도서관 활성화 및 야간 보완 순찰 강화" }
    ],
    totalVoters: 250,
    votedCount: 142
  },
  {
    id: 2,
    title: "아파트 단지 내 중앙 분수대 하절기 가동 시간대 찬반 투표",
    period: "2026.06.22 ~ 2026.06.29",
    status: "ing",
    myVoted: true,
    votedOptionId: 1,
    options: [
      { id: 1, name: "찬성 (매일 13:00 ~ 18:00 가동)", description: "하절기 무더위 해소 및 단지 조경 가치 향상" },
      { id: 2, name: "반대 (기존대로 주말만 가동)", description: "공동 수도 요금 및 전기세 관리비 상승 우려" }
    ],
    totalVoters: 500,
    votedCount: 388
  },
  {
    id: 3,
    title: "2026년 승강기 유지관리 용역 업체 선정 동의 투표",
    period: "2026.05.10 ~ 2026.05.15",
    status: "done",
    myVoted: true,
    votedOptionId: 1,
    options: [
      { id: 1, name: "A엘리베이터 케어 (낙찰가 최저) 동의", description: "92% 득표율로 가결 (찬성 386표 / 반대 34표)" },
      { id: 2, name: "B승강기 시스템 (낙찰가 차순위) 동의", description: "8% 득표율" }
    ],
    totalVoters: 500,
    votedCount: 420
  }
];

let boardSearchQuery = "";
let currentBoardPostId = 1;
let boardPosts = [
  {
    id: 1,
    author: "익명 (103동)",
    time: "2026.06.26 09:15",
    title: "오늘 아침에 지하 주차장에서 흰색 고양이 보신 분 계시나요?",
    content: "오늘 아침 출근길에 지하 2층 주차장 주차 기둥 B-12 구역 뒤편에서 하얗고 귀여운 고양이를 발견했어요. 목걸이를 차고 있는 걸로 봐서 혹시 단지 내에서 가출한 반려묘가 아닌가 걱정이 됩니다. 너무 조심성이 많아서 제가 츄르를 챙겨서 조심스럽게 다가가 보았는데, 경계하면서 순식간에 차 밑으로 숨어버렸네요.\n\n혹시 103동이나 104동 근처 주차장 근처에서 해당 고양이를 잃어버리신 차주분이나 주인분이 계시다면 빨리 가셔서 확인해 보시는 게 좋을 것 같습니다. 지하주차장이 차들이 수시로 드나들어 위험해 보이더라고요. 혹시 추가로 목격하신 분이 있다면 다른 장소라도 댓글로 꼭 알려주세요!",
    commentsList: [
      { author: "주민B (102동)", time: "2026.06.26 09:20", content: "좋은 정보 정말 감사합니다! 얼른 주인을 찾았으면 좋겠네요." },
      { author: "주민C (104동)", time: "2026.06.26 09:22", content: "방금 출근하면서 104동 근처 자전거 보관소 앞 화단 풀숲에서 비슷한 고양이가 웅크리고 있는 것을 보았습니다. 다행히 다치진 않은 것 같아 보였어요!" },
      { author: "주민D (103동)", time: "2026.06.26 09:25", content: "아, 저희 윗집 강아지 키우시는 분인데 고양이도 함께 키우시는 걸로 알아요. 혹시 그 댁 고양이인지 얼른 물어보고 연락해 봐야겠네요. 글 올려주셔서 진심으로 고맙습니다!" }
    ]
  },
  {
    id: 2,
    author: "주민A (105동)",
    time: "2026.06.26 08:20",
    title: "정문 앞 새로 오픈한 빵집 소금빵 진짜 맛있네요.",
    content: "안녕하세요, 입주민 여러분! 며칠 전에 정문 앞에 새로 생긴 신상 베이커리 빵집에 들러보았는데요. 시그니처 메뉴인 소금빵을 사 먹었는데 기대 이상으로 너무 훌륭해서 후기를 남겨봅니다.\n\n겉은 아주 바삭바삭하면서 버터향이 풍부하고, 속은 쫄깃하고 촉촉해서 따뜻한 아메리카노랑 궁합이 정말 최고더라고요. 가격도 개당 2,500원 수준으로 꽤 합리적인 편입니다. 사장님께 여쭤보니 매일 오후 2시랑 5시에 빵이 구워져 나온다고 해요. 갓 구운 빵 드시고 싶으신 분들은 시간 잘 맞춰서 방문하시면 인생 소금빵을 맛보실 수 있을 거예요! 맛있는 동네 가게는 널리 알려야죠 ㅎㅎ",
    commentsList: [
      { author: "주민E (101동)", time: "2026.06.26 08:35", content: "저도 소문 듣고 어제 퇴근길에 가봤는데 5시 30분쯤에 가니까 품절이었어요 ㅜㅜ 오늘 주말이니 점심 지나서 일찍 사러 가볼 생각이에요!" },
      { author: "주민F (105동)", time: "2026.06.26 08:42", content: "소금빵 말고도 크루아상이랑 단팥빵도 먹을 만하더라고요! 전체적으로 사장님이 정직하게 밀가루랑 버터를 좋은 것 쓰시는 게 느껴져서 단골 될 것 같습니다." }
    ]
  },
  {
    id: 3,
    author: "주민G (102동)",
    time: "2026.06.25 18:40",
    title: "아파트 단지 내 벼룩시장 개최 일정 아시는 분 계신가요?",
    content: "아이들이 자라서 안 입는 옷들이랑 한두 번밖에 안 가지고 논 깨끗한 보드게임, 장난감들이 꽤 많이 쌓였네요. 버리기는 너무 아깝고 해서 아파트 부녀회나 관리사무소에서 주기적으로 주최하던 단지 내 벼룩시장에 참여해보고 싶습니다. 작년 가을쯤에 중앙광장에서 열렸던 기억이 나는데 혹시 이번 상반기나 여름에 개최 일정이 잡혀있는지 정확히 아시는 분 계시면 알려주세요!",
    commentsList: [
      { author: "주민H (106동)", time: "2026.06.25 19:02", content: "관리사무소 게시판에서 얼핏 봤는데, 7월 둘째 주 토요일 오후 1시부터 수경광장 근처에서 벼룩시장이 열린다고 안내되어 있었어요!" },
      { author: "주민G (102동)", time: "2026.06.25 19:10", content: "오! 친절한 정보 정말 감사드려요. 미리 물건들 잘 챙겨놓고 준비해야겠네요." }
    ]
  },
  {
    id: 4,
    author: "주민I (104동)",
    time: "2026.06.25 14:15",
    title: "층간소음 방지용 매트 시공 업체 추천 부탁드립니다.",
    content: "아이가 이제 막 걸음마를 떼기 시작하면서 거실에서 쿵쿵거리는 소리가 꽤 크게 나기 시작하네요. 아랫집 이웃분께 너무 죄송하기도 하고 서로 스트레스 받지 않으려면 거실 전체에 소음 방지 매트를 아예 제대로 시공하는 게 낫겠다 싶어서 알아보고 있습니다. 혹시 입주민분들 중에서 최근에 셀프 시공 말고 전문 업체 불러서 매트 깔아보신 댁 있으신가요? 냄새도 안 나고 깔끔하게 코너 마무리 잘해주는 검증된 업체 있으면 추천 좀 부탁드려요!",
    commentsList: [
      { author: "주민J (102동)", time: "2026.06.25 14:30", content: "저희도 똑같은 고민 하다가 지난달에 롤매트 시공 받았는데 진짜 100% 만족 중이에요! 쪽지 주시면 시공 업체명이랑 단가 정보 보내드릴게요." },
      { author: "주민K (103동)", time: "2026.06.25 14:45", content: "시공 매트 까는 거 정말 강추예요. 미관상으로도 요즘은 타일처럼 깔끔하게 잘 나와서 거실이 오히려 넓어 보이고 좋습니다." }
    ]
  },
  {
    id: 5,
    author: "익명 (101동)",
    time: "2026.06.24 22:10",
    title: "출근 시간대 판교행 카풀 매칭하실 분 구합니다 (오전 7시 40분 출발)",
    content: "매일 아침 7시 40분쯤에 단지 정문 주차장에서 출발해서 분당수서간고속화도로 타고 판교 테크노밸리(H스퀘어 부근)까지 자차로 출퇴근하고 있는 직장인입니다. 혼자 운전해서 가는데 기름값도 조금 아끼고 출근 메이트 삼아서 카풀 하실 입주민 분이 계시는지 여쭤봅니다. 주 5일 고정 참석 아니어도 괜찮으니 편하게 생각 있으신 분들은 댓글 남겨주시거나 개인 톡으로 연락해 주세요!",
    commentsList: [
      { author: "주민L (101동)", time: "2026.06.24 22:30", content: "와! 저 삼평동 회사인데 시간대가 딱 맞네요! 매달 카풀비 꼬박 입금해 드리고 조용히 탑승 가능합니다. 상세 내용 조율해 보고 싶습니다!" }
    ]
  },
  {
    id: 6,
    author: "주민M (106동)",
    time: "2026.06.24 16:30",
    title: "유모차 깨끗하게 사용한 제품 무료 나눔 합니다.",
    content: "아이가 이제 많이 자라 유모차 탈 일이 없어져서 단지 내 필요하신 이웃분께 무료 나눔 하려고 합니다. 절충형 유모차이고 실사용 기간은 1년 남짓이라 바퀴 마모 상태도 양호하고 시트 커버도 주기적으로 세탁해서 무척 깨끗합니다. 레인 커버랑 컵홀더 부속품도 다 챙겨드릴게요. 106동 공동현관문 앞으로 직접 가지러 오실 수 있는 분 연락 주세요! 가급적 오늘 저녁에 거래 가능하신 분 우대합니다.",
    commentsList: [
      { author: "주민N (104동)", time: "2026.06.24 16:38", content: "신청해봅니다! 마침 둘째 유모차가 망가져서 새로 사려던 참인데 기회 주시면 유용하게 쓰겠습니다. 106동 앞으로 바로 가겠습니다!" }
    ]
  },
  {
    id: 7,
    author: "주민O (103동)",
    time: "2026.06.23 11:20",
    title: "단지 내 피트니스 센터 환기 설비 건의 관련해서...",
    content: "아침 시간대에 커뮤니티 지하 피트니스 센터를 자주 이용하고 있는 입주민입니다. 요즘 날씨가 더워지고 습해지면서 실내 운동하시는 분들이 급증했는데, 땀 냄새가 잘 안 빠지고 환기가 덜 되어 지하 공기가 꽤 꿉꿉하고 답답하게 느껴집니다. 환풍기를 추가 가동하거나 공기청정기 필터 청소 주기를 좀 더 단축해 줄 것을 관리사무소 건의 게시판에 올리려고 하는데 다들 동의하시는지 의견 여쭙고 싶습니다.",
    commentsList: [
      { author: "주민P (105동)", time: "2026.06.23 11:45", content: "백번 공감합니다. 저녁 퇴근 시간대에는 진짜 습하고 공기가 텁텁해요. 강력히 청원 올려주시면 저도 댓글 달아 서명할게요!" }
    ]
  },
  {
    id: 8,
    author: "주민Q (102동)",
    time: "2026.06.23 09:10",
    title: "단지 중앙 분수 광장 물놀이 개장 소식에 아이들이 너무 좋아하네요.",
    content: "어제 수경광장 수영 분수가 가동되는 걸 보고 저희 집 아이들이 달려 나가서 한바탕 신나게 물놀이를 즐겼습니다. 단지 관리가 늘 깔끔하고 깨끗한 물로 가동해 주시는 보안 및 환경 미화 선생님들께 진심으로 깊이 감사드립니다. 우리 아파트 중앙광장 뷰는 볼 때마다 정말 힐링이 되는 것 같아 주민으로서 대단히 자랑스럽습니다.",
    commentsList: []
  },
  {
    id: 9,
    author: "주민R (101동)",
    time: "2026.06.22 20:30",
    title: "자전거 보관소에 보관 중이던 파란색 하이브리드 자전거 분실하셨나요?",
    content: "오늘 저녁에 101동 뒤편 자전거 거치대 옆 잔디밭 구석에 파란색 자이언트 하이브리드 자전거 한 대가 체인 잠금장치가 풀려진 채 덩그러니 쓰러져 있는 것을 발견했습니다. 혹시 잃어버리고 찾아 헤매고 계신 차주분이 있다면 경비실에 분실 보관 의뢰해 두었으니 거기로 가셔서 동 호수 확인하시고 수령하시기 바랍니다. 도난 의심이 좀 들기도 하네요.",
    commentsList: [
      { author: "주민S (101동)", time: "2026.06.22 21:05", content: "앗! 제 동생 자전거인 것 같습니다! 어제 세워두고 체인을 제대로 안 채운 것 같다며 하루 종일 안달복달했는데, 경비실 연락해서 확인해보겠습니다. 제보 정말 감사합니다!" }
    ]
  },
  {
    id: 10,
    author: "주민T (106동)",
    time: "2026.06.22 15:40",
    title: "캠핑용 웨건 공동구매 및 대여 하실 분 찾습니다.",
    content: "주말마다 캠핑 갈 때 유용하게 쓰려고 콜맨 캠핑 웨건을 구매하려는데, 1년에 실제로 쓰는 횟수는 5~6번 남짓이라 혼자 다 부담해서 사고 보관하기엔 집 안 공간도 차지하고 비효율적이네요. 혹시 캠핑이나 짐 나를 때 가끔 웨건 필요하신 근처 라인 입주민 분이 계시다면, 1/n로 공동 부담해서 구매 후 복도 자전거 보관 구역에 두고 일정 스케줄 관리하면서 셰어링 형태로 이용하실 분 계시면 좋겠습니다. 관심 있으신 분은 댓글이나 편하게 제안 주십시오!",
    commentsList: []
  }
];

let clubSearchQuery = "";
let userClubs = [
  {
    id: 1,
    name: "아파트 야간 러닝 크루",
    iconName: "running",
    members: 12,
    maxMembers: 20,
    desc: "초보자도 환영합니다! 가볍게 아파트 한 바퀴 같이 뛰어요."
  }
];
let availableClubs = [
  {
    id: 2,
    name: "통기타 연주 소모임",
    iconName: "music",
    members: 6,
    maxMembers: 10,
    desc: "음악을 사랑하는 주민 누구나 환영합니다. 코드부터 배워요.",
    status: "join"
  },
  {
    id: 3,
    name: "육아맘/육아파파 정보 공유회",
    iconName: "baby",
    members: 18,
    maxMembers: 20,
    desc: "동네 육아 정보와 나눔을 함께하는 따뜻한 모임입니다.",
    status: "pending"
  },
  {
    id: 4,
    name: "주말 보드게임 소모임",
    iconName: "gamepad",
    members: 2,
    maxMembers: 5,
    desc: "토요일 오후에 거실에서 가볍게 보드게임 하실 분 구합니다!",
    status: "join"
  }
];

let selectedClubPostId = 1;
let currentClubNoticeId = 1;
const clubNoticesData = [
  { id: 1, title: "이번 주 토요일(27일) 정기 러닝 집결 안내", date: "2026.06.26", content: "이번 주 토요일 저녁 8시 정기 야간 러닝은 예정대로 아파트 정문 수경광장 분수대 앞에서 모여 출발합니다. 날씨 예보를 보니 구름만 다소 끼고 선선하여 러닝하기 아주 좋은 컨디션일 것 같습니다. 당일 기온은 약 22도 수준이므로 얇은 기능성 티셔츠 차림을 추천드립니다. 혹시 갑작스러운 소나기 등 우천 발생 시 가동 여부는 당일 오후 6시까지 단톡방과 본 공지글 댓글 피드로 신속히 재안내해 드릴게요. 다들 늦지 않게 나와주세요!" },
  { id: 2, title: "하절기 러닝 페이스메이커 자원봉사 모집", date: "2026.06.22", content: "러닝 크루 회원이 늘어남에 따라 페이스별(킬로당 5분, 6분, 7분 페이스) 그룹 달리기를 진행하려고 합니다. 안전한 대열 주행과 낙오자 방지를 위해 각 페이스 그룹을 이끌어주실 든든한 페이스메이커 자원봉사 주민분들을 선착순 모집합니다. 봉사해 주시는 분들께는 크루 회비에서 스포츠 이온음료를 매달 무상 지원해 드려요 ㅎㅎ 많은 지원 부탁드립니다." }
];
let clubBoardSearchQuery = "";
let clubPosts = [
  {
    id: 1,
    author: "러닝장장 (방장)",
    time: "어제",
    content: "입주민 러닝 크루 여러분, 어제 저녁 8시 정기 야간 러닝 세션 모두 고생하셨습니다! 습하고 더운 날씨였음에도 불구하고 무려 10분이나 참석해 주셔서 서로 끌어주고 응원하며 달릴 수 있었습니다. 다들 지치지 않고 완주해 주셔서 감사해요.\n\n다음 주 수요일 저녁 세션에는 기존 아파트 정문 코스에서 출발해서, 근처 생태공원 호수 산책로를 크게 한 바퀴 도는 시원한 그늘 코스로 조금 변경하여 진행해 보려고 합니다. 호수 근처가 밤에 훨씬 선선하고 달리기 좋을 것 같습니다. 코스 상세 지도는 단톡방에 내일 중으로 공유해 드릴 테니 참여하실 분들은 미리 확인 부탁드립니다!",
    comments: 4,
    commentsList: [
      { author: "주민B (102동)", time: "어제", content: "어제 습도가 높아서 중간에 포기하고 싶었는데, 다 같이 뛰어주신 덕분에 끝까지 달릴 수 있었습니다! 다음 주 호수 코스 정말 시원하고 좋을 것 같아요. 꼭 참석할게요!" },
      { author: "회원C (104동)", time: "어제", content: "어제 뛰고 나니까 온몸이 개운하네요! 이번에 장만한 가벼운 러닝화가 아주 맘에 듭니다. 다음 주에 본격적으로 테스트해봐야겠어요 ㅎㅎ" },
      { author: "러너A", time: "어제", content: "방장님 항상 코스 연구해 주시고 페이스 조절 가이드해 주셔서 든든합니다. 다들 고생하셨습니다!" },
      { author: "방랑자", time: "어제", content: "오랜만에 참석했는데 땀 쭉 빼고 샤워하니까 천국이 따로 없네요. 다음 주에도 무조건 고입니다!" }
    ]
  },
  {
    id: 2,
    author: "주민B (102동)",
    time: "2일 전",
    content: "이번에 러닝 취미를 본격적으로 시작하면서 새로 산 초보자용 안정화 러닝화를 실전에서 개시해 보았습니다. 발볼이 넓은 편이라 신발 고르기가 참 힘들었는데 발 양옆을 꽉 잡아주고 쿠션감도 푹신해서 달릴 때 무릎에 충격이 확실히 덜 오더라고요! 초보 러너분들 신발 유목민 생활 중이시라면 매장 가셔서 한 번 피팅해 보시길 강력 추천합니다.",
    comments: 2,
    commentsList: [
      { author: "러닝장장 (방장)", time: "2일 전", content: "오 대단한 지름이시네요! 모델명이 혹시 어떤 건가요? 제품 정보나 구매처 간단하게 단톡방이나 여기에 공유해주시면 다른 초보 크루 분들께 큰 도움이 될 것 같아요!" },
      { author: "주민B (102동)", time: "2일 전", content: "아! 나이키 에어 줌 페가수스 시리즈입니다! 아울렛 매장에서 마침 세일 중이라 아주 착한 가격에 득템했어요 ㅎㅎ" }
    ]
  },
  {
    id: 3,
    author: "회원C (104동)",
    time: "2026.06.24",
    content: "이번 주 토요일 저녁 정기 벙개 런 일정에 일기예보를 보니 장마 영향으로 전국에 비 소식이 잡혀 있더라고요. 빗방울이 약하게 날리는 우중 런이면 다 같이 모여 시원하게 달려도 좋을 것 같긴 한데, 혹시 강수량이 많아지면 실내 체육관 조깅 트랙이나 아파트 지하 주차장 트랙 레이아웃으로 변경해서 모임을 진행하는지, 아니면 일정이 취소되는지 궁금합니다.",
    comments: 2,
    commentsList: [
      { author: "러닝장장 (방장)", time: "2026.06.24", content: "토요일 강수량이 시간당 5mm 이상 예보되면 안전을 위해 야외 세션은 취소하고 홈트 레이아웃으로 돌리거나 한 주 쉬어 가도록 결정하겠습니다. 당일 아침 기상청 날씨 분석해서 신속히 알려드릴게요!" },
      { author: "회원C (104동)", time: "2026.06.24", content: "네 알겠습니다~" }
    ]
  },
  {
    id: 4,
    author: "러닝장장 (방장)",
    time: "2026.06.22",
    content: "정기 러닝 코스 안내 (정문 출발 -> 단지 외곽 -> 후문 반환)",
    comments: 1,
    commentsList: [
      { author: "주민B (102동)", time: "2026.06.22", content: "코스 안내 감사합니다." }
    ]
  }
];

const pageTitle=(title,sub)=>`<div class="page-title"><h1>${title}</h1><p>${sub}</p></div>`;
const menuRow=(icon,title,sub,to)=>`<button class="menu-row" data-route="${to}"><span>${icon}</span><span><b>${title}</b><small>${sub}</small></span><i>›</i></button>`;

function home(){
  return `<section class="page">
    <div class="home-chatbot-box">
      <i class="fi fi-rr-comment-alt-dots chatbot-icon"></i>
      <input type="text" id="homeChatInput" placeholder="무엇이든 물어보세요" class="chatbot-input">
      <button id="homeChatSubmit" class="chatbot-submit-btn"><i class="fi fi-rr-paper-plane"></i></button>
    </div>
    <div class="greeting"><small>2026년 6월 26일 금요일</small><h1>김하늘님,<br>오늘도 평온하게.</h1></div>
    <div class="notice" id="noticeRoller">
      <b>알림</b>
      <button class="notice-window" data-route="notice" aria-label="공지사항 보기">
        <span class="notice-message current">${notices[noticeIndex]}</span>
      </button>
      <i>›</i>
    </div>
    <div class="section-head"><h2>우리 집</h2><button data-route="control">전체 제어 ›</button></div>
    <div class="summary-grid">
      <button class="card summary-card" data-route="control"><div class="visual">${icon("bulb")}</div><h3>스마트홈 제어</h3><p>조명 · 가스 제어</p></button>
      <button class="card summary-card" id="homeDoorBtn"><div class="visual">${icon(deviceState.door ? "lock" : "unlock")}</div><h3>현관문 제어</h3><p id="homeDoorStatus">${deviceState.door ? "안전하게 잠김" : "열려 있음"}</p></button>
    </div>
    <div class="section-head"><h2>마이홈 리포트</h2><button data-route="fee">상세 ›</button></div>
    <article class="card report-card"><h3>지난달보다 32,000원 더 사용했어요</h3><p>전기 사용량이 가장 많이 늘었어요.</p><div class="report-chart">${[38,52,68,42,76,90].map(h=>`<i style="height:${h}%"></i>`).join("")}</div><div class="report-meta"><div><small>지난달</small><b>216,500원</b></div><div><small>이번 달</small><b>248,500원</b></div></div></article>
    <div class="section-head"><h2>바로가기</h2><button data-route="life">편집 ›</button></div>
    <div class="scene-row">
      <button class="scene" data-route="reservation"><span class="bubble">${icon("calendar")}</span><p>시설 신청</p></button>
      <button class="scene" data-route="complaint"><span class="bubble">${icon("tools")}</span><p>민원접수</p></button>
      <button class="scene" data-route="fee"><span class="bubble">₩</span><p>관리비</p></button>
      <button class="scene" data-route="visitor"><span class="bubble">${icon("car-side")}</span><p>방문차량 등록</p></button>
      <button class="scene" data-route="community"><span class="bubble">${icon("users-alt")}</span><p>소모임</p></button>
    </div>
    <div class="section-head"><h2>생활을 더 편리하게</h2><button>›</button></div>
    <article class="card story-card"><h3>초록이 머무는<br>편안한 하루를 시작하세요.</h3><p>중앙정원 산책로가 오전 6시에 열렸어요.</p><div class="plant"><i class="leaf"></i><i class="leaf"></i><i class="leaf"></i><i class="leaf"></i><i class="leaf"></i><div class="pot"></div></div></article>
    <div class="section-head"><h2>우리 단지 이야기</h2><button data-route="community">더보기 ›</button></div>
    <div class="community-list">
      <article class="card community-item" data-route="clubDetail" style="cursor:pointer;"><div class="avatar">${icon("running")}</div><div><h3>러닝크루</h3><p>오늘 저녁 8시 단지 앞에서 만나요.</p></div></article>
      <article class="card community-item"><div class="avatar">${icon("book-alt")}</div><div><h3>책갈피 독서모임</h3><p>6월의 책 투표가 진행 중이에요.</p></div></article>
    </div>
  </section>`;
}

function life(){return `<section class="page">${pageTitle("생활","자주 쓰는 아파트 서비스를 모았어요.")}
  <div class="section-head"><h2>자주 쓰는 기능</h2></div><div class="quick-grid">
  ${[[icon("calendar"),"시설예약","reservation"],[icon("car-side"),"방문차량","visitor"],[icon("bulb"),"스마트홈 제어","control"],[icon("parking"),"주차 현황","parking"]].map(x=>`<button class="quick" data-route="${x[2]}"><span>${x[0]}</span>${x[1]}</button>`).join("")}</div>
  <div class="section-head"><h2>우리 집 관리</h2></div><div class="card list-card">
  ${menuRow(icon("won-sign"),"이번 달 관리비","248,500원 · 6월 25일까지","fee")}${menuRow(icon("tools"),"내 민원","처리 중인 민원 1건","complaint")}${menuRow(icon("document"),"시설이용 신청","회의실 · 골프룸 · 사물함","facility")}</div></section>`}

function community(){
  const query = clubSearchQuery.toLowerCase().trim();
  
  // 내가 가입한 소모임 필터
  const filteredUserClubs = userClubs.filter(c => 
    c.name.toLowerCase().includes(query) || c.desc.toLowerCase().includes(query)
  );
  
  // 새로운 소모임 가입하기 필터
  const filteredAvailableClubs = availableClubs.filter(c => 
    c.name.toLowerCase().includes(query) || c.desc.toLowerCase().includes(query)
  );

  const userClubsHtml = filteredUserClubs.map(c => `
    <div class="card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); padding: 16px; margin-top: 10px; display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; justify-content: space-between; align-items: start; gap: 8px;">
        <span style="font-weight: 700; font-size: 14.5px; color: var(--ink);">${c.name}</span>
        <span style="font-size: 11.5px; font-weight: 700; color: var(--sub); background: var(--cream); padding: 3px 8px; border-radius: 6px; border: 1px solid var(--line);">정원: [ ${c.members}명 / ${c.maxMembers}명 ]</span>
      </div>
      <div style="font-size: 12px; color: var(--sub); font-weight: 500; margin-left: 2px;">- 소개: ${c.desc}</div>
      <div style="display: flex; justify-content: flex-end; margin-top: 4px;">
        <button class="join-chat-btn" data-route="clubDetail" style="background: var(--cream); border: 1px solid var(--line); color: var(--ink); font-size: 11px; padding: 6px 12px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all 0.2s ease;">모임 채팅 입장</button>
      </div>
    </div>
  `).join("");

  const userClubsSection = filteredUserClubs.length > 0 ? `
    <div class="section-head"><h2>내가 가입한 소모임</h2></div>
    ${userClubsHtml}
  ` : `
    <div class="section-head"><h2>내가 가입한 소모임</h2></div>
    <div class="card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); padding: 20px; text-align: center; color: var(--sub); font-size: 12px;">가입한 소모임이 없습니다.</div>
  `;

  const availableClubsHtml = filteredAvailableClubs.map((c, idx) => {
    const isLast = idx === filteredAvailableClubs.length - 1;
    const borderStyle = isLast ? "" : "border-bottom: 1px solid var(--line);";

    return `
      <div style="padding: 16px; ${borderStyle} display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: start; gap: 8px;">
          <span style="font-weight: 700; font-size: 14.5px; color: var(--ink);">${c.name}</span>
          <span style="font-size: 11.5px; font-weight: 700; color: var(--sub); background: var(--cream); padding: 3px 8px; border-radius: 6px; border: 1px solid var(--line);">정원: [ ${c.members}명 / ${c.maxMembers}명 ]</span>
        </div>
        <div style="font-size: 12px; color: var(--sub); font-weight: 500; line-height: 1.5;">- 소개: ${c.desc}</div>
        <div style="display: flex; justify-content: flex-end; margin-top: 4px;">
          ${c.status === "pending" ? `
            <button class="join-club-btn" style="background: var(--cream) !important; color: var(--sub) !important; border: 1px solid var(--line); font-size: 11px; padding: 6px 16px; border-radius: 8px; font-weight: 700; cursor: not-allowed;" disabled>승인 대기 중</button>
          ` : `
            <button class="join-club-btn" data-id="${c.id}" data-name="${c.name}" style="background: var(--dark) !important; color: #ffffff !important; border: 0; font-size: 11px; padding: 6px 16px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all 0.2s ease;">가입 신청</button>
          `}
        </div>
      </div>
    `;
  }).join("");

  const availableClubsSection = filteredAvailableClubs.length > 0 ? `
    <div class="card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); overflow: hidden; display: flex; flex-direction: column;">
      ${availableClubsHtml}
    </div>
  ` : `
    <div class="card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); padding: 20px; text-align: center; color: var(--sub); font-size: 12px;">가입할 수 있는 소모임이 없습니다.</div>
  `;

  return `<section class="page">${pageTitle("커뮤니티","이웃과 함께 나누고 소통하는 공간입니다.")}
  
  <div style="margin-bottom: 20px; display: flex; gap: 8px;">
    <input type="text" id="clubSearchInput" placeholder="관심 있는 소모임 이름이나 키워드를 입력하세요" value="${clubSearchQuery}" style="flex: 1; border: 1px solid var(--line); background: #ffffff; border-radius: 12px; padding: 14px 16px; outline: 0; font-size: 13px; box-shadow: var(--shadow);">
    <button id="clubSearchSubmitBtn" style="padding: 14px 20px; background: var(--dark) !important; color: #ffffff; border: none; font-size: 13px; font-weight: 700; border-radius: 12px; cursor: pointer; box-shadow: var(--shadow);">검색</button>
  </div>

  <div style="height: 1px; background: var(--line); margin: 16px 0 16px;"></div>

  ${userClubsSection}

  <div style="height: 1px; background: var(--line); margin: 24px 0 20px;"></div>

  <div class="section-head"><h2>새로운 소모임 가입하기</h2></div>
  ${availableClubsSection}

  <button class="primary" id="createClubBtn" style="width: 100%; margin-top: 24px; padding: 14px; font-weight: 700; font-size: 14px; background: var(--dark) !important; border-radius: 12px; color: #ffffff;">새로운 소모임 만들기</button>
</section>`;
}

function clubDetail() {
  return simplePage("아파트 야간 러닝 크루", "우리 아파트 대표 러닝 소모임입니다.", `
    <!-- 소모임 정보 카드 -->
    <div class="card" style="padding: 18px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--line); box-shadow: var(--shadow);">
      <div style="margin-bottom: 12px; font-size: 13.5px; color: var(--ink);">
        <div style="margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
          <span style="font-weight: 700; min-width: 80px; display: inline-block; color: var(--sub);">모임 정원</span>
          <span style="font-weight: 500;">[ 12명 / 20명 ]</span>
        </div>
        <div style="display: flex; align-items: start; gap: 6px;">
          <span style="font-weight: 700; min-width: 80px; display: inline-block; color: var(--sub);">모임 소개</span>
          <span style="font-weight: 500; flex: 1; line-height: 1.4;">초보자도 환영합니다! 가볍게 아파트 한 바퀴 같이 뛰어요.</span>
        </div>
      </div>
      
      <div style="height: 1px; background: var(--line); margin: 14px 0;"></div>
      
      <!-- 필독 공지 -->
      <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; font-size: 13px;">
        <div style="font-weight: 500; color: var(--ink); line-height: 1.4; display: flex; align-items: start;">
          <span>이번 주 토요일(27일) 오후 8시 정문 앞 집결 (우천 시 취소)</span>
        </div>
        <button id="noticeMoreBtn" style="color: var(--olive); font-weight: 700; font-size: 12.5px; white-space: nowrap; flex-shrink: 0; background: none; border: 0; cursor: pointer;">더보기 ›</button>
      </div>
    </div>

    <!-- 모임 게시판 -->
    <div class="section-head" style="margin-top: 24px; margin-bottom: 12px;">
      <h2>모임 게시판</h2>
      <button id="boardMoreBtn" style="color: var(--sub); font-size: 12px; font-weight: 500; background: none; border: 0; cursor: pointer;">더보기 ›</button>
    </div>
    
    <div class="card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); overflow: hidden; display: flex; flex-direction: column; gap: 0;">
      <!-- 게시물 1 -->
      <div class="club-post-item-link" data-id="${clubPosts[0].id}" style="padding: 16px; border-bottom: 1px solid var(--line); display: flex; flex-direction: column; gap: 8px; cursor: pointer;">
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12.5px;">
          <span style="font-weight: 700; color: var(--ink);">${clubPosts[0].author}</span>
          <span style="color: var(--sub); font-weight: 500;">${clubPosts[0].time}</span>
        </div>
        <div style="font-size: 13px; color: var(--ink); line-height: 1.5; font-weight: 500;">
          ${clubPosts[0].content}
        </div>
        <div style="font-size: 11.5px; color: var(--sub); font-weight: 700; margin-top: 4px;">
          댓글 ${clubPosts[0].comments}  |  좋아요 8
        </div>
      </div>
      
      <!-- 게시물 2 -->
      <div class="club-post-item-link" data-id="${clubPosts[1].id}" style="padding: 16px; display: flex; flex-direction: column; gap: 8px; cursor: pointer;">
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12.5px;">
          <span style="font-weight: 700; color: var(--ink);">${clubPosts[1].author}</span>
          <span style="color: var(--sub); font-weight: 500;">${clubPosts[1].time}</span>
        </div>
        <div style="font-size: 13px; color: var(--ink); line-height: 1.5; font-weight: 500;">
          ${clubPosts[1].content}
        </div>
        <div style="font-size: 11.5px; color: var(--sub); font-weight: 700; margin-top: 4px;">
          댓글 ${clubPosts[1].comments}  |  좋아요 5
        </div>
      </div>
    </div>
    
    <button class="secondary" id="backToClubsBtn" style="width: 100%; margin-top: 20px; border: 1px solid var(--line) !important; background: var(--cream) !important; border-radius: 12px; padding: 12px 10px; font-weight: 700;">소모임 목록으로 돌아가기</button>
  `);
}

function bindClubDetailEvents() {
  const backBtn = $("#backToClubsBtn");
  if (backBtn) {
    backBtn.onclick = () => {
      navigate("community");
    };
  }
  
  const noticeMoreBtn = $("#noticeMoreBtn");
  if (noticeMoreBtn) {
    noticeMoreBtn.onclick = () => {
      currentClubNoticeId = 1;
      navigate("clubNoticeDetail");
    };
  }

  const boardMoreBtn = $("#boardMoreBtn");
  if (boardMoreBtn) {
    boardMoreBtn.onclick = () => {
      navigate("clubBoard");
    };
  }

  $$(".club-post-item-link").forEach(item => {
    item.onclick = () => {
      selectedClubPostId = parseInt(item.dataset.id);
      navigate("clubBoardDetail");
    };
  });
}

function clubBoard() {
  const query = clubBoardSearchQuery.toLowerCase().trim();
  const filteredPosts = clubPosts.filter(p => 
    p.author.toLowerCase().includes(query) || p.content.toLowerCase().includes(query)
  );

  const postsHtml = filteredPosts.map((p, idx) => {
    const isLast = idx === filteredPosts.length - 1;
    const borderStyle = isLast ? "" : "border-bottom: 1px solid var(--line);";
    return `
      <div class="club-board-post-item" data-id="${p.id}" style="padding: 16px; ${borderStyle} display: flex; flex-direction: column; gap: 8px; cursor: pointer;">
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12.5px;">
          <span style="font-weight: 700; color: var(--ink);">${p.author}</span>
          <span style="color: var(--sub); font-weight: 500;">${p.time}</span>
        </div>
        <div style="font-size: 13px; color: var(--ink); line-height: 1.5; font-weight: 500;">
          ${p.content}
        </div>
        <div style="display: flex; justify-content: flex-end; font-size: 12.5px; font-weight: 700; color: var(--muted); margin-top: 4px;">
          [${p.comments}]
        </div>
      </div>
    `;
  }).join("");

  const postsListSection = filteredPosts.length > 0 ? `
    <div class="card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); overflow: hidden; display: flex; flex-direction: column; gap: 0;">
      ${postsHtml}
    </div>
  ` : `
    <div class="card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); padding: 20px; text-align: center; color: var(--sub); font-size: 12px;">검색 결과가 없습니다.</div>
  `;

  return simplePage("러닝크루 게시판", "소모임 회원들과 자유롭게 이야기를 나누세요.", `
    ${postsListSection}

    <!-- 페이징 및 우측 글쓰기 버튼 영역 -->
    <div style="display: flex; justify-content: center; align-items: center; margin-top: 12px; position: relative; min-height: 38px;">
      <div class="meeting-pagination" style="display: flex; align-items: center; gap: 12px;">
        <button class="page-arrow" style="background: none; border: none; font-size: 12px; color: var(--sub); cursor: pointer;" onclick="toast('마지막 페이지입니다.')">◀</button>
        <span class="page-num" style="font-size: 13px; font-weight: 700; color: var(--ink);">1</span>
        <button class="page-arrow" style="background: none; border: none; font-size: 12px; color: var(--sub); cursor: pointer;" onclick="toast('마지막 페이지입니다.')">▶</button>
      </div>
      <button id="clubBoardWriteBtn" style="position: absolute; right: 0; padding: 10px 18px; font-weight: 700; font-size: 12.5px; background: var(--dark) !important; border-radius: 8px; color: #ffffff; cursor: pointer; transition: all 0.2s ease;">글쓰기</button>
    </div>

    <!-- 검색바 -->
    <div style="margin-top: 12px; position: relative;">
      <input type="text" id="clubBoardSearchInput" placeholder="게시판 내 검색" value="${clubBoardSearchQuery}" style="width: 100%; border: 1px solid var(--line); background: #ffffff; border-radius: 12px; padding: 14px 16px; outline: 0; font-size: 13px; box-shadow: var(--shadow);">
    </div>

    <button class="secondary" id="backToClubDetailBtn" style="width: 100%; margin-top: 16px; border: 1px solid var(--line) !important; background: var(--cream) !important; border-radius: 12px; padding: 12px 10px; font-weight: 700;">소모임 정보로 돌아가기</button>
  `);
}

function bindClubBoardEvents() {
  const searchInput = $("#clubBoardSearchInput");
  if (searchInput) {
    searchInput.oninput = () => {
      clubBoardSearchQuery = searchInput.value;
      $("#app").innerHTML = clubBoard();
      bindClubBoardEvents();
      const newInput = $("#clubBoardSearchInput");
      if (newInput) {
        newInput.focus();
        newInput.setSelectionRange(newInput.value.length, newInput.value.length);
      }
    };
  }

  const writeBtn = $("#clubBoardWriteBtn");
  if (writeBtn) {
    writeBtn.onclick = () => {
      navigate("clubBoardWrite");
    };
  }

  const backBtn = $("#backToClubDetailBtn");
  if (backBtn) {
    backBtn.onclick = () => {
      navigate("clubDetail");
    };
  }

  $$(".club-board-post-item").forEach(item => {
    item.onclick = () => {
      selectedClubPostId = parseInt(item.dataset.id);
      navigate("clubBoardDetail");
    };
  });
}

function clubBoardWrite() {
  return simplePage("글쓰기", "소모임 게시판에 새 글을 남겨주세요.", `
    <div class="card form-card" style="padding: 20px; border-radius: 12px; border: 1px solid var(--line); box-shadow: var(--shadow);">
      <div class="field" style="margin-bottom: 16px;">
        <label style="display: block; font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 6px;">작성자</label>
        <input type="text" id="clubWriteAuthor" value="김하늘 (101동)" style="width: 100%; border: 1px solid var(--line); background: #ffffff; padding: 10px 12px; border-radius: 8px; font-size: 13px; outline: none; font-weight: 500;">
      </div>
      
      <div class="field" style="margin-bottom: 20px;">
        <label style="display: block; font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 6px;">내용</label>
        <textarea id="clubWriteContent" placeholder="모임원들과 나누고 싶은 이야기를 입력해 주세요." style="width: 100%; height: 180px; border: 1px solid var(--line); border-radius: 8px; padding: 12px; font-size: 13px; outline: none; resize: none; line-height: 1.6; font-family: inherit; font-weight: 500;"></textarea>
      </div>
      
      <div style="display: flex; gap: 10px;">
        <button class="primary" id="clubWriteSubmitBtn" style="flex: 1; padding: 12px; font-weight: 700; font-size: 13.5px; background: var(--dark) !important; border-radius: 8px; color: #ffffff;">등록</button>
        <button class="secondary" id="clubWriteCancelBtn" style="flex: 1; padding: 12px; font-weight: 700; font-size: 13.5px; border: 1px solid var(--line) !important; background: var(--cream) !important; border-radius: 8px; color: var(--ink);">취소</button>
      </div>
    </div>
  `);
}

function bindClubBoardWriteEvents() {
  const submitBtn = $("#clubWriteSubmitBtn");
  if (submitBtn) {
    submitBtn.onclick = () => {
      const author = $("#clubWriteAuthor").value.trim();
      const content = $("#clubWriteContent").value.trim();
      
      if (!author) {
        toast("작성자명을 입력해 주세요.");
        return;
      }
      if (!content) {
        toast("내용을 입력해 주세요.");
        return;
      }
      
      const newPost = {
        id: Date.now(),
        author: author,
        time: "방금 전",
        content: content,
        comments: 0
      };
      
      clubPosts.unshift(newPost);
      toast("게시글이 성공적으로 등록되었습니다. 🎉");
      
      setTimeout(() => {
        navigate("clubBoard");
      }, 1000);
    };
  }
  
  const cancelBtn = $("#clubWriteCancelBtn");
  if (cancelBtn) {
    cancelBtn.onclick = () => {
      navigate("clubBoard");
    };
  }
}

function clubBoardDetail() {
  const post = clubPosts.find(p => p.id === selectedClubPostId) || clubPosts[0];
  
  const isAuthor = post.author === "김하늘 (101동)";
  const authorActionsHtml = isAuthor ? `
    <div style="display: flex; gap: 12px; align-items: center;">
      <button id="clubPostEditBtn" style="background: none; border: 0; color: var(--sub); font-size: 12.5px; font-weight: 700; cursor: pointer;">수정</button>
      <button id="clubPostDeleteBtn" style="background: none; border: 0; color: #e15241; font-size: 12.5px; font-weight: 700; cursor: pointer;">삭제</button>
    </div>
  ` : "";

  const commentsHtml = (post.commentsList || []).map((c, commentIdx) => {
    const isLast = commentIdx === post.commentsList.length - 1;
    const borderStyle = isLast ? "" : "border-bottom: 1px solid var(--line);";
    return `
      <div style="padding: 12px 14px; ${borderStyle} display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11.5px;">
            <span style="font-weight: 700; color: var(--ink);">${c.author}</span>
            <span style="color: var(--sub); font-weight: 500;">${c.time}</span>
          </div>
          <div style="font-size: 12px; color: var(--ink); line-height: 1.4; font-weight: 500;">
            ${c.content}
          </div>
        </div>
        <button class="club-comment-delete-btn" data-index="${commentIdx}" style="background: none; border: none; color: #e15241; font-size: 11px; font-weight: 700; cursor: pointer; padding: 0 4px; white-space: nowrap; margin-top: 2px;">삭제</button>
      </div>
    `;
  }).join("");

  const commentsSection = (post.commentsList && post.commentsList.length > 0) ? `
    <div class="card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); overflow: hidden; display: flex; flex-direction: column; gap: 0;">
      ${commentsHtml}
    </div>
  ` : `
    <div class="card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); padding: 20px; text-align: center; color: var(--sub); font-size: 12px;">등록된 댓글이 없습니다. 첫 댓글을 남겨보세요!</div>
  `;

  // 소모임 게시판 목록 전체 화면 자체 구성
  const query = clubBoardSearchQuery.toLowerCase().trim();
  const filteredPosts = clubPosts.filter(p => 
    p.author.toLowerCase().includes(query) || p.content.toLowerCase().includes(query)
  );

  const postsHtml = filteredPosts.map((p, idx) => {
    const isCurrent = p.id === selectedClubPostId;
    const currentStyle = isCurrent ? "background: var(--cream); font-weight: 700;" : "";
    const isLast = idx === filteredPosts.length - 1;
    const borderStyle = isLast ? "" : "border-bottom: 1px solid var(--line);";
    return `
      <div class="club-board-post-item" data-id="${p.id}" style="padding: 16px; ${borderStyle} display: flex; flex-direction: column; gap: 8px; cursor: pointer; ${currentStyle}">
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12.5px;">
          <span style="font-weight: 700; color: var(--ink);">${p.author}</span>
          <span style="color: var(--sub); font-weight: 500;">${p.time}</span>
        </div>
        <div style="font-size: 13px; color: var(--ink); line-height: 1.5; font-weight: 500;">
          ${p.content}
        </div>
        <div style="display: flex; justify-content: flex-end; font-size: 12.5px; font-weight: 700; color: var(--muted); margin-top: 4px;">
          [${p.comments}]
        </div>
      </div>
    `;
  }).join("");

  const postsListSection = filteredPosts.length > 0 ? `
    <div class="card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); overflow: hidden; display: flex; flex-direction: column; gap: 0;">
      ${postsHtml}
    </div>
  ` : `
    <div class="card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); padding: 20px; text-align: center; color: var(--sub); font-size: 12px;">검색 결과가 없습니다.</div>
  `;

  return simplePage("게시글 상세", "소모임 게시판 게시글을 확인하세요.", `
    <!-- 게시글 상세 카드 -->
    <div class="card" style="padding: 20px; border-radius: 12px; border: 1px solid var(--line); box-shadow: var(--shadow); margin-bottom: 24px; display: flex; flex-direction: column; gap: 14px;">
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12.5px;">
        <div style="font-size: 12.5px;">
          <span style="font-weight: 700; color: var(--ink);">${post.author}</span>
          <span style="color: var(--sub); font-weight: 500; margin-left: 8px;">${post.time}</span>
        </div>
      </div>
      
      <!-- 구분 실선 -->
      <div style="border-top: 1px solid var(--line);"></div>
      
      <div style="font-size: 13.5px; color: var(--ink); line-height: 1.6; font-weight: 500; min-height: 80px; white-space: pre-wrap; word-break: break-all; text-align: left;">${post.content}</div>
      
      <!-- 첨부 파일 영역 -->
      <div style="border-top: 1px solid var(--line); padding-top: 12px;">
        <div style="font-size: 11px; font-weight: 700; color: var(--sub); margin-bottom: 8px;">첨부 파일</div>
        <div class="card club-file-box" style="padding: 10px 12px; display: flex; align-items: center; gap: 8px; cursor: pointer; border-radius: 8px; border: 1px solid var(--line); background: #faf8f5;">
          <span style="font-size: 14px;">📎</span>
          <span style="font-size: 12px; font-weight: 600; color: var(--ink); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">러닝팁_가이드라인.pdf</span>
          <span style="font-size: 10.5px; color: var(--sub); font-weight: 600; flex-shrink: 0;">(450KB)</span>
        </div>
      </div>
      
      ${authorActionsHtml ? `<div style="border-top: 1px solid var(--line); padding-top: 12px; display: flex; justify-content: flex-end;">${authorActionsHtml}</div>` : ""}
    </div>

    <!-- 댓글 영역 타이틀 -->
    <div class="section-head" style="margin-bottom: 12px;">
      <h2>댓글 [ ${post.commentsList ? post.commentsList.length : 0} ]</h2>
    </div>

    <!-- 댓글 목록 -->
    ${commentsSection}

    <!-- 댓글 등록 폼 -->
    <div style="display: flex; gap: 8px; margin-top: 14px; margin-bottom: 24px;">
      <input type="text" id="clubCommentInput" placeholder="댓글을 입력해 주세요." style="flex: 1; border: 1px solid var(--line); background: #ffffff; padding: 10px 12px; border-radius: 8px; font-size: 12.5px; outline: none; font-weight: 500; color: var(--ink);">
      <button id="clubCommentSubmitBtn" style="padding: 10px 18px; font-weight: 700; font-size: 12.5px; background: var(--dark) !important; border-radius: 8px; color: #ffffff; border: 0; cursor: pointer; transition: all 0.2s ease;">등록</button>
    </div>

    <!-- 소모임 게시판 목록 전체 화면 그대로 노출 -->
    <div style="margin-top: 32px; border-top: 2px solid var(--line); padding-top: 24px;">
      ${postsListSection}

      <!-- 페이징 및 우측 글쓰기 버튼 영역 -->
      <div style="display: flex; justify-content: center; align-items: center; margin-top: 12px; position: relative; min-height: 38px;">
        <div class="meeting-pagination" style="display: flex; align-items: center; gap: 12px;">
          <button class="page-arrow" style="background: none; border: none; font-size: 12px; color: var(--sub); cursor: pointer;" onclick="toast('마지막 페이지입니다.')">◀</button>
          <span class="page-num" style="font-size: 13px; font-weight: 700; color: var(--ink);">1</span>
          <button class="page-arrow" style="background: none; border: none; font-size: 12px; color: var(--sub); cursor: pointer;" onclick="toast('마지막 페이지입니다.')">▶</button>
        </div>
        <button id="clubBoardWriteBtn" style="position: absolute; right: 0; padding: 10px 18px; font-weight: 700; font-size: 12.5px; background: var(--dark) !important; border-radius: 8px; color: #ffffff; cursor: pointer; transition: all 0.2s ease;">글쓰기</button>
      </div>

      <!-- 검색바 -->
      <div style="margin-top: 12px; position: relative;">
        <input type="text" id="clubBoardSearchInput" placeholder="게시판 내 검색" value="${clubBoardSearchQuery}" style="width: 100%; border: 1px solid var(--line); background: #ffffff; border-radius: 12px; padding: 14px 16px; outline: 0; font-size: 13px; box-shadow: var(--shadow);">
      </div>

      <button class="secondary" id="backToClubDetailBtn" style="width: 100%; margin-top: 16px; border: 1px solid var(--line) !important; background: var(--cream) !important; border-radius: 12px; padding: 12px 10px; font-weight: 700;">소모임 정보로 돌아가기</button>
    </div>
  `);
}

function bindClubBoardDetailEvents() {
  const fileBox = $(".club-file-box");
  if (fileBox) {
    fileBox.onclick = () => {
      toast("첨부파일을 다운로드합니다.");
    };
  }

  const commentBtn = $("#clubCommentSubmitBtn");
  if (commentBtn) {
    commentBtn.onclick = () => {
      const input = $("#clubCommentInput");
      const content = input.value.trim();
      if (!content) {
        toast("댓글 내용을 입력해 주세요.");
        return;
      }

      const post = clubPosts.find(p => p.id === selectedClubPostId);
      if (post) {
        if (!post.commentsList) post.commentsList = [];
        post.commentsList.push({
          author: "김하늘 (101동)",
          time: "방금 전",
          content: content
        });
        post.comments = post.commentsList.length;

        // 댓글이 달리면 UI 갱신
        $("#app").innerHTML = clubBoardDetail();
        bindClubBoardDetailEvents();
        toast("댓글이 등록되었습니다. 🎉");
      }
    };
  }

  const editBtn = $("#clubPostEditBtn");
  if (editBtn) {
    editBtn.onclick = () => {
      navigate("clubBoardEdit");
    };
  }

  const deleteBtn = $("#clubPostDeleteBtn");
  if (deleteBtn) {
    deleteBtn.onclick = () => {
      if (confirm("정말 이 게시글을 삭제하시겠습니까?")) {
        clubPosts = clubPosts.filter(p => p.id !== selectedClubPostId);
        toast("게시글이 삭제되었습니다.");
        setTimeout(() => {
          navigate("clubBoard");
        }, 1000);
      }
    };
  }

  const backBtn = $("#backToClubBoardBtn");
  if (backBtn) {
    backBtn.onclick = () => {
      navigate("clubBoard");
    };
  }

  const backToClubDetailBtn = $("#backToClubDetailBtn");
  if (backToClubDetailBtn) {
    backToClubDetailBtn.onclick = () => {
      navigate("clubDetail");
    };
  }

  // 소모임 게시판 목록의 이벤트 바인딩 호출
  bindClubBoardEvents();

  // 하단 소모임 게시판 목록 아이템 클릭 시, 상세 보기 이동 및 새로고침 오버라이드
  $$(".club-board-post-item").forEach(item => {
    item.onclick = () => {
      selectedClubPostId = parseInt(item.dataset.id);
      $("#app").innerHTML = clubBoardDetail();
      bindClubBoardDetailEvents();
      window.scrollTo(0, 0);
    };
  });

  // 댓글 삭제 클릭 바인딩
  $$(".club-comment-delete-btn").forEach(btn => {
    btn.onclick = () => {
      const commentIdx = parseInt(btn.dataset.index);
      const post = clubPosts.find(p => p.id === selectedClubPostId);
      if (post && post.commentsList) {
        if (confirm("댓글을 삭제하시겠습니까?")) {
          post.commentsList.splice(commentIdx, 1);
          post.comments = post.commentsList.length;
          toast("댓글이 삭제되었습니다.");
          $("#app").innerHTML = clubBoardDetail();
          bindClubBoardDetailEvents();
        }
      }
    };
  });
}

function clubNoticeDetail() {
  const item = clubNoticesData.find(n => n.id === currentClubNoticeId) || clubNoticesData[0];
  const listHtml = clubNoticesData.map((n, idx) => {
    const isCurrent = n.id === currentClubNoticeId;
    const currentStyle = isCurrent ? "background: var(--cream); font-weight: 700;" : "";
    return `
      <div class="club-notice-row-item" data-id="${n.id}" style="display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-bottom: ${idx === clubNoticesData.length - 1 ? 'none' : '1px solid var(--line)'}; cursor: pointer; transition: background 0.2s ease; gap: 16px; ${currentStyle}">
        <span style="font-size: 13px; color: var(--ink); text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${n.title}
        </span>
        <span class="date" style="font-size: 11.5px; color: var(--sub); font-weight: 500; text-align: right; flex-shrink: 0; min-width: 60px;">${n.date.slice(2)}</span>
      </div>
    `;
  }).join("");

  const emptyHtml = `<div style="padding: 40px 16px; text-align: center; color: var(--sub); font-size: 13px; font-weight: 500;">공지사항이 없습니다.</div>`;

  return simplePage("소모임 공지사항", "", `
    <div class="meeting-detail-container">
      <!-- 상세 본문 영역 -->
      <div class="card info-content-box" style="padding: 16px; border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <div style="font-size: 14px; font-weight: 700; color: var(--ink); line-height: 1.4;">${item.title}</div>
          <div style="display: flex; justify-content: flex-end; font-size: 11px; color: var(--sub); font-weight: 500; margin-top: 4px;">
            러닝장장 (방장) | ${item.date}
          </div>
        </div>
        
        <!-- 구분 실선 -->
        <div style="border-top: 1px solid var(--line);"></div>
        
        <div style="line-height: 1.6; font-size: 13px; white-space: pre-wrap; word-break: break-all; color: var(--ink); font-weight: 500; text-align: left;">${item.content}</div>
        
        <!-- 첨부 파일 영역 -->
        <div style="border-top: 1px solid var(--line); margin-top: 12px; padding-top: 12px;">
          <div style="font-size: 11px; font-weight: 700; color: var(--sub); margin-bottom: 8px;">첨부 파일</div>
          <div class="card club-notice-file-box" style="padding: 10px 12px; display: flex; align-items: center; gap: 8px; cursor: pointer; border-radius: 8px; border: 1px solid var(--line); background: #faf8f5;">
            <span style="font-size: 14px;">📎</span>
            <span style="font-size: 12px; font-weight: 600; color: var(--ink); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.title.replace(/\(.*\)\s*/, "")}_안내문.pdf</span>
            <span style="font-size: 10.5px; color: var(--sub); font-weight: 600; flex-shrink: 0;">(640KB)</span>
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 10px; margin-bottom: 24px;">
        <button id="backToClubDetailFromNoticeBtn" style="flex: 1; padding: 12px; font-weight: 700; font-size: 13px; border: 1px solid var(--line) !important; background: var(--cream) !important; border-radius: 8px; color: var(--ink); cursor: pointer;">소모임 메인으로</button>
      </div>

      <!-- 소모임 공지 목록 화면 전체가 그대로 노출 -->
      <div style="margin-top: 32px; border-top: 2px solid var(--line); padding-top: 24px;">
        <div class="meeting-section-box" style="margin-top: 10px;">
          <div class="meeting-list-card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); overflow: hidden;">
            ${clubNoticesData.length > 0 ? listHtml : emptyHtml}
          </div>
        </div>
      </div>
    </div>
  `);
}

function bindClubNoticeDetailEvents() {
  const fileBox = $(".club-notice-file-box");
  if (fileBox) {
    fileBox.onclick = () => {
      toast("소모임 공지사항 첨부파일을 다운로드합니다.");
    };
  }

  const backBtn = $("#backToClubDetailFromNoticeBtn");
  if (backBtn) {
    backBtn.onclick = () => {
      navigate("clubDetail");
    };
  }

  // 하단 공지사항 목록 아이템 클릭 오버라이드
  $$(".club-notice-row-item").forEach(item => {
    item.onclick = () => {
      currentClubNoticeId = parseInt(item.dataset.id);
      $("#app").innerHTML = clubNoticeDetail();
      bindClubNoticeDetailEvents();
      window.scrollTo(0, 0);
    };
  });
}

function clubBoardEdit() {
  const post = clubPosts.find(p => p.id === selectedClubPostId) || clubPosts[0];
  return simplePage("글 수정", "게시글 내용을 수정합니다.", `
    <div class="card form-card" style="padding: 20px; border-radius: 12px; border: 1px solid var(--line); box-shadow: var(--shadow);">
      <div class="field" style="margin-bottom: 16px;">
        <label style="display: block; font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 6px;">작성자</label>
        <input type="text" id="clubEditAuthor" value="${post.author}" style="width: 100%; border: 1px solid var(--line); background: #ffffff; padding: 10px 12px; border-radius: 8px; font-size: 13px; outline: none; font-weight: 500;" readonly>
      </div>
      
      <div class="field" style="margin-bottom: 20px;">
        <label style="display: block; font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 6px;">내용</label>
        <textarea id="clubEditContent" placeholder="모임원들과 나누고 싶은 이야기를 입력해 주세요." style="width: 100%; height: 180px; border: 1px solid var(--line); border-radius: 8px; padding: 12px; font-size: 13px; outline: none; resize: none; line-height: 1.6; font-family: inherit; font-weight: 500;">${post.content}</textarea>
      </div>
      
      <div style="display: flex; gap: 10px;">
        <button class="primary" id="clubEditSubmitBtn" style="flex: 1; padding: 12px; font-weight: 700; font-size: 13.5px; background: var(--dark) !important; border-radius: 8px; color: #ffffff;">수정 완료</button>
        <button class="secondary" id="clubEditCancelBtn" style="flex: 1; padding: 12px; font-weight: 700; font-size: 13.5px; border: 1px solid var(--line) !important; background: var(--cream) !important; border-radius: 8px; color: var(--ink);">취소</button>
      </div>
    </div>
  `);
}

function bindClubBoardEditEvents() {
  const submitBtn = $("#clubEditSubmitBtn");
  if (submitBtn) {
    submitBtn.onclick = () => {
      const content = $("#clubEditContent").value.trim();
      
      if (!content) {
        toast("내용을 입력해 주세요.");
        return;
      }
      
      const post = clubPosts.find(p => p.id === selectedClubPostId);
      if (post) {
        post.content = content;
        toast("게시글이 수정되었습니다. 🎉");
        
        setTimeout(() => {
          navigate("clubBoardDetail");
        }, 1000);
      }
    };
  }
  
  const cancelBtn = $("#clubEditCancelBtn");
  if (cancelBtn) {
    cancelBtn.onclick = () => {
      navigate("clubBoardDetail");
    };
  }
}

let deviceState = {
  livingLight: true,
  ac: false,
  gas: true, // safe
  kitchenLight: false,
  door: true
};

function control() {
  const devices = [
    { id: "livingLight", iconName: "bulb", name: "거실 조명", desc: deviceState.livingLight ? "켜짐" : "꺼짐", on: deviceState.livingLight },
    { id: "ac", iconName: "air-conditioner", name: "에어컨", desc: deviceState.ac ? "쾌적 냉방 · 23℃" : "꺼짐", on: deviceState.ac },
    { id: "gas", iconName: "flame", name: "가스 밸브", desc: deviceState.gas ? "안전하게 잠김" : "열림", on: !deviceState.gas }
  ];
  
  const listHtml = devices.map(d => `
    <div class="menu-row">
      <span>${icon(d.iconName)}</span>
      <span>
        <b>${d.name}</b>
        <small id="${d.id}Desc">${d.desc}</small>
      </span>
      <button class="switch ${d.on ? "on" : ""}" id="${d.id}Switch" data-toggle style="margin-left: auto;"></button>
    </div>
  `).join("");

  return simplePage("스마트홈 제어", "집 안 상태를 한눈에 확인하고 제어해요.", `
    <div class="card list-card" style="margin-bottom: 24px;">${listHtml}</div>
    <div class="section-head"><h2>간편 모드</h2></div>
    <div class="summary-grid">
      <button class="card summary-card mode" id="modeOutBtn">
        <div class="visual">${icon("moon")}</div>
        <h3>외출 모드</h3>
        <p>전원과 가스를 한 번에</p>
      </button>
      <button class="card summary-card mode" id="modeInBtn">
        <div class="visual">${icon("home")}</div>
        <h3>귀가 모드</h3>
        <p>조명과 냉방을 쾌적하게</p>
      </button>
    </div>
  `);
}

function bindControlEvents() {
  const livingLightSwitch = $("#livingLightSwitch");
  const livingLightDesc = $("#livingLightDesc");
  if (livingLightSwitch) {
    livingLightSwitch.onclick = () => {
      deviceState.livingLight = !deviceState.livingLight;
      livingLightSwitch.classList.toggle("on", deviceState.livingLight);
      if (livingLightDesc) livingLightDesc.textContent = deviceState.livingLight ? "켜짐" : "꺼짐";
      toast(deviceState.livingLight ? "거실 조명을 켰습니다." : "거실 조명을 껐습니다.");
    };
  }
  
  const acSwitch = $("#acSwitch");
  const acDesc = $("#acDesc");
  if (acSwitch) {
    acSwitch.onclick = () => {
      deviceState.ac = !deviceState.ac;
      acSwitch.classList.toggle("on", deviceState.ac);
      if (acDesc) acDesc.textContent = deviceState.ac ? "쾌적 냉방 · 23℃" : "꺼짐";
      toast(deviceState.ac ? "에어컨 전원을 켰습니다." : "에어컨 전원을 껐습니다.");
    };
  }
  
  const gasSwitch = $("#gasSwitch");
  const gasDesc = $("#gasDesc");
  if (gasSwitch) {
    gasSwitch.onclick = () => {
      deviceState.gas = !deviceState.gas;
      const isSwitchOn = !deviceState.gas;
      gasSwitch.classList.toggle("on", isSwitchOn);
      if (gasDesc) gasDesc.textContent = deviceState.gas ? "안전하게 잠김" : "열림";
      toast(deviceState.gas ? "가스 밸브를 잠갔습니다 (안전)." : "가스 밸브를 열었습니다.");
    };
  }
  
  const modeOutBtn = $("#modeOutBtn");
  if (modeOutBtn) {
    modeOutBtn.onclick = () => {
      deviceState.livingLight = false;
      deviceState.ac = false;
      deviceState.gas = true; // safe
      toast("외출 모드를 실행했습니다.");
      $("#app").innerHTML = control();
      bindControlEvents();
    };
  }
  
  const modeInBtn = $("#modeInBtn");
  if (modeInBtn) {
    modeInBtn.onclick = () => {
      deviceState.livingLight = true;
      deviceState.ac = true;
      deviceState.gas = false; // open
      toast("귀가 모드를 실행했습니다.");
      $("#app").innerHTML = control();
      bindControlEvents();
    };
  }
}

function my(){return `<section class="page">${pageTitle("마이","우리 집과 내 활동을 관리해요.")}
  <div class="card report-card"><h3>김하늘</h3><p>101동 1302호 · 입주자</p><span class="status">인증 완료</span></div>
  <div class="section-head"><h2>나의 이용 내역</h2></div><div class="card list-card">${menuRow(icon("tools"),"내 민원","전체 접수 내역","complaint")}${menuRow(icon("calendar"),"내 예약","예정된 예약 2건","reservation")}${menuRow(icon("car-side"),"내 방문차량","등록 차량 관리","visitor")}${menuRow(icon("settings"),"알림 및 설정","앱 환경 설정","settings")}</div></section>`}

function simplePage(title,sub,body){return `<section class="page">${pageTitle(title,sub)}${body}</section>`}

function formatReservedTimes(timeArray) {
  if (!timeArray || timeArray.length === 0) return "";
  const sorted = [...timeArray].sort();
  const hours = sorted.map(t => parseInt(t.split(":")[0]));
  const intervals = [];
  let start = hours[0];
  let prev = hours[0];
  
  for (let i = 1; i < hours.length; i++) {
    if (hours[i] === prev + 1) {
      prev = hours[i];
    } else {
      intervals.push([start, prev + 1]);
      start = hours[i];
      prev = hours[i];
    }
  }
  intervals.push([start, prev + 1]);
  
  return intervals.map(interval => {
    const sStr = String(interval[0]).padStart(2, '0') + ":00";
    const eStr = String(interval[1]).padStart(2, '0') + ":00";
    return `${sStr} ~ ${eStr}`;
  }).join(", ");
}

let reservState = {
  facility: "회의실A",
  date: "2026-06-26",
  time: []
};

const facilities = {
  "회의실A": { maxHours: "최대 3시간", location: "커뮤니티 센터 1층", price: "시간당 5,000원", reserved: ["11:00", "14:00", "15:00"] },
  "회의실B": { maxHours: "최대 3시간", location: "커뮤니티 센터 1층", price: "시간당 5,000원", reserved: ["10:00", "13:00", "16:00"] },
  "골프룸A": { maxHours: "최대 2시간", location: "스포츠 센터 B1층", price: "시간당 15,000원", reserved: ["09:00", "10:00", "19:00", "20:00"] },
  "골프룸B": { maxHours: "최대 2시간", location: "스포츠 센터 B1층", price: "시간당 15,000원", reserved: ["11:00", "15:00", "18:00"] }
};

function getDayOfWeekStr(dateStr) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const parts = dateStr.split('-');
  const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  return days[d.getDay()];
}

function getReservationDates() {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const list = [];
  const base = new Date(2026, 5, 26); // 2026-06-26
  for (let i = 0; i <= 4; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    list.push({
      date: dateStr,
      dayNum: d.getDate(),
      dayName: days[d.getDay()],
      dayIdx: d.getDay()
    });
  }
  return list;
}

function reservation() {
  const dates = getReservationDates();
  const fac = facilities[reservState.facility];
  
  const chipHtml = Object.keys(facilities).map(name => 
    `<button class="chip fac-chip ${reservState.facility === name ? "active" : ""}" data-fac="${name}">${name}</button>`
  ).join("");
  
  const dateHtml = dates.map(d => {
    let dayClass = "";
    if (d.dayIdx === 0) dayClass = "sun";
    else if (d.dayIdx === 6) dayClass = "sat";
    return `<button class="date-chip ${reservState.date === d.date ? "active" : ""}" data-date="${d.date}">
      <span class="day-name ${dayClass}">${d.dayName}</span>
      <span class="day-num">${d.dayNum}</span>
    </button>`;
  }).join("");
  
  const times = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
  ];
  
  const timeHtml = times.map(t => {
    const isReserved = fac.reserved.includes(t);
    const isSelected = Array.isArray(reservState.time) && reservState.time.includes(t);
    const disabledAttr = isReserved ? "disabled" : "";
    const activeClass = isSelected ? "active" : "";
    const reservedClass = isReserved ? "reserved" : "";
    
    return `<button class="time-slot ${activeClass} ${reservedClass}" ${disabledAttr} data-time="${t}">
      ${t}
    </button>`;
  }).join("");
  
  return simplePage("시설예약", "원하는 시설과 시간을 선택하세요.", `
    <div class="chips">${chipHtml}</div>
    <div class="card form-card reservation-card">
      <div class="field">
        <label>시설 정보</label>
        <div class="facility-info-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: var(--cream); padding: 14px; border-radius: 8px; margin-bottom: 8px; font-size: 12px; border: 1px solid var(--line);">
          <div>📍 <b>위치:</b> ${fac.location}</div>
          <div>💰 <b>이용료:</b> ${fac.price}</div>
        </div>
        <div class="facility-limit-text" id="facilityLimitText" style="font-size: 11px; color: var(--sub);">ℹ️ 예약 제한: <b>${fac.maxHours}</b></div>
      </div>
      <div class="field">
        <label>예약일 <span class="sub-label">(오늘부터 4일 뒤까지만 선택 가능)</span></label>
        <div class="date-chips-container">${dateHtml}</div>
      </div>
      <div class="field">
        <label>이용 시간 <span class="sub-label">(타임테이블)</span></label>
        <div class="time-timetable">${timeHtml}</div>
      </div>
      <button class="primary action-reserve" id="reserveSubmitButton">예약하기</button>
      <button class="secondary" id="viewBookingsButton" style="width:100%; margin-top: 12px; border: 1px solid var(--line) !important; background: var(--cream) !important; border-radius: 12px; padding: 12px 10px; font-weight: 700;">예약 내역 보기</button>
    </div>
  `);
}

function bindReservationEvents() {
  $$(".fac-chip").forEach(b => b.onclick = () => {
    reservState.facility = b.dataset.fac;
    reservState.time = [];
    $("#app").innerHTML = reservation();
    bindReservationEvents();
  });
  
  $$(".date-chip").forEach(b => b.onclick = () => {
    reservState.date = b.dataset.date;
    reservState.time = [];
    $("#app").innerHTML = reservation();
    bindReservationEvents();
  });
  
  $$(".time-slot:not([disabled])").forEach(b => b.onclick = () => {
    const selectedTime = b.dataset.time;
    if (!Array.isArray(reservState.time)) {
      reservState.time = [];
    }
    const idx = reservState.time.indexOf(selectedTime);
    const fac = facilities[reservState.facility];
    const maxH = parseInt(fac.maxHours.replace(/[^0-9]/g, ''));
    
    if (idx > -1) {
      reservState.time.splice(idx, 1);
      b.classList.remove("active");
    } else {
      if (reservState.time.length >= maxH) {
        toast(`이 시설은 하루 최대 ${maxH}시간까지 예약할 수 있습니다.`);
        return;
      }
      reservState.time.push(selectedTime);
      b.classList.add("active");
    }
  });
  
  const submitBtn = $("#reserveSubmitButton");
  if (submitBtn) {
    submitBtn.onclick = () => {
      if (!reservState.time || reservState.time.length === 0) {
        toast("이용 시간을 선택해 주세요.");
        return;
      }
      
      const dateParts = reservState.date.split('-');
      const month = parseInt(dateParts[1]);
      const dateNum = parseInt(dateParts[2]);
      const dayName = getDayOfWeekStr(reservState.date);
      
      const formattedTimes = formatReservedTimes(reservState.time);
      
      const newBooking = {
        id: Date.now(),
        facility: reservState.facility,
        iconName: reservState.facility.startsWith("회의실") ? "calendar" : "golf-ball",
        status: "upcoming",
        statusText: "이용 예정",
        dateText: `${month}월 ${dateNum}일 (${dayName}) ${formattedTimes}`,
        people: reservState.facility.startsWith("회의실") ? "4명" : null,
        hasActions: true
      };
      
      bookings.unshift(newBooking);
      facilities[reservState.facility].reserved.push(...reservState.time);
      
      toast(`${reservState.facility} 예약이 완료됐어요. (${reservState.date} ${formattedTimes})`);
      reservState.time = [];
      setTimeout(() => {
        navigate("bookingList");
      }, 1500);
    };
  }

  const viewBtn = $("#viewBookingsButton");
  if (viewBtn) {
    viewBtn.onclick = () => {
      navigate("bookingList");
    };
  }
}

let bookings = [
  {
    id: 1,
    facility: "회의실A",
    iconName: "calendar",
    status: "upcoming",
    statusText: "이용 예정",
    dateText: "6월 28일 (일) 14:00 ~ 15:00",
    people: "4명",
    hasActions: true
  },
  {
    id: 2,
    facility: "골프룸A",
    iconName: "golf-ball",
    status: "completed",
    statusText: "이용 완료",
    dateText: "6월 25일 (목) 09:00 ~ 11:00",
    people: null,
    hasActions: false
  },
  {
    id: 3,
    facility: "골프룸B",
    iconName: "golf-ball",
    status: "cancelled",
    statusText: "취소됨",
    dateText: "6월 20일 (토) 18:00 ~ 20:00",
    people: null,
    hasActions: false
  }
];

let currentFilter = "all";

function bookingList() {
  const filterOptions = [
    { value: "all", label: "전체 ▼" },
    { value: "upcoming", label: "이용 예정" },
    { value: "completed_cancelled", label: "이용 완료/취소" }
  ];
  
  const filterHtml = filterOptions.map(opt => 
    `<button class="filter-chip ${currentFilter === opt.value ? "active" : ""}" data-filter="${opt.value}">${opt.label}</button>`
  ).join("");
  
  let filteredBookings = bookings;
  if (currentFilter === "upcoming") {
    filteredBookings = bookings.filter(b => b.status === "upcoming");
  } else if (currentFilter === "completed_cancelled") {
    filteredBookings = bookings.filter(b => b.status === "completed" || b.status === "cancelled");
  }
  
  const listHtml = filteredBookings.map(b => {
    let statusClass = b.status;
    let actionButtons = "";
    
    if (b.status === "upcoming" && b.hasActions) {
      actionButtons = `
        <div class="booking-card-actions">
          <button class="primary action-qr" data-id="${b.id}">스마트키 (QR)</button>
          <button class="secondary action-cancel" data-id="${b.id}">예약 취소</button>
        </div>
      `;
    }
    
    return `
      <div class="card booking-item-card" data-status="${b.status}">
        <div class="booking-card-head">
          <h3>${icon(b.iconName)} ${b.facility}</h3>
          <span class="booking-status-tag ${statusClass}">${b.statusText}</span>
        </div>
        <div class="booking-card-body">
          <div class="booking-detail-row">
            <span class="dot">•</span>
            <span class="label">예약 일시 :</span>
            <span class="value">${b.dateText}</span>
          </div>
          ${b.people ? `
          <div class="booking-detail-row">
            <span class="dot">•</span>
            <span class="label">이용 인원 :</span>
            <span class="value">${b.people}</span>
          </div>
          ` : ""}
        </div>
        ${actionButtons}
      </div>
    `;
  }).join("");
  
  const emptyHtml = `<div class="card booking-empty"><p>예약 내역이 없습니다.</p></div>`;
  
  return simplePage("예약 내역", "신청하신 예약 목록입니다.", `
    <div class="booking-filter-row">
      <span class="filter-label">필터</span>
      <div class="filter-chips-container">${filterHtml}</div>
    </div>
    <div class="booking-list-container">
      ${filteredBookings.length > 0 ? listHtml : emptyHtml}
    </div>
    <button class="primary" id="backToReservation" style="width:100%; margin-top:20px; background:var(--dark) !important;">시설 예약하기</button>
  `);
}

function bindBookingListEvents() {
  $$(".filter-chip").forEach(b => b.onclick = () => {
    currentFilter = b.dataset.filter;
    $("#app").innerHTML = bookingList();
    bindBookingListEvents();
  });
  
  $$(".action-qr").forEach(b => b.onclick = () => {
    const id = parseInt(b.dataset.id);
    const bk = bookings.find(x => x.id === id);
    openModal(`
      <div class="qr-modal-content">
        <h2>스마트키 (QR)</h2>
        <p class="qr-subtitle">${bk.facility}</p>
        <div class="qr-container">
          <div class="qr-code-graphic">
            <i class="fi fi-rr-qr-code" style="font-size: 110px; color: var(--ink);"></i>
          </div>
        </div>
        <p class="qr-info-text">리더기에 QR코드를 접촉해 주세요.</p>
        <button class="primary" onclick="closeModal()" style="width:100%; margin-top: 15px;">닫기</button>
      </div>
    `);
  });
  
  $$(".action-cancel").forEach(b => b.onclick = () => {
    const id = parseInt(b.dataset.id);
    const bk = bookings.find(x => x.id === id);
    
    openModal(`
      <div class="confirm-modal-content">
        <h2>예약 취소</h2>
        <p>정말로 <b>${bk.facility}</b> 예약을 취소하시겠습니까?</p>
        <div style="display:flex; gap:10px; margin-top:20px;">
          <button class="primary" id="confirmCancelButton" style="flex:1; background:#d64545 !important;">네, 취소합니다</button>
          <button class="secondary" onclick="closeModal()" style="flex:1;">아니오</button>
        </div>
      </div>
    `);
    
    const confirmBtn = $("#confirmCancelButton");
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        bk.status = "cancelled";
        bk.statusText = "취소됨";
        bk.hasActions = false;
        closeModal();
        toast("예약이 취소되었습니다.");
        $("#app").innerHTML = bookingList();
        bindBookingListEvents();
      };
    }
  });
  
  const backBtn = $("#backToReservation");
  if (backBtn) {
    backBtn.onclick = () => {
      navigate("reservation");
    };
  }
}

let favoriteVehicles = [
  { id: 1, carNum: "34오 8912", purpose: "가족 방문 (부모님)" },
  { id: 2, carNum: "72가 4567", purpose: "가재도구 정기배송" },
  { id: 3, carNum: "18다 9012", purpose: "친지 방문 (동생)" }
];

let visitorVehicles = [
  {
    id: 1,
    carNum: "123가 4567",
    status: "scheduled",
    statusText: "방문 예정",
    detailLabel: "방문 일자",
    detailValue: "6월 26일 (오늘)",
    hasActions: true,
    actionType: "cancel"
  },
  {
    id: 2,
    carNum: "98무 1234",
    status: "parking",
    statusText: "주차 중",
    detailLabel: "입차 시간",
    detailValue: "6월 25일 14:20",
    hasActions: false,
    actionType: null
  },
  {
    id: 3,
    carNum: "55다 9999",
    status: "exited",
    statusText: "출차 완료",
    detailLabel: "방문 일자",
    detailValue: "6월 20일",
    hasActions: true,
    actionType: "re-register"
  }
];

function visitor() {
  return simplePage("방문차량 등록", "방문객 차량을 미리 등록해요.", `
    <div style="position: relative;">
      <button id="favoriteVehiclesBtn" style="position: absolute; right: 0; top: -56px; padding: 7px 12px; background: var(--cream) !important; border: 1px solid var(--line); border-radius: 8px; font-size: 11.5px; font-weight: 700; color: var(--ink); cursor: pointer; transition: all 0.2s ease;">우리집 단골차량</button>
    </div>
    <div class="card form-card">
      <div class="field">
        <label>차량번호</label>
        <input id="visitorCarNum" placeholder="예: 12가 3456" value="">
      </div>
      <div class="field">
        <label>방문일</label>
        <input id="visitorDate" type="date" value="2026-06-26">
      </div>
      <div class="field">
        <label>방문 목적</label>
        <input id="visitorPurpose" placeholder="예: 가족 방문" value="">
      </div>
      
      <!-- 우리집 단골차량으로 등록하기 체크박스 -->
      <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px; margin-bottom: 16px; padding-left: 2px;">
        <input type="checkbox" id="favoriteVehicleCheck" style="accent-color: var(--olive); cursor: pointer; width: 14px; height: 14px;">
        <label for="favoriteVehicleCheck" style="font-size: 12px; font-weight: 700; color: var(--sub); cursor: pointer; user-select: none;">우리집 단골차량으로 등록하기</label>
      </div>

      <button class="primary" id="visitorSubmitButton">등록하기</button>
      <button class="secondary" id="viewVisitorsButton" style="width:100%; margin-top: 12px; border: 1px solid var(--line) !important; background: var(--cream) !important; border-radius: 12px; padding: 12px 10px; font-weight: 700;">등록 내역 보기</button>
    </div>
  `);
}

function bindVisitorEvents() {
  const submitBtn = $("#visitorSubmitButton");
  if (submitBtn) {
    submitBtn.onclick = () => {
      const carNum = $("#visitorCarNum").value.trim();
      const dateVal = $("#visitorDate").value;
      const purpose = $("#visitorPurpose").value.trim();
      
      if (!carNum) {
        toast("차량번호를 입력해 주세요.");
        return;
      }
      
      let displayDate = "";
      if (dateVal) {
        const parts = dateVal.split("-");
        const m = parseInt(parts[1]);
        const d = parseInt(parts[2]);
        displayDate = `${m}월 ${d}일`;
        if (dateVal === "2026-06-26") {
          displayDate += " (오늘)";
        }
      } else {
        displayDate = "오늘";
      }
      
      const newVehicle = {
        id: Date.now(),
        carNum: carNum,
        status: "scheduled",
        statusText: "방문 예정",
        detailLabel: "방문 일자",
        detailValue: displayDate,
        hasActions: true,
        actionType: "cancel"
      };

      // 자주 방문하는 차량 체크박스 여부 확인
      const isFavCheck = $("#favoriteVehicleCheck");
      if (isFavCheck && isFavCheck.checked) {
        const exists = favoriteVehicles.some(f => f.carNum === carNum);
        if (!exists) {
          favoriteVehicles.unshift({
            id: Date.now(),
            carNum: carNum,
            purpose: purpose || "일반 방문"
          });
        }
      }
      
      visitorVehicles.unshift(newVehicle);
      toast(`방문차량 ${carNum} 등록이 완료됐어요.`);
      
      setTimeout(() => {
        navigate("visitorList");
      }, 1500);
    };
  }

  // 우리집 단골차량 버튼 및 모달 팝업 연동
  const favVehiclesBtn = $("#favoriteVehiclesBtn");
  if (favVehiclesBtn) {
    favVehiclesBtn.onclick = () => {
      const favListHtml = favoriteVehicles.length > 0 ? favoriteVehicles.map((fav, idx) => `
        <div class="fav-vehicle-row" data-car="${fav.carNum}" data-purpose="${fav.purpose}" style="padding: 14px 16px; border-bottom: ${idx === favoriteVehicles.length - 1 ? 'none' : '1px solid var(--line)'}; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: background 0.2s ease;">
          <span style="font-size: 13.5px; font-weight: 700; color: var(--ink);">${fav.carNum}</span>
          <span style="font-size: 11.5px; color: var(--sub); font-weight: 500;">${fav.purpose}</span>
        </div>
      `).join("") : `<div style="padding: 24px; text-align: center; color: var(--sub); font-size: 12.5px;">등록된 단골차량이 없습니다.</div>`;

      openModal(`
        <h2 style="font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 16px; display: flex; align-items: center; gap: 6px;">
          <i class="fi fi-rr-car-side" style="color: var(--olive); font-size: 16px;"></i> 우리집 단골차량 선택
        </h2>
        <div class="card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); overflow: hidden; display: flex; flex-direction: column; max-height: 280px; overflow-y: auto; margin-bottom: 16px;">
          ${favListHtml}
        </div>
        <button onclick="closeModal()" style="width: 100%; padding: 12px; font-weight: 700; font-size: 13px; background: var(--dark) !important; color: #ffffff; border: none; border-radius: 8px; cursor: pointer;">닫기</button>
      `);

      // 모달 내부의 목록 클릭 시 인풋 자동 채우기 및 모달 닫기
      $$(".fav-vehicle-row").forEach(row => {
        row.onclick = () => {
          const carNumInput = $("#visitorCarNum");
          const purposeInput = $("#visitorPurpose");
          if (carNumInput) carNumInput.value = row.dataset.car;
          if (purposeInput) purposeInput.value = row.dataset.purpose;
          closeModal();
          toast(`단골차량 ${row.dataset.car}을 선택했습니다.`);
        };
      });
    };
  }
  
  const viewBtn = $("#viewVisitorsButton");
  if (viewBtn) {
    viewBtn.onclick = () => {
      navigate("visitorList");
    };
  }
}

function visitorList() {
  const listHtml = visitorVehicles.map(v => {
    let statusClass = v.status;
    let actionButtons = "";
    
    if (v.hasActions) {
      if (v.actionType === "cancel") {
        actionButtons = `
          <div class="visitor-card-actions">
            <button class="secondary action-visitor-cancel" data-id="${v.id}">등록 취소</button>
          </div>
        `;
      } else if (v.actionType === "re-register") {
        actionButtons = `
          <div class="visitor-card-actions">
            <button class="secondary action-visitor-re" data-id="${v.id}">이 번호로 같은 날짜에 재등록</button>
          </div>
        `;
      }
    }
    
    return `
      <div class="card visitor-item-card" data-status="${v.status}">
        <div class="visitor-card-head">
          <h3>${icon("car-side")} ${v.carNum}</h3>
          <span class="visitor-status-tag ${statusClass}">${v.statusText}</span>
        </div>
        <div class="visitor-card-body">
          <div class="visitor-detail-row">
            <span class="dot">•</span>
            <span class="label">${v.detailLabel} :</span>
            <span class="value">${v.detailValue}</span>
          </div>
        </div>
        ${actionButtons}
      </div>
    `;
  }).join("");
  
  const emptyHtml = `<div class="card visitor-empty"><p>등록된 방문차량이 없습니다.</p></div>`;
  
  return simplePage("방문차량 등록 내역", "신청하신 방문차량 목록입니다.", `
    <div class="visitor-list-container">
      ${visitorVehicles.length > 0 ? listHtml : emptyHtml}
    </div>
    <button class="primary" id="backToVisitor" style="width:100%; margin-top:20px; background:var(--dark) !important;">방문차량 등록하기</button>
  `);
}

function bindVisitorListEvents() {
  $$(".action-visitor-cancel").forEach(b => b.onclick = () => {
    const id = parseInt(b.dataset.id);
    const v = visitorVehicles.find(x => x.id === id);
    
    openModal(`
      <div class="confirm-modal-content">
        <h2>등록 취소</h2>
        <p>정말로 <b>${v.carNum}</b> 차량의 방문 예약을 취소하시겠습니까?</p>
        <div style="display:flex; gap:10px; margin-top:20px;">
          <button class="primary" id="confirmVisitorCancelButton" style="flex:1; background:#d64545 !important;">네, 취소합니다</button>
          <button class="secondary" onclick="closeModal()" style="flex:1;">아니오</button>
        </div>
      </div>
    `);
    
    const confirmBtn = $("#confirmVisitorCancelButton");
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        v.status = "cancelled";
        v.statusText = "취소됨";
        v.hasActions = false;
        closeModal();
        toast("등록이 취소되었습니다.");
        $("#app").innerHTML = visitorList();
        bindVisitorListEvents();
      };
    }
  });
  
  $$(".action-visitor-re").forEach(b => b.onclick = () => {
    const id = parseInt(b.dataset.id);
    const v = visitorVehicles.find(x => x.id === id);
    
    const reBooking = {
      id: Date.now(),
      carNum: v.carNum,
      status: "scheduled",
      statusText: "방문 예정",
      detailLabel: "방문 일자",
      detailValue: "6월 26일 (오늘)",
      hasActions: true,
      actionType: "cancel"
    };
    
    visitorVehicles.unshift(reBooking);
    toast(`${v.carNum} 차량이 오늘 날짜로 재등록됐어요.`);
    $("#app").innerHTML = visitorList();
    bindVisitorListEvents();
  });
  
  const backBtn = $("#backToVisitor");
  if (backBtn) {
    backBtn.onclick = () => {
      navigate("visitor");
    };
  }
}

function parking(){return simplePage("주차 현황","현재 단지에 42자리가 남아 있어요.",`<div class="summary-grid">${[["B1","8면"],["B2","18면"],["B3","16면"],["지상","0면"]].map(x=>`<div class="card summary-card"><div class="visual">P</div><h3>${x[0]}</h3><p>${x[1]} 여유</p></div>`).join("")}</div><div class="section-head"><h2>내 차 찾기</h2></div><div class="card form-card"><div class="field"><label>차량번호</label><input id="carSearch" value="12가 3456"></div><button class="primary" id="searchCar">위치 확인</button><div id="carResult"></div></div>`)}
const feeData = {};
for (let year = 2024; year <= 2026; year++) {
  const maxMonth = (year === 2026) ? 6 : 12;
  for (let m = 1; m <= maxMonth; m++) {
    const key = `${year}년 ${m}월`;
    const isCurrent = (year === 2026 && m === 6);
    const baseAmt = 200000 + ((year * 13 + m * 37) % 7) * 12000 + (m * 1500);
    const details = [
      ["전기료", `${(Math.round(baseAmt * 0.27 / 100) * 100).toLocaleString()}원`],
      ["수도료", `${(Math.round(baseAmt * 0.12 / 100) * 100).toLocaleString()}원`],
      ["난방비", m >= 11 || m <= 3 ? `${(Math.round(baseAmt * 0.18 / 100) * 100).toLocaleString()}원` : "0원"],
      ["일반관리비", `${(Math.round(baseAmt * 0.40 / 100) * 100).toLocaleString()}원`],
      ["수선유지비", `${(Math.round(baseAmt * 0.10 / 100) * 100).toLocaleString()}원`]
    ];
    let sum = details.reduce((acc, curr) => acc + parseInt(curr[1].replace(/,/g, "").replace("원", "")), 0);
    
    feeData[key] = {
      amount: sum.toLocaleString() + "원",
      status: isCurrent ? "납부 예정" : "납부 완료",
      isAutoPay: true,
      details: details
    };
  }
}
let currentFeeMonth = "2026년 6월";

function fee() {
  const data = feeData[currentFeeMonth] || {
    amount: "0원",
    status: "정보 없음",
    isAutoPay: false,
    details: []
  };
  
  const headerHtml = `
    <div class="fee-page-title">
      <h1>관리비</h1>
      <button class="fee-month-picker-btn" id="feeMonthSelectBtn">${currentFeeMonth} ▼</button>
    </div>
  `;
  const autoPayHtml = data.isAutoPay ? `<span class="fee-autopay-badge">자동이체</span>` : "";
  
  return `
    <section class="page">
      ${headerHtml}
      
      <article class="card report-card">
        <p>${currentFeeMonth.split(" ")[1]} 납부 금액</p>
        <h1 style="font-size:32px;margin:0 0 12px">${data.amount}</h1>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span class="status">${data.status}</span>
          ${autoPayHtml}
        </div>
      </article>
      <div class="section-head"><h2>항목별 상세</h2></div>
      <div class="card list-card">
        ${data.details.map(x=>`<div class="menu-row"><b>${x[0]}</b><i>${x[1]}</i></div>`).join("")}
      </div>
    </section>
  `;
}

function bindFeeEvents() {
  const selectBtn = $("#feeMonthSelectBtn");
  if (selectBtn) {
    selectBtn.onclick = () => {
      const parts = currentFeeMonth.split(" ");
      const currentYear = parseInt(parts[0].replace("년", ""));
      const currentMonth = parseInt(parts[1].replace("월", ""));
      
      openPicker(currentYear, currentMonth, (year, month) => {
        currentFeeMonth = `${year}년 ${month}월`;
        $("#app").innerHTML = fee();
        bindFeeEvents();
      });
    };
  }
}

function openPicker(selectedYear, selectedMonth, onSelect) {
  let pickerEl = document.getElementById("bottomPicker");
  if (!pickerEl) {
    pickerEl = document.createElement("div");
    pickerEl.id = "bottomPicker";
    pickerEl.className = "bottom-sheet-overlay";
    
    // Append to center panel so it fits inside the simulator window
    const container = $(".center-panel") || document.body;
    container.appendChild(pickerEl);
  }
  
  const years = [2024, 2025, 2026];
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  
  const yearItemsHtml = ["", "", ...years, "", ""].map(y => {
    if (y === "") return `<div class="picker-item spacer"></div>`;
    return `<div class="picker-item" data-val="${y}">${y}년</div>`;
  }).join("");
  
  const monthItemsHtml = ["", "", ...months, "", ""].map(m => {
    if (m === "") return `<div class="picker-item spacer"></div>`;
    return `<div class="picker-item" data-val="${m}">${m}월</div>`;
  }).join("");
  
  pickerEl.innerHTML = `
    <div class="bottom-sheet-backdrop" id="pickerBackdrop"></div>
    <div class="bottom-sheet-content">
      <div class="picker-columns-container">
        <div class="picker-highlight-bar"></div>
        <div class="picker-column" id="pickerYearCol">
          <div class="picker-scroll-content">
            ${yearItemsHtml}
          </div>
        </div>
        <div class="picker-divider"></div>
        <div class="picker-column" id="pickerMonthCol">
          <div class="picker-scroll-content">
            ${monthItemsHtml}
          </div>
        </div>
      </div>
      <button class="primary" id="pickerDoneBtn" style="margin-top: 20px;">선택 완료</button>
    </div>
  `;
  
  setTimeout(() => {
    pickerEl.classList.add("open");
  }, 10);
  
  const yearCol = pickerEl.querySelector("#pickerYearCol");
  const monthCol = pickerEl.querySelector("#pickerMonthCol");
  
  const itemHeight = 40;
  
  const yrIdx = years.indexOf(selectedYear);
  const moIdx = months.indexOf(selectedMonth);
  
  pickerEl.querySelector("#pickerBackdrop").onclick = closePicker;
  
  pickerEl.querySelector("#pickerDoneBtn").onclick = () => {
    const yrScrollIdx = Math.min(Math.max(Math.round(yearCol.scrollTop / itemHeight), 0), years.length - 1);
    const moScrollIdx = Math.min(Math.max(Math.round(monthCol.scrollTop / itemHeight), 0), months.length - 1);
    
    const finalYear = years[yrScrollIdx];
    const finalMonth = months[moScrollIdx];
    
    closePicker();
    onSelect(finalYear, finalMonth);
  };
  
  const updateSelection = (col) => {
    const items = col.querySelectorAll(".picker-item:not(.spacer)");
    const activeIndex = Math.min(Math.max(Math.round(col.scrollTop / itemHeight), 0), items.length - 1);
    
    items.forEach((item, idx) => {
      if (idx === activeIndex) {
        item.style.color = "var(--ink)";
        item.style.fontWeight = "700";
        item.style.transform = "scale(1.15)";
      } else {
        item.style.color = "var(--sub)";
        item.style.fontWeight = "500";
        item.style.transform = "scale(1)";
      }
    });
  };
  
  const bindItemClicks = (col) => {
    const items = col.querySelectorAll(".picker-item:not(.spacer)");
    items.forEach((item, idx) => {
      item.onclick = () => {
        col.scrollTo({ top: idx * itemHeight, behavior: "smooth" });
      };
    });
  };
  
  bindItemClicks(yearCol);
  bindItemClicks(monthCol);
  
  yearCol.addEventListener("scroll", () => updateSelection(yearCol));
  monthCol.addEventListener("scroll", () => updateSelection(monthCol));
  
  setTimeout(() => {
    if (yrIdx !== -1) yearCol.scrollTop = yrIdx * itemHeight;
    if (moIdx !== -1) monthCol.scrollTop = moIdx * itemHeight;
    
    updateSelection(yearCol);
    updateSelection(monthCol);
  }, 120);
}

function closePicker() {
  const pickerEl = document.getElementById("bottomPicker");
  if (pickerEl) {
    pickerEl.classList.remove("open");
    setTimeout(() => {
      pickerEl.remove();
    }, 300);
  }
}


let complaintState = {
  view: "list"
};

let visibleComplaintsCount = 2;

let complaints = [
  {
    id: 1,
    title: "지하 주차장 2층 LED 전등 깜빡임",
    iconName: "tools",
    status: "processing", // received, processing, completed
    statusText: "처리 중",
    dateLabel: "접수 일자",
    dateValue: "6월 24일",
    steps: [
      { name: "접수 완료", date: "6/24", active: true },
      { name: "처리 중", date: "현재", active: true, current: true },
      { name: "완료", date: "", active: false }
    ],
    answer: "순차적으로 전등 교체 작업 중입니다. 금일 오후 내로 조치하겠습니다.",
    expanded: true
  },
  {
    id: 2,
    title: "택배 보관함 잠금장치 고장",
    iconName: "box",
    status: "completed",
    statusText: "처리 완료",
    dateLabel: "완료 일자",
    dateValue: "6월 18일",
    result: "부품 교체 및 정상 작동 확인 완료되었습니다.",
    expanded: false
  },
  {
    id: 3,
    title: "101동 공동현관문 유격 소음",
    iconName: "tools",
    status: "completed",
    statusText: "처리 완료",
    dateLabel: "완료 일자",
    dateValue: "6월 10일",
    result: "공동현관문 유격 조절 및 하부 힌지 윤활유 보강 작업이 완료되었습니다.",
    expanded: false
  },
  {
    id: 4,
    title: "지하 1층 분리수거장 청결 상태 점검",
    iconName: "trash",
    status: "completed",
    statusText: "처리 완료",
    dateLabel: "완료 일자",
    dateValue: "6월 5일",
    result: "분리수거장 소독 작업을 주기적으로 실시하도록 일정을 단축하였으며, 탈취 설비 점검이 완료되었습니다.",
    expanded: false
  }
];

function complaint() {
  if (complaintState.view === "form") {
    return simplePage("민원 접수", "불편한 점을 빠르게 알려주세요.", `
      <div class="card form-card">
        <div class="field">
          <div class="card" style="padding: 16px; margin-top: 8px;">
            <div class="complaint-radio-group">
              <label class="complaint-radio-label">
                <input type="radio" name="complaintType" value="세대 내부 하자 (누수, 벽지 등)" checked>
                세대 내부 하자 (누수, 벽지 등)
              </label>
              <label class="complaint-radio-label">
                <input type="radio" name="complaintType" value="공용 시설 불편 (엘리베이터, 주차장, 가로등)">
                공용 시설 불편 (엘리베이터, 주차장, 가로등)
              </label>
              <label class="complaint-radio-label">
                <input type="radio" name="complaintType" value="층간 소음 / 주차 제보">
                층간 소음 / 주차 제보
              </label>
              <label class="complaint-radio-label">
                <input type="radio" name="complaintType" value="기타 문의사항">
                기타 문의사항
              </label>
            </div>
          </div>
        </div>

        <div class="field" style="margin-top: 20px;">
          <input id="complaintTitle" placeholder="민원 제목을 입력해주세요." value="">
        </div>
        
        <div class="field" style="margin-top: 20px;">
          <textarea id="complaintContent" placeholder="관리사무소에서 확인 후 조치할 수 있도록&#10;구체적인 위치와 상황을 적어주세요."></textarea>
        </div>
        
        <div class="field" style="margin-top: 20px;">
          <input id="complaintLocation" placeholder="위치 (예: 101동 엘리베이터)" value="">
        </div>

        <div class="field" style="margin-top: 24px;">
          <label>[ 사진 첨부 (선택) ]</label>
          <div class="complaint-photo-section" style="margin-top: 8px;">
            <button class="complaint-photo-btn" id="photoAttachBtn" type="button">
              <span>${icon("camera")}</span>
              <b>0/3</b>
            </button>
            <span class="complaint-photo-info">◀ 현장 사진을 첨부하면 더 신속하게 처리됩니다.</span>
          </div>
        </div>

        <div class="complaint-buttons-row">
          <button class="cancel" id="cancelComplaint" type="button">취소하기</button>
          <button class="submit" id="submitComplaint" type="button">민원 접수하기</button>
        </div>
      </div>
    `);
  }

  const sliced = complaints.slice(0, visibleComplaintsCount);
  const listHtml = sliced.map(c => {
    let detailHtml = `
      <div class="booking-detail-row" style="margin-bottom: 8px;">
        <span class="dot">•</span>
        <span class="label">${c.dateLabel} :</span>
        <span class="value">${c.dateValue}</span>
      </div>
    `;

    let progressHtml = "";
    if (c.status !== "completed") {
      progressHtml = `
        <div class="complaint-progress-container">
          <div class="complaint-progress-steps">
            ${c.steps.map((st, idx) => `
              <div class="complaint-step ${st.active ? "active" : ""} ${st.current ? "current" : ""}">
                <span class="complaint-step-box">${st.name}</span>
                <span class="complaint-step-date">${st.date || "&nbsp;"}</span>
              </div>
              ${idx < c.steps.length - 1 ? `<div class="complaint-step-arrow">→</div>` : ""}
            `).join("")}
          </div>
        </div>
      `;
    }

    let feedbackHtml = "";
    if (c.status === "completed") {
      feedbackHtml = `
        <div class="complaint-answer-box">
          <div class="complaint-answer-title">
            <span>${icon("comment-quote")}</span>
            <b>조치 결과:</b>
          </div>
          <div class="complaint-answer-text">${c.result}</div>
        </div>
      `;
    } else if (c.answer) {
      feedbackHtml = `
        <div class="complaint-answer-box">
          <div class="complaint-answer-title">
            <span>${icon("comment-quote")}</span>
            <b>관리사무소 답변:</b>
          </div>
          <div class="complaint-answer-text">"${c.answer}"</div>
        </div>
      `;
    }

    return `
      <div class="complaint-item-card ${c.expanded ? "expanded" : "collapsed"}" data-id="${c.id}">
        <div class="complaint-card-trigger" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; font-size: 14px; font-weight: 700;">${icon(c.iconName)} ${c.title}${c.status === "completed" ? " (처리 완료)" : ""}</h3>
          <span class="complaint-toggle-icon" style="font-size: 16px; color: var(--sub); display: flex; align-items: center;">${icon(c.expanded ? "angle-small-up" : "angle-small-down")}</span>
        </div>
        <div class="booking-card-body complaint-card-body" style="display: ${c.expanded ? "block" : "none"}; margin-top: 12px; border-top: 1px solid var(--line); padding-top: 12px;">
          ${detailHtml}
          ${progressHtml}
          ${feedbackHtml}
        </div>
      </div>
    `;
  }).join("");

  const showMoreBtn = complaints.length > visibleComplaintsCount ? `
    <button class="secondary" id="moreComplaintsBtn" style="width:100%; border: 1px solid var(--line) !important; background: #ffffff !important; border-radius: 12px; padding: 12px 10px; font-weight: 700; margin-bottom: 24px;">더보기</button>
  ` : "";

  return simplePage("민원 센터", "나의 민원을 관리하고 접수해요.", `
    <button class="complaint-action-btn-card" id="startComplaintBtn">
      <span>${icon("plus")}</span>
      새 민원 신청하기
    </button>
    
    <div class="section-head" style="margin-top: 24px; margin-bottom: 12px;">
      <h2>[ 나의 민원 처리 현황 ]</h2>
    </div>
    
    <div class="complaint-list-container">
      ${listHtml}
    </div>
    ${showMoreBtn}
  `);
}

function bindComplaintEvents() {
  const startBtn = $("#startComplaintBtn");
  if (startBtn) {
    startBtn.onclick = () => {
      complaintState.view = "form";
      $("#app").innerHTML = complaint();
      bindComplaintEvents();
    };
  }

  const cancelBtn = $("#cancelComplaint");
  if (cancelBtn) {
    cancelBtn.onclick = () => {
      complaintState.view = "list";
      $("#app").innerHTML = complaint();
      bindComplaintEvents();
    };
  }

  const moreBtn = $("#moreComplaintsBtn");
  if (moreBtn) {
    moreBtn.onclick = () => {
      visibleComplaintsCount += 2;
      $("#app").innerHTML = complaint();
      bindComplaintEvents();
    };
  }

  let photoCount = 0;
  const photoBtn = $("#photoAttachBtn");
  if (photoBtn) {
    photoBtn.onclick = () => {
      photoCount = (photoCount + 1) % 4;
      const countEl = photoBtn.querySelector("b");
      if (countEl) countEl.textContent = `${photoCount}/3`;
      if (photoCount > 0) {
        photoBtn.style.borderColor = "var(--olive)";
        photoBtn.style.color = "var(--olive)";
        const iconEl = photoBtn.querySelector("i");
        if (iconEl) iconEl.style.color = "var(--olive)";
      } else {
        photoBtn.style.borderColor = "";
        photoBtn.style.color = "";
        const iconEl = photoBtn.querySelector("i");
        if (iconEl) iconEl.style.color = "";
      }
      toast(`현장 사진 ${photoCount}장이 선택되었습니다.`);
    };
  }

  $$(".complaint-card-trigger").forEach(el => {
    el.onclick = () => {
      const card = el.closest(".complaint-item-card");
      const id = parseInt(card.dataset.id);
      const c = complaints.find(x => x.id === id);
      c.expanded = !c.expanded;
      
      const body = card.querySelector(".complaint-card-body");
      const iconSpan = card.querySelector(".complaint-toggle-icon");
      
      if (c.expanded) {
        card.classList.remove("collapsed");
        card.classList.add("expanded");
        body.style.display = "block";
        iconSpan.innerHTML = icon("angle-small-up");
      } else {
        card.classList.remove("expanded");
        card.classList.add("collapsed");
        body.style.display = "none";
        iconSpan.innerHTML = icon("angle-small-down");
      }
    };
  });

  const submitBtn = $("#submitComplaint");
  if (submitBtn) {
    submitBtn.onclick = () => {
      const title = $("#complaintTitle").value.trim();
      const content = $("#complaintContent").value.trim();

      if (!title) {
        toast("민원 제목을 입력해주세요.");
        return;
      }
      if (!content) {
        toast("민원 내용을 입력해주세요.");
        return;
      }

      const selectedTypeInput = $("input[name='complaintType']:checked");
      const selectedType = selectedTypeInput ? selectedTypeInput.value : "기타 문의사항";

      openModal(`
        <h2>AI 분류 결과</h2>
        <p>민원 유형: <b>${selectedType}</b></p>
        <p>긴급도: <b>보통</b></p>
        <button class='primary' id='confirmComplaintSubmitBtn' style='width:100%; margin-top: 15px;'>확인하고 접수</button>
      `);

      const confirmBtn = $("#confirmComplaintSubmitBtn");
      if (confirmBtn) {
        confirmBtn.onclick = () => {
          closeModal();
          
          complaints.forEach(x => x.expanded = false);
          
          let typeIcon = "tools";
          if (selectedType.includes("세대")) typeIcon = "home";
          else if (selectedType.includes("소음")) typeIcon = "volume-mute";
          else if (selectedType.includes("기타")) typeIcon = "info-circle";
          
          const newComplaint = {
            id: Date.now(),
            title: title,
            iconName: typeIcon,
            status: "received",
            statusText: "접수 완료",
            dateLabel: "접수 일자",
            dateValue: "6월 26일",
            steps: [
              { name: "접수 완료", date: "6/26", active: true, current: true },
              { name: "처리 중", date: "", active: false },
              { name: "완료", date: "", active: false }
            ],
            answer: null,
            expanded: true
          };
          complaints.unshift(newComplaint);
          
          toast("민원이 접수되었습니다.");
          complaintState.view = "list";
          
          setTimeout(() => {
            $("#app").innerHTML = complaint();
            bindComplaintEvents();
          }, 1000);
        };
      }
    };
  }
}

const meetingMinutesData = [
  { id: 1, title: "제24회 정기 입주자대표회의 결과 공고", date: "06/15", content: "어린이 놀이터 모래 소독 및 시소 안장 교체 건, 단지 내 도색 공사 일정이 의결되었습니다." },
  { id: 2, title: "제23회 임시 입주자대표회의 결과 공고", date: "05/20", content: "지하 주차장 LED 조명 센서 조정 및 관리실 화재 수신기 업그레이드 건이 통과되었습니다." },
  { id: 3, title: "제22회 정기 입주자대표회의 결과 공고", date: "04/18", content: "봄맞이 조경 정비 계획 및 입주민 도서관 자원봉사자 격려금 편성 건이 의결되었습니다." },
  { id: 4, title: "제21회 임시 입주자대표회의 결과 공고", date: "03/28", content: "승강기 유지관리 용역 계약 만료에 따른 신규 업체 선정 결과 공지 건입니다." },
  { id: 5, title: "제18회 정기 입주자대표회의 결과 공고", date: "03/10", content: "어린이 놀이터 바닥 우레탄 유해성 검사 실시 및 보수 건이 최종 승인되었습니다." },
  { id: 6, title: "제17회 정기 입주자대표회의 결과 공고", date: "02/15", content: "겨울철 동파 예방 설비 보강 및 재활용 쓰레기 수거함 설치 위치 조정 건입니다." }
];
let meetingQuery = "놀이터";
let currentMeetingId = 1;

function meetingMinutes() {
  const query = meetingQuery.trim().toLowerCase();
  const results = meetingMinutesData.filter(item => 
    item.title.toLowerCase().includes(query) || 
    item.content.toLowerCase().includes(query)
  );
  
  const searchNotice = query ? `* 검색 결과: '${meetingQuery}'에 대한 결과가 총 ${results.length}건 있습니다.` : `* 전체 회의록 목록이 총 ${results.length}건 있습니다.`;
  
  const listHtml = results.map((item, idx) => {
    const formattedDate = "26." + item.date.replace("/", ".");
    return `
      <div class="meeting-row-item" data-id="${item.id}" style="display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-bottom: ${idx === results.length - 1 ? 'none' : '1px solid var(--line)'}; cursor: pointer; transition: background 0.2s ease; gap: 16px;">
        <span style="font-size: 13px; font-weight: 600; color: var(--ink); text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${item.title}
        </span>
        <span class="date" style="font-size: 11.5px; color: var(--sub); font-weight: 500; text-align: right; flex-shrink: 0; min-width: 60px;">${formattedDate}</span>
      </div>
    `;
  }).join("");
  
  const emptyHtml = `<div style="padding: 40px 16px; text-align: center; color: var(--sub); font-size: 13px; font-weight: 500;">검색 결과가 없습니다.</div>`;
  
  return simplePage("회의록", "", `
    <div class="meeting-section-box" style="margin-top: 10px;">
      <div class="meeting-list-card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); overflow: hidden;">
        ${results.length > 0 ? listHtml : emptyHtml}
      </div>
    </div>
    
    <!-- 페이징 및 우측 글작성 버튼 영역 -->
    <div style="display: flex; justify-content: center; align-items: center; margin-top: 12px; position: relative; min-height: 38px;">
      <div class="meeting-pagination" style="display: flex; align-items: center; gap: 12px;">
        <button class="page-arrow" style="background: none; border: none; font-size: 12px; color: var(--sub); cursor: pointer;" onclick="toast('마지막 페이지입니다.')">◀</button>
        <span class="page-num" style="font-size: 13px; font-weight: 700; color: var(--ink);">1</span>
        <button class="page-arrow" style="background: none; border: none; font-size: 12px; color: var(--sub); cursor: pointer;" onclick="toast('마지막 페이지입니다.')">▶</button>
      </div>
      <button id="meetingWriteBtn" style="position: absolute; right: 0; padding: 10px 18px; font-weight: 700; font-size: 12.5px; background: var(--dark) !important; border-radius: 8px; color: #ffffff; cursor: pointer; transition: all 0.2s ease; border: none; display: flex; align-items: center; gap: 6px;">
        <i class="fi fi-rr-edit" style="font-size: 12px;"></i> 글작성
      </button>
    </div>

    <!-- 검색란 (하단 이동) -->
    <div class="meeting-section-box" style="margin-top: 12px;">
      <div class="meeting-search-bar" style="display: flex; gap: 8px;">
        <input type="text" id="meetingSearchInput" placeholder="검색어를 입력하세요." value="${meetingQuery}" style="flex: 1; border: 1px solid var(--line); background: #ffffff; padding: 10px 12px; border-radius: 8px; font-size: 12.5px; outline: none;">
        <button id="meetingSearchSubmitBtn" style="padding: 10px 16px; background: var(--dark) !important; color: #ffffff; border: none; font-size: 12.5px; font-weight: 700; border-radius: 8px; cursor: pointer;">검색</button>
      </div>
      ${query ? `<div class="meeting-search-notice" style="font-size: 11px; color: var(--olive); font-weight: 600; margin-top: 8px; padding-left: 4px;">${searchNotice}</div>` : ""}
    </div>
  `);
}

function bindMeetingMinutesEvents() {
  const searchBtn = $("#meetingSearchSubmitBtn");
  const searchInput = $("#meetingSearchInput");
  if (searchBtn && searchInput) {
    searchBtn.onclick = () => {
      meetingQuery = searchInput.value;
      $("#app").innerHTML = meetingMinutes();
      bindMeetingMinutesEvents();
    };
    searchInput.onkeydown = (e) => {
      if (e.key === "Enter") {
        meetingQuery = searchInput.value;
        $("#app").innerHTML = meetingMinutes();
        bindMeetingMinutesEvents();
      }
    };
  }
  
  $$(".meeting-row-item").forEach(item => {
    item.onclick = () => {
      currentMeetingId = parseInt(item.dataset.id);
      navigate("meetingMinutesDetail");
    };
  });
  
  $$(".meeting-pagination .page-arrow").forEach(btn => {
    btn.onclick = () => {
      toast("마지막 페이지입니다.");
    };
  });
  
  const writeBtn = $("#meetingWriteBtn");
  if (writeBtn) {
    writeBtn.onclick = () => {
      navigate("meetingMinutesWrite");
    };
  }
}

function meetingMinutesDetail() {
  const minutes = meetingMinutesData.find(x => x.id === currentMeetingId) || meetingMinutesData[0];
  
  const query = meetingQuery.trim().toLowerCase();
  const results = meetingMinutesData.filter(item => 
    item.title.toLowerCase().includes(query) || 
    item.content.toLowerCase().includes(query)
  );
  
  const searchNotice = query ? `* 검색 결과: '${meetingQuery}'에 대한 결과가 총 ${results.length}건 있습니다.` : `* 전체 회의록 목록이 총 ${results.length}건 있습니다.`;
  
  const listHtml = results.map((item, idx) => {
    const isCurrent = item.id === currentMeetingId;
    const currentStyle = isCurrent ? "background: var(--cream); font-weight: 700;" : "";
    const formattedDate = "26." + item.date.replace("/", ".");
    return `
      <div class="meeting-row-item" data-id="${item.id}" style="display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-bottom: ${idx === results.length - 1 ? 'none' : '1px solid var(--line)'}; cursor: pointer; transition: background 0.2s ease; gap: 16px; ${currentStyle}">
        <span style="font-size: 13px; color: var(--ink); text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${item.title}
        </span>
        <span class="date" style="font-size: 11.5px; color: var(--sub); font-weight: 500; text-align: right; flex-shrink: 0; min-width: 60px;">${formattedDate}</span>
      </div>
    `;
  }).join("");
  
  const emptyHtml = `<div style="padding: 40px 16px; text-align: center; color: var(--sub); font-size: 13px; font-weight: 500;">검색 결과가 없습니다.</div>`;

  const dateParts = minutes.date.split("/");
  const month = parseInt(dateParts[0]);
  const day = parseInt(dateParts[1]);
  
  let fullMinutesHtml = "";
  
  if (minutes.id === 1) {
    fullMinutesHtml = `
      <div style="font-weight: 700; margin-bottom: 6px;">[안건 1: 단지 내 주행 속도 제한의 건]</div>
      <div style="margin-bottom: 4px;">- 입주자대표: 단지 내 서행 유도가 필요합니다.</div>
      <div style="margin-bottom: 4px;">- 관리소장: 10km/h 제한 표지판 and 방지턱 2개소 설치를 제안합니다.</div>
      <div style="margin-bottom: 12px;">- 결과: 전원 찬성으로 가결되었습니다.</div>
      
      <div style="font-weight: 700; margin-bottom: 6px;">[안건 2: 어린이 놀이터 개선의 건]</div>
      <div style="margin-bottom: 4px;">- 입주자대표: 바닥 정비 및 미끄럼틀 도색이 시급합니다.</div>
      <div>- 결과: 전원 찬성으로 가결되었습니다.</div>
    `;
  } else if (minutes.id === 5) {
    fullMinutesHtml = `
      <div style="font-weight: 700; margin-bottom: 6px;">[안건 1: 놀이터 바닥 우레탄 유해성 검사의 건]</div>
      <div style="margin-bottom: 4px;">- 입주자대표: 인근 단지 유해 물질 뉴스 보도로 주민 우려가 큽니다.</div>
      <div style="margin-bottom: 4px;">- 관리소장: 공인 기관에 정밀 검사를 의뢰해 결과를 공고하겠습니다.</div>
      <div style="margin-bottom: 12px;">- 결과: 찬성 다수로 가결되었습니다.</div>
      
      <div style="font-weight: 700; margin-bottom: 6px;">[안건 2: 주민 피트니스 센터 위탁 운영의 건]</div>
      <div style="margin-bottom: 4px;">- 입주자대표: 기존 위탁 업체의 계약이 만료되어 재선정이 필요합니다.</div>
      <div>- 결과: 조건 보강 후 재논의하기로 하여 보류되었습니다.</div>
    `;
  } else {
    fullMinutesHtml = `
      <div style="font-weight: 700; margin-bottom: 6px;">[안건 1: 단지 시설물 안전 관리의 건]</div>
      <div style="margin-bottom: 4px;">- 입주자대표: 정기 안전 진단 결과를 토대로 취약 구역 보수가 필요합니다.</div>
      <div style="margin-bottom: 4px;">- 관리소장: 예산 범위 내 시급한 구간부터 수선유지비를 집행하겠습니다.</div>
      <div style="margin-bottom: 12px;">- 결과: 가결되었습니다.</div>
      
      <div style="font-weight: 700; margin-bottom: 6px;">[안건 2: 기타 민원 피드백 검토 건]</div>
      <div style="margin-bottom: 4px;">- 입주자대표: 최근 접수된 민원 현황 및 조치 보고를 요청합니다.</div>
      <div>- 결과: 보고 후 원안대로 가결되었습니다.</div>
    `;
  }

  return simplePage("회의록", "", `
    <div class="meeting-detail-container">
      <div class="card info-content-box" style="padding: 16px; border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
        <!-- 제목 및 정보 영역 -->
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <div style="font-size: 14px; font-weight: 700; color: var(--ink); line-height: 1.4;">${minutes.title}</div>
          <div style="display: flex; justify-content: flex-end; font-size: 11px; color: var(--sub); font-weight: 500; margin-top: 4px;">
            2026년 ${month}월 ${day}일(월) 19:30 | 단지 내 대회의실
          </div>
        </div>
        
        <!-- 구분 실선 -->
        <div style="border-top: 1px solid var(--line);"></div>
        
        <!-- 본문 내용 영역 -->
        <div style="line-height: 1.6; font-size: 13px; color: var(--ink); font-weight: 500; text-align: left;">${fullMinutesHtml}</div>
        
        <!-- 첨부 파일 영역 -->
        <div style="border-top: 1px solid var(--line); margin-top: 12px; padding-top: 12px;">
          <div style="font-size: 11.5px; font-weight: 700; color: var(--sub); margin-bottom: 8px;">첨부 파일</div>
          <div class="card file-box" style="padding: 10px 12px; display: flex; align-items: center; gap: 8px; cursor: pointer; border-radius: 8px; border: 1px solid var(--line); background: #faf8f5;">
            <span style="font-size: 14px;">📎</span>
            <span style="font-size: 12px; font-weight: 600; color: var(--ink); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${minutes.title.replace(" 결과 공고", "")}_전문.pdf</span>
            <span style="font-size: 10.5px; color: var(--sub); font-weight: 600; flex-shrink: 0;">(1.2MB)</span>
          </div>
        </div>
      </div>

      <!-- 회의록 목록 화면 전체가 그대로 노출 -->
      <div style="margin-top: 32px; border-top: 2px solid var(--line); padding-top: 24px;">
        <div class="meeting-section-box" style="margin-top: 10px;">
          <div class="meeting-list-card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); overflow: hidden;">
            ${results.length > 0 ? listHtml : emptyHtml}
          </div>
        </div>
        
        <div style="display: flex; justify-content: center; align-items: center; margin-top: 12px; position: relative; min-height: 38px;">
          <div class="meeting-pagination" style="display: flex; align-items: center; gap: 12px;">
            <button class="page-arrow" style="background: none; border: none; font-size: 12px; color: var(--sub); cursor: pointer;" onclick="toast('마지막 페이지입니다.')">◀</button>
            <span class="page-num" style="font-size: 13px; font-weight: 700; color: var(--ink);">1</span>
            <button class="page-arrow" style="background: none; border: none; font-size: 12px; color: var(--sub); cursor: pointer;" onclick="toast('마지막 페이지입니다.')">▶</button>
          </div>
          <button id="meetingWriteBtn" style="position: absolute; right: 0; padding: 10px 18px; font-weight: 700; font-size: 12.5px; background: var(--dark) !important; border-radius: 8px; color: #ffffff; cursor: pointer; transition: all 0.2s ease; border: none; display: flex; align-items: center; gap: 6px;">
            <i class="fi fi-rr-edit" style="font-size: 12px;"></i> 글작성
          </button>
        </div>

        <div class="meeting-section-box" style="margin-top: 12px;">
          <div class="meeting-search-bar" style="display: flex; gap: 8px;">
            <input type="text" id="meetingSearchInput" placeholder="검색어를 입력하세요." value="${meetingQuery}" style="flex: 1; border: 1px solid var(--line); background: #ffffff; padding: 10px 12px; border-radius: 8px; font-size: 12.5px; outline: none;">
            <button id="meetingSearchSubmitBtn" style="padding: 10px 16px; background: var(--dark) !important; color: #ffffff; border: none; font-size: 12.5px; font-weight: 700; border-radius: 8px; cursor: pointer;">검색</button>
          </div>
          ${query ? `<div class="meeting-search-notice" style="font-size: 11px; color: var(--olive); font-weight: 600; margin-top: 8px; padding-left: 4px;">${searchNotice}</div>` : ""}
        </div>
      </div>
    </div>
  `);
}

function bindMeetingDetailEvents() {
  const fileBox = $(".file-box");
  if (fileBox) {
    fileBox.onclick = () => {
      toast("회의록 PDF 파일을 다운로드합니다.");
    };
  }

  // 하단 회의록 목록 이벤트 바인딩 호출
  bindMeetingMinutesEvents();

  // 하단 목록 아이템 클릭 오버라이드
  $$(".meeting-row-item").forEach(item => {
    item.onclick = () => {
      currentMeetingId = parseInt(item.dataset.id);
      $("#app").innerHTML = meetingMinutesDetail();
      bindMeetingDetailEvents();
      window.scrollTo(0, 0);
    };
  });
}




let passState = {
  activePasses: [
    { facility: "피트니스 센터 (헬스장)", period: "2026년 6월 ~ 미정 (자동 연장 중)" }
  ],
  selectedFacility: "kids",
  startDate: "2026년 7월",
  endDate: "미정(매달 자동연장)"
};

function communityPass() {
  const currentPassesHtml = passState.activePasses.map(p => `
    <div class="card" style="padding: 16px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow);">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 700; font-size: 14.5px; color: var(--ink);">${p.facility}</span>
        <span class="status" style="background: #e8f5ee; color: #168452; font-size: 11px; padding: 4px 10px; border-radius: 12px; font-weight: 700;">이용 중</span>
      </div>
      <div style="font-size: 12.5px; color: var(--sub); font-weight: 500; margin-left: 2px;">- 기간: ${p.period}</div>
    </div>
  `).join("");

  const kidsSelected = passState.selectedFacility === "kids";
  const kidsBorder = kidsSelected ? "border: 2px solid var(--olive); background: var(--olive);" : "border: 1px solid var(--line); background: #ffffff;";

  return simplePage("커뮤니티 정기권", "아파트 커뮤니티 시설의 정기 이용권을 신청하고 관리하세요.", `
    <div class="section-head"><h2>내가 현재 이용 중인 정기권</h2></div>
    <div class="pass-current-list" style="margin-top: 12px;">
      ${currentPassesHtml}
    </div>
    
    <div style="height: 1px; background: var(--line); margin: 28px 0 20px;"></div>
    
    <div class="section-head"><h2>새 정기권 신청하기</h2></div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 8px;">
      <!-- Fitness Center Card -->
      <div class="pass-facility-card disabled" id="fitnessPassCard" style="border: 1px solid var(--line); border-radius: 12px; padding: 22px 16px; text-align: center; background: #fafafa; opacity: 0.7; cursor: not-allowed; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 8px; min-height: 96px;">
        <div style="font-size: 14.5px; font-weight: 700; color: var(--sub);">피트니스 센터 (헬스장)</div>
        <div style="font-size: 11px; font-weight: 700; color: var(--sub); background: var(--line); padding: 4px 8px; border-radius: 6px;">이미 이용 중입니다</div>
      </div>
      
      <!-- Kids Room Card -->
      <div class="pass-facility-card ${kidsSelected ? "active" : ""}" id="kidsPassCard" style="${kidsBorder} border-radius: 12px; padding: 22px 16px; text-align: center; cursor: pointer; transition: all 0.2s ease; display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 96px;">
        <div style="font-size: 14.5px; font-weight: 700; color: ${kidsSelected ? "#ffffff" : "var(--ink)"};">다함께 돌봄센터<br>(키즈룸)</div>
      </div>
    </div>
    <div style="font-size: 11.5px; color: var(--sub); font-weight: 600; margin-bottom: 24px; padding-left: 2px;">* 안내: 헬스장은 현재 이용 중이므로 중복 신청이 불가능합니다.</div>
    <div class="card" style="padding: 16px; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 13px; font-weight: 600; color: var(--ink); margin-bottom: 24px; border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow);">
      시작 : 
      <select id="passStartSelect" style="border: 1px solid var(--line); background: var(--bg); padding: 6px 12px; border-radius: 8px; outline: none; font-weight: 700; font-size: 12px; color: var(--ink); cursor: pointer;">
        <option value="2026년 7월" ${passState.startDate === "2026년 7월" ? "selected" : ""}>2026년 7월</option>
        <option value="2026년 8월" ${passState.startDate === "2026년 8월" ? "selected" : ""}>2026년 8월</option>
        <option value="2026년 9월" ${passState.startDate === "2026년 9월" ? "selected" : ""}>2026년 9월</option>
      </select>
      ~ 
      종료 : 
      <select id="passEndSelect" style="border: 1px solid var(--line); background: var(--bg); padding: 6px 12px; border-radius: 8px; outline: none; font-weight: 700; font-size: 12px; color: var(--ink); cursor: pointer;">
        <option value="미정(매달 자동연장)" ${passState.endDate === "미정(매달 자동연장)" ? "selected" : ""}>미정(매달 자동연장)</option>
        <option value="2026년 7월" ${passState.endDate === "2026년 7월" ? "selected" : ""}>2026년 7월</option>
        <option value="2026년 8월" ${passState.endDate === "2026년 8월" ? "selected" : ""}>2026년 8월</option>
        <option value="2026년 9월" ${passState.endDate === "2026년 9월" ? "selected" : ""}>2026년 9월</option>
        <option value="2026년 10월" ${passState.endDate === "2026년 10월" ? "selected" : ""}>2026년 10월</option>
        <option value="2026년 11월" ${passState.endDate === "2026년 11월" ? "selected" : ""}>2026년 11월</option>
        <option value="2026년 12월" ${passState.endDate === "2026년 12월" ? "selected" : ""}>2026년 12월</option>
      </select>
    </div>
    
    <button class="primary" id="passSubmitBtn" style="width: 100%; padding: 14px; font-weight: 700; font-size: 14px; background: var(--dark) !important; border-radius: 12px; color: #ffffff;">정기권 신청하기</button>
  `);
}

function bindCommunityPassEvents() {
  const fitnessCard = $("#fitnessPassCard");
  const kidsCard = $("#kidsPassCard");
  const startSelect = $("#passStartSelect");
  const endSelect = $("#passEndSelect");
  const submitBtn = $("#passSubmitBtn");

  if (fitnessCard) {
    fitnessCard.onclick = () => {
      toast("헬스장은 이미 이용 중이므로 신청할 수 없습니다.");
    };
  }

  if (kidsCard) {
    kidsCard.onclick = () => {
      passState.selectedFacility = "kids";
      $("#app").innerHTML = communityPass();
      bindCommunityPassEvents();
    };
  }

  if (startSelect) {
    startSelect.onchange = () => {
      passState.startDate = startSelect.value;
    };
  }

  if (endSelect) {
    endSelect.onchange = () => {
      passState.endDate = endSelect.value;
    };
  }

  if (submitBtn) {
    submitBtn.onclick = () => {
      if (!passState.selectedFacility) {
        toast("신청할 시설을 선택해 주세요.");
        return;
      }
      
      const alreadyApplied = passState.activePasses.some(p => p.facility.includes("키즈룸"));
      if (alreadyApplied) {
        toast("이미 다함께 돌봄센터(키즈룸) 정기권을 신청했습니다.");
        return;
      }

      passState.activePasses.push({
        facility: "다함께 돌봄센터 (키즈룸)",
        period: `${passState.startDate} ~ ${passState.endDate.replace("미정(매달 자동연장)", "미정 (매달 자동연장)")}`
      });

      toast("정기권 신청이 완료되었습니다. 🎉");
      
      setTimeout(() => {
        $("#app").innerHTML = communityPass();
        bindCommunityPassEvents();
      }, 1000);
    };
  }
}

function bindCommunityEvents() {
  const searchInput = $("#clubSearchInput");
  const searchBtn = $("#clubSearchSubmitBtn");
  
  if (searchInput) {
    searchInput.oninput = () => {
      clubSearchQuery = searchInput.value;
      $("#app").innerHTML = community();
      bindCommunityEvents();
      const newInput = $("#clubSearchInput");
      if (newInput) {
        newInput.focus();
        newInput.setSelectionRange(newInput.value.length, newInput.value.length);
      }
    };
    searchInput.onkeydown = (e) => {
      if (e.key === "Enter") {
        clubSearchQuery = searchInput.value;
        $("#app").innerHTML = community();
        bindCommunityEvents();
      }
    };
  }

  if (searchBtn && searchInput) {
    searchBtn.onclick = () => {
      clubSearchQuery = searchInput.value;
      $("#app").innerHTML = community();
      bindCommunityEvents();
    };
  }

  const createClubBtn = $("#createClubBtn");
  if (createClubBtn) {
    createClubBtn.onclick = () => {
      navigate("clubCreate");
    };
  }

  $$(".join-club-btn:not([disabled])").forEach(btn => {
    btn.onclick = () => {
      const id = parseInt(btn.dataset.id);
      const name = btn.dataset.name;
      const club = availableClubs.find(c => c.id === id);
      if (club) {
        club.status = "pending";
      }
      toast(`“${name}” 가입 신청을 보냈습니다.`);
      $("#app").innerHTML = community();
      bindCommunityEvents();
    };
  });
}

function notice() {
  const listHtml = noticesData.map((n, idx) => {
    const formattedDate = n.date.slice(2);
    return `
      <div class="notice-row-item" data-id="${n.id}" style="display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-bottom: ${idx === noticesData.length - 1 ? 'none' : '1px solid var(--line)'}; cursor: pointer; transition: background 0.2s ease; gap: 16px;">
        <span style="font-size: 13px; font-weight: 600; color: var(--ink); text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${n.title}
        </span>
        <span class="date" style="font-size: 11.5px; color: var(--sub); font-weight: 500; text-align: right; flex-shrink: 0; min-width: 60px;">${formattedDate}</span>
      </div>
    `;
  }).join("");

  return simplePage("공지사항", "", `
    <div class="meeting-section-box" style="margin-top: 10px;">
      <div class="meeting-list-card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); overflow: hidden;">
        ${listHtml}
      </div>
    </div>

    <!-- 페이징 영역 -->
    <div style="display: flex; justify-content: center; align-items: center; margin-top: 12px; position: relative; min-height: 38px;">
      <div class="meeting-pagination" style="display: flex; align-items: center; gap: 12px;">
        <button class="page-arrow" style="background: none; border: none; font-size: 12px; color: var(--sub); cursor: pointer;" onclick="toast('마지막 페이지입니다.')">◀</button>
        <span class="page-num" style="font-size: 13px; font-weight: 700; color: var(--ink);">1</span>
        <button class="page-arrow" style="background: none; border: none; font-size: 12px; color: var(--sub); cursor: pointer;" onclick="toast('마지막 페이지입니다.')">▶</button>
      </div>
    </div>
  `);
}

function bindNoticeEvents() {
  $$(".notice-row-item").forEach(item => {
    item.onclick = () => {
      currentNoticeId = parseInt(item.dataset.id);
      navigate("noticeDetail");
    };
  });
}

function noticeDetail() {
  const item = noticesData.find(n => n.id === currentNoticeId) || noticesData[0];
  const listHtml = noticesData.map((n, idx) => {
    const isCurrent = n.id === currentNoticeId;
    const currentStyle = isCurrent ? "background: var(--cream); font-weight: 700;" : "";
    const formattedDate = n.date.slice(2);
    return `
      <div class="notice-row-item" data-id="${n.id}" style="display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-bottom: ${idx === noticesData.length - 1 ? 'none' : '1px solid var(--line)'}; cursor: pointer; transition: background 0.2s ease; gap: 16px; ${currentStyle}">
        <span style="font-size: 13px; color: var(--ink); text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${n.title}
        </span>
        <span class="date" style="font-size: 11.5px; color: var(--sub); font-weight: 500; text-align: right; flex-shrink: 0; min-width: 60px;">${formattedDate}</span>
      </div>
    `;
  }).join("");

  const emptyHtml = `<div style="padding: 40px 16px; text-align: center; color: var(--sub); font-size: 13px; font-weight: 500;">검색 결과가 없습니다.</div>`;

  return simplePage("공지사항", "", `
    <div class="meeting-detail-container">
      <div class="card info-content-box" style="padding: 16px; border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
        <!-- 제목 및 정보 영역 (모던 스타일) -->
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <div style="font-size: 14px; font-weight: 700; color: var(--ink); line-height: 1.4;">${item.title}</div>
          <div style="display: flex; justify-content: flex-end; font-size: 11px; color: var(--sub); font-weight: 500; margin-top: 4px;">
            관리사무소 | ${item.date}
          </div>
        </div>
        
        <!-- 구분 실선 -->
        <div style="border-top: 1px solid var(--line);"></div>
        
        <!-- 본문 내용 영역 -->
        <div style="line-height: 1.6; font-size: 13px; white-space: pre-wrap; word-break: break-all; color: var(--ink); font-weight: 500; text-align: left;">${item.content}</div>
        
        <!-- 첨부 파일 영역 -->
        <div style="border-top: 1px solid var(--line); margin-top: 12px; padding-top: 12px;">
          <div style="font-size: 11.5px; font-weight: 700; color: var(--sub); margin-bottom: 8px;">첨부 파일</div>
          <div class="card notice-file-box" style="padding: 10px 12px; display: flex; align-items: center; gap: 8px; cursor: pointer; border-radius: 8px; border: 1px solid var(--line); background: #faf8f5;">
            <span style="font-size: 14px;">📎</span>
            <span style="font-size: 12px; font-weight: 600; color: var(--ink); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.title.replace(/\[.*\]\s*/, "")}_공고문.pdf</span>
            <span style="font-size: 10.5px; color: var(--sub); font-weight: 600; flex-shrink: 0;">(780KB)</span>
          </div>
        </div>
      </div>

      <!-- 공지사항 목록 화면 전체가 그대로 노출 -->
      <div style="margin-top: 32px; border-top: 2px solid var(--line); padding-top: 24px;">
        <div class="meeting-section-box" style="margin-top: 10px;">
          <div class="meeting-list-card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); overflow: hidden;">
            ${noticesData.length > 0 ? listHtml : emptyHtml}
          </div>
        </div>
        
        <div style="display: flex; justify-content: center; align-items: center; margin-top: 12px; position: relative; min-height: 38px;">
          <div class="meeting-pagination" style="display: flex; align-items: center; gap: 12px;">
            <button class="page-arrow" style="background: none; border: none; font-size: 12px; color: var(--sub); cursor: pointer;" onclick="toast('마지막 페이지입니다.')">◀</button>
            <span class="page-num" style="font-size: 13px; font-weight: 700; color: var(--ink);">1</span>
            <button class="page-arrow" style="background: none; border: none; font-size: 12px; color: var(--sub); cursor: pointer;" onclick="toast('마지막 페이지입니다.')">▶</button>
          </div>
        </div>
      </div>
    </div>
  `);
}

function bindNoticeDetailEvents() {
  const fileBox = $(".notice-file-box");
  if (fileBox) {
    fileBox.onclick = () => {
      toast("공지사항 첨부파일을 다운로드합니다.");
    };
  }

  // 하단 목록 아이템 클릭 오버라이드
  $$(".notice-row-item").forEach(item => {
    item.onclick = () => {
      currentNoticeId = parseInt(item.dataset.id);
      $("#app").innerHTML = noticeDetail();
      bindNoticeDetailEvents();
      window.scrollTo(0, 0);
    };
  });
}

function vote() {
  const filtered = votesData.filter(v => v.status === voteTab);
  
  const tabIngStyle = voteTab === "ing" ? "border-bottom: 2px solid var(--dark); font-weight: 700; color: var(--ink);" : "color: var(--sub);";
  const tabDoneStyle = voteTab === "done" ? "border-bottom: 2px solid var(--dark); font-weight: 700; color: var(--ink);" : "color: var(--sub);";

  const listHtml = filtered.map((v, idx) => {
    const badgeBg = v.myVoted ? "rgba(107, 142, 35, 0.1)" : "rgba(160, 160, 160, 0.1)";
    const badgeColor = v.myVoted ? "var(--olive)" : "var(--sub)";
    const badgeText = v.myVoted ? "참여 완료" : "미참여";
    const statusText = v.status === "ing" ? "진행 중" : "투표 완료";
    const rateHtml = v.status === "done" ? `
      <div style="font-size: 11.5px; color: var(--sub); margin-top: 4px; font-weight: 500;">
        최종 투표율: <b>${Math.round((v.votedCount / v.totalVoters) * 100)}%</b> (${v.votedCount}세대/총 ${v.totalVoters}세대)
      </div>
    ` : `
      <div style="font-size: 11.5px; color: var(--sub); margin-top: 4px; font-weight: 500;">
        현재 투표율: ${Math.round((v.votedCount / v.totalVoters) * 100)}% (${v.votedCount}세대 참여)
      </div>
    `;

    return `
      <div class="vote-row-item" data-id="${v.id}" style="padding: 16px; border-bottom: ${idx === filtered.length - 1 ? 'none' : '1px solid var(--line)'}; cursor: pointer; display: flex; flex-direction: column; gap: 6px; transition: background 0.2s ease;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
          <span style="font-size: 13.5px; font-weight: 700; color: var(--ink); line-height: 1.4; flex: 1;">
            ${v.title}
          </span>
          <span style="font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 20px; background: ${badgeBg}; color: ${badgeColor}; white-space: nowrap;">
            ${badgeText}
          </span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2px;">
          <span style="font-size: 11px; color: var(--sub); font-weight: 500;">기간: ${v.period}</span>
          <span style="font-size: 11px; font-weight: 700; color: ${v.status === 'ing' ? 'var(--olive)' : 'var(--sub)'};">${statusText}</span>
        </div>
        ${rateHtml}
      </div>
    `;
  }).join("");

  const emptyHtml = `<div style="padding: 50px 16px; text-align: center; color: var(--sub); font-size: 13px; font-weight: 500;">진행 중인 투표 안건이 없습니다.</div>`;

  return simplePage("전자투표", "", `
    <!-- 투표 탭 UI -->
    <div style="display: flex; border-bottom: 1px solid var(--line); margin-bottom: 16px;">
      <button id="voteTabIngBtn" style="flex: 1; text-align: center; padding: 12px; font-size: 13.5px; background: none; border: none; cursor: pointer; transition: all 0.2s ease; ${tabIngStyle}">
        진행 중 투표
      </button>
      <button id="voteTabDoneBtn" style="flex: 1; text-align: center; padding: 12px; font-size: 13.5px; background: none; border: none; cursor: pointer; transition: all 0.2s ease; ${tabDoneStyle}">
        완료된 투표
      </button>
    </div>

    <!-- 투표 목록 카드 -->
    <div class="meeting-section-box" style="margin-top: 10px;">
      <div class="meeting-list-card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); overflow: hidden;">
        ${filtered.length > 0 ? listHtml : emptyHtml}
      </div>
    </div>

    <div style="display: flex; justify-content: center; align-items: center; margin-top: 16px;">
      <div class="meeting-pagination" style="display: flex; align-items: center; gap: 12px;">
        <button class="page-arrow" style="background: none; border: none; font-size: 12px; color: var(--sub); cursor: pointer;" onclick="toast('마지막 페이지입니다.')">◀</button>
        <span class="page-num" style="font-size: 13px; font-weight: 700; color: var(--ink);">1</span>
        <button class="page-arrow" style="background: none; border: none; font-size: 12px; color: var(--sub); cursor: pointer;" onclick="toast('마지막 페이지입니다.')">▶</button>
      </div>
    </div>
  `);
}

function bindVoteEvents() {
  const tabIng = $("#voteTabIngBtn");
  if (tabIng) {
    tabIng.onclick = () => {
      voteTab = "ing";
      $("#app").innerHTML = vote();
      bindVoteEvents();
    };
  }

  const tabDone = $("#voteTabDoneBtn");
  if (tabDone) {
    tabDone.onclick = () => {
      voteTab = "done";
      $("#app").innerHTML = vote();
      bindVoteEvents();
    };
  }

  $$(".vote-row-item").forEach(item => {
    item.onclick = () => {
      currentVoteId = parseInt(item.dataset.id);
      navigate("voteDetail");
    };
  });
}

function voteDetail() {
  const item = votesData.find(v => v.id === currentVoteId) || votesData[0];
  
  // 하단 목록 임베드
  const filtered = votesData.filter(v => v.status === item.status);
  const listHtml = filtered.map((v, idx) => {
    const isCurrent = v.id === currentVoteId;
    const currentStyle = isCurrent ? "background: var(--cream); font-weight: 700;" : "";
    const badgeBg = v.myVoted ? "rgba(107, 142, 35, 0.1)" : "rgba(160, 160, 160, 0.1)";
    const badgeColor = v.myVoted ? "var(--olive)" : "var(--sub)";
    const badgeText = v.myVoted ? "참여 완료" : "미참여";

    return `
      <div class="vote-row-item" data-id="${v.id}" style="display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-bottom: ${idx === filtered.length - 1 ? 'none' : '1px solid var(--line)'}; cursor: pointer; transition: background 0.2s ease; gap: 16px; ${currentStyle}">
        <span style="font-size: 13px; color: var(--ink); text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${v.title}
        </span>
        <span style="font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px; background: ${badgeBg}; color: ${badgeColor}; flex-shrink: 0;">
          ${badgeText}
        </span>
      </div>
    `;
  }).join("");

  const emptyHtml = `<div style="padding: 40px 16px; text-align: center; color: var(--sub); font-size: 13px; font-weight: 500;">투표가 없습니다.</div>`;

  // 투표 안건 상세 폼 또는 결과 렌더링
  let formHtml = "";
  if (item.status === "done") {
    formHtml = `
      <div style="background: #faf8f5; border-radius: 8px; border: 1px solid var(--line); padding: 14px 16px; display: flex; flex-direction: column; gap: 12px; margin-top: 12px;">
        <div style="font-size: 12px; font-weight: 700; color: var(--sub);">투표 최종 개표 결과</div>
        ${item.options.map(opt => {
          const isWinner = opt.name.includes("A엘리베이터") || opt.name.includes("찬성") || opt.name.includes("1번");
          const rateVal = isWinner ? "92%" : "8%";
          return `
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <div style="display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 700; color: var(--ink);">
                <span>${opt.name}</span>
                <span style="color: ${isWinner ? 'var(--olive)' : 'var(--sub)'};">${isWinner ? '당선/선정 (가결)' : ''}</span>
              </div>
              <div style="font-size: 11.5px; color: var(--sub); font-weight: 500;">${opt.description}</div>
              <div style="height: 6px; background: var(--line); border-radius: 3px; overflow: hidden; margin-top: 4px; position: relative;">
                <div style="height: 100%; width: ${rateVal}; background: ${isWinner ? 'var(--olive)' : 'var(--sub)'}; border-radius: 3px;"></div>
              </div>
            </div>
          `;
        }).join("<div style='height: 1px; background: var(--line); margin: 6px 0;'></div>")}
      </div>
    `;
  } else if (item.myVoted) {
    const mySelected = item.options.find(o => o.id === item.votedOptionId) || item.options[0];
    formHtml = `
      <div style="background: #faf8f5; border-radius: 8px; border: 1px solid var(--line); padding: 14px 16px; text-align: center; color: var(--olive); font-size: 13px; font-weight: 700; display: flex; flex-direction: column; gap: 8px; margin-top: 12px;">
        <div>이미 투표에 정상적으로 참여하셨습니다. 🎉</div>
        <div style="font-size: 12px; color: var(--sub); font-weight: 500;">선택하신 항목: [ ${mySelected.name} ]</div>
      </div>
    `;
  } else {
    formHtml = `
      <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 12px;">
        <div style="font-size: 12px; font-weight: 700; color: var(--sub); margin-bottom: 4px;">투표 선택지</div>
        ${item.options.map(opt => `
          <label style="display: flex; align-items: flex-start; gap: 10px; background: #ffffff; border: 1px solid var(--line); padding: 12px 14px; border-radius: 8px; cursor: pointer; transition: all 0.2s ease;">
            <input type="radio" name="voteSelection" value="${opt.id}" style="margin-top: 3px; accent-color: var(--olive);">
            <div style="display: flex; flex-direction: column; gap: 2px;">
              <span style="font-size: 12.5px; font-weight: 700; color: var(--ink);">${opt.name}</span>
              <span style="font-size: 11px; color: var(--sub); font-weight: 500; line-height: 1.4;">${opt.description}</span>
            </div>
          </label>
        `).join("")}
        <button id="voteSubmitBtn" style="width: 100%; margin-top: 8px; padding: 12px; font-weight: 700; font-size: 13px; background: var(--dark) !important; border-radius: 8px; color: #ffffff; border: none; cursor: pointer; transition: opacity 0.2s ease;">
          투표 제출하기
        </button>
      </div>
    `;
  }

  return simplePage("투표 안건 상세", "", `
    <div class="meeting-detail-container">
      <!-- 안건 정보 카드 -->
      <div class="card info-content-box" style="padding: 16px; border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <div style="font-size: 14px; font-weight: 700; color: var(--ink); line-height: 1.4;">${item.title}</div>
          <div style="display: flex; justify-content: flex-end; font-size: 11px; color: var(--sub); font-weight: 500; margin-top: 4px;">
            투표 기간: ${item.period}
          </div>
        </div>
        
        <!-- 구분 실선 -->
        <div style="border-top: 1px solid var(--line);"></div>
        
        <!-- 본문 내용 (투표 참여 폼 또는 결과) -->
        ${formHtml}
      </div>

      <!-- 이전으로 돌아가기 버튼 -->
      <div style="display: flex; gap: 10px; margin-bottom: 24px;">
        <button id="backToVoteListBtn" style="flex: 1; padding: 12px; font-weight: 700; font-size: 13px; border: 1px solid var(--line) !important; background: var(--cream) !important; border-radius: 8px; color: var(--ink); cursor: pointer;">투표 목록으로</button>
      </div>

      <!-- 투표 목록 화면 전체가 그대로 노출 -->
      <div style="margin-top: 32px; border-top: 2px solid var(--line); padding-top: 24px;">
        <div style="font-size: 13.5px; font-weight: 700; color: var(--ink); margin-bottom: 12px;">${item.status === 'ing' ? '진행 중 투표' : '완료된 투표'} 목록</div>
        <div class="meeting-section-box" style="margin-top: 10px;">
          <div class="meeting-list-card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); overflow: hidden;">
            ${filtered.length > 0 ? listHtml : emptyHtml}
          </div>
        </div>
      </div>
    </div>
  `);
}

function bindVoteDetailEvents() {
  const backBtn = $("#backToVoteListBtn");
  if (backBtn) {
    backBtn.onclick = () => {
      navigate("vote");
    };
  }

  const submitBtn = $("#voteSubmitBtn");
  if (submitBtn) {
    submitBtn.onclick = () => {
      const checked = $("input[name='voteSelection']:checked");
      if (!checked) {
        toast("투표하실 항목을 선택해 주세요.");
        return;
      }

      const optId = parseInt(checked.value);
      const item = votesData.find(v => v.id === currentVoteId);
      if (item) {
        item.myVoted = true;
        item.votedOptionId = optId;
        item.votedCount += 1;
        toast("투표가 성공적으로 반영되었습니다. 🗳️");
        setTimeout(() => {
          $("#app").innerHTML = voteDetail();
          bindVoteDetailEvents();
        }, 1000);
      }
    };
  }

  // 하단 투표 목록 아이템 클릭 오버라이드
  $$(".vote-row-item").forEach(item => {
    item.onclick = () => {
      currentVoteId = parseInt(item.dataset.id);
      $("#app").innerHTML = voteDetail();
      bindVoteDetailEvents();
      window.scrollTo(0, 0);
    };
  });
}

function clubCreate() {
  const headerHtml = `
    <div class="meeting-write-header" style="display: flex; justify-content: space-between; align-items: center; padding: 8px 4px; border-bottom: 2px solid var(--dark); margin-bottom: 20px;">
      <button id="clubCreateBackBtn" style="background: none; border: none; font-size: 16px; color: var(--ink); cursor: pointer; display: flex; align-items: center; padding: 0;">
        <i class="fi fi-rr-arrow-left" style="font-weight: 700;"></i>
      </button>
      <h2 style="font-size: 15px; font-weight: 700; color: var(--ink); margin: 0;">새로운 소모임 개설</h2>
      <button id="clubCreateMenuBtn" style="background: none; border: none; font-size: 16px; color: var(--ink); cursor: pointer; display: flex; align-items: center; padding: 0;">
        <i class="fi fi-rr-menu-burger" style="font-weight: 700;"></i>
      </button>
    </div>
  `;

  const bodyHtml = `
    ${headerHtml}
    
    <div style="font-size: 13px; font-weight: 700; color: var(--ink); margin: 16px 0 8px 4px;">[ 모임 기본 정보 입력 ]</div>
    <div class="card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); overflow: hidden; display: flex; flex-direction: column; margin-bottom: 20px;">
      <div style="display: flex; align-items: center; padding: 12px 16px; gap: 12px; border-bottom: 1px solid var(--line);">
        <span style="font-size: 12.5px; font-weight: 700; color: var(--sub); width: 80px; white-space: nowrap;">모임 이름</span>
        <input type="text" id="clubCreateName" placeholder="모임 이름을 입력해 주세요." style="flex: 1; border: 1px solid var(--line); background: #ffffff; padding: 8px 12px; border-radius: 8px; font-size: 12.5px; font-weight: 500; color: var(--ink); outline: none;">
      </div>
      
      <div style="display: flex; align-items: center; padding: 12px 16px; gap: 12px; border-bottom: 1px solid var(--line);">
        <span style="font-size: 12.5px; font-weight: 700; color: var(--sub); width: 80px; white-space: nowrap;">대표 아이콘</span>
        <div style="position: relative; flex: 1; display: flex; align-items: center;">
          <select id="clubCreateIcon" style="width: 100%; border: 1px solid var(--line); background: #ffffff; padding: 8px 12px; border-radius: 8px; font-size: 12.5px; font-weight: 500; color: var(--ink); outline: none; appearance: none;">
            <option value="running">달리기 (Running)</option>
            <option value="music">음악/기타 (Music)</option>
            <option value="baby">육아/가족 (Baby)</option>
            <option value="dumbbell">헬스/운동 (Dumbbell)</option>
            <option value="book-alt">독서/책 (Book)</option>
          </select>
          <i class="fi fi-rr-angle-small-down" style="position: absolute; right: 10px; color: var(--sub); pointer-events: none; font-size: 16px;"></i>
        </div>
      </div>

      <div style="display: flex; align-items: center; padding: 12px 16px; gap: 12px;">
        <span style="font-size: 12.5px; font-weight: 700; color: var(--sub); width: 80px; white-space: nowrap;">최대 정원</span>
        <div style="position: relative; flex: 1; display: flex; align-items: center;">
          <select id="clubCreateMaxMembers" style="width: 100%; border: 1px solid var(--line); background: #ffffff; padding: 8px 12px; border-radius: 8px; font-size: 12.5px; font-weight: 500; color: var(--ink); outline: none; appearance: none;">
            <option value="5">5명</option>
            <option value="10">10명</option>
            <option value="15">15명</option>
            <option value="20">20명</option>
            <option value="30">30명</option>
          </select>
          <i class="fi fi-rr-angle-small-down" style="position: absolute; right: 10px; color: var(--sub); pointer-events: none; font-size: 16px;"></i>
        </div>
      </div>
    </div>

    <div class="card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); padding: 14px 16px; margin-bottom: 20px;">
      <textarea id="clubCreateDesc" placeholder="이웃 주민들이 가입하고 싶어지도록, 모임의 개설 목적이나 주요 활동에 대한 상세한 모임 소개를 입력해 주세요." style="width: 100%; height: 180px; border: 1px solid var(--line); border-radius: 8px; padding: 12px; font-size: 12.5px; font-weight: 500; color: var(--ink); outline: none; resize: none; line-height: 1.6; font-family: inherit;"></textarea>
    </div>

    <button class="primary" id="clubCreateSubmitBtn" style="width: 100%; padding: 14px; font-weight: 700; font-size: 14px; background: var(--dark) !important; border-radius: 12px; color: #ffffff; border: none; cursor: pointer; transition: opacity 0.2s ease; margin-bottom: 24px;">
      개설 완료하기
    </button>
  `;

  return `<section class="page" style="padding: 16px;">${bodyHtml}</section>`;
}

function bindClubCreateEvents() {
  const backBtn = $("#clubCreateBackBtn");
  if (backBtn) {
    backBtn.onclick = () => {
      navigate("community");
    };
  }

  const menuBtn = $("#clubCreateMenuBtn");
  if (menuBtn) {
    menuBtn.onclick = () => {
      $("#drawer").classList.add("open");
    };
  }

  const submitBtn = $("#clubCreateSubmitBtn");
  if (submitBtn) {
    submitBtn.onclick = () => {
      const name = $("#clubCreateName").value.trim();
      const iconName = $("#clubCreateIcon").value;
      const maxMembers = parseInt($("#clubCreateMaxMembers").value);
      const desc = $("#clubCreateDesc").value.trim();

      if (!name || !desc) {
        toast("모임 이름과 소개글을 모두 입력해 주세요.");
        return;
      }

      const newClub = {
        id: userClubs.length + availableClubs.length + 100,
        name: name,
        iconName: iconName,
        members: 1,
        maxMembers: maxMembers,
        desc: desc
      };

      userClubs.unshift(newClub);
      toast("새로운 소모임이 성공적으로 개설되었습니다. 🎉");
      
      setTimeout(() => {
        navigate("community");
      }, 1000);
    };
  }
}

function generic(){return simplePage("서비스 준비 중","더 좋은 경험을 준비하고 있어요.",`<article class="card report-card"><h3>곧 만나요</h3><p>이 메뉴는 화면 구성 확인을 위한 준비 상태입니다.</p></article>`)}

function board() {
  const query = boardSearchQuery.trim().toLowerCase();
  const results = boardPosts.filter(post => 
    post.author.toLowerCase().includes(query) || 
    post.title.toLowerCase().includes(query) || 
    post.content.toLowerCase().includes(query)
  );
  
  const searchNotice = query ? `* 검색 결과: '${boardSearchQuery}'에 대한 결과가 총 ${results.length}건 있습니다.` : `* 전체 게시글 목록이 총 ${results.length}건 있습니다.`;
  
  const listHtml = results.map((post, idx) => {
    const formattedDate = post.time.split(" ")[0].slice(2);
    return `
      <div class="board-row-item" data-id="${post.id}" style="display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-bottom: ${idx === results.length - 1 ? 'none' : '1px solid var(--line)'}; cursor: pointer; transition: background 0.2s ease; gap: 16px;">
        <span style="font-size: 13px; font-weight: 600; color: var(--ink); text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${post.title}
        </span>
        <span class="date" style="font-size: 11.5px; color: var(--sub); font-weight: 500; text-align: right; flex-shrink: 0; min-width: 60px;">${formattedDate}</span>
      </div>
    `;
  }).join("");
  
  const emptyHtml = `<div style="padding: 40px 16px; text-align: center; color: var(--sub); font-size: 13px; font-weight: 500;">검색 결과가 없습니다.</div>`;
  
  return simplePage("자유게시판", "", `
    <div class="meeting-section-box" style="margin-top: 10px;">
      <div class="meeting-list-card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); overflow: hidden;">
        ${results.length > 0 ? listHtml : emptyHtml}
      </div>
    </div>
    
    <!-- 페이징 및 우측 글작성 버튼 영역 -->
    <div style="display: flex; justify-content: center; align-items: center; margin-top: 12px; position: relative; min-height: 38px;">
      <div class="meeting-pagination" style="display: flex; align-items: center; gap: 12px;">
        <button class="page-arrow" style="background: none; border: none; font-size: 12px; color: var(--sub); cursor: pointer;" onclick="toast('마지막 페이지입니다.')">◀</button>
        <span class="page-num" style="font-size: 13px; font-weight: 700; color: var(--ink);">1</span>
        <button class="page-arrow" style="background: none; border: none; font-size: 12px; color: var(--sub); cursor: pointer;" onclick="toast('마지막 페이지입니다.')">▶</button>
      </div>
      <button id="boardWriteBtn" style="position: absolute; right: 0; padding: 10px 18px; font-weight: 700; font-size: 12.5px; background: var(--dark) !important; border-radius: 8px; color: #ffffff; cursor: pointer; transition: all 0.2s ease; border: none; display: flex; align-items: center; gap: 6px;">
        <i class="fi fi-rr-edit" style="font-size: 12px;"></i> 글작성
      </button>
    </div>

    <!-- 검색란 (하단 이동) -->
    <div class="meeting-section-box" style="margin-top: 12px;">
      <div class="meeting-search-bar" style="display: flex; gap: 8px;">
        <input type="text" id="boardSearchInput" placeholder="검색어를 입력하세요." value="${boardSearchQuery}" style="flex: 1; border: 1px solid var(--line); background: #ffffff; padding: 10px 12px; border-radius: 8px; font-size: 12.5px; outline: none;">
        <button id="boardSearchSubmitBtn" style="padding: 10px 16px; background: var(--dark) !important; color: #ffffff; border: none; font-size: 12.5px; font-weight: 700; border-radius: 8px; cursor: pointer;">검색</button>
      </div>
      ${query ? `<div class="meeting-search-notice" style="font-size: 11px; color: var(--olive); font-weight: 600; margin-top: 8px; padding-left: 4px;">${searchNotice}</div>` : ""}
    </div>
  `);
}

function bindBoardEvents() {
  const searchBtn = $("#boardSearchSubmitBtn");
  const searchInput = $("#boardSearchInput");
  if (searchBtn && searchInput) {
    searchBtn.onclick = () => {
      boardSearchQuery = searchInput.value;
      $("#app").innerHTML = board();
      bindBoardEvents();
    };
    searchInput.onkeydown = (e) => {
      if (e.key === "Enter") {
        boardSearchQuery = searchInput.value;
        $("#app").innerHTML = board();
        bindBoardEvents();
      }
    };
  }
  
  $$(".board-row-item").forEach(item => {
    item.onclick = () => {
      currentBoardPostId = parseInt(item.dataset.id);
      navigate("boardDetail");
    };
  });
  
  const writeBtn = $("#boardWriteBtn");
  if (writeBtn) {
    writeBtn.onclick = () => {
      navigate("boardWrite");
    };
  }
}

function boardDetail() {
  const post = boardPosts.find(x => x.id === currentBoardPostId) || boardPosts[0];
  
  const query = boardSearchQuery.trim().toLowerCase();
  const results = boardPosts.filter(post => 
    post.author.toLowerCase().includes(query) || 
    post.title.toLowerCase().includes(query) || 
    post.content.toLowerCase().includes(query)
  );
  
  const searchNotice = query ? `* 검색 결과: '${boardSearchQuery}'에 대한 결과가 총 ${results.length}건 있습니다.` : `* 전체 게시글 목록이 총 ${results.length}건 있습니다.`;
  
  const listHtml = results.map((p, idx) => {
    const isCurrent = p.id === currentBoardPostId;
    const currentStyle = isCurrent ? "background: var(--cream); font-weight: 700;" : "";
    const formattedDate = p.time.split(" ")[0].slice(2);
    return `
      <div class="board-row-item" data-id="${p.id}" style="display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-bottom: ${idx === results.length - 1 ? 'none' : '1px solid var(--line)'}; cursor: pointer; transition: background 0.2s ease; gap: 16px; ${currentStyle}">
        <span style="font-size: 13px; color: var(--ink); text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${p.title}
        </span>
        <span class="date" style="font-size: 11.5px; color: var(--sub); font-weight: 500; text-align: right; flex-shrink: 0; min-width: 60px;">${formattedDate}</span>
      </div>
    `;
  }).join("");
  
  const emptyHtml = `<div style="padding: 40px 16px; text-align: center; color: var(--sub); font-size: 13px; font-weight: 500;">검색 결과가 없습니다.</div>`;

  const isAuthor = post.author === "주민B (102동)" || post.author.includes("익명");
  const authorActionsHtml = isAuthor ? `
    <div style="border-top: 1px solid var(--line); margin-top: 12px; padding-top: 10px; display: flex; gap: 12px; justify-content: flex-end;">
      <button id="boardPostEditBtn" style="background: none; border: 0; color: var(--sub); font-size: 12.5px; font-weight: 700; cursor: pointer; padding: 0;">수정</button>
      <button id="boardPostDeleteBtn" style="background: none; border: 0; color: #e15241; font-size: 12.5px; font-weight: 700; cursor: pointer; padding: 0;">삭제</button>
    </div>
  ` : "";

  return simplePage("자유게시판", "", `
    <div class="meeting-detail-container">
      <div class="card info-content-box" style="padding: 16px; border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
        <!-- 제목 및 정보 영역 (모던 스타일) -->
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <div style="font-size: 14px; font-weight: 700; color: var(--ink); line-height: 1.4;">${post.title}</div>
          <div style="display: flex; justify-content: flex-end; font-size: 11px; color: var(--sub); font-weight: 500; margin-top: 4px;">
            ${post.time}
          </div>
        </div>
        
        <!-- 구분 실선 -->
        <div style="border-top: 1px solid var(--line);"></div>
        
        <!-- 본문 내용 영역 -->
        <div style="line-height: 1.6; font-size: 13px; white-space: pre-wrap; word-break: break-all; color: var(--ink); font-weight: 500; text-align: left;">${post.content || post.title}</div>
        
        <!-- 첨부 파일 영역 -->
        <div style="border-top: 1px solid var(--line); margin-top: 12px; padding-top: 12px;">
          <div style="font-size: 11px; font-weight: 700; color: var(--sub); margin-bottom: 8px;">첨부 파일</div>
          <div class="card board-file-box" style="padding: 10px 12px; display: flex; align-items: center; gap: 8px; cursor: pointer; border-radius: 8px; border: 1px solid var(--line); background: #faf8f5;">
            <span style="font-size: 14px;">📎</span>
            <span style="font-size: 12px; font-weight: 600; color: var(--ink); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">참고자료_및_안내문.pdf</span>
            <span style="font-size: 10.5px; color: var(--sub); font-weight: 600; flex-shrink: 0;">(920KB)</span>
          </div>
        </div>
        
        ${authorActionsHtml}
      </div>
      
      <div class="meeting-section-box" style="margin-top: 24px; margin-bottom: 24px;">
        <div class="card" style="padding: 16px; border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow);">
          <div style="font-size: 12px; font-weight: 700; color: var(--sub); margin-bottom: 12px;">댓글 ${post.commentsList ? post.commentsList.length : 0}개</div>
          <div id="boardDetailCommentsList" style="display: flex; flex-direction: column; gap: 10px;">
            ${(post.commentsList && post.commentsList.length > 0) ? post.commentsList.map((c, commentIdx) => `
              <div style="background: #faf8f5; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--line); display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
                <div style="flex: 1;">
                  <div style="display: flex; justify-content: space-between; font-size: 11.5px; color: var(--sub); font-weight: 700; margin-bottom: 4px;">
                    <span>${c.author}</span>
                    <span style="font-weight: 500;">${c.time}</span>
                  </div>
                  <p style="font-size: 12px; color: var(--ink); font-weight: 500; line-height: 1.4; margin: 0;">${c.content}</p>
                </div>
                <button class="board-comment-delete-btn" data-index="${commentIdx}" style="background: none; border: none; color: #e15241; font-size: 11px; font-weight: 700; cursor: pointer; padding: 0 4px; white-space: nowrap; margin-top: 2px;">삭제</button>
              </div>
            `).join("") : `<p style="font-size: 12.5px; color: var(--sub); text-align: center; margin: 0; padding: 12px 0;">첫 댓글을 남겨보세요!</p>`}
          </div>
          
          <div style="display: flex; gap: 8px; margin-top: 16px; align-items: center;">
            <input type="text" id="boardDetailCommentInput" placeholder="댓글을 입력하세요." style="flex: 1; padding: 8px 12px; border: 1px solid var(--line); border-radius: 8px; font-size: 12px; color: var(--ink); outline: none;">
            <button id="boardDetailCommentSubmitBtn" style="padding: 8px 16px; background: var(--dark) !important; color: #ffffff; border: none; font-size: 12px; font-weight: 700; border-radius: 8px; cursor: pointer;">등록</button>
          </div>
        </div>
      </div>

      <!-- 자유게시판 글 목록 화면 전체가 그대로 노출 -->
      <div style="margin-top: 32px; border-top: 2px solid var(--line); padding-top: 24px;">
        <div class="meeting-section-box" style="margin-top: 10px;">
          <div class="meeting-list-card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); overflow: hidden;">
            ${results.length > 0 ? listHtml : emptyHtml}
          </div>
        </div>
        
        <div style="display: flex; justify-content: center; align-items: center; margin-top: 12px; position: relative; min-height: 38px;">
          <div class="meeting-pagination" style="display: flex; align-items: center; gap: 12px;">
            <button class="page-arrow" style="background: none; border: none; font-size: 12px; color: var(--sub); cursor: pointer;" onclick="toast('마지막 페이지입니다.')">◀</button>
            <span class="page-num" style="font-size: 13px; font-weight: 700; color: var(--ink);">1</span>
            <button class="page-arrow" style="background: none; border: none; font-size: 12px; color: var(--sub); cursor: pointer;" onclick="toast('마지막 페이지입니다.')">▶</button>
          </div>
          <button id="boardWriteBtn" style="position: absolute; right: 0; padding: 10px 18px; font-weight: 700; font-size: 12.5px; background: var(--dark) !important; border-radius: 8px; color: #ffffff; cursor: pointer; transition: all 0.2s ease; border: none; display: flex; align-items: center; gap: 6px;">
            <i class="fi fi-rr-edit" style="font-size: 12px;"></i> 글작성
          </button>
        </div>

        <div class="meeting-section-box" style="margin-top: 12px;">
          <div class="meeting-search-bar" style="display: flex; gap: 8px;">
            <input type="text" id="boardSearchInput" placeholder="검색어를 입력하세요." value="${boardSearchQuery}" style="flex: 1; border: 1px solid var(--line); background: #ffffff; padding: 10px 12px; border-radius: 8px; font-size: 12.5px; outline: none;">
            <button id="boardSearchSubmitBtn" style="padding: 10px 16px; background: var(--dark) !important; color: #ffffff; border: none; font-size: 12.5px; font-weight: 700; border-radius: 8px; cursor: pointer;">검색</button>
          </div>
          ${query ? `<div class="meeting-search-notice" style="font-size: 11px; color: var(--olive); font-weight: 600; margin-top: 8px; padding-left: 4px;">${searchNotice}</div>` : ""}
        </div>
      </div>
    </div>
  `);
}

function bindBoardDetailEvents() {
  const fileBox = $(".board-file-box");
  if (fileBox) {
    fileBox.onclick = () => {
      toast("첨부파일을 다운로드합니다.");
    };
  }

  const listBtn = $("#boardDetailListBtn");
  if (listBtn) {
    listBtn.onclick = () => {
      navigate("board");
    };
  }

  // 자유게시판 목록의 이벤트 바인딩 호출
  bindBoardEvents();

  // 하단 자유게시판 목록 아이템 클릭 시, 상세 보기 이동 및 새로고침 오버라이드
  $$(".board-row-item").forEach(item => {
    item.onclick = () => {
      currentBoardPostId = parseInt(item.dataset.id);
      $("#app").innerHTML = boardDetail();
      bindBoardDetailEvents();
      window.scrollTo(0, 0);
    };
  });
  
  const commentBtn = $("#boardDetailCommentSubmitBtn");
  const commentInput = $("#boardDetailCommentInput");
  if (commentBtn && commentInput) {
    commentBtn.onclick = () => {
      const txt = commentInput.value.trim();
      if (!txt) {
        toast("댓글 내용을 입력해 주세요.");
        return;
      }
      const post = boardPosts.find(x => x.id === currentBoardPostId) || boardPosts[0];
      if (!post.commentsList) post.commentsList = [];

      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const hh = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      const formattedTime = `${yyyy}.${mm}.${dd} ${hh}:${min}`;

      post.commentsList.push({
        author: "주민B (102동)",
        time: formattedTime,
        content: txt
      });

      toast("댓글이 등록되었습니다. 🎉");
      $("#app").innerHTML = boardDetail();
      bindBoardDetailEvents();
    };
  }

  const editBtn = $("#boardPostEditBtn");
  if (editBtn) {
    editBtn.onclick = () => {
      navigate("boardEdit");
    };
  }

  const deleteBtn = $("#boardPostDeleteBtn");
  if (deleteBtn) {
    deleteBtn.onclick = () => {
      if (confirm("정말 이 게시글을 삭제하시겠습니까?")) {
        boardPosts = boardPosts.filter(x => x.id !== currentBoardPostId);
        toast("게시글이 삭제되었습니다.");
        setTimeout(() => {
          navigate("board");
        }, 1000);
      }
    };
  }

  $$(".board-comment-delete-btn").forEach(btn => {
    btn.onclick = () => {
      const commentIdx = parseInt(btn.dataset.index);
      const post = boardPosts.find(x => x.id === currentBoardPostId) || boardPosts[0];
      if (post && post.commentsList) {
        if (confirm("댓글을 삭제하시겠습니까?")) {
          post.commentsList.splice(commentIdx, 1);
          toast("댓글이 삭제되었습니다.");
          $("#app").innerHTML = boardDetail();
          bindBoardDetailEvents();
        }
      }
    };
  });
}

function boardWrite() {
  const headerHtml = `
    <div class="meeting-write-header" style="display: flex; justify-content: space-between; align-items: center; padding: 8px 4px; border-bottom: 2px solid var(--dark); margin-bottom: 20px;">
      <button id="boardWriteBackBtn" style="background: none; border: none; font-size: 16px; color: var(--ink); cursor: pointer; display: flex; align-items: center; padding: 0;">
        <i class="fi fi-rr-arrow-left" style="font-weight: 700;"></i>
      </button>
      <h2 style="font-size: 15px; font-weight: 700; color: var(--ink); margin: 0;">자유게시판 글쓰기</h2>
      <button id="boardWriteMenuBtn" style="background: none; border: none; font-size: 16px; color: var(--ink); cursor: pointer; display: flex; align-items: center; padding: 0;">
        <i class="fi fi-rr-menu-burger" style="font-weight: 700;"></i>
      </button>
    </div>
  `;

  const bodyHtml = `
    ${headerHtml}
    
    <!-- Basic Info -->
    <div style="font-size: 13px; font-weight: 700; color: var(--ink); margin: 16px 0 8px 4px;">[ 게시글 기본 정보 입력 ]</div>
    <div class="card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); overflow: hidden; display: flex; flex-direction: column; margin-bottom: 20px;">
      <div style="display: flex; align-items: center; padding: 12px 16px; gap: 12px;">
        <span style="font-size: 12.5px; font-weight: 700; color: var(--sub); width: 80px; white-space: nowrap;">글 제목</span>
        <input type="text" id="boardWriteTitle" placeholder="제목을 입력해 주세요." style="flex: 1; border: 1px solid var(--line); background: #ffffff; padding: 8px 12px; border-radius: 8px; font-size: 12.5px; font-weight: 500; color: var(--ink); outline: none;">
      </div>
    </div>

    <!-- Detailed Content -->
    <div class="card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); padding: 14px 16px; margin-bottom: 20px;">
      <textarea id="boardWriteContent" placeholder="이웃과 나누고 싶은 이야기를 자유롭게 입력해 주세요." style="width: 100%; height: 220px; border: 1px solid var(--line); border-radius: 8px; padding: 12px; font-size: 12.5px; font-weight: 500; color: var(--ink); outline: none; resize: none; line-height: 1.6; font-family: inherit;"></textarea>
    </div>

    <!-- Attachments -->
    <div style="font-size: 13px; font-weight: 700; color: var(--ink); margin: 16px 0 8px 4px; display: flex; align-items: center; gap: 6px;">
      <i class="fi fi-rr-clip" style="color: var(--olive); font-size: 13.5px;"></i> 첨부 파일
    </div>
    <div class="card file-upload-box" id="boardFileBtn" style="border-radius: 12px; background: #ffffff; border: 1px dashed var(--olive); box-shadow: var(--shadow); padding: 16px; text-align: center; cursor: pointer; transition: background 0.2s ease; margin-bottom: 24px;">
      <div style="font-size: 12.5px; font-weight: 700; color: var(--olive); display: flex; align-items: center; justify-content: center; gap: 6px;">
        <i class="fi fi-rr-plus" style="font-size: 12px;"></i> 파일 첨부
      </div>
      <div id="boardAttachedFileName" style="font-size: 11px; color: var(--sub); font-weight: 600; margin-top: 4px;">이미지 또는 첨부파일 (최대 10MB)</div>
    </div>

    <!-- Submit Button -->
    <button class="primary" id="boardSubmitBtn" style="width: 100%; padding: 14px; font-weight: 700; font-size: 14px; background: var(--dark) !important; border-radius: 12px; color: #ffffff; border: none; cursor: pointer; transition: opacity 0.2s ease; margin-bottom: 24px;">
      게시글 등록하기
    </button>
  `;

  return `<section class="page" style="padding: 16px;">${bodyHtml}</section>`;
}

function bindBoardWriteEvents() {
  const backBtn = $("#boardWriteBackBtn");
  if (backBtn) {
    backBtn.onclick = () => {
      navigate("board");
    };
  }

  const menuBtn = $("#boardWriteMenuBtn");
  if (menuBtn) {
    menuBtn.onclick = () => {
      $("#drawer").classList.add("open");
    };
  }

  const fileBtn = $("#boardFileBtn");
  if (fileBtn) {
    fileBtn.onclick = () => {
      const nameArea = $("#boardAttachedFileName");
      if (nameArea) {
        nameArea.textContent = "첨부_이미지.jpg (1.8MB)";
        nameArea.style.color = "var(--ink)";
        toast("파일이 선택되었습니다. 📎");
      }
    };
  }

  const submitBtn = $("#boardSubmitBtn");
  if (submitBtn) {
    submitBtn.onclick = () => {
      const titleInput = $("#boardWriteTitle");
      const title = titleInput.value.trim();
      const content = $("#boardWriteContent").value.trim();

      if (!title || !content) {
        toast("제목과 내용을 모두 입력해 주세요.");
        return;
      }

      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const hh = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      const formattedTime = `${yyyy}.${mm}.${dd} ${hh}:${min}`;

      const newPost = {
        id: boardPosts.length + 1,
        author: "익명",
        time: formattedTime,
        title: title,
        content: content,
        commentsList: []
      };

      boardPosts.unshift(newPost);
      toast("게시글이 성공적으로 등록되었습니다. 🎉");
      
      setTimeout(() => {
        navigate("board");
      }, 1000);
    };
  }
}

function boardEdit() {
  const post = boardPosts.find(x => x.id === currentBoardPostId) || boardPosts[0];
  
  const headerHtml = `
    <div class="meeting-write-header" style="display: flex; justify-content: space-between; align-items: center; padding: 8px 4px; border-bottom: 2px solid var(--dark); margin-bottom: 20px;">
      <button id="boardEditBackBtn" style="background: none; border: none; font-size: 16px; color: var(--ink); cursor: pointer; display: flex; align-items: center; padding: 0;">
        <i class="fi fi-rr-arrow-left" style="font-weight: 700;"></i>
      </button>
      <h2 style="font-size: 15px; font-weight: 700; color: var(--ink); margin: 0;">자유게시판 글 수정</h2>
      <div style="width: 16px;"></div>
    </div>
  `;

  const bodyHtml = `
    ${headerHtml}
    
    <div style="font-size: 13px; font-weight: 700; color: var(--ink); margin: 16px 0 8px 4px;">[ 게시글 정보 수정 ]</div>
    <div class="card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); overflow: hidden; display: flex; flex-direction: column; margin-bottom: 20px;">
      <div style="display: flex; align-items: center; padding: 12px 16px; gap: 12px;">
        <span style="font-size: 12.5px; font-weight: 700; color: var(--sub); width: 80px; white-space: nowrap;">글 제목</span>
        <input type="text" id="boardEditTitle" placeholder="제목을 입력해 주세요." value="${post.title}" style="flex: 1; border: 1px solid var(--line); background: #ffffff; padding: 8px 12px; border-radius: 8px; font-size: 12.5px; font-weight: 500; color: var(--ink); outline: none;">
      </div>
    </div>

    <div class="card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); padding: 14px 16px; margin-bottom: 20px;">
      <textarea id="boardEditContent" placeholder="내용을 입력해 주세요." style="width: 100%; height: 220px; border: 1px solid var(--line); border-radius: 8px; padding: 12px; font-size: 12.5px; font-weight: 500; color: var(--ink); outline: none; resize: none; line-height: 1.6; font-family: inherit;">${post.content || post.title}</textarea>
    </div>

    <button class="primary" id="boardEditSubmitBtn" style="width: 100%; padding: 14px; font-weight: 700; font-size: 14px; background: var(--dark) !important; border-radius: 12px; color: #ffffff; border: none; cursor: pointer; transition: opacity 0.2s ease; margin-bottom: 24px;">
      수정 완료하기
    </button>
  `;

  return `<section class="page" style="padding: 16px;">${bodyHtml}</section>`;
}

function bindBoardEditEvents() {
  const backBtn = $("#boardEditBackBtn");
  if (backBtn) {
    backBtn.onclick = () => {
      navigate("boardDetail");
    };
  }

  const submitBtn = $("#boardEditSubmitBtn");
  if (submitBtn) {
    submitBtn.onclick = () => {
      const title = $("#boardEditTitle").value.trim();
      const content = $("#boardEditContent").value.trim();

      if (!title || !content) {
        toast("제목과 내용을 모두 입력해 주세요.");
        return;
      }

      const post = boardPosts.find(x => x.id === currentBoardPostId);
      if (post) {
        post.title = title;
        post.content = content;
        toast("게시글이 수정되었습니다. 🎉");
        setTimeout(() => {
          navigate("boardDetail");
        }, 1000);
      }
    };
  }
}


function meetingMinutesWrite() {
  const headerHtml = `
    <div class="meeting-write-header" style="display: flex; justify-content: space-between; align-items: center; padding: 8px 4px; border-bottom: 2px solid var(--dark); margin-bottom: 20px;">
      <button id="meetingWriteBackBtn" style="background: none; border: none; font-size: 16px; color: var(--ink); cursor: pointer; display: flex; align-items: center; padding: 0;">
        <i class="fi fi-rr-arrow-left" style="font-weight: 700;"></i>
      </button>
      <h2 style="font-size: 15px; font-weight: 700; color: var(--ink); margin: 0;">회의록 작성</h2>
      <button id="meetingWriteMenuBtn" style="background: none; border: none; font-size: 16px; color: var(--ink); cursor: pointer; display: flex; align-items: center; padding: 0;">
        <i class="fi fi-rr-menu-burger" style="font-weight: 700;"></i>
      </button>
    </div>
  `;

  const bodyHtml = `
    ${headerHtml}
    
    <!-- Basic Info -->
    <div style="font-size: 13px; font-weight: 700; color: var(--ink); margin: 16px 0 8px 4px;">[ 회의 기본 정보 입력 ]</div>
    <div class="card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); overflow: hidden; display: flex; flex-direction: column; margin-bottom: 20px;">
      <div style="display: flex; align-items: center; padding: 12px 16px; border-bottom: 1px solid var(--line); gap: 12px;">
        <span style="font-size: 12.5px; font-weight: 700; color: var(--sub); width: 80px; white-space: nowrap;">회의 분류</span>
        <div style="position: relative; flex: 1; display: flex; align-items: center;">
          <select id="meetingWriteCategory" style="width: 100%; border: 1px solid var(--line); background: var(--bg); padding: 8px 30px 8px 12px; border-radius: 8px; font-size: 12.5px; font-weight: 600; color: var(--ink); outline: none; cursor: pointer; -webkit-appearance: none; -moz-appearance: none; appearance: none;">
            <option value="📢 입주자대표회의 정기회의">📢 입주자대표회의 정기회의</option>
            <option value="입주자대표회의 임시회의">입주자대표회의 임시회의</option>
            <option value="주민 공동체 간담회">주민 공동체 간담회</option>
          </select>
          <i class="fi fi-rr-angle-small-down" style="position: absolute; right: 10px; color: var(--sub); pointer-events: none; font-size: 16px;"></i>
        </div>
      </div>
      <div style="display: flex; align-items: center; padding: 12px 16px; gap: 12px;">
        <span style="font-size: 12.5px; font-weight: 700; color: var(--sub); width: 80px; white-space: nowrap;">회의 제목</span>
        <input type="text" id="meetingWriteTitle" placeholder="2026년 7월 정기 입주자대표회의 결과 공고" style="flex: 1; border: 1px solid var(--line); background: #ffffff; padding: 8px 12px; border-radius: 8px; font-size: 12.5px; font-weight: 500; color: var(--ink); outline: none;">
      </div>
    </div>

    <!-- Detailed Content -->
    <div style="font-size: 13px; font-weight: 700; color: var(--ink); margin: 16px 0 8px 4px; display: flex; align-items: center; gap: 6px;">
      <i class="fi fi-rr-document-text" style="color: var(--olive); font-size: 13.5px;"></i> 상세 회의 내용
    </div>
    <div class="card" style="border-radius: 12px; background: #ffffff; border: 1px solid var(--line); box-shadow: var(--shadow); padding: 14px 16px; margin-bottom: 20px;">
      <textarea id="meetingDetailedContent" placeholder="회의 일시, 장소, 핵심 의결 사항을 포함한 회의 상세 내용을 입력해 주세요." style="width: 100%; height: 220px; border: 1px solid var(--line); border-radius: 8px; padding: 12px; font-size: 12.5px; font-weight: 500; color: var(--ink); outline: none; resize: none; line-height: 1.6; font-family: inherit;">[회의 정보]
- 일시: 2026년 6월 26일 (금) 19:30 ~ 21:00
- 장소: 단지 내 관리실 2층 대회의실

[핵심 의결 사항]
1. 단지 내 CCTV 노후 장비 5대 교체 건 -> [ 가결 ]
2. 여름철 놀이터 간이 물놀이장 운영 건 -> [ 부결 (예산 부족) ]

[상세 논의 내용]
[ 의제 1. CCTV 교체 건 ]
- 103동 지하 주차장 및 정문 사각지대 개선을 위해 내달 중 교체 진행..</textarea>
    </div>

    <!-- Attachments -->
    <div style="font-size: 13px; font-weight: 700; color: var(--ink); margin: 16px 0 8px 4px; display: flex; align-items: center; gap: 6px;">
      <i class="fi fi-rr-clip" style="color: var(--olive); font-size: 13.5px;"></i> 첨부 파일
    </div>
    <div class="card file-upload-box" id="meetingFileBtn" style="border-radius: 12px; background: #ffffff; border: 1px dashed var(--olive); box-shadow: var(--shadow); padding: 16px; text-align: center; cursor: pointer; transition: background 0.2s ease; margin-bottom: 24px;">
      <div style="font-size: 12.5px; font-weight: 700; color: var(--olive); display: flex; align-items: center; justify-content: center; gap: 6px;">
        <i class="fi fi-rr-plus" style="font-size: 12px;"></i> 파일 첨부
      </div>
      <div id="attachedFileName" style="font-size: 11px; color: var(--sub); font-weight: 600; margin-top: 4px;">의결 주문서 및 서명부 PDF (최대 10MB)</div>
    </div>

    <!-- Submit Button -->
    <button class="primary" id="meetingSubmitBtn" style="width: 100%; padding: 14px; font-weight: 700; font-size: 14px; background: var(--dark) !important; border-radius: 12px; color: #ffffff; border: none; cursor: pointer; transition: opacity 0.2s ease; margin-bottom: 24px;">
      회의록 등록하기
    </button>
  `;

  return `<section class="page" style="padding: 16px;">${bodyHtml}</section>`;
}

function bindMeetingMinutesWriteEvents() {
  const backBtn = $("#meetingWriteBackBtn");
  if (backBtn) {
    backBtn.onclick = () => {
      navigate("meetingMinutes");
    };
  }

  const menuBtn = $("#meetingWriteMenuBtn");
  if (menuBtn) {
    menuBtn.onclick = () => {
      $("#drawer").classList.add("open");
    };
  }

  const fileBtn = $("#meetingFileBtn");
  if (fileBtn) {
    fileBtn.onclick = () => {
      const nameArea = $("#attachedFileName");
      if (nameArea) {
        nameArea.textContent = "의결 주문서 및 서명부_제출본.pdf (4.8MB)";
        nameArea.style.color = "var(--ink)";
        toast("파일이 선택되었습니다. 📎");
      }
    };
  }

  const submitBtn = $("#meetingSubmitBtn");
  if (submitBtn) {
    submitBtn.onclick = () => {
      const titleInput = $("#meetingWriteTitle");
      const title = titleInput.value.trim() || titleInput.placeholder;
      
      const newMinutes = {
        id: meetingMinutesData.length + 1,
        title: title,
        date: "06/26",
        content: $("#meetingDetailedContent").value.trim()
      };

      meetingMinutesData.unshift(newMinutes);
      toast("회의록이 성공적으로 등록되었습니다. 🎉");
      
      setTimeout(() => {
        navigate("meetingMinutes");
      }, 1000);
    };
  }
}

const renders={home,life,community,control,my,reservation,visitor,parking,fee,complaint,notice,noticeDetail,iot:control,facility:generic,vote,voteDetail,board,boardDetail,boardWrite,boardEdit,settings:my,bookingList,visitorList,meetingMinutes,meetingMinutesDetail,meetingMinutesWrite,communityPass,clubDetail,clubBoard,clubBoardWrite,clubBoardDetail,clubBoardEdit,clubNoticeDetail,clubCreate};
function navigate(next){route=renders[next]?next:"home";$("#app").innerHTML=renders[route]();$$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.route===route));$$(".desktop-menu .drawer-link").forEach(b=>b.classList.toggle("active",b.dataset.route===route));$("#drawer").classList.remove("open");bind();scrollTo(0,0)}
function bind(){
  $$("[data-route]").forEach(b=>b.onclick=()=>navigate(b.dataset.route));
  
  const homeChatInput = $("#homeChatInput");
  const homeChatSubmit = $("#homeChatSubmit");
  if (homeChatInput) {
    const handleSend = () => {
      const val = homeChatInput.value.trim();
      if (val) {
        toast(`AI 비서에게 “${val}” 질문을 보냈어요.`);
        homeChatInput.value = "";
      }
    };
    homeChatInput.onkeydown = (e) => {
      if (e.key === "Enter") handleSend();
    };
    if (homeChatSubmit) {
      homeChatSubmit.onclick = handleSend;
    }
  }

  const homeDoorBtn = $("#homeDoorBtn");
  if (homeDoorBtn) {
    homeDoorBtn.onclick = () => {
      deviceState.door = !deviceState.door;
      const visualEl = homeDoorBtn.querySelector(".visual");
      const statusEl = $("#homeDoorStatus");
      if (visualEl) visualEl.innerHTML = icon(deviceState.door ? "lock" : "unlock");
      if (statusEl) statusEl.textContent = deviceState.door ? "안전하게 잠김" : "열려 있음";
      toast(deviceState.door ? "현관문을 잠갔습니다." : "현관문을 열었습니다.");
    };
  }

  const homeAcSwitch = $("#homeAcSwitch");
  if (homeAcSwitch) {
    homeAcSwitch.onclick = () => {
      deviceState.ac = !deviceState.ac;
      homeAcSwitch.classList.toggle("on", deviceState.ac);
      toast(deviceState.ac ? "에어컨 전원을 켰습니다." : "에어컨 전원을 꿨습니다.");
    };
  }

  $$("[data-toggle]").forEach(b=>b.onclick=()=>{
    if (b.id !== "homeAcSwitch" && !b.id.endsWith("Switch")) {
      b.classList.toggle("on");
      toast(b.classList.contains("on")?"전원을 켰어요.":"전원을 꿨어요.");
    }
  });
  
  $$(".chip:not(.fac-chip)").forEach(b=>b.onclick=()=>{$$(".chip:not(.fac-chip)").forEach(x=>x.classList.remove("active"));b.classList.add("active")});
  $$(".action").forEach(b=>b.onclick=()=>toast(b.dataset.message));
  if (route === "reservation") bindReservationEvents();
  if (route === "bookingList") bindBookingListEvents();
  if (route === "visitor") bindVisitorEvents();
  if (route === "visitorList") bindVisitorListEvents();
  if (route === "complaint") bindComplaintEvents();
  if (route === "control" || route === "iot") bindControlEvents();
  if (route === "fee") bindFeeEvents();
  if (route === "meetingMinutes") bindMeetingMinutesEvents();
  if (route === "meetingMinutesDetail") bindMeetingDetailEvents();
  if (route === "communityPass") bindCommunityPassEvents();
  if (route === "vote") bindVoteEvents();
  if (route === "voteDetail") bindVoteDetailEvents();
  if (route === "clubDetail") bindClubDetailEvents();
  if (route === "clubBoard") bindClubBoardEvents();
  if (route === "clubBoardWrite") bindClubBoardWriteEvents();
  if (route === "clubBoardDetail") bindClubBoardDetailEvents();
  if (route === "clubBoardEdit") bindClubBoardEditEvents();
  if (route === "clubNoticeDetail") bindClubNoticeDetailEvents();
  if (route === "clubCreate") bindClubCreateEvents();
  if (route === "community") bindCommunityEvents();
  if (route === "board") bindBoardEvents();
  if (route === "boardDetail") bindBoardDetailEvents();
  if (route === "boardWrite") bindBoardWriteEvents();
  if (route === "boardEdit") bindBoardEditEvents();
  if (route === "notice") bindNoticeEvents();
  if (route === "noticeDetail") bindNoticeDetailEvents();
  if (route === "meetingMinutesWrite") bindMeetingMinutesWriteEvents();
  const search=$("#searchCar");if(search)search.onclick=()=>{$("#carResult").innerHTML='<div class="notice" style="margin-top:14px"><b>조회 완료</b><span>지하 2층 B-24 구역에 주차되어 있어요.</span></div>'};
  $$(".notice-detail").forEach(b=>b.onclick=()=>{
    currentNoticeId = parseInt(b.dataset.index) + 1;
    navigate("noticeDetail");
  });
  $$(".mode").forEach(b=>b.onclick=()=>toast(`${b.querySelector("h3").textContent}를 실행했어요.`));
  const roller=$("#noticeRoller");
  if(roller){
    roller.addEventListener("wheel",e=>{
      e.preventDefault();
      changeNotice(e.deltaY >= 0 ? 1 : -1);
    },{passive:false});
  }
}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove("show"),2200)}
function openModal(html){$("#modalBody").innerHTML=html;$("#modal").classList.add("open")}
function closeModal(){$("#modal").classList.remove("open")} window.closeModal=closeModal;window.toast=toast;

const menu=[["생활 서비스",[["시설예약","reservation"],["커뮤니티 정기권","communityPass"],["방문차량 등록","visitor"],["주차 현황","parking"],["스마트홈 제어","control"],["민원센터","complaint"]]],["우리 단지",[["관리비","fee"],["공지사항","notice"],["커뮤니티","community"],["자유게시판","board"],["회의록","meetingMinutes"],["전자투표","vote"]]],["내 정보",[["마이페이지","my"],["알림 설정","settings"]]]];
$("#drawerMenu").innerHTML=menu.map(([g,items])=>`<div class="drawer-group"><h3>${g}</h3><div class="card">${items.map(x=>`<button class="drawer-link" data-route="${x[1]}">${x[0]}</button>`).join("")}</div></div>`).join("")+`<p class="icon-credit">Icons by <a href="https://www.flaticon.com/uicons" target="_blank" rel="noreferrer">Flaticon UIcons</a></p>`;
$("#desktopMenu").innerHTML=`<div class="drawer-group"><h3>메인</h3><div class="card"><button class="drawer-link" data-route="home">홈</button></div></div>`+
  menu.map(([g,items])=>`<div class="drawer-group"><h3>${g}</h3><div class="card">${items.map(x=>`<button class="drawer-link" data-route="${x[1]}">${x[0]}</button>`).join("")}</div></div>`).join("");
$("#menuButton").onclick=()=>$("#drawer").classList.add("open");$("#closeDrawer").onclick=()=>$("#drawer").classList.remove("open");$("#modalClose").onclick=closeModal;$("#alarmButton").onclick=()=>navigate("notice");
let noticeAnimating=false;
function changeNotice(step=1){
  const windowEl=$(".notice-window");
  const currentEl=$(".notice-message.current");
  if(!windowEl||!currentEl||noticeAnimating)return;
  noticeAnimating=true;
  noticeIndex=(noticeIndex+step+notices.length)%notices.length;
  const nextEl=document.createElement("span");
  nextEl.className=`notice-message incoming ${step<0?"from-bottom":""}`;
  nextEl.textContent=notices[noticeIndex];
  windowEl.appendChild(nextEl);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    currentEl.classList.add(step<0?"leave-up":"leave-down");
    nextEl.classList.add("arrive");
  }));
  setTimeout(()=>{
    currentEl.remove();
    nextEl.className="notice-message current";
    noticeAnimating=false;
  },360);
}
setInterval(()=>changeNotice(1),3500);

function setupHoverAutoScroll(){
  const desktop=window.matchMedia("(min-width: 900px)");
  $$(".hover-scroll-panel").forEach(panel=>{
    let frame=null;
    let speed=0;
    const run=()=>{
      if(speed!==0) panel.scrollTop+=speed;
      frame=requestAnimationFrame(run);
    };
    panel.addEventListener("mousemove",e=>{
      if(!desktop.matches){speed=0;return}
      const rect=panel.getBoundingClientRect();
      const y=e.clientY-rect.top;
      const edge=Math.min(100,rect.height*.18);
      if(y<edge) speed=-Math.max(1,(edge-y)/12);
      else if(y>rect.height-edge) speed=Math.max(1,(y-(rect.height-edge))/12);
      else speed=0;
    });
    panel.addEventListener("mouseenter",()=>{if(!frame)run()});
    panel.addEventListener("mouseleave",()=>{speed=0;if(frame){cancelAnimationFrame(frame);frame=null}});
  });
}

setupHoverAutoScroll();

const centerScroll=$("#app");
const scrollHint=$("#scrollHint");
const scrollTopHint=$("#scrollTopHint");
function updateScrollHint(){
  if(!centerScroll||!scrollHint)return;
  const atBottom=centerScroll.scrollTop+centerScroll.clientHeight>=centerScroll.scrollHeight-3;
  const canScroll=centerScroll.scrollHeight>centerScroll.clientHeight+3;
  scrollHint.classList.toggle("hidden",!canScroll||atBottom);
  if(scrollTopHint)scrollTopHint.classList.toggle("hidden",!canScroll||!atBottom);
}
if(centerScroll&&scrollHint){
  scrollHint.onclick=()=>{
    centerScroll.scrollBy({top:centerScroll.clientHeight*.82,behavior:"smooth"});
  };
  if(scrollTopHint)scrollTopHint.onclick=()=>{
    centerScroll.scrollTo({top:0,behavior:"smooth"});
  };
  centerScroll.addEventListener("scroll",updateScrollHint,{passive:true});
  window.addEventListener("resize",updateScrollHint);
  new MutationObserver(()=>requestAnimationFrame(updateScrollHint)).observe(centerScroll,{childList:true,subtree:true});
  requestAnimationFrame(updateScrollHint);
}

const chatAssist=$("#chatAssist");
const chatInput=$("#chatInput");
if(chatAssist&&chatInput){
  chatAssist.addEventListener("mouseenter",()=>{
    setTimeout(()=>{if(chatAssist.matches(":hover"))chatInput.focus()},280);
  });
  chatAssist.addEventListener("click",()=>chatInput.focus());
  chatInput.addEventListener("keydown",e=>{
    if(e.key==="Enter"&&chatInput.value.trim()){
      toast(`AI 비서에게 “${chatInput.value.trim()}” 질문을 보냈어요.`);
      chatInput.value="";
    }
  });
}
navigate("home");
