export interface Post {
  _id?:string;
  title: string;
  permalink: string;
  
  content: string;
  image: string;
  excerpt: string;
  isFeatured: boolean;
  views: number;
  status: string;
  createdAt: Date;
  userId: string;
}
