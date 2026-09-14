export const TESTIMONIAL_DECK_STYLES = [
  'translate-y-0',
  'translate-y-2 sm:translate-y-3',
  '-translate-y-1 sm:-translate-y-2',
  'translate-y-3 sm:translate-y-4',
  '-translate-y-2 sm:-translate-y-1',
  'translate-y-1 sm:translate-y-2',
] as const;

export const TESTIMONIAL_PASTE_TILTS = [
  '-rotate-[2.5deg]',
  'rotate-[2deg]',
  '-rotate-[1.5deg]',
  'rotate-[2.75deg]',
  '-rotate-[2deg]',
  'rotate-[1.25deg]',
] as const;

export type ServiceSlug =
  | 'wedding-photography'
  | 'engagement-photography'
  | 'special-events-photography'
  | 'family-portrait-photography'
  | 'motherhood-photography'
  | 'portrait-photography';

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  portrait: string;
  /** Which service pages should show this review */
  services: ServiceSlug[];
};

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      'Taylor has captured engagement photos, bridal portraits, our wedding day, and now pregnancy photos. She has been such a blessing and positive light through all these special milestones. She is so personable and a calming spirit through stressful and chaotic times. She jumps in to help when she can and you can guarantee to catch her on the dance floor at your wedding lol! Taylor feels like a close friend at this point and I could not recommend her enough!!',
    name: 'Alli Smith',
    detail: 'Bridal, Maternity, Engagement & Wedding · August 2026',
    portrait: '/images/Old Picutres/inspiration_2.jpg',
    services: [
      'portrait-photography',
      'motherhood-photography',
      'engagement-photography',
      'wedding-photography',
    ],
  },
  {
    quote:
      'Taylor NEVER fails to exceed everything I envision and more for every shoot! She does wonderful with our daughter who was 6 months and 11 months at different shoots.',
    name: 'Gabrielle Biddle',
    detail: 'Portraits · August 2026',
    portrait: '/images/Old Picutres/inspiration_3.jpg',
    services: ['portrait-photography'],
  },
  {
    quote:
      'If you\'re looking for a talented, professional and genuinely caring photographer, Taylor is the one. She\'s truly our go-to photographer for every special occasion!',
    name: 'Abby Johnson',
    detail: 'Portraits · August 2026',
    portrait: '/images/Old Picutres/profile_1.jpg',
    services: ['portrait-photography'],
  },
  {
    quote:
      'Absolutely the best!! Taylor does our family Christmas photos every year and she never disappoints. Definitely recommend her to anyone who wants their photos done.',
    name: 'Renee Hancock',
    detail: 'Family portraits · August 2026',
    portrait: '/images/Old Picutres/inspiration_1.jpg',
    services: ['family-portrait-photography'],
  },
  {
    quote:
      'Taylor is the most exceptional photographer I\'ve ever had the pleasure of working with. She is so incredibly talented at what she does. She is joyful and personable. She goes above and beyond what\'s expected. I highly recommend hiring Taylor as your photographer.',
    name: 'Sarah Reynolds',
    detail: 'Special events · August 2026',
    portrait: '/images/Old Picutres/inspiration_3.jpg',
    services: ['special-events-photography'],
  },
  {
    quote:
      'I have worked with Taylor multiple times over the past five years for fun shoots, our engagement, wedding, and most recently, pregnancy announcements. Taylor is such a warm photographer who makes sessions fun and anyone comfortable in front of the camera. We are always mesmerized by our photos and the beautiful job she does capturing our special moments that you want to remember forever. Even after moving from South Carolina, we have continued to seek out Taylor to capture big moments for us because finding a photographer you trust and know will give you amazing results is too rare to give up, which reminds me, I\'m going to have to reach out soon to book maternity portraits.',
    name: 'Carly Nash',
    detail: 'Wedding, Engagement & Maternity · July 2026',
    portrait: '/images/Old Picutres/profile_1.jpg',
    services: [
      'special-events-photography',
      'motherhood-photography',
      'wedding-photography',
      'engagement-photography',
    ],
  },
  {
    quote:
      'Taylor is the best!! Whether it was for our wedding or announcing our babies, she has been there to not only to capture our memories, but celebrate with us. Her joy and excitement for every detail truly shows her passion for what she does. Having her there for some of our biggest life moments has truly been a blessing!',
    name: 'Dharma Norton',
    detail: 'Wedding & Maternity · August 2026',
    portrait: '/images/Old Picutres/profile_1.jpg',
    services: ['wedding-photography', 'motherhood-photography'],
  },
  {
    quote:
      'Taylor is absolutely amazing! We\'ve worked with her several times, and every experience has been so much fun. She\'s so personable, talented, and makes you feel so comfortable in front of the camera. She captured our wedding day at Corley Mill House beautifully and paid attention to every little detail. We couldn\'t be happier with our photos and will definitely be using her for all of our future photography. We can\'t recommend her enough!',
    name: 'Mady Sherod',
    detail: 'Wedding · August 2026',
    portrait: '/images/Old Picutres/inspiration_3.jpg',
    services: ['wedding-photography'],
  },
  {
    quote:
      'From the very beginning, our wedding photographer was absolutely incredible! She made us feel so comfortable, captured every special moment so beautifully, and truly went above and beyond throughout our entire wedding day. We were married in Sumter, South Carolina, with our ceremony at Crowell Baptist Church and our reception at the Sumter County Museum, and she perfectly captured the beauty and emotion of both locations. Every photo tells a story, and looking through our gallery brings us right back to those unforgettable moments. She has such an amazing eye for detail, was professional, kind, organized, and made the entire experience stress-free. We couldn\'t have asked for a better person to document one of the most important days of our lives. If you\'re looking for someone who genuinely cares about her couples and delivers stunning photos you\'ll cherish forever, I cannot recommend her enough. She\'s like our family now! Thank you for giving us memories we\'ll treasure for a lifetime!',
    name: 'Anslet Harrell',
    detail: 'Wedding · August 2026',
    portrait: '/images/Old Picutres/inspiration_2.jpg',
    services: ['wedding-photography'],
  },
  {
    quote:
      'My husband and I got married at The Cabin at the Old Spur in Timmonsville, SC. Taylor was nothing short of phenomenal !! she was one of the only ones that didn\'t cancel on me last minute due to weather. she was out there freezing in the inches of snow with me. She was so sweet and somehow took pictures that captured my day perfectly !',
    name: 'Baylee Mckenzie',
    detail: 'Wedding · August 2026',
    portrait: '/images/Old Picutres/profile_2.jpg',
    services: ['wedding-photography'],
  },
  {
    quote:
      'Taylor is the absolute best! Made my wedding day an absolute breeze! She makes every session fun and always has the best ideas!! Her bubbly personality just makes the atmosphere so wonderful! Her editing is perfect and so warm!!! Exactly what I look for in a photographer! I love her and the pictures she takes and she will always take my pictures!',
    name: 'Madelyn Huneycutt',
    detail: 'Wedding · June 2026',
    portrait: '/images/Old Picutres/profile_1.jpg',
    services: ['wedding-photography'],
  },
  {
    quote:
      'Taylor was an absolutely blessing on our wedding day! She captured every little detail and made them the most beautiful memories to look back on! She made everyone feel comfortable in front of the camera and felt like a true member of the family by the end of the night! She never failed to deliver her best work, including during our engagement shoot. Taylor was always open-minded to poses we liked and empowered our style decisions! I would 100% recommend using Taylor Rose Reels for any event you\'re planning!',
    name: 'Haleigh Reed',
    detail: 'Wedding · June 2026',
    portrait: '/images/Old Picutres/inspiration_2.jpg',
    services: ['wedding-photography', 'engagement-photography'],
  },
  {
    quote:
      'Taylor is incredible to work with! She took our engagement photos, my bridal portraits, and our wedding photos. She made us feel so comfortable and made it feel like we were shooting with a friend. She took the best candids! There isn\'t a single photo that I don\'t love!',
    name: 'Riley Major',
    detail: 'Bridal & Wedding · 2025',
    portrait: '/images/Old Picutres/profile_1.jpg',
    services: [
      'wedding-photography',
      'engagement-photography',
      'portrait-photography',
    ],
  },
  {
    quote:
      'Taylor is truly amazing! She is personable, professional, and incredibly talented. From the very beginning, communication was easy and seamless. I shared my vision with her, and she not only understood it but exceeded every expectation I had. The entire photoshoot was fun, relaxed, and enjoyable, which made the experience even more special. Most importantly, the photos turned out absolutely beautiful. Taylor has a genuine gift for photography, and it shines through in both her work and the way she makes her clients feel comfortable. I couldn\'t be happier with our experience and highly recommend her to anyone looking for stunning photos and an exceptional photographer!',
    name: 'Kalayah Dowell',
    detail: 'Engagement pictures · 2025',
    portrait: '/images/Old Picutres/inspiration_3.jpg',
    services: ['engagement-photography'],
  },
  {
    quote:
      'Taylor has watched my daughter grow up through taking photos for our family. She has this gift that somehow manages to get my daughter to smile instead of just doing a silly face. I\'ve had photos done by other photographers but none compare to the ones I\'ve had done by Taylor. She has truly taken my favorite photos of my little family and she makes it fun! As a mom herself, she knows how to keep the kids attention without making the photos look forced. I highly recommend her.',
    name: 'Makala Mckenzie',
    detail: 'Family portraits · 2026',
    portrait: '/images/Old Picutres/inspiration_2.jpg',
    services: ['family-portrait-photography'],
  },
  {
    quote:
      'I have used Taylor for as long as I\'ve known her for my photos (we have some not so professional ones from when we were in high school). She\'s always had a heart to capture the moments that are so special. Very professional and very easy to work with!',
    name: 'Taylor Rowe',
    detail: 'Engagement pictures · 2026',
    portrait: '/images/Old Picutres/profile_2.jpg',
    services: ['engagement-photography'],
  },
  {
    quote:
      'Taylor is exceptionally talented and beautifully captured our family pictures. Thank you Taylor for your dedication and passion for creating beautiful memories for us. My sweet family and I appreciate your beautiful fun spirit and making our photo shoot so much fun and effortless! Thank you!',
    name: 'Susan Overstreet',
    detail: 'Family portraits · October 2025',
    portrait: '/images/Old Picutres/profile_1.jpg',
    services: ['family-portrait-photography'],
  },
  {
    quote:
      'Taylor was easy and fun to work with! She gets the shot and makes it stress free!',
    name: 'Brandy Duffy',
    detail: 'Family portraits · August 2025',
    portrait: '/images/Old Picutres/profile_2.jpg',
    services: ['family-portrait-photography'],
  },
  {
    quote:
      'Taylor did a fantastic job at working with my family of 5 and making all of us comfortable in front of the camera. The photographs turned out beautiful and I\'d definitely recommend her to others!',
    name: 'Scarlett Brown',
    detail: 'Family portraits · August 2025',
    portrait: '/images/Old Picutres/inspiration_2.jpg',
    services: ['family-portrait-photography'],
  },
  {
    quote:
      'Taylor is so sweet and professional! She made our family photo session a breeze! She gave great direction and my kids loved her. We also received our pictures back quickly and they are all beautiful! We will definitely be booking with her again.',
    name: 'Tiffany Renfroe',
    detail: 'Family portraits · August 2025',
    portrait: '/images/Old Picutres/inspiration_1.jpg',
    services: ['family-portrait-photography'],
  },
  {
    quote:
      'Taylor has taken my boys pictures since my oldest was born in 2021. She\'s always been patient with my kids and has been so easy to work with! Would 1000% recommend, I will prob never have anyone else take pictures for me besides her!',
    name: 'Courtney Carter',
    detail: 'Family & kids · July 2025',
    portrait: '/images/Old Picutres/profile_2.jpg',
    services: ['family-portrait-photography'],
  },
];

export function getTestimonialsForService(
  service: ServiceSlug,
): Testimonial[] {
  return TESTIMONIALS.filter((testimonial) =>
    testimonial.services.includes(service),
  );
}
