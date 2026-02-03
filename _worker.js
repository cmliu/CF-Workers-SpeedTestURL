export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.substring(1);

    if (path === "locations") {
      return locations_cn(request);
    }

    let bytes = 100000000; // Default 100MB
    if (path) {
      const match = path.match(/^(\d+)([a-z]{0,2})$/i);
      if (!match) {
        return new Response("路径格式不正确", { status: 400 });
      }

      const size = parseInt(match[1], 10);
      const unit = match[2].toLowerCase();
      const multipliers = {
        'k': 1000, 'kb': 1000,
        'm': 1000000, 'mb': 1000000,
        'g': 1000000000, 'gb': 1000000000
      };
      bytes = size * (multipliers[unit] || 1);
    }

    const targetUrl = `https://speed.cloudflare.com/__down?bytes=${bytes}`;
    const headers = new Headers(request.headers);
    headers.set('referer', 'https://speed.cloudflare.com/');

    return fetch(new Request(targetUrl, {
      method: request.method,
      headers: headers,
      body: request.body
    }));
  }
};

async function locations_cn(request) {
  const response = await fetch('https://speed.cloudflare.com/locations', {
    headers: { 'referer': 'https://speed.cloudflare.com/' }
  });
  const locations = await response.json();

  const regionMap = {
    'Africa': '非洲',
    'Asia Pacific': '亚洲',
    'Europe': '欧洲',
    'Middle East': '中东',
    'North America': '北美洲',
    'Oceania': '大洋洲',
    'South America': '南美洲'
  };

  const cityMap = {
    'Abidjan': '阿比让', 'Accra': '阿克拉', 'Adelaide': '阿德莱德', 'Ahmedabad': '艾哈迈达巴德',
    'Albuquerque': '阿尔伯克基', 'Algiers': '阿尔及尔', 'Almaty': '阿拉木图', 'Americana': '阿默里卡',
    'Amman': '安曼', 'Amsterdam': '阿姆斯特丹', 'Anchorage': '安克雷奇', 'Annaba': '阿纳巴', 'Annabah': '安纳巴',
    'Antananarivo': '塔那那利佛', 'Aracatuba': '阿拉卡图巴', 'Arica': '亚利加', 'Ashburn': '阿什本',
    'ASTANA': '阿斯塔纳', 'Astara': '阿斯塔拉', 'Asunción': '亚松森', 'Asuncion': '亚松森',
    'Athens': '雅典', 'Atlanta': '亚特兰大', 'Auckland': '奥克兰', 'Austin': '奥斯汀',
    'Baghdad': '巴格达', 'Baku': '巴库', 'Bandar Seri Begawan': '斯里沙丹港', 'Bangalore': '班加罗尔',
    'Bangkok': '曼谷', 'Bangor': '班戈', 'Barcelona': '巴塞罗那', 'Barranquilla': '巴兰基亚',
    'Basra': '巴士拉', 'Beirut': '贝鲁特', 'Belém': '贝伦', 'Belem': '贝伦',
    'Belgrade': '贝尔格莱德', 'Belgrad': '贝尔格莱德', 'Belo Horizonte': '贝洛奥里藏特', 'Berlin': '柏林',
    'Bhubaneswar': '布赫瓦内斯瓦尔', 'Blumenau': '布卢梅瑙', 'Bogota': '波哥大', 'Bordeaux': '波尔多',
    'Bordeaux/Merignac': '波尔多', 'Boston': '波士顿', 'Brasilia': '巴西利亚', 'Bratislava': '布拉迪斯拉发',
    'Bridgetown': '布里奇敦', 'Brisbane': '布里斯班', 'Brussels': '布鲁塞尔', 'Bucharest': '布加勒斯特',
    'Budapest': '大连', 'Buenos Aires': '布宜诺斯艾利斯', 'Buffalo': '水牛城', 'Córdoba': '科尔多瓦',
    'Cordoba': '科尔多瓦', 'Cacador': '卡卡多', 'Cagayan de Oro': '卡加延德奥罗', 'Cairo': '开罗',
    'Calgary': '卡尔加里', 'Campinas': '坎皮纳斯', 'Campos dos Goytacazes': '坎波斯德戈伊塔卡泽斯',
    'Canberra': '堪培拉', 'Cape Town': '开普敦', 'Cebu': '宿雾', 'Chandigarh': '钱迪加尔',
    'Chapeco': '查佩科', 'Charlotte': '夏洛特', 'Chennai': '金奈', 'Chiang Mai': '清迈',
    'Chicago': '芝加哥', 'Chișinău': '基希訥乌', 'Chittagong': '齐塔贡', 'Christchurch': '克赖斯特彻奇',
    'Cleveland': '克利夫兰', 'Colombo': '科伦坡', 'Columbus': '哥伦布', 'Copenhagen': '哥本哈根',
    'Cork': '科克', 'Cuiaba': '库亚巴', 'Curitiba': '库里蒂巴', 'Düsseldorf': '杜塞尔多夫',
    'Dusseldorf': '杜塞尔多夫', 'Da Nang': '岘港', 'Dakar': '达喀尔', 'Dallas': '达拉斯',
    'Dallas-Fort Worth': '达拉斯', 'Dammam': '达曼', 'Ad Dammam': '达曼', 'Dar es Salaam': '达累斯萨拉姆',
    'Denpasar': '登帕萨', 'Denpasar-Bali Island': '登帕萨', 'Denver': '丹佛', 'Detroit': '底特律',
    'Dhaka': '达卡', 'Djibouti': '吉布提', 'Djibouti City': '吉布提市', 'Doha': '多哈',
    'Dubai': '迪拜', 'Dublin': '都柏林', 'Durban': '德班', 'Durham': '达勒姆',
    'Edinburgh': '爱丁堡', 'Erbil': '埃尔比勒', 'Arbil': '埃尔比勒', 'Florianopolis': '弗洛里亚诺波利斯',
    'Fortaleza': '福塔雷萨', 'Frankfurt': '法兰克福', 'Frankfurt-am-Main': '法兰克福', 'Fukuoka': '福冈',
    'Gaborone': '哈伯罗内', 'Geneva': '日内瓦', 'Georgetown': '乔治敦', 'Goiania': '戈亚尼亚',
    'Gothenburg': '哥德堡', 'Guadalajara': '瓜达拉哈拉', 'Guatemala City': '危地马拉城', 'Guayaquil': '瓜亚基尔',
    'Hagatna': '阿加尼亚', 'Haifa': '海法', 'Halifax': '哈利法克斯', 'Hamburg': '汉堡',
    'Hanoi': '河内', 'Harare': '哈拉雷', 'Helsinki': '赫尔辛基', 'Ho Chi Minh City': '胡志明市',
    'Hobart': '霍巴特', 'Hong Kong': '香港', 'Honolulu': '檀香山', 'Houston': '休斯顿',
    'Hyderabad': '海得拉巴', 'Indianapolis': '印第安纳波利斯', 'Islamabad': '伊斯兰堡', 'Istanbul': '伊斯坦布尔',
    'Itajai': '伊塔杰', 'Izmir': '伊兹密尔', 'Jacksonville': '杰克逊维尔', 'Jakarta': '雅加达',
    'Jashore': '加沙', 'Jeddah': '吉达', 'Johannesburg': '约翰内斯堡', 'Johor Bahru': '新山',
    'Joinville': '若因维尔', 'Juazeiro do Norte': '北茹阿泽鲁', 'Juazeiro Do Norte': '北茹阿泽鲁',
    'KAMPALA': '坎帕拉', 'Kampala': '坎帕拉', 'Kannur': '康纳', 'Kanpur': '坎普尔',
    'Kansas City': '堪萨斯城', 'Kaohsiung City': '高雄市', 'Karachi': '卡拉奇', 'Kathmandu': '加德满都',
    'Kigali': '基加利', 'Kingston': '金斯敦', 'Kinshasa': '金沙萨', 'Kochi': '科钦', 'Cochin': '科钦',
    'Kolkata': '加尔各答', 'Krasnoyarsk': '克拉斯诺亚尔斯克', 'Kuala Lumpur': '吉隆坡', 'Kuwait City': '科威特城',
    'Kyiv': '基辅', 'Kiev': '基辅', 'La Paz': '拉巴斯', 'La Paz / El Alto': '拉巴斯', 'Lagos': '拉各斯',
    'Lahore': '拉合尔', 'Las Vegas': '拉斯维加斯', 'Lima': '利马', 'Lisbon': '里斯本',
    'London': '伦敦', 'Los Angeles': '洛杉矶', 'Luanda': '罗安达', 'Luxembourg City': '卢森堡市',
    'Lyon': '里昂', 'Macau': '澳门', 'Madrid': '马德里', 'Male': '马累',
    'Manama': '麦纳麦', 'Manaus': '马瑙斯', 'Manchester': '曼彻斯特', 'Mandalay': '缅甸仰光',
    'Manila': '马尼拉', 'Maputo': '马普托', 'Marseille': '马赛', 'McAllen': '麦卡伦',
    'Medellín': '麦德林', 'Melbourne': '墨尔本', 'Memphis': '孟菲斯', 'Mexico City': '墨西哥城',
    'Miami': '迈阿密', 'Milan': '米兰', 'Minneapolis': '明尼阿波利斯', 'Minsk': '明斯克',
    'Mombasa': '蒙巴萨', 'Montgomery': '蒙哥马利', 'Montréal': '蒙特利尔', 'Montreal': '蒙特利尔',
    'Moscow': '莫斯科', 'Mumbai': '孟买', 'Munich': '慕尼黑', 'Muscat': '马斯喀特',
    'Nagpur': '纳格浦尔', 'Naqpur': '纳格浦尔', 'Naha': '那霸', 'Nairobi': '内罗毕',
    'Najaf': '纳杰夫', 'Nashville': '纳什维尔', 'Nasiriyah': '纳西里亚', 'Neuquen': '新地',
    'New Delhi': '新德里', 'Newark': '纽瓦克', 'Nicosia': '尼科西亚', 'Norfolk': '诺福克',
    'Noumea': '努美阿', 'Oklahoma City': '俄克拉荷马城', 'Omaha': '奥马哈', 'Oran': '奥兰',
    'Osaka': '大阪', 'Oslo': '奥斯陆', 'Ottawa': '渥太华', 'Ouagadougou': '瓦加杜古',
    'Palermo': '巴勒莫', 'Palmas': '帕尔马斯', 'Panama City': '巴拿马城', 'Paramaribo': '帕拉马里博',
    'Paris': '巴黎', 'Patna': '帕特纳', 'Perth': '柏斯', 'Philadelphia': '费城',
    'Phnom Penh': '金边', 'Phoenix': '凤凰城', 'Pittsburgh': '匹兹堡', 'Port Louis': '路易港',
    'Port of Spain': '西班牙港', 'Portland': '波特兰', 'Porto Alegre': '波尔图阿莱格里', 'Prague': '布拉格',
    'Queretaro': '克雷塔罗', 'Quito': '基多', 'Ramallah': '拉马拉', 'Recife': '累西腓',
    'Reykjavík': '雷克雅未克', 'Ribeirao Preto': '里贝朗普雷图', 'Richmond': '里士满', 'Riga': '里加',
    'Rio de Janeiro': '里约热内卢', 'Rio De Janeiro': '里约热内卢', 'Riyadh': '利雅得', 'Rome': '罗马',
    'São José do Rio Preto': '普雷图河畔圣若泽', 'Sao Jose Do Rio Preto': '普雷图河畔圣若泽',
    'São José dos Campos': '圣若泽多斯坎波斯', 'Sao Jose Dos Campos': '圣若泽多斯坎波斯',
    'São Paulo': '圣保罗', 'Sao Paulo': '圣保罗', 'Sacramento': '萨克拉门托', 'Saint Petersburg': '圣彼得堡',
    'St. Petersburg': '圣彼得堡', 'Saint-Denis': '圣但尼', 'St Denis': '圣但尼', 'Salt Lake City': '盐湖城',
    'Salvador': '萨尔瓦多', 'San Antonio': '圣安东尼奥', 'San Diego': '圣地亚哥', 'San Francisco': '旧金山',
    'San José': '圣何塞', 'San Jose': '圣何塞', 'San Juan': '圣胡安', 'Santiago': '圣地亚哥',
    'Santiago de los Caballeros': '圣地亚哥德洛斯卡巴列罗斯', 'Santo Domingo': '圣多明各', 'Saskatoon': '萨斯卡通', 'Seattle': '西雅图',
    'Seoul': '首尔', 'Singapore': '新加坡', 'Sioux Falls': '苏福尔斯', 'Skopje': '斯科普里',
    'Sofia': '索非亚', 'Sorocaba': '索罗卡巴', 'St. George\'s': '圣乔治', 'St. Louis': '圣路易斯',
    'St Louis': '圣路易斯', 'Stockholm': '斯德哥尔摩', 'Stuttgart': '斯图加特', 'Sulaymaniyah': '苏莱曼尼亚',
    'Surat Thani': '素叻他尼', 'Suva': '苏瓦', 'Sydney': '悉尼', 'Tahiti': '塔希提',
    'Taipei': '台北', 'Tallahassee': '塔拉哈西', 'Tallinn': '塔林', 'Tampa': '坦帕',
    'Tarlac City': '塔尔拉克市', 'Tashkent': '塔什干', 'Tbilisi': '第比利斯', 'Tegucigalpa': '特古西加尔巴',
    'Tel Aviv': '特拉维夫', 'Thessaloniki': '塞萨洛尼基', 'Thimphu': '廷布', 'Timbo': '廷博',
    'Tirana': '地拉那', 'Tokyo': '东京', 'Toronto': '多伦多', 'Tunis': '突尼斯',
    'Tver': '特维尔', 'Uberlandia': '乌贝兰迪亚', 'Ulaanbaatar': '乌兰巴托', 'Ulan Bator': '乌兰巴托',
    'Vancouver': '温哥华', 'Vienna': '维也纳', 'Vientiane': '万象', 'Vilnius': '维尔纽斯',
    'Vitoria': '维多利亚', 'Warsaw': '华沙', 'Windhoek': '温得和克', 'Winnipeg': '温尼伯',
    'Yamoussoukro': '雅穆苏科罗', 'Yangon': '仰光', 'Yekaterinburg': '叶卡捷琳堡', 'Yerevan': '埃里温',
    'Yogyakarta': '日惹', 'Yogyakarta-Java Island': '日惹', 'Zagreb': '萨格勒布', 'Zurich': '苏黎世',
    'Wroclaw': '弗罗茨瓦夫', 'Bishkek': '比什凯克', 'Aktyubinsk': '阿克托比', 'Addis Ababa': '亚斯亚贝巴',
    'Malang-Java Island': '玛琅', 'Luqa': '卢加', 'Taipa': '氹仔', 'Rionegro': '里奥内格罗',
    'La Mesa': '拉梅萨', 'Raleigh/Durham': '罗利', 'Tocumen': '托库门', 'Papeete': '帕皮提',
    'Lilongwe': '利隆圭', 'Lankaran': '连科兰', 'Larnarca': '拉纳卡', 'Lapu-Lapu City': '拉普拉普',
    'Navegantes': '纳韦甘蒂斯', 'Mattanur': '马塔努尔', 'Coimbatore': '哥印拜陀', 'Constantine': '君士坦丁',
    'Angeles City': '安吉利斯', 'Concepcion': '康塞普西翁', 'Kuching': '古晋', 'Senai': '士乃',
    'Paro': '帕罗', 'Zandery': '桑德赖', 'Nausori': '瑙索里'
  };

  locations.forEach(loc => {
    loc.region = regionMap[loc.region] || loc.region;
    loc.city = cityMap[loc.city] || loc.city;
  });

  return new Response(JSON.stringify(locations, null, 4), {
    headers: { 'Content-Type': 'application/json' }
  });
}
