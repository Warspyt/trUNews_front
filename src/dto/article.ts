import { z } from 'zod';
import { createArticleSchema, getArticleSchema} from '../schemas/schemas'; // Asegúrate de importar el esquema adecuado

export type createArticleType = z.infer<typeof createArticleSchema>;
export type getArticleType = z.infer<typeof getArticleSchema>;


export interface articlesWriter {
    username: string;
    name: string;
    lastname: string;
  }
  export interface returnArticles extends articlesWriter {
      id_article: number;
      id_writer: number;
      title?: string| null;
      date: Date;
      views: number;
      image_url: string;
      text: string;
    }
  
    export interface article_has_categories {
      category: {cat_name:string};
    }
    export interface returnArticlesCategory extends returnArticles {
      article_has_categories: article_has_categories[]
    }