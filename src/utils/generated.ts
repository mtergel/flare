/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/post_tag": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.post_tag.id"];
          posts_id?: parameters["rowFilter.post_tag.posts_id"];
          tags_id?: parameters["rowFilter.post_tag.tags_id"];
          user_id?: parameters["rowFilter.post_tag.user_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["post_tag"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** post_tag */
          post_tag?: definitions["post_tag"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.post_tag.id"];
          posts_id?: parameters["rowFilter.post_tag.posts_id"];
          tags_id?: parameters["rowFilter.post_tag.tags_id"];
          user_id?: parameters["rowFilter.post_tag.user_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.post_tag.id"];
          posts_id?: parameters["rowFilter.post_tag.posts_id"];
          tags_id?: parameters["rowFilter.post_tag.tags_id"];
          user_id?: parameters["rowFilter.post_tag.user_id"];
        };
        body: {
          /** post_tag */
          post_tag?: definitions["post_tag"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/posts": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.posts.id"];
          created_at?: parameters["rowFilter.posts.created_at"];
          body_markdown?: parameters["rowFilter.posts.body_markdown"];
          emoji?: parameters["rowFilter.posts.emoji"];
          published?: parameters["rowFilter.posts.published"];
          slug?: parameters["rowFilter.posts.slug"];
          title?: parameters["rowFilter.posts.title"];
          post_type?: parameters["rowFilter.posts.post_type"];
          updated_at?: parameters["rowFilter.posts.updated_at"];
          user_id?: parameters["rowFilter.posts.user_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["posts"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** posts */
          posts?: definitions["posts"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.posts.id"];
          created_at?: parameters["rowFilter.posts.created_at"];
          body_markdown?: parameters["rowFilter.posts.body_markdown"];
          emoji?: parameters["rowFilter.posts.emoji"];
          published?: parameters["rowFilter.posts.published"];
          slug?: parameters["rowFilter.posts.slug"];
          title?: parameters["rowFilter.posts.title"];
          post_type?: parameters["rowFilter.posts.post_type"];
          updated_at?: parameters["rowFilter.posts.updated_at"];
          user_id?: parameters["rowFilter.posts.user_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.posts.id"];
          created_at?: parameters["rowFilter.posts.created_at"];
          body_markdown?: parameters["rowFilter.posts.body_markdown"];
          emoji?: parameters["rowFilter.posts.emoji"];
          published?: parameters["rowFilter.posts.published"];
          slug?: parameters["rowFilter.posts.slug"];
          title?: parameters["rowFilter.posts.title"];
          post_type?: parameters["rowFilter.posts.post_type"];
          updated_at?: parameters["rowFilter.posts.updated_at"];
          user_id?: parameters["rowFilter.posts.user_id"];
        };
        body: {
          /** posts */
          posts?: definitions["posts"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/profiles": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          display_name?: parameters["rowFilter.profiles.display_name"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          bio?: parameters["rowFilter.profiles.bio"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          display_name?: parameters["rowFilter.profiles.display_name"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          bio?: parameters["rowFilter.profiles.bio"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          display_name?: parameters["rowFilter.profiles.display_name"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          bio?: parameters["rowFilter.profiles.bio"];
        };
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/tags": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.tags.id"];
          name?: parameters["rowFilter.tags.name"];
          image_url?: parameters["rowFilter.tags.image_url"];
          featured?: parameters["rowFilter.tags.featured"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["tags"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** tags */
          tags?: definitions["tags"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.tags.id"];
          name?: parameters["rowFilter.tags.name"];
          image_url?: parameters["rowFilter.tags.image_url"];
          featured?: parameters["rowFilter.tags.featured"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.tags.id"];
          name?: parameters["rowFilter.tags.name"];
          image_url?: parameters["rowFilter.tags.image_url"];
          featured?: parameters["rowFilter.tags.featured"];
        };
        body: {
          /** tags */
          tags?: definitions["tags"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/rpc/create_profile_for_new_user": {
    post: {
      parameters: {
        body: {
          args: { [key: string]: unknown };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
}

export interface definitions {
  post_tag: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Note:
     * This is a Foreign Key to `posts.id`.<fk table='posts' column='id'/>
     */
    posts_id?: number;
    /**
     * Note:
     * This is a Foreign Key to `tags.id`.<fk table='tags' column='id'/>
     */
    tags_id?: string;
    /**
     * Note:
     * This is a Foreign Key to `profiles.id`.<fk table='profiles' column='id'/>
     */
    user_id?: string;
  };
  posts: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    created_at: string;
    body_markdown?: string;
    emoji: string;
    published: boolean;
    slug: string;
    title: string;
    post_type: "article" | "notebook";
    updated_at: string;
    /**
     * Note:
     * This is a Foreign Key to `profiles.id`.<fk table='profiles' column='id'/>
     */
    user_id: string;
  };
  profiles: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    updated_at?: string;
    display_name?: string;
    username?: string;
    avatar_url?: string;
    bio?: string;
  };
  tags: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    name?: string;
    image_url?: string;
    featured?: boolean;
  };
}

export interface parameters {
  /** Preference */
  preferParams: "params=single-object";
  /** Preference */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /** Preference */
  preferCount: "count=none";
  /** Filtering Columns */
  select: string;
  /** On Conflict */
  on_conflict: string;
  /** Ordering */
  order: string;
  /** Limiting and Pagination */
  range: string;
  /** Limiting and Pagination */
  rangeUnit: string;
  /** Limiting and Pagination */
  offset: string;
  /** Limiting and Pagination */
  limit: string;
  /** post_tag */
  "body.post_tag": definitions["post_tag"];
  "rowFilter.post_tag.id": string;
  "rowFilter.post_tag.posts_id": string;
  "rowFilter.post_tag.tags_id": string;
  "rowFilter.post_tag.user_id": string;
  /** posts */
  "body.posts": definitions["posts"];
  "rowFilter.posts.id": string;
  "rowFilter.posts.created_at": string;
  "rowFilter.posts.body_markdown": string;
  "rowFilter.posts.emoji": string;
  "rowFilter.posts.published": string;
  "rowFilter.posts.slug": string;
  "rowFilter.posts.title": string;
  "rowFilter.posts.post_type": string;
  "rowFilter.posts.updated_at": string;
  "rowFilter.posts.user_id": string;
  /** profiles */
  "body.profiles": definitions["profiles"];
  "rowFilter.profiles.id": string;
  "rowFilter.profiles.updated_at": string;
  "rowFilter.profiles.display_name": string;
  "rowFilter.profiles.username": string;
  "rowFilter.profiles.avatar_url": string;
  "rowFilter.profiles.bio": string;
  /** tags */
  "body.tags": definitions["tags"];
  "rowFilter.tags.id": string;
  "rowFilter.tags.name": string;
  "rowFilter.tags.image_url": string;
  "rowFilter.tags.featured": string;
}

export interface operations {}

export interface external {}
