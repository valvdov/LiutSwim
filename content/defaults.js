// Default site content. This is the fallback used when Firestore has no
// overrides yet — the admin panel edits a copy of this structure stored in
// Firestore (document `site/content`), which takes precedence over these values.
// Everything here must stay JSON-serialisable (plain strings, use "\n" for line
// breaks — the UI renders them with `white-space: pre-line`).

const defaultContent = {
    services: [
        {
            value: 'intro',
            title: {
                ru: 'В Liutswim программа тренировок представляет собой ряд комплексных и динамичных упражнений, направленных на развитие мускулатуры и выносливости.',
                en: 'We have comprehensive and dynamic training programmes at Liutswim',
            },
            text: {ru: '', en: ''},
            price: {ru: '', en: ''},
        },
        {
            value: 'sync',
            title: {
                ru: 'Синхронное плавание',
                en: 'Synchronised Swimming',
            },
            text: {
                ru: 'Включает в себя занятия хореографией, танцами, плаванием и акробатикой. \nВы научитесь плавать, нырять, надолго задерживать дыхание, ориентироваться в водном пространстве, улучшите координацию, разовьете вестибулярный аппарат, дыхательную и сердечно-сосудистую систему. \nГруппа до 6 человек.',
                en: 'Includes choreography, dance, swimming, and acrobatics lessons. \nYou will learn to swim, dive, hold your breath for a long time, orient yourself in the water, improve coordination, develop the vestibular apparatus, respiratory, and cardiovascular system.',
            },
            price: {
                ru: '£37\n45 минут в бассейне\n45 минут в зале',
                en: '£37\n45 minutes in the pool\n45 minutes in the gym',
            },
        },
        {
            value: 'competetive',
            title: {
                ru: 'Спортивное плавание',
                en: 'Competitive Swimming',
            },
            text: {
                ru: 'Система специальной подготовки с участием в школьных соревнованиях.\nВы научитесь плавать, нырять, разовьете дыхательную, сердечно-сосудистую и нервную системы, укрепите мышцы. Снимете стресс и эмоциональную нагрузку. \nГруппа до 6 человек.',
                en: 'Specialised training system with participation in school competitions. \nYou will learn to swim, dive, develop respiratory, cardiovascular, and nervous systems, and strengthen muscles. It will relieve stress and emotional pressure. \nGroup of up to 6 people.',
            },
            price: {
                ru: '£22 - 45 минут\n£18 - 30 минут',
                en: '£22 - 45 minutes\n£18 - 30 minutes',
            },
        },
        {
            value: 'private',
            title: {
                ru: 'Персональная тренировка',
                en: 'Private Lessons',
            },
            text: {
                ru: 'Это выездные тренировки по всему Лондону. Вы можете пригласить нашего инструктора в свой собственный бассейн или в бассейн, который находится рядом с вами. В стоимость входит время работы преподавателя и его транспортные расходы. Такой формат подходит тем, кому неудобно добираться до наших основных локаций или у кого есть доступ к личному бассейну. Вы просто нанимаете учителя, и мы проводим занятие там, где вам удобно.',
                en: 'These are mobile lessons available across London. You can book our instructor to teach in your own pool or in a pool located near you. The fee includes the instructor’s teaching time and travel expenses. This format is ideal if you find it difficult to travel to our main locations or if you have access to a private pool. You simply hire the instructor, and we deliver the lesson wherever it is most convenient for you.',
            },
            price: {
                ru: '£59 - 30 минут',
                en: '£59 - 30 minutes',
            },
        },
        {
            value: 'two-two-one',
            title: {ru: '2:2:1', en: '2:2:1'},
            text: {
                ru: 'Идеально подойдет тем, у кого двое детей и чье время требуется совместить. Тренировка проводится в маленькой группе, что делает процесс обучения веселым и эффективным.',
                en: 'Ideal for those with two children and the need to coordinate their time. Training is conducted in a semi-group, making the learning process fun and effective.',
            },
            price: {
                ru: '£51 - 30 минут',
                en: '£51 - 30 minutes',
            },
        },
        {
            value: 'one-two-one',
            title: {ru: '1:2:1', en: '1:2:1'},
            text: {
                ru: 'Индивидуальная 1-2-1 тренировка проходит в локациях, указанных на нашем сайте. Это персональные занятия, где ребёнок развивается в комфортном темпе вместе с личным тренером. Такой формат помогает быстрее улучшать навыки плавания, формировать доверие и уверенность в воде.',
                en: 'A 1-2-1 session takes place at the locations shown on our website. These are fully personalised lessons where a child can progress comfortably at their own pace with a dedicated instructor. This format helps children develop swimming skills more quickly, build trust, and gain confidence in the water.',
            },
            price: {
                ru: '£41 - 30 минут',
                en: '£41 - 30 minutes',
            },
        },
    ],

    team: [
        {
            id: 'alexandra',
            name: {ru: 'Александра', en: 'Alexandra'},
            image: '/images/Alexandra_new.jpg',
            bullets: {
                ru: [
                    'Официально сертифицирован Swim England и STA',
                    'мастер спорта по синхронному плаванию',
                    'занимается профессиональным спортом более 10 лет',
                    'более 6 лет преподавала синхронное плавание детям в Школе Олимпийского Резерва',
                ],
                en: [
                    'Officially certified by Swim England and STA',
                    'master of sports in synchronised swimming',
                    'engaged in professional sports for over 10 years',
                    'has taught synchronised swimming to children for more than 6 years at the School of Olympic Reserve',
                ],
            },
        },
        {
            id: 'anna',
            name: {ru: 'Анна', en: 'Anna'},
            image: '/images/Anna_new.jpg',
            bullets: {
                ru: [
                    'Официально сертифицирован Swim England и STA',
                    'работает с детьми уже более 6 лет',
                    'прошла курсы по оказанию первой помощи, безопасности на воде, тренерской работе и питанию в Великобритании',
                    'проводила реабилитационные программы для детей и взрослых с нарушениями осанки',
                ],
                en: [
                    'Officially certified by Swim England and STA',
                    'has worked with children for over 6 years',
                    'conducted rehabilitation programmes for children and adults with posture issues',
                    'completed courses in first aid, water safety, coaching, and nutrition in the United Kingdom',
                ],
            },
        },
        {
            id: 'julia',
            name: {ru: 'Юлия', en: 'Julia'},
            image: '/images/Julia_new.jpg',
            bullets: {
                ru: [
                    'Официально сертифицирован Swim England и STA',
                    'работает с детьми уже более 20 лет',
                    'прошла курсы по оказанию первой помощи, безопасности на воде, тренерской работе и питанию в Великобритании.',
                    'проводила реабилитационные программы для детей и взрослых с нарушениями осанки',
                ],
                en: [
                    'Officially certified by Swim England and STA',
                    'has worked with children for over 20 years',
                    'worked as an assistant coach at the Olympic Reserve School',
                    'completed coaching courses held in the United Kingdom.',
                ],
            },
        },
    ],

    locations: [
        {
            id: 'fulham',
            name: 'Fulham pools',
            address: 'Normand Park, Lillie Rd, London SW6 7ST',
            hours: {
                ru: ['Вторник 17:30 - 19:00'],
                en: ['Tuesday 17:30 - 19:00'],
            },
        },
        {
            id: 'hounslow',
            name: 'Hounslow',
            address: 'Oaklands School, Gresham Road, Hounslow, TW3 4BX',
            hours: {
                ru: ['Среда 16:30 - 18:00', 'Четверг 16:30 - 18:30'],
                en: ['Wednesday 16:30 - 18:00', 'Thursday 16:30 - 18:30'],
            },
        },
        {
            id: 'wessex',
            name: 'Wessex',
            address: 'Primary School, Wessex Gardens, London NW11 9RR',
            hours: {
                ru: ['Пятница 16:00 - 18:30', 'Суббота 10:00 - 12:00', 'Воскресенье 10:00 - 14:30'],
                en: ['Friday 16:00 - 18:30', 'Saturday 10:00 - 12:00', 'Sunday 10:00 - 14:30'],
            },
        },
        {
            id: 'brentford',
            name: 'Brentford',
            address: '658 Chiswick High Rd., Brentford TW8 0HJ',
            hours: {
                ru: ['Суббота 14:00 - 17:00'],
                en: ['Saturday 14:00 - 17:00'],
            },
        },
        {
            id: 'kilburn',
            name: 'Kilburn',
            address: '208 Willesden Lane, London, NW6 7PR',
            hours: {
                ru: ['Вторник 16:00 - 18:00', 'Пятница 16:00 - 18:00'],
                en: ['Tuesday 16:00 - 18:00', 'Friday 16:00 - 18:00'],
            },
        },
    ],

    reviews: [
        {
            circle_tag: 'circletag-beard-man',
            name: {ru: 'Назим Ботанова', en: 'Nazim Botanova'},
            review_content: {
                ru: 'Я тоже хочу оставить отзыв, у нас было одно пробное занятие с Сашей. Очень довольны! Дочка 3х лет сразу привыкла к ней, получился очень хороший тандем. С детьми ладят хорошо, даже с такими малышами как моя. Нам пока неудобно ходить так как у нас ещё есть дневной сон и я просто физически не успеваю её собрать и доехать до центра после сна. Ждём когда перестанем спать днем и снова начнём с удовольствием.',
                en: "I want to leave a review too. We had one trial session with Sasha, and we are very satisfied! Our 3-year-old daughter immediately got used to her, and they hit it off really well. They get along well with children, even with such little ones like mine. It's still inconvenient for us to attend regularly because our daughter takes daytime naps, and I physically can't pick her up and get to the centre after her nap. We're looking forward to when we stop napping during the day and can start happily start again.",
            },
            hashtag: {
                ru: 'Групповое занятие плаванием в The Brentford Leisure Centre',
                en: 'Group swimming lesson at The Brentford Leisure Centre',
            },
        },
        {
            circle_tag: 'circletag-white-girl',
            name: {ru: 'Ирина Минакова', en: 'Irina Minakova'},
            review_content: {
                ru: 'Саша - замечательный тренер! Очень рекомендуем.',
                en: 'Alexandra is a wonderful coach! Highly recommended.',
            },
            hashtag: {
                ru: 'Индивидуальные занятия плаванием с выездом',
                en: 'Individual swimming lessons',
            },
        },
        {
            circle_tag: 'circletag-white-girl',
            name: {ru: 'Наталья Солод', en: 'Natalia Solod'},
            review_content: {
                ru: 'Хочется оставить отзыв: сын занимается с Анной, очень любит занятия и с нетерпением ждёт!',
                en: 'I want to leave a review: Anna coaches my son, and he loves the lessons and looks forward to them!',
            },
            hashtag: {
                ru: 'Групповое занятие плаванием в The Brentford Leisure Centre',
                en: 'Group swimming lesson at The Brentford Leisure Centre',
            },
        },
        {
            circle_tag: 'circletag-white-girl',
            name: {ru: 'Наталья Скалярова', en: 'Natalia Skalyarova'},
            review_content: {
                ru: 'Отличные занятия, наш ребенок теперь на каникулах каждый день показывает трюки, а как плавает - просто загляденье. Спасибо Саше и Ане!',
                en: 'Great lessons! Our child now shows off tricks every day during the holidays, and the way they swim is simply amazing. Thanks to Sasha and Anna!',
            },
            hashtag: {
                ru: 'Групповое занятие синхронным плаванием в The Brentford Leisure Centre',
                en: 'Group synchronised swimming lesson at The Brentford Leisure Centre',
            },
        },
        {
            circle_tag: 'circletag-black-girl',
            name: {ru: 'Санта Поттер', en: 'Santa Potter'},
            review_content: {
                ru: 'Анна - замечательный инструктор по плаванию. Она обладает добротой, обширным опытом и отличной способностью устанавливать подходящие границы с детьми. Очевидно, что у нее огромный опыт работы. Анна постоянно стремится адаптировать каждый урок под конкретные потребности каждого ребенка, оптимизируя время, проведенное вместе, чтобы обеспечить быстрое и эффективное изучение новых техник. Она использует увлекательный подход к обучению, который делает учебу приятной для детей, что является редким качеством учителя. Под руководством Анны мы наблюдали более быстрый прогресс по сравнению с нашим опытом в других школах и с другими учителями. Мы с удовольствием рекомендуем занятия с ней.',
                en: "Anna is an excellent swimming instructor. She possesses kindness, extensive experience, and an excellent ability to set appropriate boundaries with children. It is evident that she has vast experience. Anna constantly strives to tailor each lesson to the specific needs of each child, optimising the time spent together to ensure rapid and effective learning of new techniques. She uses an engaging approach to teaching, which makes learning enjoyable for children, a rare quality in a teacher. Under Anna's guidance, we have observed faster progress compared to our experience in other schools and with other teachers. We highly recommend lessons with her.",
            },
            hashtag: {
                ru: 'Индивидуальное занятие плаванием с выездом',
                en: 'Individual swimming lessons',
            },
        },
        {
            circle_tag: 'circletag-white-girl-curved',
            name: {ru: 'Лариса', en: 'Larisa'},
            review_content: {
                ru: 'Я действительно довольна занятиями синхронным плаванием, которые посещает моя десятилетняя дочь. Инструктор отлично общается с детьми и делает обучение увлекательным. Моя дочь обожает эти уроки, она с нетерпением ждет их, и так приятно видеть, как она улучшает свое плавание и с удовольствием ныряет и кувыркается под водой. Очень рекомендую!',
                en: "I am truly satisfied with synchronised swimming lessons that my ten-year-old daughter attends. The instructor communicates excellently with children and makes learning exciting. My daughter adores these lessons; she eagerly anticipates them, and it's so delightful to see how she improves her swimming and enjoys diving and somersaulting underwater. Highly recommended!",
            },
            hashtag: {
                ru: 'Групповое занятие синхронным плаванием в The Brentford Leisure Centre',
                en: 'Group synchronise swimming lesson at The Brentford Leisure Centre',
            },
        },
    ],

    faqs: [
        {
            question: {
                ru: 'Что должен уметь ребенок и какими навыками обладать для занятий по синхронному плаванию?',
                en: 'What should a child be able to do and what skills should they possess to participate in synchronised swimming classes?',
            },
            answer: {
                ru: 'Ребенок должен владеть базовым навыками плавания, уметь держаться на воде, владеть несколькими стилями плавания. Мы работаем с детьми от 3 лет.',
                en: 'A child should have basic swimming skills, be comfortable in the water, and know several swimming styles. We work with children from 3 years old.',
            },
        },
        {
            question: {
                ru: 'Что нужно ребенку для занятий?',
                en: 'What does a child need for classes?',
            },
            answer: {
                ru: 'Шапочка для плавания, купальник, полотенце, тапочки, очки, душевые принадлежности. Для занятий в зале удобные шорты или леггинсы, футболка, носки.',
                en: 'Swimming cap, swimsuit, towel, flip-flops, goggles, toiletries. For gym sessions: comfortable shorts or leggings, a T-shirt, and socks.',
            },
        },
        {
            question: {
                ru: 'Какая глубина бассейна?',
                en: 'What is the depth of the pool?',
            },
            answer: {
                ru: 'Глубина бассейна составляет от 0.8 м до 1.2 м.',
                en: 'The pool depth ranges from 0.8 metres to 1.2 metres.',
            },
        },
        {
            question: {
                ru: 'Как проходят соревнования по синхронному плаванию?',
                en: 'How do synchronised swimming competitions work?',
            },
            answer: {
                ru: 'Соревнования включают в себя сдачу обязательных элементов и произвольную программу.',
                en: 'Synchronised swimming competitions involve performing mandatory elements and a free routine.',
            },
        },
        {
            question: {
                ru: 'Как проходят соревнования по плаванию?',
                en: 'How do swimming competitions work?',
            },
            answer: {
                ru: 'Соревнования по плаванию включают в себя сдачу дистанции на время и командные эстафеты.',
                en: 'Swimming competitions include racing set distances against the clock and relay races.',
            },
        },
        {
            question: {
                ru: 'Как проходит обучение синхронному плаванию?',
                en: 'How is synchronised swimming training conducted?',
            },
            answer: {
                ru: 'Дети учатся в воде элементам синхронного плавания, а в зале хореографии.',
                en: 'Children learn water elements of synchronised swimming in the pool and choreography in the gym.',
            },
        },
    ],

    contacts: {
        phone: '07399324217',
        email: 'liutswim@gmail.com',
        facebook: 'https://www.facebook.com/people/Liut-Swim/100075410320827/',
        instagram: 'https://www.instagram.com/_liutswim_/',
    },
};

export default defaultContent;
