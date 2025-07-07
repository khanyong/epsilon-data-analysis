/**
 * 고급 도시명 정규화 시스템
 * - 주소에서 도시명 추출
 * - 다국어 정규화 (베트남어, 터키어, 아랍어, 한국어, 중국어 등)
 * - 특수 문자 처리
 * - 행정구역 용어 정리
 */

export class AdvancedCityNormalizer {
  constructor() {
    // 베트남어 성조 제거 매핑
    this.vietnameseMapping = {
      'à': 'a', 'á': 'a', 'ạ': 'a', 'ả': 'a', 'ã': 'a',
      'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a', 'ẫ': 'a',
      'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a',
      'è': 'e', 'é': 'e', 'ẹ': 'e', 'ẻ': 'e', 'ẽ': 'e',
      'ê': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
      'ì': 'i', 'í': 'i', 'ị': 'i', 'ỉ': 'i', 'ĩ': 'i',
      'ò': 'o', 'ó': 'o', 'ọ': 'o', 'ỏ': 'o', 'õ': 'o',
      'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ộ': 'o', 'ổ': 'o', 'ỗ': 'o',
      'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o', 'ở': 'o', 'ỡ': 'o',
      'ù': 'u', 'ú': 'u', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u',
      'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u',
      'ỳ': 'y', 'ý': 'y', 'ỵ': 'y', 'ỷ': 'y', 'ỹ': 'y',
      'đ': 'd'
    };

    // 베트남 도시명 영어 매핑
    this.vietnameseCityMapping = {
      'Hà Nội': 'Hanoi',
      'Thành phố Hồ Chí Minh': 'Ho Chi Minh City',
      'Tp. Hồ Chí Minh': 'Ho Chi Minh City',
      'TP HCM': 'Ho Chi Minh City',
      'Sài Gòn': 'Ho Chi Minh City',
      'Đà Nẵng': 'Da Nang',
      'Hải Phòng': 'Hai Phong',
      'Cần Thơ': 'Can Tho',
      'Biên Hòa': 'Bien Hoa',
      'Huế': 'Hue',
      'Nha Trang': 'Nha Trang',
      'Buôn Ma Thuột': 'Buon Ma Thuot',
      'Quy Nhon': 'Quy Nhon',
      'Vũng Tàu': 'Vung Tau',
      'Thủ Đức': 'Thu Duc',
      'Dĩ An': 'Di An',
      'Từ Sơn': 'Tu Son',
      'Ba Đình': 'Ba Dinh',
      'Đống Đa': 'Dong Da',
      'Cầu Giấy': 'Cau Giay',
      'Hoàn Kiếm': 'Hoan Kiem',
      'Bình Thạnh': 'Binh Thanh',
      'Tân Bình': 'Tan Binh'
    };

    // 터키어 특수문자 매핑
    this.turkishMapping = {
      'İ': 'I', 'ı': 'i', 'Ş': 'S', 'ş': 's',
      'Ğ': 'G', 'ğ': 'g', 'Ü': 'U', 'ü': 'u',
      'Ö': 'O', 'ö': 'o', 'Ç': 'C', 'ç': 'c'
    };

    // 아랍어 도시명 매핑
    this.arabicCityMapping = {
      'دبي': 'Dubai',
      'أبو ظبي': 'Abu Dhabi',
      'الرياض': 'Riyadh',
      'جدة': 'Jeddah',
      'مكة': 'Mecca',
      'المدينة': 'Medina',
      'الدمام': 'Dammam',
      'الطائف': 'Taif',
      'تبوك': 'Tabuk',
      'بريدة': 'Buraidah',
      'الخبر': 'Khobar',
      'حائل': 'Hail',
      'الجبيل': 'Jubail',
      'الدوحة': 'Doha',
      'الكويت': 'Kuwait City',
      'بغداد': 'Baghdad',
      'البصرة': 'Basra',
      'الموصل': 'Mosul',
      'القاهرة': 'Cairo',
      'الإسكندرية': 'Alexandria',
      'الجيزة': 'Giza',
      'بيروت': 'Beirut',
      'عمان': 'Amman',
      'دمشق': 'Damascus',
      'حلب': 'Aleppo',
      'طرابلس': 'Tripoli',
      'تونس': 'Tunis',
      'الجزائر': 'Algiers',
      'الرباط': 'Rabat',
      'الدار البيضاء': 'Casablanca',
      'فاس': 'Fez',
      'مراكش': 'Marrakech'
    };

    // 한국어 도시명 매핑
    this.koreanCityMapping = {
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
      '포천시': 'Pocheon',
      '포천': 'Pocheon',
      '동두천시': 'Dongducheon',
      '동두천': 'Dongducheon',
      '과천시': 'Gwacheon',
      '과천': 'Gwacheon',
      '양평군': 'Yangpyeong',
      '양평': 'Yangpyeong',
      '가평군': 'Gapyeong',
      '가평': 'Gapyeong',
      '연천군': 'Yeoncheon',
      '연천': 'Yeoncheon',
      '영통구': 'Yeongtong',
      '영통': 'Yeongtong'
    };

    // 중국어 도시명 매핑
    this.chineseCityMapping = {
      '北京': 'Beijing',
      '北京市': 'Beijing',
      '上海': 'Shanghai',
      '上海市': 'Shanghai',
      '广州': 'Guangzhou',
      '广州市': 'Guangzhou',
      '深圳': 'Shenzhen',
      '深圳市': 'Shenzhen',
      '天津': 'Tianjin',
      '天津市': 'Tianjin',
      '重庆': 'Chongqing',
      '重庆市': 'Chongqing',
      '成都': 'Chengdu',
      '成都市': 'Chengdu',
      '武汉': 'Wuhan',
      '武汉市': 'Wuhan',
      '西安': 'Xian',
      '西安市': 'Xian',
      '南京': 'Nanjing',
      '南京市': 'Nanjing',
      '杭州': 'Hangzhou',
      '杭州市': 'Hangzhou',
      '青岛': 'Qingdao',
      '青岛市': 'Qingdao',
      '大连': 'Dalian',
      '大连市': 'Dalian',
      '宁波': 'Ningbo',
      '宁波市': 'Ningbo',
      '厦门': 'Xiamen',
      '厦门市': 'Xiamen',
      '福州': 'Fuzhou',
      '福州市': 'Fuzhou',
      '沈阳': 'Shenyang',
      '沈阳市': 'Shenyang',
      '长沙': 'Changsha',
      '长沙市': 'Changsha',
      '郑州': 'Zhengzhou',
      '郑州市': 'Zhengzhou',
      '石家庄': 'Shijiazhuang',
      '石家庄市': 'Shijiazhuang',
      '长春': 'Changchun',
      '长春市': 'Changchun',
      '合肥': 'Hefei',
      '合肥市': 'Hefei',
      '南昌': 'Nanchang',
      '南昌市': 'Nanchang',
      '贵阳': 'Guiyang',
      '贵阳市': 'Guiyang',
      '昆明': 'Kunming',
      '昆明市': 'Kunming',
      '南宁': 'Nanning',
      '南宁市': 'Nanning',
      '海口': 'Haikou',
      '海口市': 'Haikou',
      '兰州': 'Lanzhou',
      '兰州市': 'Lanzhou',
      '银川': 'Yinchuan',
      '银川市': 'Yinchuan',
      '西宁': 'Xining',
      '西宁市': 'Xining',
      '乌鲁木齐': 'Urumqi',
      '乌鲁木齐市': 'Urumqi',
      '拉萨': 'Lhasa',
      '拉萨市': 'Lhasa',
      '呼和浩特': 'Hohhot',
      '呼和浩特市': 'Hohhot',
      '香港': 'Hong Kong',
      '澳门': 'Macau',
      '台北': 'Taipei',
      '台北市': 'Taipei',
      '高雄': 'Kaohsiung',
      '高雄市': 'Kaohsiung',
      '台中': 'Taichung',
      '台中市': 'Taichung',
      '台南': 'Tainan',
      '台南市': 'Tainan'
    };

    // 제거할 접미사들 (우선순위 순)
    this.suffixesToRemove = [
      // 영어 접미사
      'International Airport', 'Airport', 'Int\'l Airport', 'Intl Airport',
      'Data Center', 'DataCenter', 'DC', 'IDC',
      'Industrial Park', 'Industrial Estate', 'Business Park',
      'Shopping Center', 'Shopping Centre', 'Mall', 'Plaza',
      'Building', 'Tower', 'Complex', 'Centre', 'Center',
      'Office', 'Warehouse', 'Terminal', 'Station',
      'University', 'College', 'School', 'Hospital',
      'Hotel', 'Resort', 'Club', 'Clinic',
      'Factory', 'Plant', 'Facility', 'Site',
      'Zone', 'Area', 'District', 'Region',
      'City', 'Town', 'Village', 'County',
      'Province', 'State', 'Prefecture', 'Municipality',
      'Metropolitan', 'Metro', 'Urban', 'Downtown',
      'International', 'Global', 'National', 'Central',
      'North', 'South', 'East', 'West',
      'Upper', 'Lower', 'New', 'Old',
      
      // 베트남어 접미사
      'Thành phố', 'TP', 'Tp', 'Quận', 'Huyện', 'Xã', 'Phường', 'Thị xã',
      'Tỉnh', 'Thành', 'Khu', 'Khu vực', 'Vùng',
      
      // 터키어 접미사  
      'İli', 'İlçesi', 'Belediyesi', 'Mahallesi', 'Mah',
      'Bulvarı', 'Caddesi', 'Sokağı', 'Meydanı',
      
      // 한국어 접미사
      '특별시', '광역시', '시', '군', '구', '읍', '면', '동', '리',
      '특별자치시', '특별자치도', '도', '특별시청', '시청', '군청', '구청',
      
      // 중국어 접미사
      '市', '省', '县', '区', '镇', '乡', '村', '街道',
      '自治区', '直辖市', '特别行政区',
      
      // 아랍어 접미사
      'محافظة', 'مدينة', 'منطقة', 'حي', 'قرية',
      'Governorate', 'Emirate', 'Wilaya', 'Muhafazah',
      
      // 일반 지역 용어
      'Shi', 'Ken', 'To', 'Fu', 'Gun', 'Ku', 'Cho', 'Machi',
      'Oblast', 'Krai', 'Raion', 'Okrug',
      'Département', 'Région', 'Commune', 'Arrondissement',
      'Estado', 'Municipio', 'Departamento',
      'Bundesland', 'Landkreis', 'Gemeinde',
      'Voivodeship', 'Powiat', 'Gmina',
      'Län', 'Kommun', 'Fylke', 'Kommune'
    ];

    // 제거할 전치사들
    this.prefixesToRemove = [
      'Al-', 'El-', 'As-', 'Ad-', 'An-', 'Ar-', 'At-', 'Az-',
      'New ', 'Old ', 'Upper ', 'Lower ', 'North ', 'South ', 'East ', 'West ',
      'Greater ', 'Little ', 'Big ', 'Small ', 'Grand ', 'Saint ', 'St. ', 'San ',
      'Santa ', 'Santo ', 'São ', 'Sainte ', 'Sankt ', 'Sint ', 'Sân ',
      'Port ', 'Fort ', 'Mount ', 'Mt. ', 'Lake ', 'River ',
      'Kota ', 'Bandar ', 'Shah ', 'Taman ', 'Kampung '
    ];

    // 주소에서 제거할 패턴들
    this.addressPatternsToRemove = [
      // 우편번호 패턴
      /\b\d{5}(-\d{4})?\b/g, // 미국 우편번호
      /\b\d{4,6}\b/g, // 일반 우편번호
      
      // 좌표 패턴
      /\d+°\d+'[\d.]*"[NSEW]/g,
      /[-+]?\d{1,3}\.\d+,\s*[-+]?\d{1,3}\.\d+/g,
      
      // 건물번호/층수 패턴
      /\b\d+\/F\b/g, // 층수
      /\b\d+F\b/g,
      /\bFloor \d+\b/g,
      /\bLevel \d+\b/g,
      /\bRoom \d+\b/g,
      /\bUnit \d+\b/g,
      /\bSuite \d+\b/g,
      /\bBuilding \d+\b/g,
      /\bBlock \d+\b/g,
      /\bLot \d+\b/g,
      /\bPlot \d+\b/g,
      
      // 도로번호 패턴
      /\bNo\.\s*\d+\b/g,
      /\b#\d+\b/g,
      /\bRoute \d+\b/g,
      /\bHighway \d+\b/g,
      
      // 기타 패턴
      /\bGPS:.*$/g,
      /\bLatitude:.*$/g,
      /\bLongitude:.*$/g,
      /\bCoordinates:.*$/g,
      /\bZIP.*$/g,
      /\bPostal Code.*$/g,
      /\bP\.O\. Box.*$/g,
      /\bTel\..*$/g,
      /\bPhone.*$/g,
      /\bFax.*$/g,
      /\bEmail.*$/g,
      /\bwww\..*$/g,
      /\bhttp.*$/g,
      
      // 특수문자 패턴
      /[()[\]{}]/g,
      /\s*-\s*/g,
      /\s*,\s*/g,
      /\s*;\s*/g,
      /\s*:\s*/g,
      /\s+/g // 연속 공백
    ];
  }

  /**
   * 베트남어 성조 제거
   */
  removeVietnameseTones(text) {
    return text.replace(/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/g, 
      match => this.vietnameseMapping[match] || match);
  }

  /**
   * 터키어 특수문자 정규화
   */
  normalizeTurkish(text) {
    return text.replace(/[İıŞşĞğÜüÖöÇç]/g, 
      match => this.turkishMapping[match] || match);
  }

  /**
   * 언어별 도시명 매핑 적용
   */
  applyCityMapping(text) {
    // 정확한 매치 먼저 시도
    if (this.arabicCityMapping[text]) return this.arabicCityMapping[text];
    if (this.koreanCityMapping[text]) return this.koreanCityMapping[text];
    if (this.chineseCityMapping[text]) return this.chineseCityMapping[text];
    if (this.vietnameseCityMapping[text]) return this.vietnameseCityMapping[text];
    
    // 부분 매치 시도
    for (const [original, english] of Object.entries(this.vietnameseCityMapping)) {
      if (text.includes(original)) {
        return english;
      }
    }
    
    for (const [original, english] of Object.entries(this.koreanCityMapping)) {
      if (text.includes(original)) {
        return english;
      }
    }
    
    return text;
  }

  /**
   * 주소에서 도시명 추출
   */
  extractCityFromAddress(address) {
    if (!address || typeof address !== 'string') return '';
    
    let text = address.trim();
    
    // 좌표 제거
    text = text.replace(/\d+°\d+'[\d.]*"[NSEW]/g, '');
    text = text.replace(/[-+]?\d{1,3}\.\d+,\s*[-+]?\d{1,3}\.\d+/g, '');
    
    // GPS, 좌표 관련 텍스트 제거
    text = text.replace(/GPS:.*$/gi, '');
    text = text.replace(/Latitude:.*$/gi, '');
    text = text.replace(/Longitude:.*$/gi, '');
    text = text.replace(/Coordinates:.*$/gi, '');
    
    // 우편번호 제거
    text = text.replace(/\b\d{5}(-\d{4})?\b/g, '');
    text = text.replace(/\b\d{4,6}\b/g, '');
    
    // 건물/층수 관련 제거
    text = text.replace(/\b\d+\/F\b/gi, '');
    text = text.replace(/\bFloor \d+\b/gi, '');
    text = text.replace(/\bLevel \d+\b/gi, '');
    text = text.replace(/\bRoom \d+\b/gi, '');
    text = text.replace(/\bUnit \d+\b/gi, '');
    text = text.replace(/\bSuite \d+\b/gi, '');
    text = text.replace(/\bBuilding \d+\b/gi, '');
    text = text.replace(/\bBlock \d+\b/gi, '');
    
    // 도로번호 제거
    text = text.replace(/\bNo\.\s*\d+\b/gi, '');
    text = text.replace(/\b#\d+\b/g, '');
    text = text.replace(/\bRoute \d+\b/gi, '');
    text = text.replace(/\bHighway \d+\b/gi, '');
    
    // 연락처 정보 제거
    text = text.replace(/\bTel\..*$/gi, '');
    text = text.replace(/\bPhone.*$/gi, '');
    text = text.replace(/\bFax.*$/gi, '');
    text = text.replace(/\bEmail.*$/gi, '');
    text = text.replace(/\bwww\..*$/gi, '');
    text = text.replace(/\bhttp.*$/gi, '');
    
    // 특수문자 정리
    text = text.replace(/[()[\]{}]/g, ' ');
    text = text.replace(/[,;:]/g, ' ');
    text = text.replace(/\s+-\s+/g, ' ');
    text = text.replace(/\s+/g, ' ');
    
    // 알려진 도시명들 (전 세계 주요 도시)
    const knownCities = [
      // 영어권
      'London', 'New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio',
      'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte',
      'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington', 'Boston', 'Nashville', 'Baltimore',
      'Oklahoma', 'Louisville', 'Portland', 'Las Vegas', 'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno',
      'Sacramento', 'Mesa', 'Kansas', 'Atlanta', 'Long Beach', 'Colorado Springs', 'Raleigh', 'Miami',
      'Virginia Beach', 'Omaha', 'Oakland', 'Minneapolis', 'Tulsa', 'Arlington', 'Tampa', 'Orleans',
      
      // 유럽
      'Paris', 'Berlin', 'Madrid', 'Rome', 'Amsterdam', 'Vienna', 'Prague', 'Budapest', 'Warsaw',
      'Stockholm', 'Copenhagen', 'Oslo', 'Helsinki', 'Dublin', 'Brussels', 'Zurich', 'Geneva',
      'Barcelona', 'Milan', 'Naples', 'Turin', 'Florence', 'Venice', 'Munich', 'Hamburg', 'Cologne',
      'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig', 'Bremen', 'Dresden',
      'Hannover', 'Nuremberg', 'Duisburg', 'Bochum', 'Wuppertal', 'Bielefeld', 'Bonn', 'Münster',
      
      // 아시아
      'Tokyo', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto', 'Kawasaki', 'Saitama',
      'Hiroshima', 'Sendai', 'Kitakyushu', 'Chiba', 'Sakai', 'Niigata', 'Hamamatsu', 'Okayama',
      'Sagamihara', 'Kumamoto', 'Shizuoka', 'Kagoshima', 'Matsuyama', 'Kanazawa', 'Utsunomiya',
      'Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Tianjin', 'Wuhan', 'Dongguan', 'Chengdu',
      'Nanjing', 'Chongqing', 'Xian', 'Suzhou', 'Harbin', 'Dalian', 'Qingdao', 'Jinan', 'Hangzhou',
      'Zhengzhou', 'Shijiazhuang', 'Taiyuan', 'Kunming', 'Ürümqi', 'Lanzhou', 'Hefei', 'Nanchang',
      'Guiyang', 'Nanning', 'Yinchuan', 'Xining', 'Hohhot', 'Lhasa',
      'Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Ulsan', 'Suwon', 'Goyang',
      'Seongnam', 'Bucheon', 'Ansan', 'Jeonju', 'Anyang', 'Cheongju', 'Cheonan', 'Namyangju',
      'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',
      'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam',
      'Pimpri', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad',
      'Meerut', 'Rajkot', 'Kalyan', 'Vasai', 'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad',
      'Singapore', 'Bangkok', 'Manila', 'Jakarta', 'Kuala Lumpur', 'Ho Chi Minh', 'Hanoi',
      'Yangon', 'Phnom Penh', 'Vientiane', 'Bandar Seri Begawan',
      
      // 중동
      'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain',
      'Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Khobar', 'Tabuk', 'Buraidah', 'Khamis Mushait',
      'Hail', 'Hafar Al Batin', 'Jubail', 'Dhahran', 'Taif', 'Najran', 'Yanbu', 'Al Qatif',
      'Doha', 'Kuwait', 'Manama', 'Muscat', 'Amman', 'Baghdad', 'Basra', 'Mosul', 'Erbil',
      'Tehran', 'Isfahan', 'Mashhad', 'Karaj', 'Shiraz', 'Tabriz', 'Qom', 'Ahvaz', 'Kermanshah',
      'Urmia', 'Rasht', 'Zahedan', 'Hamadan', 'Kerman', 'Yazd', 'Ardabil', 'Bandar Abbas',
      'Eslamshahr', 'Zanjan', 'Sanandaj', 'Arak', 'Khorramabad', 'Gorgan', 'Dezful', 'Ilam',
      'Ankara', 'Istanbul', 'Izmir', 'Bursa', 'Adana', 'Gaziantep', 'Konya', 'Antalya', 'Kayseri',
      'Mersin', 'Eskişehir', 'Diyarbakır', 'Samsun', 'Denizli', 'Şanlıurfa', 'Adapazarı', 'Malatya',
      'Kahramanmaraş', 'Erzurum', 'Van', 'Batman', 'Elâzığ', 'İzmit', 'Manisa', 'Sivas', 'Gebze',
      'Balıkesir', 'Tarsus', 'Kütahya', 'Trabzon', 'Çorum', 'Adıyaman', 'Osmaniye', 'Kırıkkale',
      'Antakya', 'Aydın', 'İskenderun', 'Uşak', 'Aksaray', 'Afyon', 'Isparta', 'İnegöl', 'Tekirdağ',
      'Edirne', 'Darıca', 'Ordu', 'Karaman', 'Gölcük', 'Siirt', 'Körfez', 'Kızıltepe', 'Düzce',
      'Tokat', 'Bolu', 'Derince', 'Turgutlu', 'Bandırma', 'Ceyhan', 'Menemen', 'Erzincan',
      'Nazilli', 'Zonguldak', 'Kırşehir', 'Niğde', 'Çanakkale', 'Karabük', 'Kırklareli', 'Nevşehir',
      'Burdur', 'Polatlı', 'Akhisar', 'Soma', 'Çorlu', 'Ergani', 'Sarıyer', 'Cizre', 'Nusaybin',
      'Kozan', 'Ödemiş', 'Patnos', 'Erciş', 'Bismil', 'Mustafakemalpaşa', 'Silopi', 'Elbistan',
      'Salihli', 'Bucak', 'Simav', 'Yozgat', 'Çankırı', 'Kırıkhan', 'Suruç', 'Viranşehir',
      'Tatvan', 'Reyhanlı', 'Çerkezköy', 'Biga', 'Akşehir', 'Söke', 'Turhal', 'Develi', 'Manavgat',
      'Alanya', 'Kuşadası', 'Didim', 'Bodrum', 'Fethiye', 'Marmaris', 'Kaş', 'Kalkan', 'Çeşme',
      'Alaçatı', 'Bozcaada', 'Ayvalık', 'Foça', 'Seferihisar', 'Urla', 'Karaburun', 'Mordoğan',
      'Güzelbahçe', 'Narlıdere', 'Balçova', 'Konak', 'Bornova', 'Buca', 'Gaziemir', 'Karşıyaka',
      'Bayraklı', 'Çiğli', 'Menemen', 'Aliağa', 'Bergama', 'Dikili', 'Kınık', 'Ödemiş', 'Tire',
      'Beydağ', 'Kiraz', 'Torbalı', 'Selçuk', 'Germencik', 'İncirliova', 'Nazilli', 'Sultanhisar',
      'Kuyucak', 'Çine', 'Yenipazar', 'Buharkent', 'Karacasu', 'Koçarlı', 'Söke', 'Kuşadası',
      'Didim', 'Bodrum', 'Milas', 'Yatağan', 'Kavaklıdere', 'Çameli', 'Honaz', 'Çal', 'Bekilli',
      'Beyağaç', 'Bozkurt', 'Çardak', 'Çivril', 'Güney', 'Kale', 'Sarayköy', 'Serinhisar', 'Tavas',
      'Acıpayam', 'Buldan', 'Çameli', 'Çardak', 'Çivril', 'Güney', 'Honaz', 'Kale', 'Sarayköy',
      'Serinhisar', 'Tavas', 'Bekilli', 'Beyağaç', 'Bozkurt', 'Çal', 'Çameli', 'Çardak', 'Çivril',
      'Güney', 'Honaz', 'Kale', 'Sarayköy', 'Serinhisar', 'Tavas', 'Bekilli', 'Beyağaç', 'Bozkurt',
      'Çal', 'Çameli', 'Çardak', 'Çivril', 'Güney', 'Honaz', 'Kale', 'Sarayköy', 'Serinhisar',
      'Tavas', 'Bekilli', 'Beyağaç', 'Bozkurt', 'Çal',
      
      // 아프리카
      'Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said', 'Suez', 'Luxor', 'Mansoura',
      'El Mahalla El Kubra', 'Tanta', 'Asyut', 'Ismailia', 'Fayyum', 'Zagazig', 'Aswan', 'Damietta',
      'Damanhur', 'Minya', 'Beni Suef', 'Hurghada', 'Qena', 'Sohag', 'Shibin El Kom', 'Banha',
      'Arish', 'Mallawi', 'Bilbays', 'Mit Ghamr', 'Al Fashn', 'Kafr El Sheikh', 'Dikirnis', 'Desouk',
      'Edfu', 'Kom Ombo', 'Esna', 'Idfu', 'Marsa Alam', 'Safaga', 'El Gouna', 'Dahab', 'Nuweiba',
      'Taba', 'Sharm El Sheikh', 'Casablanca', 'Rabat', 'Fez', 'Marrakech', 'Agadir', 'Tangier',
      'Meknes', 'Oujda', 'Kenitra', 'Tetouan', 'Safi', 'Mohammedia', 'Khouribga', 'El Jadida',
      'Beni Mellal', 'Nador', 'Taza', 'Settat', 'Berrechid', 'Khemisset', 'Inezgane', 'Ksar El Kebir',
      'Larache', 'Guelmim', 'Errachidia', 'Ouarzazate', 'Tiznit', 'Taroudant', 'Sidi Kacem',
      'Khenifra', 'Essaouira', 'Midelt', 'Azrou', 'Ifrane', 'Al Hoceima', 'Chefchaouen', 'Ouezzane',
      'Sidi Slimane', 'Youssoufia', 'Jerada', 'Taourirt', 'Zagora', 'Tinghir', 'Kalaat MGouna',
      'Boumalne Dades', 'Erfoud', 'Rissani', 'Merzouga', 'Imilchil', 'Rich', 'Bouarfa', 'Figuig',
      'Oujda', 'Berkane', 'Saïdia', 'Ahfir', 'Taforalt', 'Zegzel', 'Madagh', 'Ras El Ma', 'Debdou',
      'Ain Beni Mathar', 'Tendrara', 'Bouanane', 'El Aioun', 'Targuist', 'Imzouren', 'Bni Bouayach',
      'Jebha', 'Stehat', 'Bni Hadifa', 'Ketama', 'Issaguen', 'Bab Berred', 'Bab Taza', 'Souk El Arbaa',
      'Tunis', 'Sfax', 'Sousse', 'Ettadhamen', 'Kairouan', 'Bizerte', 'Gabès', 'Ariana', 'Gafsa',
      'Monastir', 'Ben Arous', 'Kasserine', 'Médenine', 'Nabeul', 'Tataouine', 'Béja', 'Jendouba',
      'Mahdia', 'Siliana', 'Kef', 'Tozeur', 'Kebili', 'Zaghouan', 'Manouba', 'Lagos', 'Kano',
      'Ibadan', 'Kaduna', 'Port Harcourt', 'Benin', 'Maiduguri', 'Zaria', 'Aba', 'Jos', 'Ilorin',
      'Oyo', 'Enugu', 'Abeokuta', 'Abuja', 'Sokoto', 'Onitsha', 'Warri', 'Okene', 'Calabar',
      'Uyo', 'Katsina', 'Ado Ekiti', 'Akure', 'Bauchi', 'Ikeja', 'Makurdi', 'Minna', 'Effon Alaiye',
      'Ilesa', 'Shaki', 'Ondo', 'Iseyin', 'Igboho', 'Ejigbo', 'Ogbomoso', 'Ikirun', 'Ile Ife',
      'Modakeke', 'Inisa', 'Apomu', 'Ikire', 'Gbongan', 'Osogbo', 'Ila Orangun', 'Offa', 'Iwo',
      'Ede', 'Ejigbo', 'Iragbiji', 'Okuku', 'Ada', 'Erin Ile', 'Ilobu', 'Ifon', 'Igbaja', 'Ajasse Ipo',
      'Lafiagi', 'Pategi', 'Kaiama', 'Wawa', 'Yashikira', 'Kishi', 'Igboho', 'Tede', 'Ago Are',
      'Saki', 'Otu', 'Igbeti', 'Iwere Ile', 'Fiditi', 'Lanlate', 'Igbo Ora', 'Eruwa', 'Lanlate',
      'Ido', 'Akinyele', 'Lagelu', 'Egbeda', 'Ona Ara', 'Oluyole', 'Ibadan North', 'Ibadan North East',
      'Ibadan North West', 'Ibadan South East', 'Ibadan South West', 'Ibarapa Central', 'Ibarapa East',
      'Ibarapa North', 'Ido', 'Irepo', 'Iseyin', 'Itesiwaju', 'Iwajowa', 'Kajola', 'Lagelu',
      'Ogbomoso North', 'Ogbomoso South', 'Ogo Oluwa', 'Olorunsogo', 'Oluyole', 'Ona Ara', 'Orelope',
      'Ori Ire', 'Oyo East', 'Oyo West', 'Saki East', 'Saki West', 'Surulere',
      
      // 오세아니아
      'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra',
      'Sunshine Coast', 'Wollongong', 'Hobart', 'Geelong', 'Townsville', 'Cairns', 'Darwin',
      'Toowoomba', 'Ballarat', 'Bendigo', 'Albury', 'Launceston', 'Mackay', 'Rockhampton',
      'Bunbury', 'Bundaberg', 'Coffs Harbour', 'Wagga Wagga', 'Hervey Bay', 'Mildura', 'Shepparton',
      'Port Macquarie', 'Gladstone', 'Tamworth', 'Traralgon', 'Orange', 'Dubbo', 'Geraldton',
      'Bowral', 'Bathurst', 'Warrnambool', 'Kalgoorlie', 'Devonport', 'Burnie', 'Mount Gambier',
      'Lismore', 'Nelson Bay', 'Victor Harbor', 'Warwick', 'Albany', 'Broken Hill', 'Whyalla',
      'Port Augusta', 'Port Pirie', 'Mount Isa', 'Emerald', 'Kingaroy', 'Charleville', 'Roma',
      'Dalby', 'Chinchilla', 'Goondiwindi', 'Stanthorpe', 'Inglewood', 'Texas', 'Tenterfield',
      'Glen Innes', 'Inverell', 'Moree', 'Narrabri', 'Gunnedah', 'Quirindi', 'Scone', 'Muswellbrook',
      'Singleton', 'Cessnock', 'Maitland', 'Raymond Terrace', 'Nelson Bay', 'Tea Gardens', 'Bulahdelah',
      'Taree', 'Forster', 'Tuncurry', 'Gloucester', 'Stroud', 'Dungog', 'Paterson', 'Gresford',
      'Vacy', 'Hinton', 'Morpeth', 'East Maitland', 'West Maitland', 'Rutherford', 'Telarah',
      'Thornton', 'Ashtonfield', 'Chisholm', 'Gillieston Heights', 'Lorn', 'Bolwarra', 'Largs',
      'Morpeth', 'Wallalong', 'Woodville', 'Seahampton', 'Hinton', 'Lorn', 'Bolwarra Heights',
      'Bolwarra', 'Largs', 'Morpeth', 'Wallalong', 'Woodville', 'Seahampton', 'Hinton', 'Lorn',
      'Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga', 'Napier', 'Hastings',
      'Dunedin', 'Palmerston North', 'Nelson', 'Rotorua', 'New Plymouth', 'Whangarei', 'Invercargill',
      'Wanganui', 'Gisborne', 'Timaru', 'Oamaru', 'Blenheim', 'Masterton', 'Levin', 'Taupo',
      'Cambridge', 'Te Awamutu', 'Tokoroa', 'Putaruru', 'Matamata', 'Morrinsville', 'Te Aroha',
      'Paeroa', 'Waihi', 'Katikati', 'Te Puke', 'Opotiki', 'Whakatane', 'Kawerau', 'Murupara',
      'Taumarunui', 'Ohakune', 'Waiouru', 'Taihape', 'Hunterville', 'Marton', 'Bulls', 'Sanson',
      'Foxton', 'Shannon', 'Levin', 'Otaki', 'Waikanae', 'Paraparaumu', 'Raumati', 'Paekakariki',
      'Pukerua Bay', 'Plimmerton', 'Porirua', 'Whitby', 'Paremata', 'Camborne', 'Elsdon', 'Takapuna',
      'Devonport', 'Northcote', 'Birkenhead', 'Glenfield', 'Beach Haven', 'Birkdale', 'Beachhaven',
      'Hobsonville', 'West Harbour', 'Massey', 'Swanson', 'Ranui', 'Glen Eden', 'Titirangi',
      'New Lynn', 'Avondale', 'Blockhouse Bay', 'Lynfield', 'Hillsborough', 'Three Kings', 'Mount Roskill',
      'Onehunga', 'Penrose', 'Mount Wellington', 'Panmure', 'Glen Innes', 'Point England', 'Tamaki',
      'Kohimarama', 'Mission Bay', 'Saint Heliers', 'Glendowie', 'Meadowbank', 'Orakei', 'Remuera',
      'Newmarket', 'Parnell', 'Grafton', 'Grey Lynn', 'Ponsonby', 'Herne Bay', 'Saint Marys Bay',
      'Freemans Bay', 'Viaduct Harbour', 'Wynyard Quarter', 'Britomart', 'Commercial Bay', 'Quay Street',
      'Queen Street', 'Karangahape Road', 'Symonds Street', 'Mount Eden', 'Kingsland', 'Morningside',
      'Saint Lukes', 'Mount Albert', 'Waterview', 'Point Chevalier', 'Western Springs', 'Arch Hill',
      'Westmere', 'Herne Bay', 'Saint Marys Bay', 'Freemans Bay', 'Viaduct Harbour', 'Wynyard Quarter',
      'Britomart', 'Commercial Bay', 'Quay Street', 'Queen Street', 'Karangahape Road', 'Symonds Street',
      'Mount Eden', 'Kingsland', 'Morningside', 'Saint Lukes', 'Mount Albert', 'Waterview',
      'Point Chevalier', 'Western Springs', 'Arch Hill', 'Westmere'
    ];
    
    // 쉼표로 분리된 주소에서 도시명 추출 시도
    const parts = text.split(',').map(part => part.trim()).filter(part => part.length > 0);
    
    // 각 부분에서 알려진 도시명 찾기
    for (const part of parts) {
      const words = part.split(/\s+/);
      
      // 정확한 도시명 매치
      for (const city of knownCities) {
        if (part.toLowerCase().includes(city.toLowerCase())) {
          return city;
        }
      }
      
      // 복합 도시명 매치 (예: "New York", "San Francisco")
      for (let i = 0; i < words.length - 1; i++) {
        const twoWords = `${words[i]} ${words[i + 1]}`;
        for (const city of knownCities) {
          if (twoWords.toLowerCase() === city.toLowerCase()) {
            return city;
          }
        }
      }
      
      // 세 단어 조합 매치 (예: "Ho Chi Minh")
      for (let i = 0; i < words.length - 2; i++) {
        const threeWords = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
        for (const city of knownCities) {
          if (threeWords.toLowerCase() === city.toLowerCase()) {
            return city;
          }
        }
      }
    }
    
    // 마지막 부분이 국가명이면 그 앞이 도시명일 가능성이 높음
    if (parts.length >= 2) {
      const lastPart = parts[parts.length - 1].toLowerCase();
      const countries = ['china', 'japan', 'korea', 'vietnam', 'thailand', 'singapore', 
                        'malaysia', 'indonesia', 'philippines', 'india', 'turkey', 
                        'germany', 'france', 'italy', 'spain', 'uk', 'usa', 'canada',
                        'australia', 'brazil', 'mexico', 'egypt', 'saudi arabia', 'uae',
                        'united kingdom', 'united states', 'south korea', 'hong kong'];
      
      if (countries.some(country => lastPart.includes(country))) {
        if (parts.length >= 3) {
          const cityCandidate = parts[parts.length - 2];
          // 알려진 도시명인지 확인
          for (const city of knownCities) {
            if (cityCandidate.toLowerCase().includes(city.toLowerCase())) {
              return city;
            }
          }
          return this.normalizeCity(cityCandidate);
        } else if (parts.length >= 2) {
          const cityCandidate = parts[parts.length - 2];
          for (const city of knownCities) {
            if (cityCandidate.toLowerCase().includes(city.toLowerCase())) {
              return city;
            }
          }
          return this.normalizeCity(cityCandidate);
        }
      }
    }
    
    // 도시명으로 보이는 단어들 찾기 (개선된 로직)
    const words = text.split(/\s+/).filter(word => word.length > 0);
    
    // 알려진 도시명 패턴 찾기
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      // 알려진 도시명과 정확히 매치되는지 확인
      for (const city of knownCities) {
        if (word.toLowerCase() === city.toLowerCase()) {
          return city;
        }
      }
      
      // 대문자로 시작하고 적절한 길이인 단어 (마지막 수단)
      if (word.length >= 3 && word.length <= 20 && /^[A-Z]/.test(word)) {
        // 숫자나 특수문자가 많이 포함되지 않은 경우
        if (!/\d{2,}/.test(word) && !/[#@$%^&*]/.test(word)) {
          // 일반적인 단어들 제외
          const commonWords = ['Building', 'Number', 'Street', 'Road', 'Avenue', 'Floor', 
                             'Unit', 'Suite', 'Room', 'Block', 'Tower', 'Centre', 'Center',
                             'Office', 'Business', 'Industrial', 'Commercial', 'International',
                             'Global', 'National', 'Regional', 'Local', 'Main', 'Central',
                             'North', 'South', 'East', 'West', 'Upper', 'Lower', 'New', 'Old'];
          
          if (!commonWords.some(commonWord => word.toLowerCase() === commonWord.toLowerCase())) {
            return this.normalizeCity(word);
          }
        }
      }
    }
    
    return '';
  }

  /**
   * 접미사 제거
   */
  removeSuffixes(text) {
    let result = text;
    
    for (const suffix of this.suffixesToRemove) {
      const regex = new RegExp(`\\s*${suffix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'gi');
      result = result.replace(regex, '');
    }
    
    return result.trim();
  }

  /**
   * 전치사 제거
   */
  removePrefixes(text) {
    let result = text;
    
    for (const prefix of this.prefixesToRemove) {
      const regex = new RegExp(`^\\s*${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi');
      result = result.replace(regex, '');
    }
    
    return result.trim();
  }

  /**
   * 메인 정규화 함수
   */
  normalizeCity(cityName) {
    if (!cityName || typeof cityName !== 'string') {
      return '';
    }

    let normalized = cityName.trim();
    
    // 빈 문자열 체크
    if (normalized === '') return '';
    
    // 완전한 주소인 경우 도시명 추출
    if (normalized.length > 50 || normalized.includes(',') || /\d+°/.test(normalized)) {
      normalized = this.extractCityFromAddress(normalized);
      if (!normalized) return '';
    }
    
    // 언어별 매핑 적용
    const mapped = this.applyCityMapping(normalized);
    if (mapped !== normalized) {
      normalized = mapped;
    }
    
    // 베트남어 성조 제거
    normalized = this.removeVietnameseTones(normalized);
    
    // 터키어 특수문자 정규화
    normalized = this.normalizeTurkish(normalized);
    
    // 알려진 도시명인지 확인 (전치사 제거 전에)
    const knownCities = [
      'New York', 'New Orleans', 'New Delhi', 'New Plymouth', 'New Lynn',
      'San Francisco', 'San Diego', 'San Antonio', 'San Jose', 'San Juan',
      'Los Angeles', 'Las Vegas', 'Port Said', 'Port Harcourt', 'Port Augusta',
      'Saint Petersburg', 'Saint Louis', 'Santa Monica', 'Santa Barbara',
      'Fort Worth', 'Fort Lauderdale', 'Mount Gambier', 'Mount Isa'
    ];
    
    let isKnownCity = false;
    for (const city of knownCities) {
      if (normalized.toLowerCase() === city.toLowerCase()) {
        isKnownCity = true;
        normalized = city; // 정확한 표기로 변경
        break;
      }
    }
    
    // 알려진 도시명이 아닌 경우에만 전치사 제거
    if (!isKnownCity) {
      normalized = this.removePrefixes(normalized);
    }
    
    // 접미사 제거
    normalized = this.removeSuffixes(normalized);
    
    // 괄호 내용 제거
    normalized = normalized.replace(/\([^)]*\)/g, '');
    
    // 국가명 제거 (쉼표 뒤)
    if (normalized.includes(',')) {
      normalized = normalized.split(',')[0];
    }
    
    // 하이픈을 공백으로 변환
    normalized = normalized.replace(/-/g, ' ');
    
    // 연속 공백 정리
    normalized = normalized.replace(/\s+/g, ' ').trim();
    
    // 숫자만 있는 경우 제거
    if (/^\d+$/.test(normalized)) {
      return '';
    }
    
    // 너무 짧거나 긴 경우 제거
    if (normalized.length < 2 || normalized.length > 30) {
      return '';
    }
    
    // 첫 글자 대문자화
    normalized = normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase();
    
    // 각 단어의 첫 글자 대문자화 (영어인 경우)
    if (/^[a-zA-Z\s]+$/.test(normalized)) {
      normalized = normalized.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
    
    return normalized;
  }

  /**
   * 배치 정규화
   */
  normalizeBatch(cities) {
    if (!Array.isArray(cities)) return [];
    
    return cities.map(city => this.normalizeCity(city)).filter(city => city !== '');
  }

  /**
   * 정규화 통계
   */
  getStats(originalCities) {
    const normalized = this.normalizeBatch(originalCities);
    const uniqueOriginal = new Set(originalCities.filter(city => city && city.trim() !== ''));
    const uniqueNormalized = new Set(normalized);
    
    return {
      totalOriginal: originalCities.length,
      uniqueOriginal: uniqueOriginal.size,
      totalNormalized: normalized.length,
      uniqueNormalized: uniqueNormalized.size,
      emptyResults: originalCities.length - normalized.length,
      compressionRatio: uniqueNormalized.size / uniqueOriginal.size
    };
  }
}

export default AdvancedCityNormalizer; 