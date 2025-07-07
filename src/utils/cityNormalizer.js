import { supabase } from '../services/supabaseService.js';

// 도시명 정규화 클래스
export class CityNormalizer {
  constructor() {
    this.processedCount = 0;
    this.changedCount = 0;
    this.duplicatesFound = new Map(); // 중복 도시명 추적
  }

  // 도시명 정규화 함수 (API 호출 없음)
  normalizeCityName(cityName) {
    if (!cityName || cityName.trim() === '') return '';
    
    let normalized = cityName.trim();
    
    // 0. 아랍어 원문 도시명을 영어로 변환
    const arabicToEnglishCities = {
      // 사우디아라비아
      'الرياض': 'Riyadh',
      'جدة': 'Jeddah',
      'مكة': 'Mecca',
      'المدينة': 'Medina',
      'الدمام': 'Dammam',
      'الخبر': 'Khobar',
      'الظهران': 'Dhahran',
      'الطائف': 'Taif',
      'تبوك': 'Tabuk',
      'أبها': 'Abha',
      'نجران': 'Najran',
      'حائل': 'Hail',
      'جازان': 'Jazan',
      
      // UAE
      'دبي': 'Dubai',
      'أبوظبي': 'Abu Dhabi',
      'الشارقة': 'Sharjah',
      'عجمان': 'Ajman',
      'الفجيرة': 'Fujairah',
      'رأس الخيمة': 'Ras Al Khaimah',
      'أم القيوين': 'Umm Al Quwain',
      
      // 카타르
      'الدوحة': 'Doha',
      'الريان': 'Al Rayyan',
      'الوكرة': 'Al Wakrah',
      
      // 쿠웨يت
      'الكويت': 'Kuwait City',
      'حولي': 'Hawalli',
      'الأحمدي': 'Ahmadi',
      'الجهراء': 'Jahra',
      
      // 바رين
      'المنامة': 'Manama',
      'المحرق': 'Muharraq',
      'الرفاع': 'Riffa',
      'مدينة حمد': 'Hamad Town',
      
      // أمن
      'مسقط': 'Muscat',
      'صلالة': 'Salalah',
      'نزوى': 'Nizwa',
      'صور': 'Sur',
      'صحار': 'Sohar',
      
      // يصف
      'القاهرة': 'Cairo',
      'الإسكندرية': 'Alexandria',
      'الجيزة': 'Giza',
      'شبرا الخيمة': 'Shubra El Kheima',
      'بورسعيد': 'Port Said',
      'السويس': 'Suez',
      'الأقصر': 'Luxor',
      'أسيوط': 'Asyut',
      'أسوان': 'Aswan',
      
      // عدن
      'عمان': 'Amman',
      'الزرقاء': 'Zarqa',
      'إربد': 'Irbid',
      'الرصيفة': 'Russeifa',
      'وادي السير': 'Wadi As Sir',
      
      // الرباط
      'بيروت': 'Beirut',
      'طرابلس': 'Tripoli',
      'صيدا': 'Sidon',
      'صور': 'Tyre',
      'زحلة': 'Zahle',
      
      // الرياض
      'دمشق': 'Damascus',
      'حلب': 'Aleppo',
      'حمص': 'Homs',
      'حماة': 'Hama',
      'اللاذقية': 'Latakia',
      'دير الزور': 'Deir ez Zor',
      
      // الرك
      'بغداد': 'Baghdad',
      'البصرة': 'Basra',
      'الموصل': 'Mosul',
      'أربيل': 'Erbil',
      'النجف': 'Najaf',
      'كربلاء': 'Karbala',
      'كركوك': 'Kirkuk',
      'السليمانية': 'Sulaymaniyah',
      
      // الرن (فيرسيا, عربي محرف)
      'تهران': 'Tehran',
      'مشهد': 'Mashhad',
      'اصفهان': 'Isfahan',
      'کرج': 'Karaj',
      'شیراز': 'Shiraz',
      'تبریز': 'Tabriz',
      'قم': 'Qom',
      'اهواز': 'Ahvaz',
      'کرمانشاه': 'Kermanshah',
      'ارومیه': 'Urmia',
      
      // الروميك
      'الرباط': 'Rabat',
      'الدار البيضاء': 'Casablanca',
      'فاس': 'Fez',
      'مراكش': 'Marrakech',
      'أكادير': 'Agadir',
      'طنجة': 'Tangier',
      'مكناس': 'Meknes',
      'وجدة': 'Oujda',
      'القنيطرة': 'Kenitra',
      'تطوان': 'Tetouan',
      
      // الجزائر
      'الجزائر': 'Algiers',
      'وهران': 'Oran',
      'قسنطينة': 'Constantine',
      'عنابة': 'Annaba',
      'البليدة': 'Blida',
      'باتنة': 'Batna',
      'الجلفة': 'Djelfa',
      'سطيف': 'Setif',
      'سيدي بلعباس': 'Sidi Bel Abbes',
      'بسكرة': 'Biskra',
      
      // تونس
      'تونس': 'Tunis',
      'صفاقس': 'Sfax',
      'سوسة': 'Sousse',
      'التضامن': 'Ettadhamen',
      'القيروان': 'Kairouan',
      'بنزرت': 'Bizerte',
      'قابس': 'Gabes',
      'أريانة': 'Ariana',
      'قفصة': 'Gafsa',
      'المنستير': 'Monastir',
      
      // الرياض
      'طرابلس': 'Tripoli',
      'بنغازي': 'Benghazi',
      'مصراتة': 'Misrata',
      'الزاوية': 'Zawiya',
      'البيضاء': 'Bayda',
      'أجدابيا': 'Ajdabiya',
      'طبرق': 'Tobruk',
      'سبها': 'Sabha',
      'درنة': 'Derna',
      'سرت': 'Sirte',
      
      // الفلسطين
      'القدس': 'Jerusalem',
      'غزة': 'Gaza',
      'الخليل': 'Hebron',
      'نابلس': 'Nablus',
      'رام الله': 'Ramallah',
      'بيت لحم': 'Bethlehem',
      
      // صنعاء
      'صنعاء': 'Sanaa',
      'عدن': 'Aden',
      'تعز': 'Taiz',
      'الحديدة': 'Hodeidah',
      'إب': 'Ibb',
      'ذمار': 'Dhamar',
      'المكلا': 'Mukalla',
      
      // السودان
      'الخرطوم': 'Khartoum',
      'أم درمان': 'Omdurman',
      'بورتسودان': 'Port Sudan',
      'كسلا': 'Kassala',
      'الأبيض': 'Al Ubayyid',
      'نيالا': 'Nyala',
      'الفاشر': 'Al Fashir',
      'جوبا': 'Juba'
    };
    
    // 아랍어 원문이 있으면 영어로 변환
    if (arabicToEnglishCities[normalized]) {
      normalized = arabicToEnglishCities[normalized];
      console.log(`🔄 아랍어 변환: "${cityName}" → "${normalized}"`);
      return normalized; // 이미 정규화된 형태이므로 바로 반환
    }
    
    // 0-2. 한국어 도시명을 영어로 변환
    const koreanToEnglishCities = {
      // 특별시/광역시
      '서울특별시': 'Seoul',
      '서울시': 'Seoul',
      '서울': 'Seoul',
      '부산광역시': 'Busan',
      '부산시': 'Busan',
      '부산': 'Busan',
      '대구광역시': 'Daegu',
      '대구시': 'Daegu',
      '대구': 'Daegu',
      '인천광역시': 'Incheon',
      '인천시': 'Incheon',
      '인천': 'Incheon',
      '광주광역시': 'Gwangju',
      '광주시': 'Gwangju',
      '광주': 'Gwangju',
      '대전광역시': 'Daejeon',
      '대전시': 'Daejeon',
      '대전': 'Daejeon',
      '울산광역시': 'Ulsan',
      '울산시': 'Ulsan',
      '울산': 'Ulsan',
      '세종특별자치시': 'Sejong',
      '세종시': 'Sejong',
      '세종': 'Sejong',
      
      // 경기도
      '수원시': 'Suwon',
      '수원': 'Suwon',
      '성남시': 'Seongnam',
      '성남': 'Seongnam',
      '고양시': 'Goyang',
      '고양': 'Goyang',
      '용인시': 'Yongin',
      '용인': 'Yongin',
      '부천시': 'Bucheon',
      '부천': 'Bucheon',
      '안산시': 'Ansan',
      '안산': 'Ansan',
      '안양시': 'Anyang',
      '안양': 'Anyang',
      '남양주시': 'Namyangju',
      '남양주': 'Namyangju',
      '화성시': 'Hwaseong',
      '화성': 'Hwaseong',
      '평택시': 'Pyeongtaek',
      '평택': 'Pyeongtaek',
      '의정부시': 'Uijeongbu',
      '의정부': 'Uijeongbu',
      '시흥시': 'Siheung',
      '시흥': 'Siheung',
      '파주시': 'Paju',
      '파주': 'Paju',
      '광명시': 'Gwangmyeong',
      '광명': 'Gwangmyeong',
      '김포시': 'Gimpo',
      '김포': 'Gimpo',
      '군포시': 'Gunpo',
      '군포': 'Gunpo',
      '하남시': 'Hanam',
      '하남': 'Hanam',
      '오산시': 'Osan',
      '오산': 'Osan',
      '이천시': 'Icheon',
      '이천': 'Icheon',
      '양주시': 'Yangju',
      '양주': 'Yangju',
      '구리시': 'Guri',
      '구리': 'Guri',
      '안성시': 'Anseong',
      '안성': 'Anseong',
      '포천시': 'Pocheon',
      '포천': 'Pocheon',
      '의왕시': 'Uiwang',
      '의왕': 'Uiwang',
      '여주시': 'Yeoju',
      '여주': 'Yeoju',
      '양평군': 'Yangpyeong',
      '양평': 'Yangpyeong',
      '동두천시': 'Dongducheon',
      '동두천': 'Dongducheon',
      '과천시': 'Gwacheon',
      '과천': 'Gwacheon',
      '가평군': 'Gapyeong',
      '가평': 'Gapyeong',
      '연천군': 'Yeoncheon',
      '연천': 'Yeoncheon',
      
      // 강원도
      '춘천시': 'Chuncheon',
      '춘천': 'Chuncheon',
      '원주시': 'Wonju',
      '원주': 'Wonju',
      '강릉시': 'Gangneung',
      '강릉': 'Gangneung',
      '동해시': 'Donghae',
      '동해': 'Donghae',
      '태백시': 'Taebaek',
      '태백': 'Taebaek',
      '속초시': 'Sokcho',
      '속초': 'Sokcho',
      '삼척시': 'Samcheok',
      '삼척': 'Samcheok',
      
      // 충청북도
      '청주시': 'Cheongju',
      '청주': 'Cheongju',
      '충주시': 'Chungju',
      '충주': 'Chungju',
      '제천시': 'Jecheon',
      '제천': 'Jecheon',
      
      // 충청남도
      '천안시': 'Cheonan',
      '천안': 'Cheonan',
      '공주시': 'Gongju',
      '공주': 'Gongju',
      '보령시': 'Boryeong',
      '보령': 'Boryeong',
      '아산시': 'Asan',
      '아산': 'Asan',
      '서산시': 'Seosan',
      '서산': 'Seosan',
      '논산시': 'Nonsan',
      '논산': 'Nonsan',
      '계룡시': 'Gyeryong',
      '계룡': 'Gyeryong',
      '당진시': 'Dangjin',
      '당진': 'Dangjin',
      
      // 전라북도
      '전주시': 'Jeonju',
      '전주': 'Jeonju',
      '군산시': 'Gunsan',
      '군산': 'Gunsan',
      '익산시': 'Iksan',
      '익산': 'Iksan',
      '정읍시': 'Jeongeup',
      '정읍': 'Jeongeup',
      '남원시': 'Namwon',
      '남원': 'Namwon',
      '김제시': 'Gimje',
      '김제': 'Gimje',
      
      // 전라남도
      '목포시': 'Mokpo',
      '목포': 'Mokpo',
      '여수시': 'Yeosu',
      '여수': 'Yeosu',
      '순천시': 'Suncheon',
      '순천': 'Suncheon',
      '나주시': 'Naju',
      '나주': 'Naju',
      '광양시': 'Gwangyang',
      '광양': 'Gwangyang',
      
      // 경상북도
      '포항시': 'Pohang',
      '포항': 'Pohang',
      '경주시': 'Gyeongju',
      '경주': 'Gyeongju',
      '김천시': 'Gimcheon',
      '김천': 'Gimcheon',
      '안동시': 'Andong',
      '안동': 'Andong',
      '구미시': 'Gumi',
      '구미': 'Gumi',
      '영주시': 'Yeongju',
      '영주': 'Yeongju',
      '영천시': 'Yeongcheon',
      '영천': 'Yeongcheon',
      '상주시': 'Sangju',
      '상주': 'Sangju',
      '문경시': 'Mungyeong',
      '문경': 'Mungyeong',
      '경산시': 'Gyeongsan',
      '경산': 'Gyeongsan',
      
      // 경상남도
      '창원시': 'Changwon',
      '창원': 'Changwon',
      '진주시': 'Jinju',
      '진주': 'Jinju',
      '통영시': 'Tongyeong',
      '통영': 'Tongyeong',
      '사천시': 'Sacheon',
      '사천': 'Sacheon',
      '김해시': 'Gimhae',
      '김해': 'Gimhae',
      '밀양시': 'Miryang',
      '밀양': 'Miryang',
      '거제시': 'Geoje',
      '거제': 'Geoje',
      '양산시': 'Yangsan',
      '양산': 'Yangsan',
      
      // 제주특별자치도
      '제주시': 'Jeju',
      '제주': 'Jeju',
      '서귀포시': 'Seogwipo',
      '서귀포': 'Seogwipo',
      
      // 북한 주요 도시
      '평양': 'Pyongyang',
      '평양시': 'Pyongyang',
      '함흥': 'Hamhung',
      '함흥시': 'Hamhung',
      '청진': 'Chongjin',
      '청진시': 'Chongjin',
      '남포': 'Nampo',
      '남포시': 'Nampo',
      '원산': 'Wonsan',
      '원산시': 'Wonsan',
      '신의주': 'Sinuiju',
      '신의주시': 'Sinuiju',
      '개성': 'Kaesong',
      '개성시': 'Kaesong',
      '해주': 'Haeju',
      '해주시': 'Haeju'
    };
    
    // 한국어 원문이 있으면 영어로 변환
    if (koreanToEnglishCities[normalized]) {
      normalized = koreanToEnglishCities[normalized];
      console.log(`🔄 한국어 변환: "${cityName}" → "${normalized}"`);
      return normalized; // 이미 정규화된 형태이므로 바로 반환
    }
    
    // 0-3. 중국어 도시명을 영어로 변환
    const chineseToEnglishCities = {
      // 중국 주요 도시 (간체)
      '北京': 'Beijing',
      '上海': 'Shanghai',
      '广州': 'Guangzhou',
      '深圳': 'Shenzhen',
      '天津': 'Tianjin',
      '重庆': 'Chongqing',
      '成都': 'Chengdu',
      '武汉': 'Wuhan',
      '西安': 'Xian',
      '南京': 'Nanjing',
      '杭州': 'Hangzhou',
      '苏州': 'Suzhou',
      '青岛': 'Qingdao',
      '大连': 'Dalian',
      '宁波': 'Ningbo',
      '厦门': 'Xiamen',
      '福州': 'Fuzhou',
      '济南': 'Jinan',
      '长沙': 'Changsha',
      '郑州': 'Zhengzhou',
      '石家庄': 'Shijiazhuang',
      '太原': 'Taiyuan',
      '合肥': 'Hefei',
      '南昌': 'Nanchang',
      '贵阳': 'Guiyang',
      '昆明': 'Kunming',
      '南宁': 'Nanning',
      '海口': 'Haikou',
      '三亚': 'Sanya',
      '拉萨': 'Lhasa',
      '乌鲁木齐': 'Urumqi',
      '银川': 'Yinchuan',
      '西宁': 'Xining',
      '呼和浩特': 'Hohhot',
      '哈尔滨': 'Harbin',
      '长春': 'Changchun',
      '沈阳': 'Shenyang',
      '兰州': 'Lanzhou',
      
      // 중국 주요 도시 (번체)
      '北京市': 'Beijing',
      '上海市': 'Shanghai',
      '廣州': 'Guangzhou',
      '深圳市': 'Shenzhen',
      '天津市': 'Tianjin',
      '重慶': 'Chongqing',
      '成都市': 'Chengdu',
      '武漢': 'Wuhan',
      '西安市': 'Xian',
      '南京市': 'Nanjing',
      '杭州市': 'Hangzhou',
      '蘇州': 'Suzhou',
      '青島': 'Qingdao',
      '大連': 'Dalian',
      '寧波': 'Ningbo',
      '廈門': 'Xiamen',
      '福州市': 'Fuzhou',
      '濟南': 'Jinan',
      '長沙': 'Changsha',
      '鄭州': 'Zhengzhou',
      
      // 홍콩/마카오/대만
      '香港': 'Hong Kong',
      '澳門': 'Macau',
      '澳门': 'Macau',
      '台北': 'Taipei',
      '台中': 'Taichung',
      '高雄': 'Kaohsiung',
      '台南': 'Tainan',
      '新竹': 'Hsinchu',
      '基隆': 'Keelung',
      '桃園': 'Taoyuan'
    };
    
    // 중국어 원문이 있으면 영어로 변환
    if (chineseToEnglishCities[normalized]) {
      normalized = chineseToEnglishCities[normalized];
      console.log(`🔄 중국어 변환: "${cityName}" → "${normalized}"`);
      return normalized;
    }
    
    // 0-4. 일본어 도시명을 영어로 변환
    const japaneseToEnglishCities = {
      '東京': 'Tokyo',
      '東京都': 'Tokyo',
      '大阪': 'Osaka',
      '大阪市': 'Osaka',
      '横浜': 'Yokohama',
      '横浜市': 'Yokohama',
      '名古屋': 'Nagoya',
      '名古屋市': 'Nagoya',
      '札幌': 'Sapporo',
      '札幌市': 'Sapporo',
      '神戸': 'Kobe',
      '神戸市': 'Kobe',
      '京都': 'Kyoto',
      '京都市': 'Kyoto',
      '福岡': 'Fukuoka',
      '福岡市': 'Fukuoka',
      '川崎': 'Kawasaki',
      '川崎市': 'Kawasaki',
      'さいたま': 'Saitama',
      'さいたま市': 'Saitama',
      '広島': 'Hiroshima',
      '広島市': 'Hiroshima',
      '仙台': 'Sendai',
      '仙台市': 'Sendai',
      '千葉': 'Chiba',
      '千葉市': 'Chiba',
      '北九州': 'Kitakyushu',
      '北九州市': 'Kitakyushu',
      '浜松': 'Hamamatsu',
      '浜松市': 'Hamamatsu',
      '新潟': 'Niigata',
      '新潟市': 'Niigata',
      '熊本': 'Kumamoto',
      '熊本市': 'Kumamoto',
      '相模原': 'Sagamihara',
      '相模原市': 'Sagamihara',
      '岡山': 'Okayama',
      '岡山市': 'Okayama',
      '静岡': 'Shizuoka',
      '静岡市': 'Shizuoka',
      '鹿児島': 'Kagoshima',
      '鹿児島市': 'Kagoshima'
    };
    
    // 일본어 원문이 있으면 영어로 변환
    if (japaneseToEnglishCities[normalized]) {
      normalized = japaneseToEnglishCities[normalized];
      console.log(`🔄 일본어 변환: "${cityName}" → "${normalized}"`);
      return normalized;
    }
    
    // 0-5. 베트남어 도시명을 영어로 변환
    const vietnameseToEnglishCities = {
      'Hà Nội': 'Hanoi',
      'Thành phố Hồ Chí Minh': 'Ho Chi Minh City',
      'Hồ Chí Minh': 'Ho Chi Minh City',
      'Sài Gòn': 'Ho Chi Minh City',
      'Hải Phòng': 'Hai Phong',
      'Đà Nẵng': 'Da Nang',
      'Cần Thơ': 'Can Tho',
      'Biên Hòa': 'Bien Hoa',
      'Huế': 'Hue',
      'Nha Trang': 'Nha Trang',
      'Buôn Ma Thuột': 'Buon Ma Thuot',
      'Vũng Tàu': 'Vung Tau',
      'Quy Nhon': 'Quy Nhon',
      'Nam Định': 'Nam Dinh',
      'Thủ Đức': 'Thu Duc',
      'Pleiku': 'Pleiku',
      'Mỹ Tho': 'My Tho',
      'Long Xuyên': 'Long Xuyen',
      'Rạch Giá': 'Rach Gia',
      'Cà Mau': 'Ca Mau',
      'Tây Ninh': 'Tay Ninh',
      'Đà Lạt': 'Da Lat',
      'Kon Tum': 'Kon Tum',
      'Hạ Long': 'Ha Long',
      'Bắc Giang': 'Bac Giang',
      'Việt Trì': 'Viet Tri',
      'Thái Nguyên': 'Thai Nguyen',
      'Lạng Sơn': 'Lang Son',
      'Hòa Bình': 'Hoa Binh',
      'Tuyên Quang': 'Tuyen Quang',
      'Sơn La': 'Son La',
      'Phú Thọ': 'Phu Tho',
      'Lào Cai': 'Lao Cai',
      'Yên Bái': 'Yen Bai',
      'Điện Biên Phủ': 'Dien Bien Phu',
      'Lai Châu': 'Lai Chau',
      'Cao Bằng': 'Cao Bang',
      'Bắc Kạn': 'Bac Kan',
      'Hà Giang': 'Ha Giang'
    };
    
    // 베트남어 원문이 있으면 영어로 변환
    if (vietnameseToEnglishCities[normalized]) {
      normalized = vietnameseToEnglishCities[normalized];
      console.log(`🔄 베트남어 변환: "${cityName}" → "${normalized}"`);
      return normalized;
    }
    
    // 0-6. 터키어 도시명을 영어로 변환
    const turkishToEnglishCities = {
      'İstanbul': 'Istanbul',
      'Ankara': 'Ankara',
      'İzmir': 'Izmir',
      'Bursa': 'Bursa',
      'Antalya': 'Antalya',
      'Adana': 'Adana',
      'Konya': 'Konya',
      'Şanlıurfa': 'Sanliurfa',
      'Gaziantep': 'Gaziantep',
      'Kayseri': 'Kayseri',
      'Mersin': 'Mersin',
      'Eskişehir': 'Eskisehir',
      'Diyarbakır': 'Diyarbakir',
      'Samsun': 'Samsun',
      'Denizli': 'Denizli',
      'Adapazarı': 'Adapazari',
      'Malatya': 'Malatya',
      'Kahramanmaraş': 'Kahramanmaras',
      'Erzurum': 'Erzurum',
      'Van': 'Van',
      'Batman': 'Batman',
      'Elâzığ': 'Elazig',
      'İzmit': 'Izmit',
      'Manisa': 'Manisa',
      'Sivas': 'Sivas',
      'Gebze': 'Gebze',
      'Balıkesir': 'Balikesir',
      'Tarsus': 'Tarsus',
      'Kütahya': 'Kutahya',
      'Trabzon': 'Trabzon',
      'Çorum': 'Corum',
      'Çorlu': 'Corlu',
      'Adıyaman': 'Adiyaman',
      'Osmaniye': 'Osmaniye',
      'Kırıkkale': 'Kirikkale',
      'Antakya': 'Antakya',
      'Aydın': 'Aydin',
      'İskenderun': 'Iskenderun',
      'Uşak': 'Usak',
      'Aksaray': 'Aksaray',
      'Afyon': 'Afyon',
      'Isparta': 'Isparta',
      'İnegöl': 'Inegol',
      'Tekirdağ': 'Tekirdag',
      'Edirne': 'Edirne',
      'Darıca': 'Darica',
      'Ordu': 'Ordu',
      'Karaman': 'Karaman',
      'Gölcük': 'Golcuk',
      'Siirt': 'Siirt',
      'Körfez': 'Korfez',
      'Kızıltepe': 'Kiziltepe',
      'Düzce': 'Duzce',
      'Tokat': 'Tokat',
      'Bolu': 'Bolu',
      'Derince': 'Derince',
      'Turhal': 'Turhal',
      'Bandırma': 'Bandirma',
      'Kırşehir': 'Kirsehir',
      'Kırklareli': 'Kirklareli',
      'Salihli': 'Salihli',
      'Erzincan': 'Erzincan',
      'Nazilli': 'Nazilli',
      'Turgutlu': 'Turgutlu',
      'Didim': 'Didim',
      'Kadıköy': 'Kadikoy',
      'Üsküdar': 'Uskudar',
      'Beyoğlu': 'Beyoglu',
      'Şişli': 'Sisli',
      'Beşiktaş': 'Besiktas',
      'Fatih': 'Fatih',
      'Bakırköy': 'Bakirkoy',
      'Maltepe': 'Maltepe',
      'Pendik': 'Pendik',
      'Ümraniye': 'Umraniye',
      'Kartal': 'Kartal',
      'Ataşehir': 'Atasehir',
      'Bahçelievler': 'Bahcelievler',
      'Gaziosmanpaşa': 'Gaziosmanpasa',
      'Sultangazi': 'Sultangazi',
      'Esenler': 'Esenler',
      'Avcilar': 'Avcilar',
      'Küçükçekmece': 'Kucukcekmece',
      'Büyükçekmece': 'Buyukcekmece',
      'Beylikdüzü': 'Beylikduzu',
      'Esenyurt': 'Esenyurt',
      'Arnavutköy': 'Arnavutkoy',
      'Başakşehir': 'Basaksehir'
    };
    
    // 터키어 원문이 있으면 영어로 변환
    if (turkishToEnglishCities[normalized]) {
      normalized = turkishToEnglishCities[normalized];
      console.log(`🔄 터키어 변환: "${cityName}" → "${normalized}"`);
      return normalized;
    }
    
    // 0-7. 태국어 도시명을 영어로 변환
    const thaiToEnglishCities = {
      'กรุงเทพ': 'Bangkok',
      'กรุงเทพมหานคร': 'Bangkok',
      'เชียงใหม่': 'Chiang Mai',
      'นครราชสีมา': 'Nakhon Ratchasima',
      'หาดใหญ่': 'Hat Yai',
      'อุดรธานี': 'Udon Thani',
      'สุราษฎร์ธานี': 'Surat Thani',
      'ขอนแก่น': 'Khon Kaen',
      'นครศรีธรรมราช': 'Nakhon Si Thammarat',
      'ระยอง': 'Rayong',
      'ชลบุรี': 'Chonburi',
      'นครปฐม': 'Nakhon Pathom',
      'อุบลราชธานี': 'Ubon Ratchathani',
      'ปทุมธานี': 'Pathum Thani',
      'ปากเกร็ด': 'Pak Kret',
      'นนทบุรี': 'Nonthaburi',
      'ลำปาง': 'Lampang',
      'เชียงราย': 'Chiang Rai',
      'นครสวรรค์': 'Nakhon Sawan',
      'สมุทรปราการ': 'Samut Prakan',
      'สมุทรสาคร': 'Samut Sakhon',
      'กำแพงเพชร': 'Kamphaeng Phet',
      'ยะลา': 'Yala',
      'หนองคาย': 'Nong Khai',
      'สงขลา': 'Songkhla',
      'สตูล': 'Satun',
      'ตรัง': 'Trang',
      'กระบี่': 'Krabi',
      'ภูเก็ต': 'Phuket',
      'พัทยา': 'Pattaya',
      'หัวหิน': 'Hua Hin',
      'เกาะสมุย': 'Koh Samui'
    };
    
    // 태국어 원문이 있으면 영어로 변환
    if (thaiToEnglishCities[normalized]) {
      normalized = thaiToEnglishCities[normalized];
      console.log(`🔄 태국어 변환: "${cityName}" → "${normalized}"`);
      return normalized;
    }
    
    // 1. 아랍어권 전치사 처리 (Al-, El- 제거 또는 정규화)
    if (normalized.startsWith('Al-') || normalized.startsWith('al-')) {
      normalized = normalized.substring(3).trim();
    }
    if (normalized.startsWith('El-') || normalized.startsWith('el-')) {
      normalized = normalized.substring(3).trim();
    }
    if (normalized.startsWith('As-') || normalized.startsWith('as-')) {
      normalized = normalized.substring(3).trim();
    }
    if (normalized.startsWith('Ad-') || normalized.startsWith('ad-')) {
      normalized = normalized.substring(3).trim();
    }
    
    // 2. 일반적인 접미사 제거
    const suffixesToRemove = [
      ' City', ' city', ' CITY',
      ' Si', ' si', ' SI',           // 한국어 "시"
      ' Shi', ' shi', ' SHI',        // 중국어 "市"
      ' To', ' to', ' TO',           // 일본어 "都"
      ' Fu', ' fu', ' FU',           // 일본어 "府"
      ' Ken', ' ken', ' KEN',        // 일본어 "県"
      ' Province', ' province',
      ' Prefecture', ' prefecture',
      ' Municipality', ' municipality',
      ' Metropolitan', ' metropolitan',
      ' District', ' district',
      ' County', ' county',
      ' Region', ' region',
      ' Area', ' area',
      ' Zone', ' zone',
      ' Governorate', ' governorate', // 아랍어권 행정구역
      ' Emirate', ' emirate',        // 아랍어권 토후국
      ' Wilaya', ' wilaya',          // 아랍어권 주
      ' Muhafazah', ' muhafazah',    // 아랍어권 도
      ' abad', ' Abad',              // 파키스탄/인도 접미사
      ' pur', ' Pur',                // 인도 접미사
      ' nagar', ' Nagar',            // 인도 접미사
      ' ganj', ' Ganj'               // 인도 접미사
    ];
    
    for (const suffix of suffixesToRemove) {
      if (normalized.endsWith(suffix)) {
        normalized = normalized.slice(0, -suffix.length).trim();
        break; // 첫 번째 매칭만 제거
      }
    }
    
    // 3. 국가명 제거 (쉼표 뒤 부분)
    if (normalized.includes(',')) {
      normalized = normalized.split(',')[0].trim();
    }
    
    // 4. 괄호 안 내용 제거
    normalized = normalized.replace(/\([^)]*\)/g, '').trim();
    
    // 5. 하이픈을 공백으로 변환
    normalized = normalized.replace(/-/g, ' ');
    
    // 6. 언더스코어를 공백으로 변환
    normalized = normalized.replace(/_/g, ' ');
    
    // 7. 연속 공백을 단일 공백으로
    normalized = normalized.replace(/\s+/g, ' ').trim();
    
    // 8. 첫 글자 대문자화 (각 단어별)
    normalized = normalized.split(' ')
      .map(word => {
        if (word.length === 0) return word;
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
    
    // 9. 특별한 케이스 매핑 (약어 확장)
    const cityMappings = {
      'Nyc': 'New York',
      'La': 'Los Angeles', 
      'Sf': 'San Francisco',
      'Dc': 'Washington',
      'Hk': 'Hong Kong',
      'Sg': 'Singapore',
      'Kl': 'Kuala Lumpur',
      'Bj': 'Beijing',
      'Sh': 'Shanghai',
      'Gz': 'Guangzhou',
      'Sz': 'Shenzhen',
      'Tk': 'Tokyo',
      'Os': 'Osaka',
      'Yk': 'Yokohama',
      'Mb': 'Mumbai',
      'Dl': 'Delhi',
      'Bl': 'Bangalore',
      'Ch': 'Chennai',
      'Kl': 'Kolkata',
      'Hyd': 'Hyderabad',
      'Pn': 'Pune',
      'Jkt': 'Jakarta',
      'Bkk': 'Bangkok',
      'Kul': 'Kuala Lumpur',
      'Syd': 'Sydney',
      'Mel': 'Melbourne',
      'Bne': 'Brisbane',
      'Per': 'Perth',
      // 아랍어권 도시 약어
      'Ksa': 'Saudi Arabia',
      'Uae': 'United Arab Emirates',
      'Dxb': 'Dubai',
      'Auh': 'Abu Dhabi',
      'Doh': 'Doha',
      'Kuw': 'Kuwait',
      'Bah': 'Bahrain',
      'Cai': 'Cairo',
      'Alex': 'Alexandria'
    };
    
    if (cityMappings[normalized]) {
      normalized = cityMappings[normalized];
    }
    
    // 10. 아랍어권 도시명 영어 표기 정규화
    const arabicCityCorrections = {
      // 사우디아라비아
      'Riyad': 'Riyadh',
      'Jidda': 'Jeddah',
      'Jiddah': 'Jeddah',
      'Makkah': 'Mecca',
      'Mecca': 'Mecca',
      'Madinah': 'Medina',
      'Madina': 'Medina',
      'Dammam': 'Dammam',
      'Khobar': 'Khobar',
      'Dhahran': 'Dhahran',
      'Taif': 'Taif',
      'Tabuk': 'Tabuk',
      'Abha': 'Abha',
      'Najran': 'Najran',
      'Hail': 'Hail',
      'Jazan': 'Jazan',
      'Jizan': 'Jazan',
      
      // UAE
      'Dubayy': 'Dubai',
      'Dubay': 'Dubai',
      'Sharjah': 'Sharjah',
      'Ajman': 'Ajman',
      'Fujairah': 'Fujairah',
      'Ras Khaimah': 'Ras Al Khaimah',
      'Umm Quwain': 'Umm Al Quwain',
      
      // 카타르
      'Doha': 'Doha',
      'Rayyan': 'Al Rayyan',
      'Wakrah': 'Al Wakrah',
      
      // 쿠웨이트
      'Kuwait': 'Kuwait City',
      'Hawalli': 'Hawalli',
      'Ahmadi': 'Ahmadi',
      'Jahra': 'Jahra',
      
      // 바레인
      'Manama': 'Manama',
      'Muharraq': 'Muharraq',
      'Riffa': 'Riffa',
      'Hamad': 'Hamad Town',
      
      // 오만
      'Muscat': 'Muscat',
      'Salalah': 'Salalah',
      'Nizwa': 'Nizwa',
      'Sur': 'Sur',
      'Sohar': 'Sohar',
      
      // 이집트
      'Qahirah': 'Cairo',
      'Iskandariyah': 'Alexandria',
      'Giza': 'Giza',
      'Gizah': 'Giza',
      'Shubra Khit': 'Shubra El Kheima',
      'Port Said': 'Port Said',
      'Suez': 'Suez',
      'Luxor': 'Luxor',
      'Asyut': 'Asyut',
      'Aswan': 'Aswan',
      
      // 요단
      'Amman': 'Amman',
      'Zarqa': 'Zarqa',
      'Irbid': 'Irbid',
      'Russeifa': 'Russeifa',
      'Wadi Sir': 'Wadi As Sir',
      
      // 레바논
      'Bayrut': 'Beirut',
      'Beirut': 'Beirut',
      'Tripoli': 'Tripoli',
      'Sidon': 'Sidon',
      'Tyre': 'Tyre',
      'Zahle': 'Zahle',
      
      // 시리아
      'Dimashq': 'Damascus',
      'Halab': 'Aleppo',
      'Homs': 'Homs',
      'Hama': 'Hama',
      'Latakia': 'Latakia',
      'Deir Zor': 'Deir ez Zor',
      
      // 이라크
      'Baghdad': 'Baghdad',
      'Basra': 'Basra',
      'Mosul': 'Mosul',
      'Erbil': 'Erbil',
      'Najaf': 'Najaf',
      'Karbala': 'Karbala',
      'Kirkuk': 'Kirkuk',
      'Sulaymaniyah': 'Sulaymaniyah',
      
      // 이란 (페르시아어이지만 아랍 문자 사용)
      'Tehran': 'Tehran',
      'Mashhad': 'Mashhad',
      'Isfahan': 'Isfahan',
      'Karaj': 'Karaj',
      'Shiraz': 'Shiraz',
      'Tabriz': 'Tabriz',
      'Qom': 'Qom',
      'Ahvaz': 'Ahvaz',
      'Kermanshah': 'Kermanshah',
      'Urmia': 'Urmia',
      
      // 모로코
      'Rabat': 'Rabat',
      'Casablanca': 'Casablanca',
      'Fes': 'Fez',
      'Fez': 'Fez',
      'Marrakech': 'Marrakech',
      'Marrakesh': 'Marrakech',
      'Agadir': 'Agadir',
      'Tangier': 'Tangier',
      'Meknes': 'Meknes',
      'Oujda': 'Oujda',
      'Kenitra': 'Kenitra',
      'Tetouan': 'Tetouan',
      
      // 알제리
      'Algiers': 'Algiers',
      'Oran': 'Oran',
      'Constantine': 'Constantine',
      'Annaba': 'Annaba',
      'Blida': 'Blida',
      'Batna': 'Batna',
      'Djelfa': 'Djelfa',
      'Setif': 'Setif',
      'Sidi Bel Abbes': 'Sidi Bel Abbes',
      'Biskra': 'Biskra',
      
      // 튀니지
      'Tunis': 'Tunis',
      'Sfax': 'Sfax',
      'Sousse': 'Sousse',
      'Ettadhamen': 'Ettadhamen',
      'Kairouan': 'Kairouan',
      'Bizerte': 'Bizerte',
      'Gabes': 'Gabes',
      'Ariana': 'Ariana',
      'Gafsa': 'Gafsa',
      'Monastir': 'Monastir',
      
      // 리비아
      'Tripoli': 'Tripoli',
      'Benghazi': 'Benghazi',
      'Misrata': 'Misrata',
      'Zawiya': 'Zawiya',
      'Bayda': 'Bayda',
      'Ajdabiya': 'Ajdabiya',
      'Tobruk': 'Tobruk',
      'Sabha': 'Sabha',
      'Derna': 'Derna',
      'Sirte': 'Sirte'
    };
    
    if (arabicCityCorrections[normalized]) {
      normalized = arabicCityCorrections[normalized];
    }
    
    // 11. 일반적인 오타 수정 (기존)
    const typoCorrections = {
      'Seul': 'Seoul',
      'Tokio': 'Tokyo',
      'Pekin': 'Beijing',
      'Bombay': 'Mumbai',
      'Calcutta': 'Kolkata',
      'Madras': 'Chennai'
    };
    
    if (typoCorrections[normalized]) {
      normalized = typoCorrections[normalized];
    }
    
    return normalized;
  }

  // 기존 데이터베이스의 city_a, city_b 정규화
  async normalizeExistingData(batchSize = 100) {
    try {
      console.log('🔄 기존 도시명 데이터 정규화 시작...');
      
      // 1. 모든 city_a, city_b 데이터 가져오기
      const { data: rfqData, error } = await supabase
        .from('rfq')
        .select('uuid, city_a, city_b')
        .not('city_a', 'is', null)
        .not('city_b', 'is', null);

      if (error) {
        console.error('데이터 조회 오류:', error);
        return;
      }

      console.log(`총 ${rfqData.length}개 레코드 정규화 예정`);

      // 2. 배치 단위로 처리
      for (let i = 0; i < rfqData.length; i += batchSize) {
        const batch = rfqData.slice(i, i + batchSize);
        console.log(`\n📦 배치 ${Math.floor(i/batchSize) + 1}/${Math.ceil(rfqData.length/batchSize)} 처리 중...`);
        
        for (const row of batch) {
          try {
            const originalCityA = row.city_a || '';
            const originalCityB = row.city_b || '';
            
            const normalizedCityA = this.normalizeCityName(originalCityA);
            const normalizedCityB = this.normalizeCityName(originalCityB);
            
            // 변경사항이 있는 경우만 업데이트
            if (originalCityA !== normalizedCityA || originalCityB !== normalizedCityB) {
              const { error: updateError } = await supabase
                .from('rfq')
                .update({
                  city_a: normalizedCityA,
                  city_b: normalizedCityB
                })
                .eq('uuid', row.uuid);

              if (updateError) {
                console.error(`❌ UUID ${row.uuid} 업데이트 오류:`, updateError);
              } else {
                console.log(`✅ UUID ${row.uuid}: "${originalCityA}" → "${normalizedCityA}" | "${originalCityB}" → "${normalizedCityB}"`);
                this.changedCount++;
              }
            }

            this.processedCount++;

            // 중복 추적
            if (normalizedCityA) this.trackDuplicate(normalizedCityA);
            if (normalizedCityB) this.trackDuplicate(normalizedCityB);

          } catch (error) {
            console.error(`❌ UUID ${row.uuid} 처리 오류:`, error);
          }
        }

        // 배치 간 휴식
        if (i + batchSize < rfqData.length) {
          console.log('⏱️ 배치 간 휴식 (1초)...');
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      // 3. 최종 결과 출력
      console.log('\n🎉 정규화 완료!');
      console.log(`📊 처리 결과:`);
      console.log(`   - 총 처리: ${this.processedCount}개`);
      console.log(`   - 변경됨: ${this.changedCount}개`);
      console.log(`   - 고유 도시: ${this.duplicatesFound.size}개`);

    } catch (error) {
      console.error('정규화 처리 오류:', error);
    }
  }

  // 중복 도시명 추적
  trackDuplicate(cityName) {
    if (cityName && cityName.trim() !== '') {
      const count = this.duplicatesFound.get(cityName) || 0;
      this.duplicatesFound.set(cityName, count + 1);
    }
  }

  // 도시별 통계 분석
  async analyzeCityStatistics() {
    try {
      console.log('📊 도시별 통계 분석 시작...');
      
      const { data: rfqData, error } = await supabase
        .from('rfq')
        .select('city_a, city_b');

      if (error) {
        console.error('데이터 조회 오류:', error);
        return;
      }

      const cityStats = new Map();

      // 통계 수집
      rfqData.forEach(row => {
        if (row.city_a && row.city_a.trim() !== '') {
          const count = cityStats.get(row.city_a) || 0;
          cityStats.set(row.city_a, count + 1);
        }
        if (row.city_b && row.city_b.trim() !== '') {
          const count = cityStats.get(row.city_b) || 0;
          cityStats.set(row.city_b, count + 1);
        }
      });

      // 상위 20개 도시 출력
      const sortedCities = Array.from(cityStats.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20);

      console.log('\n🏆 상위 20개 도시:');
      sortedCities.forEach(([city, count], index) => {
        console.log(`${index + 1}. ${city}: ${count}회`);
      });

      console.log(`\n📈 전체 통계:`);
      console.log(`   - 총 고유 도시: ${cityStats.size}개`);
      console.log(`   - 총 레코드: ${rfqData.length}개`);

      return sortedCities;

    } catch (error) {
      console.error('통계 분석 오류:', error);
    }
  }

  // 단일 도시명 테스트
  testNormalization(cityName) {
    const normalized = this.normalizeCityName(cityName);
    console.log(`🧪 테스트: "${cityName}" → "${normalized}"`);
    return normalized;
  }

  // 통계 정보 반환
  getStats() {
    return {
      processedCount: this.processedCount,
      changedCount: this.changedCount,
      uniqueCities: this.duplicatesFound.size,
      topCities: Array.from(this.duplicatesFound.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
    };
  }
}

// 사용 예제 함수들
export async function normalizeAllCities() {
  const normalizer = new CityNormalizer();
  await normalizer.normalizeExistingData(50); // 배치 크기 50개씩
  return normalizer.getStats();
}

export async function analyzeCities() {
  const normalizer = new CityNormalizer();
  return await normalizer.analyzeCityStatistics();
}

export function testCityNormalization(cityName) {
  const normalizer = new CityNormalizer();
  return normalizer.testNormalization(cityName);
}

// 기본 내보내기
export default CityNormalizer; 