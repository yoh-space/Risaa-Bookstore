export const RisaaCollections = [
    {
      id: 1,
      title: 'Siitolii',
      description: 'A collection of traditional Oromo folktales and stories.',
      image: require('../../../assets/images/siitolii.jpg'),
      author: 'Kadiir Abdulaxif',
      price: 0,
      rating: 4.8,
      pdfPath: {uri: 'bundle-assets://Dhaloota.pdf'},
      chapterTitle: [
        {
          title: 'BOQONNAA 1:HAACAALUUHUNDEESSAA',
          startPage: 13,
      },
        {
          title: ' BOQONNAA 2:HAACAAALUUFIAARTII',
          startPage: 42,
        },
        {
          title: ' BOQONNAA 3:SIRBOOTAHAACAAALUU',
          startPage: 47,
        },
        {
          title: ' BOQONNAA 4:DHALOOTASODAACABSE',
          startPage: 80,
        },
        {
          title: ' BOQONNAA 5:SEENDUUBEESIRBAHAACAAALUU',
          startPage: 96,
        },
        {
          title: 'BOQONNAA 6:ABJUUKARAATTIHAFE',
          startPage: 129,
        },
        {
          title: '',
          startPage: 0,
        }  
    ]
    },
    {
      id: 2,
      title: 'Dhaloota Sodaa Cabse',
      description: 'An in-depth look at the history and culture of the Oromo people.',
      image: require('../../../assets/images/dhaloota.jpg'),
      author: 'Kadiir Abdulaxif',
      price: 0,
      rating: 4.5,
      pdfPath: {uri: 'bundle-assets://Hidhaa.pdf'},
      chapterTitle: [
        { title: 'Chapter 1: The Origins of the Oromo', startPage: 15 },
        { title: 'Chapter 2: The Gadaa System', startPage: 45 },
        { title: 'Chapter 3: Oromo Traditions and Customs', startPage: 78 },
        { title: 'Chapter 4: The Oromo Language', startPage: 102 },
      ],
    },
    {
      id: 3,
      title: 'Wayyoma',
      description: 'A linguistic guide and cultural exploration of the Oromo language.',
      image: require('../../../assets/images/worroma.jpg'),
      author: 'Kadiir Abdulaxif',
      price: 3.99,
      rating: 4.2,
      pdfPath: {uri: 'bundle-assets://Dhaloota.pdf'},
      chapterTitle: [
        { title: 'Chapter 1: Oromo Alphabet and Pronunciation', startPage: 12 },
        { title: 'Chapter 2: Basic Grammar and Sentence Structure', startPage: 36 },
        { title: 'Chapter 3: Common Phrases and Expressions', startPage: 58 }, 
      ] 
    },
    {
      id: 4,
      title: 'Goonni Gosa Dhaala',
      description: 'The social, political, and cultural system of the Oromo people.',
      image: require('../../../assets/images/goomi.jpg'),
      author: 'Asafa Jalata',
      price: 6.99,
      rating: 4.7,
      pdfPath: {uri: 'bundle-assets://Dhaloota.pdf'},
      chapterTitle: [
        { title: 'Chapter 1: Introduction to the Gadaa System', startPage: 10 },
        { title: 'Chapter 2: Gadaa Leadership and Governance', startPage: 35 },
        { title: 'Chapter 3: Gadaa Rituals and Ceremonies', startPage: 60 },
        { title: 'Chapter 4: The Role of Age Sets in Oromo Society', startPage: 85 },
        { title: 'Chapter 5: Contemporary Challenges and the Future of Gadaa', startPage: 110 },
      ]
    },
    {
      id: 5,
      title: 'Oromo History',
      description: 'Comprehensive history of the Oromo people.',
      image: require('../../../assets/images/goomi.jpg'),
      author: 'Mohammed Hassen',
      price: 8.99,
      rating: 4.9,
      pdfPath: {uri: 'bundle-assets://History.pdf'},
      chapterTitle: [
        { title: 'Chapter 1: Early History', startPage: 15 },
        { title: 'Chapter 2: The Oromo Expansion', startPage: 45 },
        { title: 'Chapter 3: Colonial Era', startPage: 85 },
      ]
    },
    {
      id: 6,
      title: 'Oromo Dictionary',
      description: 'Comprehensive Oromo language dictionary.',
      image: require('../../../assets/images/goomi.jpg'),
      author: 'Taha M. Gada',
      price: 5.99,
      rating: 4.6,
      pdfPath: {uri: 'bundle-assets://Dictionary.pdf'},
      chapterTitle: [
        { title: 'Chapter 1: Nouns', startPage: 10 },
        { title: 'Chapter 2: Verbs', startPage: 50 },
        { title: 'Chapter 3: Common Phrases', startPage: 120 },
      ]
    },
  ];

export const bookSections = [
    {
      id: 'featured',
      title: 'Featured Posts',
      filter: (books) => books.slice(0, 6),
      layout: 'horizontal',
      cardStyle: 'featured'
    },
    {
      id: 'new',
      title: 'New Arrivals',
      filter: (books) => books.slice(0, 6),
      layout: 'list',
      cardStyle: 'new'
    },
    {
      id: 'free',
      title: 'Free Books',
      filter: (books) => books.filter(b => b.price === 0).slice(0, 6),
      layout: 'horizontal',
      cardStyle: 'free'
    },
    {
      id: 'selling',
      title: 'Selling Books',
      filter: (books) => books.filter(b => b.price > 0).slice(0, 6),
      layout: 'horizontal',
      cardStyle: 'selling'
    },
    {
      id: 'popular',
      title: 'Most Popular Books',
      filter: (books) => [...books].sort((a, b) => b.rating - a.rating).slice(0, 6),
      layout: 'list',
      cardStyle: 'popular'
    },
  ];
