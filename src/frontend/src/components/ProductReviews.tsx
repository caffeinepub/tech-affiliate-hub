import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, ThumbsUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ProductReviewsProps {
  productTitle: string;
}

interface ReviewData {
  averageRating: number;
  totalReviews: number;
  distribution: { stars: number; percentage: number }[];
  reviews: {
    id: number;
    author: string;
    rating: number;
    title: string;
    content: string;
    helpful: number;
    verified: boolean;
  }[];
}

// Product-specific review data
const productReviewData: Record<string, ReviewData> = {
  'Samsung Galaxy M07 Mobile': {
    averageRating: 4.3,
    totalReviews: 1842,
    distribution: [
      { stars: 5, percentage: 58 },
      { stars: 4, percentage: 25 },
      { stars: 3, percentage: 10 },
      { stars: 2, percentage: 4 },
      { stars: 1, percentage: 3 },
    ],
    reviews: [
      {
        id: 1,
        author: 'Vikram Singh',
        rating: 5,
        title: 'Best budget smartphone!',
        content: 'Amazing phone for the price. Battery life is excellent and camera quality is surprisingly good. Perfect for daily use.',
        helpful: 67,
        verified: true,
      },
      {
        id: 2,
        author: 'Anita Desai',
        rating: 4,
        title: 'Good value for money',
        content: 'Solid performance for basic tasks. Display is bright and clear. Only minor issue is the charging speed could be faster.',
        helpful: 42,
        verified: true,
      },
    ],
  },
  'Samsung Galaxy M56 5G Mobile': {
    averageRating: 4.6,
    totalReviews: 2156,
    distribution: [
      { stars: 5, percentage: 68 },
      { stars: 4, percentage: 22 },
      { stars: 3, percentage: 7 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 1 },
    ],
    reviews: [
      {
        id: 1,
        author: 'Rahul Mehta',
        rating: 5,
        title: '5G performance is outstanding',
        content: 'Blazing fast 5G speeds and smooth multitasking. The display is gorgeous and battery easily lasts a full day with heavy use.',
        helpful: 89,
        verified: true,
      },
      {
        id: 2,
        author: 'Kavita Nair',
        rating: 5,
        title: 'Premium features at mid-range price',
        content: 'Camera quality is exceptional, especially in good lighting. Build quality feels premium. Highly recommend for anyone looking for a 5G phone.',
        helpful: 71,
        verified: true,
      },
    ],
  },
  'iQOO Z10R 5G': {
    averageRating: 4.5,
    totalReviews: 1923,
    distribution: [
      { stars: 5, percentage: 64 },
      { stars: 4, percentage: 23 },
      { stars: 3, percentage: 8 },
      { stars: 2, percentage: 3 },
      { stars: 1, percentage: 2 },
    ],
    reviews: [
      {
        id: 1,
        author: 'Arjun Kapoor',
        rating: 5,
        title: 'Gaming beast!',
        content: 'Perfect for mobile gaming. No lag or heating issues even during extended gaming sessions. The 120Hz display is buttery smooth.',
        helpful: 94,
        verified: true,
      },
      {
        id: 2,
        author: 'Meera Joshi',
        rating: 4,
        title: 'Great performance phone',
        content: 'Fast charging is a game changer. Performance is top-notch for the price. Camera could be better but overall excellent value.',
        helpful: 58,
        verified: true,
      },
    ],
  },
  'Ant Esports KM1410 Wired Gaming Keyboard and Mouse Combo': {
    averageRating: 4.2,
    totalReviews: 876,
    distribution: [
      { stars: 5, percentage: 55 },
      { stars: 4, percentage: 28 },
      { stars: 3, percentage: 12 },
      { stars: 2, percentage: 3 },
      { stars: 1, percentage: 2 },
    ],
    reviews: [
      {
        id: 1,
        author: 'Siddharth Rao',
        rating: 5,
        title: 'Perfect gaming combo for beginners',
        content: 'Great RGB lighting and responsive keys. Mouse is comfortable for long gaming sessions. Excellent value for money.',
        helpful: 52,
        verified: true,
      },
      {
        id: 2,
        author: 'Rohan Gupta',
        rating: 4,
        title: 'Good budget gaming peripherals',
        content: 'Solid build quality and nice tactile feedback. RGB effects are customizable. Mouse sensor is accurate for gaming.',
        helpful: 38,
        verified: true,
      },
    ],
  },
  'LG 1.5 Ton 5 Star DUAL Inverter Split AC': {
    averageRating: 4.7,
    totalReviews: 1534,
    distribution: [
      { stars: 5, percentage: 72 },
      { stars: 4, percentage: 20 },
      { stars: 3, percentage: 5 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 1 },
    ],
    reviews: [
      {
        id: 1,
        author: 'Suresh Kumar',
        rating: 5,
        title: 'Excellent cooling and energy efficient',
        content: 'Cools the room quickly and operates very quietly. Noticeable reduction in electricity bills. Installation was smooth and professional.',
        helpful: 103,
        verified: true,
      },
      {
        id: 2,
        author: 'Lakshmi Iyer',
        rating: 5,
        title: 'Best AC purchase ever',
        content: 'Dual inverter technology really works. Room stays cool even in peak summer. Smart features are very convenient to use.',
        helpful: 87,
        verified: true,
      },
    ],
  },
  'LG 139 cm (55 inches) UA82 Series 4K Ultra HD Smart webOS LED TV 55UA82006LA': {
    averageRating: 4.6,
    totalReviews: 2341,
    distribution: [
      { stars: 5, percentage: 67 },
      { stars: 4, percentage: 23 },
      { stars: 3, percentage: 7 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 1 },
    ],
    reviews: [
      {
        id: 1,
        author: 'Aditya Sharma',
        rating: 5,
        title: 'Stunning 4K picture quality',
        content: 'Colors are vibrant and blacks are deep. WebOS interface is smooth and intuitive. Built-in apps work flawlessly. Worth every rupee!',
        helpful: 126,
        verified: true,
      },
      {
        id: 2,
        author: 'Priya Reddy',
        rating: 5,
        title: 'Perfect for home entertainment',
        content: 'Amazing viewing experience for movies and sports. Sound quality is impressive. Smart features make streaming very convenient.',
        helpful: 98,
        verified: true,
      },
    ],
  },
  'Godrej 600L 3Star Frost Free Inverter Side By Side Refrigerator': {
    averageRating: 4.5,
    totalReviews: 1687,
    distribution: [
      { stars: 5, percentage: 63 },
      { stars: 4, percentage: 24 },
      { stars: 3, percentage: 9 },
      { stars: 2, percentage: 3 },
      { stars: 1, percentage: 1 },
    ],
    reviews: [
      {
        id: 1,
        author: 'Deepak Patel',
        rating: 5,
        title: 'Spacious and efficient',
        content: 'Huge storage capacity perfect for large families. Cooling is uniform throughout. Inverter technology keeps electricity consumption low.',
        helpful: 112,
        verified: true,
      },
      {
        id: 2,
        author: 'Sunita Verma',
        rating: 4,
        title: 'Great refrigerator with premium features',
        content: 'Toughened glass shelves are sturdy. Convertible zones are very useful. Build quality is excellent and looks premium in the kitchen.',
        helpful: 79,
        verified: true,
      },
    ],
  },
  'ASUS TUF A15': {
    averageRating: 4.6,
    totalReviews: 2789,
    distribution: [
      { stars: 5, percentage: 69 },
      { stars: 4, percentage: 21 },
      { stars: 3, percentage: 7 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 1 },
    ],
    reviews: [
      {
        id: 1,
        author: 'Karthik Menon',
        rating: 5,
        title: 'Ultimate gaming laptop',
        content: 'Handles all AAA games at high settings smoothly. Cooling system is excellent. Build quality is military-grade tough. Best gaming laptop in this price range.',
        helpful: 156,
        verified: true,
      },
      {
        id: 2,
        author: 'Neha Agarwal',
        rating: 5,
        title: 'Perfect for work and gaming',
        content: 'Great for video editing and 3D rendering. Battery life is decent for a gaming laptop. Display is vibrant with good refresh rate.',
        helpful: 134,
        verified: true,
      },
    ],
  },
  'Native by Urban Company M2 PRO RO+UV+Copper+Alkaline 10-Stage Smart Water Purifier': {
    averageRating: 4.4,
    totalReviews: 1245,
    distribution: [
      { stars: 5, percentage: 61 },
      { stars: 4, percentage: 26 },
      { stars: 3, percentage: 9 },
      { stars: 2, percentage: 3 },
      { stars: 1, percentage: 1 },
    ],
    reviews: [
      {
        id: 1,
        author: 'Amit Khanna',
        rating: 5,
        title: 'Best water purifier with smart features',
        content: 'Water tastes great with the alkaline and copper benefits. Smart app monitoring is very useful. Installation was professional and quick.',
        helpful: 91,
        verified: true,
      },
      {
        id: 2,
        author: 'Ritu Malhotra',
        rating: 4,
        title: 'Excellent purification system',
        content: '10-stage purification gives peace of mind. Build quality is premium. Filter change reminders are helpful. Highly recommend for families.',
        helpful: 67,
        verified: true,
      },
    ],
  },
  'Amazon Fire TV Stick HD': {
    averageRating: 4.5,
    totalReviews: 3421,
    distribution: [
      { stars: 5, percentage: 65 },
      { stars: 4, percentage: 23 },
      { stars: 3, percentage: 8 },
      { stars: 2, percentage: 3 },
      { stars: 1, percentage: 1 },
    ],
    reviews: [
      {
        id: 1,
        author: 'Rajesh Pillai',
        rating: 5,
        title: 'Must-have streaming device',
        content: 'Turns any TV into a smart TV. Alexa voice control is very convenient. Streaming quality is excellent. Setup was incredibly easy.',
        helpful: 178,
        verified: true,
      },
      {
        id: 2,
        author: 'Pooja Saxena',
        rating: 5,
        title: 'Great value for money',
        content: 'Access to all major streaming apps. Interface is user-friendly. Remote is responsive. Perfect for binge-watching shows and movies.',
        helpful: 142,
        verified: true,
      },
    ],
  },
  'Hollyland Lark M2 Wireless Microphone': {
    averageRating: 4.7,
    totalReviews: 892,
    distribution: [
      { stars: 5, percentage: 74 },
      { stars: 4, percentage: 19 },
      { stars: 3, percentage: 5 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 },
    ],
    reviews: [
      {
        id: 1,
        author: 'Varun Chopra',
        rating: 5,
        title: 'Professional quality audio',
        content: 'Crystal clear audio with no interference. Range is impressive. Perfect for content creators and vloggers. Compact design is very portable.',
        helpful: 84,
        verified: true,
      },
      {
        id: 2,
        author: 'Shreya Bose',
        rating: 5,
        title: 'Best wireless mic for the price',
        content: 'Easy to pair and use. Battery life is excellent. Audio quality rivals much more expensive mics. Highly recommend for video production.',
        helpful: 72,
        verified: true,
      },
    ],
  },
  'ECOVACS DEEBOT N30 Plus White 2 in 1 Robot Vacuum and Mop': {
    averageRating: 4.6,
    totalReviews: 1567,
    distribution: [
      { stars: 5, percentage: 68 },
      { stars: 4, percentage: 22 },
      { stars: 3, percentage: 7 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 1 },
    ],
    reviews: [
      {
        id: 1,
        author: 'Sandeep Jain',
        rating: 5,
        title: 'Life-changing cleaning robot',
        content: 'Cleans thoroughly and navigates smartly around furniture. Mopping function works great. Auto-empty station is very convenient. Worth the investment!',
        helpful: 119,
        verified: true,
      },
      {
        id: 2,
        author: 'Divya Krishnan',
        rating: 5,
        title: 'Best robot vacuum I have used',
        content: 'Powerful suction picks up pet hair easily. App control is intuitive. Scheduling feature is perfect for daily cleaning. Floors are spotless!',
        helpful: 95,
        verified: true,
      },
    ],
  },
};

// Default review data for products not in the map
const defaultReviewData: ReviewData = {
  averageRating: 4.5,
  totalReviews: 1247,
  distribution: [
    { stars: 5, percentage: 65 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 10 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ],
  reviews: [
    {
      id: 1,
      author: 'Rajesh Kumar',
      rating: 5,
      title: 'Excellent product, highly recommended!',
      content: 'This product exceeded my expectations. The build quality is outstanding and it works flawlessly. Worth every rupee!',
      helpful: 45,
      verified: true,
    },
    {
      id: 2,
      author: 'Priya Sharma',
      rating: 4,
      title: 'Great value for money',
      content: 'Very satisfied with this purchase. The performance is excellent and it arrived well-packaged. Minor issues with setup but overall great experience.',
      helpful: 32,
      verified: true,
    },
    {
      id: 3,
      author: 'Amit Patel',
      rating: 5,
      title: 'Best in its category',
      content: 'After extensive research, I chose this product and I am not disappointed. The features are exactly as described and the quality is top-notch.',
      helpful: 28,
      verified: true,
    },
    {
      id: 4,
      author: 'Sneha Reddy',
      rating: 4,
      title: 'Good product with minor flaws',
      content: 'Overall a solid product. Does what it promises. A few minor issues but nothing that affects daily use. Customer service was helpful.',
      helpful: 19,
      verified: false,
    },
  ],
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'fill-[oklch(0.65_0.22_35)] text-[oklch(0.65_0.22_35)]'
              : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  );
}

export function ProductReviews({ productTitle }: ProductReviewsProps) {
  const reviewData = productReviewData[productTitle] || defaultReviewData;
  const { averageRating, totalReviews, distribution, reviews } = reviewData;

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[oklch(0.65_0.22_35)] to-[oklch(0.55_0.18_25)] bg-clip-text text-transparent">
        Customer Reviews
      </h2>

      {/* Rating Summary */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Average Rating */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-6xl font-bold text-[oklch(0.60_0.20_30)] mb-2">
                {averageRating}
              </div>
              <StarRating rating={Math.round(averageRating)} />
              <p className="text-muted-foreground mt-2">
                Based on {totalReviews.toLocaleString('en-IN')} reviews
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3">
              {distribution.map((dist) => (
                <div key={dist.stars} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-12">{dist.stars} star</span>
                  <Progress value={dist.percentage} className="flex-1 h-2" />
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {dist.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-[oklch(0.60_0.20_30)]/10 text-[oklch(0.50_0.18_30)]">
                      {review.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{review.author}</p>
                      {review.verified && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[oklch(0.60_0.20_30)]/10 text-[oklch(0.50_0.18_30)]">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold mb-2">{review.title}</h4>
              <p className="text-muted-foreground mb-4">{review.content}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-[oklch(0.60_0.20_30)] transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  Helpful ({review.helpful})
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
