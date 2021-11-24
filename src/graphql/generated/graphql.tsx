import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: any;
  timestamptz: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: Maybe<Scalars['String']>;
  _is_null?: Maybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: Maybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: Maybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: Maybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: Maybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: Maybe<Scalars['bigint']>;
  _gt?: Maybe<Scalars['bigint']>;
  _gte?: Maybe<Scalars['bigint']>;
  _in?: Maybe<Array<Scalars['bigint']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['bigint']>;
  _lte?: Maybe<Scalars['bigint']>;
  _neq?: Maybe<Scalars['bigint']>;
  _nin?: Maybe<Array<Scalars['bigint']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "post_type" */
  delete_post_type?: Maybe<Post_Type_Mutation_Response>;
  /** delete single row from the table: "post_type" */
  delete_post_type_by_pk?: Maybe<Post_Type>;
  /** delete data from the table: "posts" */
  delete_posts?: Maybe<Posts_Mutation_Response>;
  /** delete single row from the table: "posts" */
  delete_posts_by_pk?: Maybe<Posts>;
  /** delete data from the table: "posts_tags" */
  delete_posts_tags?: Maybe<Posts_Tags_Mutation_Response>;
  /** delete single row from the table: "posts_tags" */
  delete_posts_tags_by_pk?: Maybe<Posts_Tags>;
  /** delete data from the table: "tags" */
  delete_tags?: Maybe<Tags_Mutation_Response>;
  /** delete single row from the table: "tags" */
  delete_tags_by_pk?: Maybe<Tags>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "post_type" */
  insert_post_type?: Maybe<Post_Type_Mutation_Response>;
  /** insert a single row into the table: "post_type" */
  insert_post_type_one?: Maybe<Post_Type>;
  /** insert data into the table: "posts" */
  insert_posts?: Maybe<Posts_Mutation_Response>;
  /** insert a single row into the table: "posts" */
  insert_posts_one?: Maybe<Posts>;
  /** insert data into the table: "posts_tags" */
  insert_posts_tags?: Maybe<Posts_Tags_Mutation_Response>;
  /** insert a single row into the table: "posts_tags" */
  insert_posts_tags_one?: Maybe<Posts_Tags>;
  /** insert data into the table: "tags" */
  insert_tags?: Maybe<Tags_Mutation_Response>;
  /** insert a single row into the table: "tags" */
  insert_tags_one?: Maybe<Tags>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "post_type" */
  update_post_type?: Maybe<Post_Type_Mutation_Response>;
  /** update single row of the table: "post_type" */
  update_post_type_by_pk?: Maybe<Post_Type>;
  /** update data of the table: "posts" */
  update_posts?: Maybe<Posts_Mutation_Response>;
  /** update single row of the table: "posts" */
  update_posts_by_pk?: Maybe<Posts>;
  /** update data of the table: "posts_tags" */
  update_posts_tags?: Maybe<Posts_Tags_Mutation_Response>;
  /** update single row of the table: "posts_tags" */
  update_posts_tags_by_pk?: Maybe<Posts_Tags>;
  /** update data of the table: "tags" */
  update_tags?: Maybe<Tags_Mutation_Response>;
  /** update single row of the table: "tags" */
  update_tags_by_pk?: Maybe<Tags>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
};


/** mutation root */
export type Mutation_RootDelete_Post_TypeArgs = {
  where: Post_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Post_Type_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_PostsArgs = {
  where: Posts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Posts_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDelete_Posts_TagsArgs = {
  where: Posts_Tags_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Posts_Tags_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDelete_TagsArgs = {
  where: Tags_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Tags_By_PkArgs = {
  keyword: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  user_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootInsert_Post_TypeArgs = {
  objects: Array<Post_Type_Insert_Input>;
  on_conflict?: Maybe<Post_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Post_Type_OneArgs = {
  object: Post_Type_Insert_Input;
  on_conflict?: Maybe<Post_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PostsArgs = {
  objects: Array<Posts_Insert_Input>;
  on_conflict?: Maybe<Posts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Posts_OneArgs = {
  object: Posts_Insert_Input;
  on_conflict?: Maybe<Posts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Posts_TagsArgs = {
  objects: Array<Posts_Tags_Insert_Input>;
  on_conflict?: Maybe<Posts_Tags_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Posts_Tags_OneArgs = {
  object: Posts_Tags_Insert_Input;
  on_conflict?: Maybe<Posts_Tags_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TagsArgs = {
  objects: Array<Tags_Insert_Input>;
  on_conflict?: Maybe<Tags_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Tags_OneArgs = {
  object: Tags_Insert_Input;
  on_conflict?: Maybe<Tags_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_Post_TypeArgs = {
  _set?: Maybe<Post_Type_Set_Input>;
  where: Post_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Post_Type_By_PkArgs = {
  _set?: Maybe<Post_Type_Set_Input>;
  pk_columns: Post_Type_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_PostsArgs = {
  _inc?: Maybe<Posts_Inc_Input>;
  _set?: Maybe<Posts_Set_Input>;
  where: Posts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Posts_By_PkArgs = {
  _inc?: Maybe<Posts_Inc_Input>;
  _set?: Maybe<Posts_Set_Input>;
  pk_columns: Posts_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Posts_TagsArgs = {
  _inc?: Maybe<Posts_Tags_Inc_Input>;
  _set?: Maybe<Posts_Tags_Set_Input>;
  where: Posts_Tags_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Posts_Tags_By_PkArgs = {
  _inc?: Maybe<Posts_Tags_Inc_Input>;
  _set?: Maybe<Posts_Tags_Set_Input>;
  pk_columns: Posts_Tags_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_TagsArgs = {
  _set?: Maybe<Tags_Set_Input>;
  where: Tags_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Tags_By_PkArgs = {
  _set?: Maybe<Tags_Set_Input>;
  pk_columns: Tags_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/**
 * Post types enum table
 *
 *
 * columns and relationships of "post_type"
 *
 */
export type Post_Type = {
  __typename?: 'post_type';
  comment: Scalars['String'];
  value: Scalars['String'];
};

/** aggregated selection of "post_type" */
export type Post_Type_Aggregate = {
  __typename?: 'post_type_aggregate';
  aggregate?: Maybe<Post_Type_Aggregate_Fields>;
  nodes: Array<Post_Type>;
};

/** aggregate fields of "post_type" */
export type Post_Type_Aggregate_Fields = {
  __typename?: 'post_type_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Post_Type_Max_Fields>;
  min?: Maybe<Post_Type_Min_Fields>;
};


/** aggregate fields of "post_type" */
export type Post_Type_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Post_Type_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "post_type". All fields are combined with a logical 'AND'. */
export type Post_Type_Bool_Exp = {
  _and?: Maybe<Array<Post_Type_Bool_Exp>>;
  _not?: Maybe<Post_Type_Bool_Exp>;
  _or?: Maybe<Array<Post_Type_Bool_Exp>>;
  comment?: Maybe<String_Comparison_Exp>;
  value?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "post_type" */
export enum Post_Type_Constraint {
  /** unique or primary key constraint */
  PostTypePkey = 'post_type_pkey'
}

export enum Post_Type_Enum {
  /** Post that resembles an article */
  Article = 'Article',
  /** Post that features small texts */
  Notebook = 'Notebook'
}

/** Boolean expression to compare columns of type "post_type_enum". All fields are combined with logical 'AND'. */
export type Post_Type_Enum_Comparison_Exp = {
  _eq?: Maybe<Post_Type_Enum>;
  _in?: Maybe<Array<Post_Type_Enum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Post_Type_Enum>;
  _nin?: Maybe<Array<Post_Type_Enum>>;
};

/** input type for inserting data into table "post_type" */
export type Post_Type_Insert_Input = {
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Post_Type_Max_Fields = {
  __typename?: 'post_type_max_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Post_Type_Min_Fields = {
  __typename?: 'post_type_min_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "post_type" */
export type Post_Type_Mutation_Response = {
  __typename?: 'post_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Post_Type>;
};

/** on conflict condition type for table "post_type" */
export type Post_Type_On_Conflict = {
  constraint: Post_Type_Constraint;
  update_columns?: Array<Post_Type_Update_Column>;
  where?: Maybe<Post_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "post_type". */
export type Post_Type_Order_By = {
  comment?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** primary key columns input for table: post_type */
export type Post_Type_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "post_type" */
export enum Post_Type_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "post_type" */
export type Post_Type_Set_Input = {
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** update columns of table "post_type" */
export enum Post_Type_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/**
 * contains article/notebook/books
 *
 *
 * columns and relationships of "posts"
 *
 */
export type Posts = {
  __typename?: 'posts';
  body_markdown?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  emoji?: Maybe<Scalars['String']>;
  id: Scalars['bigint'];
  post_type: Post_Type_Enum;
  /** An array relationship */
  posts_tags: Array<Posts_Tags>;
  /** An aggregate relationship */
  posts_tags_aggregate: Posts_Tags_Aggregate;
  published: Scalars['Boolean'];
  slug: Scalars['String'];
  title: Scalars['String'];
  updated_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user: Users;
  user_id: Scalars['String'];
};


/**
 * contains article/notebook/books
 *
 *
 * columns and relationships of "posts"
 *
 */
export type PostsPosts_TagsArgs = {
  distinct_on?: Maybe<Array<Posts_Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Tags_Order_By>>;
  where?: Maybe<Posts_Tags_Bool_Exp>;
};


/**
 * contains article/notebook/books
 *
 *
 * columns and relationships of "posts"
 *
 */
export type PostsPosts_Tags_AggregateArgs = {
  distinct_on?: Maybe<Array<Posts_Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Tags_Order_By>>;
  where?: Maybe<Posts_Tags_Bool_Exp>;
};

/** aggregated selection of "posts" */
export type Posts_Aggregate = {
  __typename?: 'posts_aggregate';
  aggregate?: Maybe<Posts_Aggregate_Fields>;
  nodes: Array<Posts>;
};

/** aggregate fields of "posts" */
export type Posts_Aggregate_Fields = {
  __typename?: 'posts_aggregate_fields';
  avg?: Maybe<Posts_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Posts_Max_Fields>;
  min?: Maybe<Posts_Min_Fields>;
  stddev?: Maybe<Posts_Stddev_Fields>;
  stddev_pop?: Maybe<Posts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Posts_Stddev_Samp_Fields>;
  sum?: Maybe<Posts_Sum_Fields>;
  var_pop?: Maybe<Posts_Var_Pop_Fields>;
  var_samp?: Maybe<Posts_Var_Samp_Fields>;
  variance?: Maybe<Posts_Variance_Fields>;
};


/** aggregate fields of "posts" */
export type Posts_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Posts_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "posts" */
export type Posts_Aggregate_Order_By = {
  avg?: Maybe<Posts_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Posts_Max_Order_By>;
  min?: Maybe<Posts_Min_Order_By>;
  stddev?: Maybe<Posts_Stddev_Order_By>;
  stddev_pop?: Maybe<Posts_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Posts_Stddev_Samp_Order_By>;
  sum?: Maybe<Posts_Sum_Order_By>;
  var_pop?: Maybe<Posts_Var_Pop_Order_By>;
  var_samp?: Maybe<Posts_Var_Samp_Order_By>;
  variance?: Maybe<Posts_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "posts" */
export type Posts_Arr_Rel_Insert_Input = {
  data: Array<Posts_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Posts_On_Conflict>;
};

/** aggregate avg on columns */
export type Posts_Avg_Fields = {
  __typename?: 'posts_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "posts" */
export type Posts_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "posts". All fields are combined with a logical 'AND'. */
export type Posts_Bool_Exp = {
  _and?: Maybe<Array<Posts_Bool_Exp>>;
  _not?: Maybe<Posts_Bool_Exp>;
  _or?: Maybe<Array<Posts_Bool_Exp>>;
  body_markdown?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  emoji?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Bigint_Comparison_Exp>;
  post_type?: Maybe<Post_Type_Enum_Comparison_Exp>;
  posts_tags?: Maybe<Posts_Tags_Bool_Exp>;
  published?: Maybe<Boolean_Comparison_Exp>;
  slug?: Maybe<String_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "posts" */
export enum Posts_Constraint {
  /** unique or primary key constraint */
  PostsPkey = 'posts_pkey',
  /** unique or primary key constraint */
  PostsSlug = 'posts_slug',
  /** unique or primary key constraint */
  PostsSlugKey = 'posts_slug_key'
}

/** input type for incrementing numeric columns in table "posts" */
export type Posts_Inc_Input = {
  id?: Maybe<Scalars['bigint']>;
};

/** input type for inserting data into table "posts" */
export type Posts_Insert_Input = {
  body_markdown?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  emoji?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['bigint']>;
  post_type?: Maybe<Post_Type_Enum>;
  posts_tags?: Maybe<Posts_Tags_Arr_Rel_Insert_Input>;
  published?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Posts_Max_Fields = {
  __typename?: 'posts_max_fields';
  body_markdown?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  emoji?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['bigint']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "posts" */
export type Posts_Max_Order_By = {
  body_markdown?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  emoji?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Posts_Min_Fields = {
  __typename?: 'posts_min_fields';
  body_markdown?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  emoji?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['bigint']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "posts" */
export type Posts_Min_Order_By = {
  body_markdown?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  emoji?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "posts" */
export type Posts_Mutation_Response = {
  __typename?: 'posts_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Posts>;
};

/** input type for inserting object relation for remote table "posts" */
export type Posts_Obj_Rel_Insert_Input = {
  data: Posts_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Posts_On_Conflict>;
};

/** on conflict condition type for table "posts" */
export type Posts_On_Conflict = {
  constraint: Posts_Constraint;
  update_columns?: Array<Posts_Update_Column>;
  where?: Maybe<Posts_Bool_Exp>;
};

/** Ordering options when selecting data from "posts". */
export type Posts_Order_By = {
  body_markdown?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  emoji?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  post_type?: Maybe<Order_By>;
  posts_tags_aggregate?: Maybe<Posts_Tags_Aggregate_Order_By>;
  published?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: posts */
export type Posts_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** select columns of table "posts" */
export enum Posts_Select_Column {
  /** column name */
  BodyMarkdown = 'body_markdown',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Emoji = 'emoji',
  /** column name */
  Id = 'id',
  /** column name */
  PostType = 'post_type',
  /** column name */
  Published = 'published',
  /** column name */
  Slug = 'slug',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "posts" */
export type Posts_Set_Input = {
  body_markdown?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  emoji?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['bigint']>;
  post_type?: Maybe<Post_Type_Enum>;
  published?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Posts_Stddev_Fields = {
  __typename?: 'posts_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "posts" */
export type Posts_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Posts_Stddev_Pop_Fields = {
  __typename?: 'posts_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "posts" */
export type Posts_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Posts_Stddev_Samp_Fields = {
  __typename?: 'posts_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "posts" */
export type Posts_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Posts_Sum_Fields = {
  __typename?: 'posts_sum_fields';
  id?: Maybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "posts" */
export type Posts_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/**
 * junction table for posts and tags
 *
 *
 * columns and relationships of "posts_tags"
 *
 */
export type Posts_Tags = {
  __typename?: 'posts_tags';
  id: Scalars['bigint'];
  owner?: Maybe<Scalars['String']>;
  /** An object relationship */
  post: Posts;
  post_id: Scalars['bigint'];
  /** An object relationship */
  tag: Tags;
  tag_keyword: Scalars['String'];
};

/** aggregated selection of "posts_tags" */
export type Posts_Tags_Aggregate = {
  __typename?: 'posts_tags_aggregate';
  aggregate?: Maybe<Posts_Tags_Aggregate_Fields>;
  nodes: Array<Posts_Tags>;
};

/** aggregate fields of "posts_tags" */
export type Posts_Tags_Aggregate_Fields = {
  __typename?: 'posts_tags_aggregate_fields';
  avg?: Maybe<Posts_Tags_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Posts_Tags_Max_Fields>;
  min?: Maybe<Posts_Tags_Min_Fields>;
  stddev?: Maybe<Posts_Tags_Stddev_Fields>;
  stddev_pop?: Maybe<Posts_Tags_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Posts_Tags_Stddev_Samp_Fields>;
  sum?: Maybe<Posts_Tags_Sum_Fields>;
  var_pop?: Maybe<Posts_Tags_Var_Pop_Fields>;
  var_samp?: Maybe<Posts_Tags_Var_Samp_Fields>;
  variance?: Maybe<Posts_Tags_Variance_Fields>;
};


/** aggregate fields of "posts_tags" */
export type Posts_Tags_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Posts_Tags_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "posts_tags" */
export type Posts_Tags_Aggregate_Order_By = {
  avg?: Maybe<Posts_Tags_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Posts_Tags_Max_Order_By>;
  min?: Maybe<Posts_Tags_Min_Order_By>;
  stddev?: Maybe<Posts_Tags_Stddev_Order_By>;
  stddev_pop?: Maybe<Posts_Tags_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Posts_Tags_Stddev_Samp_Order_By>;
  sum?: Maybe<Posts_Tags_Sum_Order_By>;
  var_pop?: Maybe<Posts_Tags_Var_Pop_Order_By>;
  var_samp?: Maybe<Posts_Tags_Var_Samp_Order_By>;
  variance?: Maybe<Posts_Tags_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "posts_tags" */
export type Posts_Tags_Arr_Rel_Insert_Input = {
  data: Array<Posts_Tags_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Posts_Tags_On_Conflict>;
};

/** aggregate avg on columns */
export type Posts_Tags_Avg_Fields = {
  __typename?: 'posts_tags_avg_fields';
  id?: Maybe<Scalars['Float']>;
  post_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "posts_tags" */
export type Posts_Tags_Avg_Order_By = {
  id?: Maybe<Order_By>;
  post_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "posts_tags". All fields are combined with a logical 'AND'. */
export type Posts_Tags_Bool_Exp = {
  _and?: Maybe<Array<Posts_Tags_Bool_Exp>>;
  _not?: Maybe<Posts_Tags_Bool_Exp>;
  _or?: Maybe<Array<Posts_Tags_Bool_Exp>>;
  id?: Maybe<Bigint_Comparison_Exp>;
  owner?: Maybe<String_Comparison_Exp>;
  post?: Maybe<Posts_Bool_Exp>;
  post_id?: Maybe<Bigint_Comparison_Exp>;
  tag?: Maybe<Tags_Bool_Exp>;
  tag_keyword?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "posts_tags" */
export enum Posts_Tags_Constraint {
  /** unique or primary key constraint */
  PostsTablePkey = 'posts_table_pkey',
  /** unique or primary key constraint */
  PostsTagsPostIdTagKeywordKey = 'posts_tags_post_id_tag_keyword_key'
}

/** input type for incrementing numeric columns in table "posts_tags" */
export type Posts_Tags_Inc_Input = {
  id?: Maybe<Scalars['bigint']>;
  post_id?: Maybe<Scalars['bigint']>;
};

/** input type for inserting data into table "posts_tags" */
export type Posts_Tags_Insert_Input = {
  id?: Maybe<Scalars['bigint']>;
  owner?: Maybe<Scalars['String']>;
  post?: Maybe<Posts_Obj_Rel_Insert_Input>;
  post_id?: Maybe<Scalars['bigint']>;
  tag?: Maybe<Tags_Obj_Rel_Insert_Input>;
  tag_keyword?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Posts_Tags_Max_Fields = {
  __typename?: 'posts_tags_max_fields';
  id?: Maybe<Scalars['bigint']>;
  owner?: Maybe<Scalars['String']>;
  post_id?: Maybe<Scalars['bigint']>;
  tag_keyword?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "posts_tags" */
export type Posts_Tags_Max_Order_By = {
  id?: Maybe<Order_By>;
  owner?: Maybe<Order_By>;
  post_id?: Maybe<Order_By>;
  tag_keyword?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Posts_Tags_Min_Fields = {
  __typename?: 'posts_tags_min_fields';
  id?: Maybe<Scalars['bigint']>;
  owner?: Maybe<Scalars['String']>;
  post_id?: Maybe<Scalars['bigint']>;
  tag_keyword?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "posts_tags" */
export type Posts_Tags_Min_Order_By = {
  id?: Maybe<Order_By>;
  owner?: Maybe<Order_By>;
  post_id?: Maybe<Order_By>;
  tag_keyword?: Maybe<Order_By>;
};

/** response of any mutation on the table "posts_tags" */
export type Posts_Tags_Mutation_Response = {
  __typename?: 'posts_tags_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Posts_Tags>;
};

/** on conflict condition type for table "posts_tags" */
export type Posts_Tags_On_Conflict = {
  constraint: Posts_Tags_Constraint;
  update_columns?: Array<Posts_Tags_Update_Column>;
  where?: Maybe<Posts_Tags_Bool_Exp>;
};

/** Ordering options when selecting data from "posts_tags". */
export type Posts_Tags_Order_By = {
  id?: Maybe<Order_By>;
  owner?: Maybe<Order_By>;
  post?: Maybe<Posts_Order_By>;
  post_id?: Maybe<Order_By>;
  tag?: Maybe<Tags_Order_By>;
  tag_keyword?: Maybe<Order_By>;
};

/** primary key columns input for table: posts_tags */
export type Posts_Tags_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** select columns of table "posts_tags" */
export enum Posts_Tags_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Owner = 'owner',
  /** column name */
  PostId = 'post_id',
  /** column name */
  TagKeyword = 'tag_keyword'
}

/** input type for updating data in table "posts_tags" */
export type Posts_Tags_Set_Input = {
  id?: Maybe<Scalars['bigint']>;
  owner?: Maybe<Scalars['String']>;
  post_id?: Maybe<Scalars['bigint']>;
  tag_keyword?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Posts_Tags_Stddev_Fields = {
  __typename?: 'posts_tags_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  post_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "posts_tags" */
export type Posts_Tags_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  post_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Posts_Tags_Stddev_Pop_Fields = {
  __typename?: 'posts_tags_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  post_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "posts_tags" */
export type Posts_Tags_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  post_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Posts_Tags_Stddev_Samp_Fields = {
  __typename?: 'posts_tags_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  post_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "posts_tags" */
export type Posts_Tags_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  post_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Posts_Tags_Sum_Fields = {
  __typename?: 'posts_tags_sum_fields';
  id?: Maybe<Scalars['bigint']>;
  post_id?: Maybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "posts_tags" */
export type Posts_Tags_Sum_Order_By = {
  id?: Maybe<Order_By>;
  post_id?: Maybe<Order_By>;
};

/** update columns of table "posts_tags" */
export enum Posts_Tags_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Owner = 'owner',
  /** column name */
  PostId = 'post_id',
  /** column name */
  TagKeyword = 'tag_keyword'
}

/** aggregate var_pop on columns */
export type Posts_Tags_Var_Pop_Fields = {
  __typename?: 'posts_tags_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  post_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "posts_tags" */
export type Posts_Tags_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  post_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Posts_Tags_Var_Samp_Fields = {
  __typename?: 'posts_tags_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  post_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "posts_tags" */
export type Posts_Tags_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  post_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Posts_Tags_Variance_Fields = {
  __typename?: 'posts_tags_variance_fields';
  id?: Maybe<Scalars['Float']>;
  post_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "posts_tags" */
export type Posts_Tags_Variance_Order_By = {
  id?: Maybe<Order_By>;
  post_id?: Maybe<Order_By>;
};

/** update columns of table "posts" */
export enum Posts_Update_Column {
  /** column name */
  BodyMarkdown = 'body_markdown',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Emoji = 'emoji',
  /** column name */
  Id = 'id',
  /** column name */
  PostType = 'post_type',
  /** column name */
  Published = 'published',
  /** column name */
  Slug = 'slug',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Posts_Var_Pop_Fields = {
  __typename?: 'posts_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "posts" */
export type Posts_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Posts_Var_Samp_Fields = {
  __typename?: 'posts_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "posts" */
export type Posts_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Posts_Variance_Fields = {
  __typename?: 'posts_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "posts" */
export type Posts_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "post_type" */
  post_type: Array<Post_Type>;
  /** fetch aggregated fields from the table: "post_type" */
  post_type_aggregate: Post_Type_Aggregate;
  /** fetch data from the table: "post_type" using primary key columns */
  post_type_by_pk?: Maybe<Post_Type>;
  /** An array relationship */
  posts: Array<Posts>;
  /** An aggregate relationship */
  posts_aggregate: Posts_Aggregate;
  /** fetch data from the table: "posts" using primary key columns */
  posts_by_pk?: Maybe<Posts>;
  /** An array relationship */
  posts_tags: Array<Posts_Tags>;
  /** An aggregate relationship */
  posts_tags_aggregate: Posts_Tags_Aggregate;
  /** fetch data from the table: "posts_tags" using primary key columns */
  posts_tags_by_pk?: Maybe<Posts_Tags>;
  /** execute function "search_tags_by_keyword" which returns "tags" */
  search_tags_by_keyword: Array<Tags>;
  /** execute function "search_tags_by_keyword" and query aggregates on result of table type "tags" */
  search_tags_by_keyword_aggregate: Tags_Aggregate;
  /** fetch data from the table: "tags" */
  tags: Array<Tags>;
  /** fetch aggregated fields from the table: "tags" */
  tags_aggregate: Tags_Aggregate;
  /** fetch data from the table: "tags" using primary key columns */
  tags_by_pk?: Maybe<Tags>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootPost_TypeArgs = {
  distinct_on?: Maybe<Array<Post_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Post_Type_Order_By>>;
  where?: Maybe<Post_Type_Bool_Exp>;
};


export type Query_RootPost_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Post_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Post_Type_Order_By>>;
  where?: Maybe<Post_Type_Bool_Exp>;
};


export type Query_RootPost_Type_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootPostsArgs = {
  distinct_on?: Maybe<Array<Posts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Order_By>>;
  where?: Maybe<Posts_Bool_Exp>;
};


export type Query_RootPosts_AggregateArgs = {
  distinct_on?: Maybe<Array<Posts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Order_By>>;
  where?: Maybe<Posts_Bool_Exp>;
};


export type Query_RootPosts_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootPosts_TagsArgs = {
  distinct_on?: Maybe<Array<Posts_Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Tags_Order_By>>;
  where?: Maybe<Posts_Tags_Bool_Exp>;
};


export type Query_RootPosts_Tags_AggregateArgs = {
  distinct_on?: Maybe<Array<Posts_Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Tags_Order_By>>;
  where?: Maybe<Posts_Tags_Bool_Exp>;
};


export type Query_RootPosts_Tags_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootSearch_Tags_By_KeywordArgs = {
  args: Search_Tags_By_Keyword_Args;
  distinct_on?: Maybe<Array<Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Tags_Order_By>>;
  where?: Maybe<Tags_Bool_Exp>;
};


export type Query_RootSearch_Tags_By_Keyword_AggregateArgs = {
  args: Search_Tags_By_Keyword_Args;
  distinct_on?: Maybe<Array<Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Tags_Order_By>>;
  where?: Maybe<Tags_Bool_Exp>;
};


export type Query_RootTagsArgs = {
  distinct_on?: Maybe<Array<Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Tags_Order_By>>;
  where?: Maybe<Tags_Bool_Exp>;
};


export type Query_RootTags_AggregateArgs = {
  distinct_on?: Maybe<Array<Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Tags_Order_By>>;
  where?: Maybe<Tags_Bool_Exp>;
};


export type Query_RootTags_By_PkArgs = {
  keyword: Scalars['String'];
};


export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  user_id: Scalars['String'];
};

export type Search_Tags_By_Keyword_Args = {
  search?: Maybe<Scalars['String']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "post_type" */
  post_type: Array<Post_Type>;
  /** fetch aggregated fields from the table: "post_type" */
  post_type_aggregate: Post_Type_Aggregate;
  /** fetch data from the table: "post_type" using primary key columns */
  post_type_by_pk?: Maybe<Post_Type>;
  /** An array relationship */
  posts: Array<Posts>;
  /** An aggregate relationship */
  posts_aggregate: Posts_Aggregate;
  /** fetch data from the table: "posts" using primary key columns */
  posts_by_pk?: Maybe<Posts>;
  /** An array relationship */
  posts_tags: Array<Posts_Tags>;
  /** An aggregate relationship */
  posts_tags_aggregate: Posts_Tags_Aggregate;
  /** fetch data from the table: "posts_tags" using primary key columns */
  posts_tags_by_pk?: Maybe<Posts_Tags>;
  /** execute function "search_tags_by_keyword" which returns "tags" */
  search_tags_by_keyword: Array<Tags>;
  /** execute function "search_tags_by_keyword" and query aggregates on result of table type "tags" */
  search_tags_by_keyword_aggregate: Tags_Aggregate;
  /** fetch data from the table: "tags" */
  tags: Array<Tags>;
  /** fetch aggregated fields from the table: "tags" */
  tags_aggregate: Tags_Aggregate;
  /** fetch data from the table: "tags" using primary key columns */
  tags_by_pk?: Maybe<Tags>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Subscription_RootPost_TypeArgs = {
  distinct_on?: Maybe<Array<Post_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Post_Type_Order_By>>;
  where?: Maybe<Post_Type_Bool_Exp>;
};


export type Subscription_RootPost_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Post_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Post_Type_Order_By>>;
  where?: Maybe<Post_Type_Bool_Exp>;
};


export type Subscription_RootPost_Type_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootPostsArgs = {
  distinct_on?: Maybe<Array<Posts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Order_By>>;
  where?: Maybe<Posts_Bool_Exp>;
};


export type Subscription_RootPosts_AggregateArgs = {
  distinct_on?: Maybe<Array<Posts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Order_By>>;
  where?: Maybe<Posts_Bool_Exp>;
};


export type Subscription_RootPosts_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootPosts_TagsArgs = {
  distinct_on?: Maybe<Array<Posts_Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Tags_Order_By>>;
  where?: Maybe<Posts_Tags_Bool_Exp>;
};


export type Subscription_RootPosts_Tags_AggregateArgs = {
  distinct_on?: Maybe<Array<Posts_Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Tags_Order_By>>;
  where?: Maybe<Posts_Tags_Bool_Exp>;
};


export type Subscription_RootPosts_Tags_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootSearch_Tags_By_KeywordArgs = {
  args: Search_Tags_By_Keyword_Args;
  distinct_on?: Maybe<Array<Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Tags_Order_By>>;
  where?: Maybe<Tags_Bool_Exp>;
};


export type Subscription_RootSearch_Tags_By_Keyword_AggregateArgs = {
  args: Search_Tags_By_Keyword_Args;
  distinct_on?: Maybe<Array<Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Tags_Order_By>>;
  where?: Maybe<Tags_Bool_Exp>;
};


export type Subscription_RootTagsArgs = {
  distinct_on?: Maybe<Array<Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Tags_Order_By>>;
  where?: Maybe<Tags_Bool_Exp>;
};


export type Subscription_RootTags_AggregateArgs = {
  distinct_on?: Maybe<Array<Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Tags_Order_By>>;
  where?: Maybe<Tags_Bool_Exp>;
};


export type Subscription_RootTags_By_PkArgs = {
  keyword: Scalars['String'];
};


export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  user_id: Scalars['String'];
};

/**
 * post tags
 *
 *
 * columns and relationships of "tags"
 *
 */
export type Tags = {
  __typename?: 'tags';
  image: Scalars['String'];
  included: Scalars['Boolean'];
  keyword: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  /** An array relationship */
  posts_tags: Array<Posts_Tags>;
  /** An aggregate relationship */
  posts_tags_aggregate: Posts_Tags_Aggregate;
};


/**
 * post tags
 *
 *
 * columns and relationships of "tags"
 *
 */
export type TagsPosts_TagsArgs = {
  distinct_on?: Maybe<Array<Posts_Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Tags_Order_By>>;
  where?: Maybe<Posts_Tags_Bool_Exp>;
};


/**
 * post tags
 *
 *
 * columns and relationships of "tags"
 *
 */
export type TagsPosts_Tags_AggregateArgs = {
  distinct_on?: Maybe<Array<Posts_Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Tags_Order_By>>;
  where?: Maybe<Posts_Tags_Bool_Exp>;
};

/** aggregated selection of "tags" */
export type Tags_Aggregate = {
  __typename?: 'tags_aggregate';
  aggregate?: Maybe<Tags_Aggregate_Fields>;
  nodes: Array<Tags>;
};

/** aggregate fields of "tags" */
export type Tags_Aggregate_Fields = {
  __typename?: 'tags_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Tags_Max_Fields>;
  min?: Maybe<Tags_Min_Fields>;
};


/** aggregate fields of "tags" */
export type Tags_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Tags_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "tags". All fields are combined with a logical 'AND'. */
export type Tags_Bool_Exp = {
  _and?: Maybe<Array<Tags_Bool_Exp>>;
  _not?: Maybe<Tags_Bool_Exp>;
  _or?: Maybe<Array<Tags_Bool_Exp>>;
  image?: Maybe<String_Comparison_Exp>;
  included?: Maybe<Boolean_Comparison_Exp>;
  keyword?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  posts_tags?: Maybe<Posts_Tags_Bool_Exp>;
};

/** unique or primary key constraints on table "tags" */
export enum Tags_Constraint {
  /** unique or primary key constraint */
  TagsPkey = 'tags_pkey'
}

/** input type for inserting data into table "tags" */
export type Tags_Insert_Input = {
  image?: Maybe<Scalars['String']>;
  included?: Maybe<Scalars['Boolean']>;
  keyword?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  posts_tags?: Maybe<Posts_Tags_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Tags_Max_Fields = {
  __typename?: 'tags_max_fields';
  image?: Maybe<Scalars['String']>;
  keyword?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Tags_Min_Fields = {
  __typename?: 'tags_min_fields';
  image?: Maybe<Scalars['String']>;
  keyword?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "tags" */
export type Tags_Mutation_Response = {
  __typename?: 'tags_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Tags>;
};

/** input type for inserting object relation for remote table "tags" */
export type Tags_Obj_Rel_Insert_Input = {
  data: Tags_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Tags_On_Conflict>;
};

/** on conflict condition type for table "tags" */
export type Tags_On_Conflict = {
  constraint: Tags_Constraint;
  update_columns?: Array<Tags_Update_Column>;
  where?: Maybe<Tags_Bool_Exp>;
};

/** Ordering options when selecting data from "tags". */
export type Tags_Order_By = {
  image?: Maybe<Order_By>;
  included?: Maybe<Order_By>;
  keyword?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  posts_tags_aggregate?: Maybe<Posts_Tags_Aggregate_Order_By>;
};

/** primary key columns input for table: tags */
export type Tags_Pk_Columns_Input = {
  keyword: Scalars['String'];
};

/** select columns of table "tags" */
export enum Tags_Select_Column {
  /** column name */
  Image = 'image',
  /** column name */
  Included = 'included',
  /** column name */
  Keyword = 'keyword',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "tags" */
export type Tags_Set_Input = {
  image?: Maybe<Scalars['String']>;
  included?: Maybe<Scalars['Boolean']>;
  keyword?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** update columns of table "tags" */
export enum Tags_Update_Column {
  /** column name */
  Image = 'image',
  /** column name */
  Included = 'included',
  /** column name */
  Keyword = 'keyword',
  /** column name */
  Name = 'name'
}

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/**
 * Profile Table of Firebase users logged in from FB/Google/Github
 *
 *
 * columns and relationships of "users"
 *
 */
export type Users = {
  __typename?: 'users';
  bio?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  email?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  /** An array relationship */
  posts: Array<Posts>;
  /** An aggregate relationship */
  posts_aggregate: Posts_Aggregate;
  updated_at: Scalars['timestamptz'];
  user_id: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  verified: Scalars['Boolean'];
};


/**
 * Profile Table of Firebase users logged in from FB/Google/Github
 *
 *
 * columns and relationships of "users"
 *
 */
export type UsersPostsArgs = {
  distinct_on?: Maybe<Array<Posts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Order_By>>;
  where?: Maybe<Posts_Bool_Exp>;
};


/**
 * Profile Table of Firebase users logged in from FB/Google/Github
 *
 *
 * columns and relationships of "users"
 *
 */
export type UsersPosts_AggregateArgs = {
  distinct_on?: Maybe<Array<Posts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Order_By>>;
  where?: Maybe<Posts_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Users_Bool_Exp>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Users_Bool_Exp>>;
  bio?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  image?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  phone?: Maybe<String_Comparison_Exp>;
  posts?: Maybe<Posts_Bool_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
  username?: Maybe<String_Comparison_Exp>;
  verified?: Maybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  bio?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  posts?: Maybe<Posts_Arr_Rel_Insert_Input>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  bio?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  bio?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: Maybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  bio?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  phone?: Maybe<Order_By>;
  posts_aggregate?: Maybe<Posts_Aggregate_Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
  verified?: Maybe<Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  user_id: Scalars['String'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Bio = 'bio',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Username = 'username',
  /** column name */
  Verified = 'verified'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  bio?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Bio = 'bio',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Username = 'username',
  /** column name */
  Verified = 'verified'
}

export type CreatePostMutationVariables = Exact<{
  object: Posts_Insert_Input;
}>;


export type CreatePostMutation = { __typename?: 'mutation_root', insert_posts_one?: { __typename?: 'posts', body_markdown?: string | null | undefined, created_at?: any | null | undefined, emoji?: string | null | undefined, id: any, published: boolean, slug: string, title: string, updated_at?: any | null | undefined, user_id: string, posts_tags: Array<{ __typename?: 'posts_tags', id: any, tag_keyword: string }>, user: { __typename?: 'users', username?: string | null | undefined } } | null | undefined };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['bigint'];
}>;


export type DeletePostMutation = { __typename?: 'mutation_root', delete_posts_by_pk?: { __typename?: 'posts', id: any } | null | undefined };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['bigint'];
  _set: Posts_Set_Input;
}>;


export type UpdatePostMutation = { __typename?: 'mutation_root', update_posts_by_pk?: { __typename?: 'posts', body_markdown?: string | null | undefined, created_at?: any | null | undefined, emoji?: string | null | undefined, id: any, published: boolean, slug: string, title: string, updated_at?: any | null | undefined, user_id: string, posts_tags: Array<{ __typename?: 'posts_tags', id: any, tag_keyword: string }>, user: { __typename?: 'users', username?: string | null | undefined } } | null | undefined };

export type GetPostByIdQueryVariables = Exact<{
  id: Scalars['bigint'];
}>;


export type GetPostByIdQuery = { __typename?: 'query_root', posts_by_pk?: { __typename?: 'posts', body_markdown?: string | null | undefined, created_at?: any | null | undefined, emoji?: string | null | undefined, id: any, post_type: Post_Type_Enum, published: boolean, slug: string, title: string, updated_at?: any | null | undefined, user_id: string, posts_tags: Array<{ __typename?: 'posts_tags', id: any, tag_keyword: string }> } | null | undefined };

export type GetPostBySlugQueryVariables = Exact<{
  _eq: Scalars['String'];
}>;


export type GetPostBySlugQuery = { __typename?: 'query_root', posts: Array<{ __typename?: 'posts', body_markdown?: string | null | undefined, created_at?: any | null | undefined, updated_at?: any | null | undefined, emoji?: string | null | undefined, id: any, post_type: Post_Type_Enum, published: boolean, slug: string, title: string, posts_tags: Array<{ __typename?: 'posts_tags', tag: { __typename?: 'tags', image: string, keyword: string, name?: string | null | undefined } }>, user: { __typename?: 'users', image?: string | null | undefined, name: string, username?: string | null | undefined, bio?: string | null | undefined, verified: boolean } }> };

export type ListUsersPostsQueryVariables = Exact<{
  _eq: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type ListUsersPostsQuery = { __typename?: 'query_root', posts: Array<{ __typename?: 'posts', body_markdown?: string | null | undefined, created_at?: any | null | undefined, emoji?: string | null | undefined, id: any, published: boolean, slug: string, title: string, updated_at?: any | null | undefined, post_type: Post_Type_Enum, posts_tags: Array<{ __typename?: 'posts_tags', id: any, tag_keyword: string }> }>, posts_aggregate: { __typename?: 'posts_aggregate', aggregate?: { __typename?: 'posts_aggregate_fields', count: number } | null | undefined } };

export type PostsStaticPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsStaticPathsQuery = { __typename?: 'query_root', posts: Array<{ __typename?: 'posts', slug: string, user: { __typename?: 'users', username?: string | null | undefined } }> };

export type DeletePostsTagsMutationVariables = Exact<{
  where?: Maybe<Posts_Tags_Bool_Exp>;
}>;


export type DeletePostsTagsMutation = { __typename?: 'mutation_root', delete_posts_tags?: { __typename?: 'posts_tags_mutation_response', affected_rows: number } | null | undefined };

export type InsertPostsTagsMutationVariables = Exact<{
  objects?: Maybe<Array<Posts_Tags_Insert_Input> | Posts_Tags_Insert_Input>;
  on_conflict?: Maybe<Posts_Tags_On_Conflict>;
}>;


export type InsertPostsTagsMutation = { __typename?: 'mutation_root', insert_posts_tags?: { __typename?: 'posts_tags_mutation_response', affected_rows: number } | null | undefined };

export type InsertTagsMutationVariables = Exact<{
  objects: Array<Tags_Insert_Input> | Tags_Insert_Input;
}>;


export type InsertTagsMutation = { __typename?: 'mutation_root', insert_tags?: { __typename?: 'tags_mutation_response', affected_rows: number } | null | undefined };

export type ListTagsForSelectQueryVariables = Exact<{ [key: string]: never; }>;


export type ListTagsForSelectQuery = { __typename?: 'query_root', tags: Array<{ __typename?: 'tags', keyword: string }> };

export type SearchTagsByKeywordQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type SearchTagsByKeywordQuery = { __typename?: 'query_root', search_tags_by_keyword: Array<{ __typename?: 'tags', keyword: string }> };

export type UpdateUserMutationVariables = Exact<{
  user_id: Scalars['String'];
  _set?: Maybe<Users_Set_Input>;
}>;


export type UpdateUserMutation = { __typename?: 'mutation_root', update_users_by_pk?: { __typename?: 'users', verified: boolean, user_id: string, username?: string | null | undefined, updated_at: any, name: string, image?: string | null | undefined, created_at: any, bio?: string | null | undefined } | null | undefined };

export type GetUserQueryVariables = Exact<{
  user_id: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'query_root', users_by_pk?: { __typename?: 'users', user_id: string, verified: boolean, username?: string | null | undefined, updated_at: any, name: string, image?: string | null | undefined, bio?: string | null | undefined, created_at: any } | null | undefined };

export type GetUserByUsernameQueryVariables = Exact<{
  _eq: Scalars['String'];
}>;


export type GetUserByUsernameQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', username?: string | null | undefined, created_at: any, image?: string | null | undefined, name: string, bio?: string | null | undefined, user_id: string, verified: boolean }> };

export type PublicGetUserByUsernameQueryVariables = Exact<{
  _eq: Scalars['String'];
}>;


export type PublicGetUserByUsernameQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', username?: string | null | undefined, created_at: any, image?: string | null | undefined, name: string, user_id: string, bio?: string | null | undefined, verified: boolean }> };

export type GetUserByUsernamePostsQueryVariables = Exact<{
  _eq: Scalars['String'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  created_at: Order_By;
}>;


export type GetUserByUsernamePostsQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', username?: string | null | undefined, created_at: any, image?: string | null | undefined, name: string, user_id: string, bio?: string | null | undefined, verified: boolean, posts_aggregate: { __typename?: 'posts_aggregate', aggregate?: { __typename?: 'posts_aggregate_fields', count: number } | null | undefined }, posts: Array<{ __typename?: 'posts', body_markdown?: string | null | undefined, created_at?: any | null | undefined, emoji?: string | null | undefined, id: any, post_type: Post_Type_Enum, published: boolean, slug: string, title: string, updated_at?: any | null | undefined, posts_tags: Array<{ __typename?: 'posts_tags', tag_keyword: string }> }> }> };


export const CreatePostDocument = gql`
    mutation CreatePost($object: posts_insert_input!) {
  insert_posts_one(object: $object) {
    body_markdown
    created_at
    emoji
    id
    posts_tags {
      id
      tag_keyword
    }
    published
    slug
    title
    updated_at
    user_id
    user {
      username
    }
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($id: bigint!) {
  delete_posts_by_pk(id: $id) {
    id
  }
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: bigint!, $_set: posts_set_input!) {
  update_posts_by_pk(pk_columns: {id: $id}, _set: $_set) {
    body_markdown
    created_at
    emoji
    id
    posts_tags {
      id
      tag_keyword
    }
    published
    slug
    title
    updated_at
    user_id
    user {
      username
    }
  }
}
    `;

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument);
};
export const GetPostByIdDocument = gql`
    query GetPostById($id: bigint!) {
  posts_by_pk(id: $id) {
    body_markdown
    created_at
    emoji
    id
    post_type
    posts_tags {
      id
      tag_keyword
    }
    published
    slug
    title
    updated_at
    user_id
  }
}
    `;

export function useGetPostByIdQuery(options: Omit<Urql.UseQueryArgs<GetPostByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostByIdQuery>({ query: GetPostByIdDocument, ...options });
};
export const GetPostBySlugDocument = gql`
    query GetPostBySlug($_eq: String!) {
  posts(where: {slug: {_eq: $_eq}}, limit: 1) {
    body_markdown
    created_at
    updated_at
    emoji
    id
    post_type
    posts_tags {
      tag {
        image
        keyword
        name
      }
    }
    published
    slug
    title
    user {
      image
      name
      username
      bio
      verified
    }
  }
}
    `;

export function useGetPostBySlugQuery(options: Omit<Urql.UseQueryArgs<GetPostBySlugQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostBySlugQuery>({ query: GetPostBySlugDocument, ...options });
};
export const ListUsersPostsDocument = gql`
    query ListUsersPosts($_eq: String!, $limit: Int, $offset: Int) {
  posts(where: {user_id: {_eq: $_eq}}, limit: $limit, offset: $offset) {
    body_markdown
    created_at
    emoji
    id
    published
    slug
    title
    updated_at
    post_type
    posts_tags {
      id
      tag_keyword
    }
  }
  posts_aggregate(where: {user_id: {_eq: $_eq}}) {
    aggregate {
      count
    }
  }
}
    `;

export function useListUsersPostsQuery(options: Omit<Urql.UseQueryArgs<ListUsersPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ListUsersPostsQuery>({ query: ListUsersPostsDocument, ...options });
};
export const PostsStaticPathsDocument = gql`
    query PostsStaticPaths {
  posts(limit: 50, where: {published: {_eq: true}}) {
    slug
    user {
      username
    }
  }
}
    `;

export function usePostsStaticPathsQuery(options: Omit<Urql.UseQueryArgs<PostsStaticPathsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsStaticPathsQuery>({ query: PostsStaticPathsDocument, ...options });
};
export const DeletePostsTagsDocument = gql`
    mutation DeletePostsTags($where: posts_tags_bool_exp = {}) {
  delete_posts_tags(where: $where) {
    affected_rows
  }
}
    `;

export function useDeletePostsTagsMutation() {
  return Urql.useMutation<DeletePostsTagsMutation, DeletePostsTagsMutationVariables>(DeletePostsTagsDocument);
};
export const InsertPostsTagsDocument = gql`
    mutation InsertPostsTags($objects: [posts_tags_insert_input!] = {}, $on_conflict: posts_tags_on_conflict = {constraint: posts_table_pkey}) {
  insert_posts_tags(objects: $objects, on_conflict: $on_conflict) {
    affected_rows
  }
}
    `;

export function useInsertPostsTagsMutation() {
  return Urql.useMutation<InsertPostsTagsMutation, InsertPostsTagsMutationVariables>(InsertPostsTagsDocument);
};
export const InsertTagsDocument = gql`
    mutation InsertTags($objects: [tags_insert_input!]!) {
  insert_tags(objects: $objects) {
    affected_rows
  }
}
    `;

export function useInsertTagsMutation() {
  return Urql.useMutation<InsertTagsMutation, InsertTagsMutationVariables>(InsertTagsDocument);
};
export const ListTagsForSelectDocument = gql`
    query ListTagsForSelect {
  tags(where: {included: {_eq: true}}) {
    keyword
  }
}
    `;

export function useListTagsForSelectQuery(options: Omit<Urql.UseQueryArgs<ListTagsForSelectQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ListTagsForSelectQuery>({ query: ListTagsForSelectDocument, ...options });
};
export const SearchTagsByKeywordDocument = gql`
    query SearchTagsByKeyword($search: String!) {
  search_tags_by_keyword(args: {search: $search}) {
    keyword
  }
}
    `;

export function useSearchTagsByKeywordQuery(options: Omit<Urql.UseQueryArgs<SearchTagsByKeywordQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchTagsByKeywordQuery>({ query: SearchTagsByKeywordDocument, ...options });
};
export const UpdateUserDocument = gql`
    mutation UpdateUser($user_id: String!, $_set: users_set_input) {
  update_users_by_pk(pk_columns: {user_id: $user_id}, _set: $_set) {
    verified
    user_id
    username
    updated_at
    name
    image
    created_at
    bio
  }
}
    `;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const GetUserDocument = gql`
    query GetUser($user_id: String!) {
  users_by_pk(user_id: $user_id) {
    user_id
    verified
    username
    updated_at
    name
    image
    bio
    created_at
  }
}
    `;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserQuery>({ query: GetUserDocument, ...options });
};
export const GetUserByUsernameDocument = gql`
    query GetUserByUsername($_eq: String!) {
  users(where: {username: {_eq: $_eq}}) {
    username
    created_at
    image
    name
    bio
    user_id
    verified
  }
}
    `;

export function useGetUserByUsernameQuery(options: Omit<Urql.UseQueryArgs<GetUserByUsernameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserByUsernameQuery>({ query: GetUserByUsernameDocument, ...options });
};
export const PublicGetUserByUsernameDocument = gql`
    query PublicGetUserByUsername($_eq: String!) {
  users(where: {username: {_eq: $_eq}}) {
    username
    created_at
    image
    name
    user_id
    bio
    verified
  }
}
    `;

export function usePublicGetUserByUsernameQuery(options: Omit<Urql.UseQueryArgs<PublicGetUserByUsernameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PublicGetUserByUsernameQuery>({ query: PublicGetUserByUsernameDocument, ...options });
};
export const GetUserByUsernamePostsDocument = gql`
    query GetUserByUsernamePosts($_eq: String!, $offset: Int!, $limit: Int!, $created_at: order_by!) {
  users(where: {username: {_eq: $_eq}}) {
    username
    created_at
    image
    name
    user_id
    bio
    verified
    posts_aggregate {
      aggregate {
        count
      }
    }
    posts(offset: $offset, limit: $limit, order_by: {created_at: $created_at}) {
      body_markdown
      created_at
      emoji
      id
      post_type
      published
      slug
      title
      updated_at
      posts_tags {
        tag_keyword
      }
    }
  }
}
    `;

export function useGetUserByUsernamePostsQuery(options: Omit<Urql.UseQueryArgs<GetUserByUsernamePostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserByUsernamePostsQuery>({ query: GetUserByUsernamePostsDocument, ...options });
};