import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "authors" */
export type Authors = {
  __typename?: 'authors';
  created_at: Scalars['timestamptz'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "authors" */
export type Authors_Aggregate = {
  __typename?: 'authors_aggregate';
  aggregate?: Maybe<Authors_Aggregate_Fields>;
  nodes: Array<Authors>;
};

/** aggregate fields of "authors" */
export type Authors_Aggregate_Fields = {
  __typename?: 'authors_aggregate_fields';
  avg?: Maybe<Authors_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Authors_Max_Fields>;
  min?: Maybe<Authors_Min_Fields>;
  stddev?: Maybe<Authors_Stddev_Fields>;
  stddev_pop?: Maybe<Authors_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Authors_Stddev_Samp_Fields>;
  sum?: Maybe<Authors_Sum_Fields>;
  var_pop?: Maybe<Authors_Var_Pop_Fields>;
  var_samp?: Maybe<Authors_Var_Samp_Fields>;
  variance?: Maybe<Authors_Variance_Fields>;
};


/** aggregate fields of "authors" */
export type Authors_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Authors_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Authors_Avg_Fields = {
  __typename?: 'authors_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "authors". All fields are combined with a logical 'AND'. */
export type Authors_Bool_Exp = {
  _and?: InputMaybe<Array<Authors_Bool_Exp>>;
  _not?: InputMaybe<Authors_Bool_Exp>;
  _or?: InputMaybe<Array<Authors_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "authors" */
export enum Authors_Constraint {
  /** unique or primary key constraint */
  AuthorsPkey = 'authors_pkey'
}

/** input type for incrementing numeric columns in table "authors" */
export type Authors_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "authors" */
export type Authors_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Authors_Max_Fields = {
  __typename?: 'authors_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Authors_Min_Fields = {
  __typename?: 'authors_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "authors" */
export type Authors_Mutation_Response = {
  __typename?: 'authors_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Authors>;
};

/** input type for inserting object relation for remote table "authors" */
export type Authors_Obj_Rel_Insert_Input = {
  data: Authors_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Authors_On_Conflict>;
};

/** on conflict condition type for table "authors" */
export type Authors_On_Conflict = {
  constraint: Authors_Constraint;
  update_columns?: Array<Authors_Update_Column>;
  where?: InputMaybe<Authors_Bool_Exp>;
};

/** Ordering options when selecting data from "authors". */
export type Authors_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: authors */
export type Authors_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "authors" */
export enum Authors_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "authors" */
export type Authors_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Authors_Stddev_Fields = {
  __typename?: 'authors_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Authors_Stddev_Pop_Fields = {
  __typename?: 'authors_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Authors_Stddev_Samp_Fields = {
  __typename?: 'authors_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Authors_Sum_Fields = {
  __typename?: 'authors_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "authors" */
export enum Authors_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Authors_Var_Pop_Fields = {
  __typename?: 'authors_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Authors_Var_Samp_Fields = {
  __typename?: 'authors_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Authors_Variance_Fields = {
  __typename?: 'authors_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "authors" */
  delete_authors?: Maybe<Authors_Mutation_Response>;
  /** delete single row from the table: "authors" */
  delete_authors_by_pk?: Maybe<Authors>;
  /** delete data from the table: "posts" */
  delete_posts?: Maybe<Posts_Mutation_Response>;
  /** delete single row from the table: "posts" */
  delete_posts_by_pk?: Maybe<Posts>;
  /** insert data into the table: "authors" */
  insert_authors?: Maybe<Authors_Mutation_Response>;
  /** insert a single row into the table: "authors" */
  insert_authors_one?: Maybe<Authors>;
  /** insert data into the table: "posts" */
  insert_posts?: Maybe<Posts_Mutation_Response>;
  /** insert a single row into the table: "posts" */
  insert_posts_one?: Maybe<Posts>;
  /** update data of the table: "authors" */
  update_authors?: Maybe<Authors_Mutation_Response>;
  /** update single row of the table: "authors" */
  update_authors_by_pk?: Maybe<Authors>;
  /** update data of the table: "posts" */
  update_posts?: Maybe<Posts_Mutation_Response>;
  /** update single row of the table: "posts" */
  update_posts_by_pk?: Maybe<Posts>;
};


/** mutation root */
export type Mutation_RootDelete_AuthorsArgs = {
  where: Authors_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Authors_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_PostsArgs = {
  where: Posts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Posts_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsert_AuthorsArgs = {
  objects: Array<Authors_Insert_Input>;
  on_conflict?: InputMaybe<Authors_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Authors_OneArgs = {
  object: Authors_Insert_Input;
  on_conflict?: InputMaybe<Authors_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PostsArgs = {
  objects: Array<Posts_Insert_Input>;
  on_conflict?: InputMaybe<Posts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Posts_OneArgs = {
  object: Posts_Insert_Input;
  on_conflict?: InputMaybe<Posts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_AuthorsArgs = {
  _inc?: InputMaybe<Authors_Inc_Input>;
  _set?: InputMaybe<Authors_Set_Input>;
  where: Authors_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Authors_By_PkArgs = {
  _inc?: InputMaybe<Authors_Inc_Input>;
  _set?: InputMaybe<Authors_Set_Input>;
  pk_columns: Authors_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_PostsArgs = {
  _inc?: InputMaybe<Posts_Inc_Input>;
  _set?: InputMaybe<Posts_Set_Input>;
  where: Posts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Posts_By_PkArgs = {
  _inc?: InputMaybe<Posts_Inc_Input>;
  _set?: InputMaybe<Posts_Set_Input>;
  pk_columns: Posts_Pk_Columns_Input;
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

/** columns and relationships of "posts" */
export type Posts = {
  __typename?: 'posts';
  /** An object relationship */
  author: Authors;
  content: Scalars['String'];
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  published: Scalars['Boolean'];
  title: Scalars['String'];
  updated_at: Scalars['timestamptz'];
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
  columns?: InputMaybe<Array<Posts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Posts_Avg_Fields = {
  __typename?: 'posts_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "posts". All fields are combined with a logical 'AND'. */
export type Posts_Bool_Exp = {
  _and?: InputMaybe<Array<Posts_Bool_Exp>>;
  _not?: InputMaybe<Posts_Bool_Exp>;
  _or?: InputMaybe<Array<Posts_Bool_Exp>>;
  author?: InputMaybe<Authors_Bool_Exp>;
  content?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  published?: InputMaybe<Boolean_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "posts" */
export enum Posts_Constraint {
  /** unique or primary key constraint */
  PostsPkey = 'posts_pkey'
}

/** input type for incrementing numeric columns in table "posts" */
export type Posts_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "posts" */
export type Posts_Insert_Input = {
  author?: InputMaybe<Authors_Obj_Rel_Insert_Input>;
  content?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  published?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Posts_Max_Fields = {
  __typename?: 'posts_max_fields';
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Posts_Min_Fields = {
  __typename?: 'posts_min_fields';
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "posts" */
export type Posts_Mutation_Response = {
  __typename?: 'posts_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Posts>;
};

/** on conflict condition type for table "posts" */
export type Posts_On_Conflict = {
  constraint: Posts_Constraint;
  update_columns?: Array<Posts_Update_Column>;
  where?: InputMaybe<Posts_Bool_Exp>;
};

/** Ordering options when selecting data from "posts". */
export type Posts_Order_By = {
  author?: InputMaybe<Authors_Order_By>;
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  published?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: posts */
export type Posts_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "posts" */
export enum Posts_Select_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Published = 'published',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "posts" */
export type Posts_Set_Input = {
  content?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  published?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Posts_Stddev_Fields = {
  __typename?: 'posts_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Posts_Stddev_Pop_Fields = {
  __typename?: 'posts_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Posts_Stddev_Samp_Fields = {
  __typename?: 'posts_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Posts_Sum_Fields = {
  __typename?: 'posts_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "posts" */
export enum Posts_Update_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Published = 'published',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Posts_Var_Pop_Fields = {
  __typename?: 'posts_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Posts_Var_Samp_Fields = {
  __typename?: 'posts_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Posts_Variance_Fields = {
  __typename?: 'posts_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "authors" */
  authors: Array<Authors>;
  /** fetch aggregated fields from the table: "authors" */
  authors_aggregate: Authors_Aggregate;
  /** fetch data from the table: "authors" using primary key columns */
  authors_by_pk?: Maybe<Authors>;
  /** fetch data from the table: "posts" */
  posts: Array<Posts>;
  /** fetch aggregated fields from the table: "posts" */
  posts_aggregate: Posts_Aggregate;
  /** fetch data from the table: "posts" using primary key columns */
  posts_by_pk?: Maybe<Posts>;
};


export type Query_RootAuthorsArgs = {
  distinct_on?: InputMaybe<Array<Authors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Authors_Order_By>>;
  where?: InputMaybe<Authors_Bool_Exp>;
};


export type Query_RootAuthors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Authors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Authors_Order_By>>;
  where?: InputMaybe<Authors_Bool_Exp>;
};


export type Query_RootAuthors_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootPostsArgs = {
  distinct_on?: InputMaybe<Array<Posts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Posts_Order_By>>;
  where?: InputMaybe<Posts_Bool_Exp>;
};


export type Query_RootPosts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Posts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Posts_Order_By>>;
  where?: InputMaybe<Posts_Bool_Exp>;
};


export type Query_RootPosts_By_PkArgs = {
  id: Scalars['Int'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "authors" */
  authors: Array<Authors>;
  /** fetch aggregated fields from the table: "authors" */
  authors_aggregate: Authors_Aggregate;
  /** fetch data from the table: "authors" using primary key columns */
  authors_by_pk?: Maybe<Authors>;
  /** fetch data from the table: "posts" */
  posts: Array<Posts>;
  /** fetch aggregated fields from the table: "posts" */
  posts_aggregate: Posts_Aggregate;
  /** fetch data from the table: "posts" using primary key columns */
  posts_by_pk?: Maybe<Posts>;
};


export type Subscription_RootAuthorsArgs = {
  distinct_on?: InputMaybe<Array<Authors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Authors_Order_By>>;
  where?: InputMaybe<Authors_Bool_Exp>;
};


export type Subscription_RootAuthors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Authors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Authors_Order_By>>;
  where?: InputMaybe<Authors_Bool_Exp>;
};


export type Subscription_RootAuthors_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootPostsArgs = {
  distinct_on?: InputMaybe<Array<Posts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Posts_Order_By>>;
  where?: InputMaybe<Posts_Bool_Exp>;
};


export type Subscription_RootPosts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Posts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Posts_Order_By>>;
  where?: InputMaybe<Posts_Bool_Exp>;
};


export type Subscription_RootPosts_By_PkArgs = {
  id: Scalars['Int'];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

export type PostFieldsFragment = { __typename?: 'posts', id: number, title: string, content: string, created_at: any, published: boolean, author: { __typename?: 'authors', id: number, name: string, email?: string | null } };

export type InsertPostMutationVariables = Exact<{
  data: Posts_Insert_Input;
}>;


export type InsertPostMutation = { __typename?: 'mutation_root', insertPost?: { __typename?: 'posts', id: number } | null };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  set: Posts_Set_Input;
}>;


export type UpdatePostMutation = { __typename?: 'mutation_root', updatePost?: { __typename?: 'posts', id: number } | null };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = { __typename?: 'mutation_root', deletePost?: { __typename?: 'posts', id: number } | null };

export type GetPostsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GetPostsSubscription = { __typename?: 'subscription_root', posts: Array<{ __typename?: 'posts', id: number, title: string, content: string, created_at: any, published: boolean, author: { __typename?: 'authors', id: number, name: string, email?: string | null } }> };

export type GetPostByPkSubscriptionVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetPostByPkSubscription = { __typename?: 'subscription_root', post?: { __typename?: 'posts', id: number, title: string, content: string, created_at: any, published: boolean, author: { __typename?: 'authors', id: number, name: string, email?: string | null } } | null };

export type PostsCountSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PostsCountSubscription = { __typename?: 'subscription_root', postsAggregate: { __typename?: 'posts_aggregate', aggregate?: { __typename?: 'posts_aggregate_fields', count: number } | null } };

export const PostFieldsFragmentDoc = gql`
    fragment PostFields on posts {
  id
  title
  content
  created_at
  published
  author {
    id
    name
    email
  }
}
    `;
export const InsertPostDocument = gql`
    mutation insertPost($data: posts_insert_input!) {
  insertPost: insert_posts_one(object: $data) {
    id
  }
}
    `;
export type InsertPostMutationFn = Apollo.MutationFunction<InsertPostMutation, InsertPostMutationVariables>;

/**
 * __useInsertPostMutation__
 *
 * To run a mutation, you first call `useInsertPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertPostMutation, { data, loading, error }] = useInsertPostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertPostMutation(baseOptions?: Apollo.MutationHookOptions<InsertPostMutation, InsertPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertPostMutation, InsertPostMutationVariables>(InsertPostDocument, options);
      }
export type InsertPostMutationHookResult = ReturnType<typeof useInsertPostMutation>;
export type InsertPostMutationResult = Apollo.MutationResult<InsertPostMutation>;
export type InsertPostMutationOptions = Apollo.BaseMutationOptions<InsertPostMutation, InsertPostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation updatePost($id: Int!, $set: posts_set_input!) {
  updatePost: update_posts_by_pk(pk_columns: {id: $id}, _set: $set) {
    id
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      set: // value for 'set'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation deletePost($id: Int!) {
  deletePost: delete_posts_by_pk(id: $id) {
    id
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const GetPostsDocument = gql`
    subscription getPosts {
  posts {
    ...PostFields
  }
}
    ${PostFieldsFragmentDoc}`;

/**
 * __useGetPostsSubscription__
 *
 * To run a query within a React component, call `useGetPostsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetPostsSubscription, GetPostsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetPostsSubscription, GetPostsSubscriptionVariables>(GetPostsDocument, options);
      }
export type GetPostsSubscriptionHookResult = ReturnType<typeof useGetPostsSubscription>;
export type GetPostsSubscriptionResult = Apollo.SubscriptionResult<GetPostsSubscription>;
export const GetPostByPkDocument = gql`
    subscription getPostByPk($id: Int!) {
  post: posts_by_pk(id: $id) {
    ...PostFields
  }
}
    ${PostFieldsFragmentDoc}`;

/**
 * __useGetPostByPkSubscription__
 *
 * To run a query within a React component, call `useGetPostByPkSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByPkSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByPkSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostByPkSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetPostByPkSubscription, GetPostByPkSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetPostByPkSubscription, GetPostByPkSubscriptionVariables>(GetPostByPkDocument, options);
      }
export type GetPostByPkSubscriptionHookResult = ReturnType<typeof useGetPostByPkSubscription>;
export type GetPostByPkSubscriptionResult = Apollo.SubscriptionResult<GetPostByPkSubscription>;
export const PostsCountDocument = gql`
    subscription postsCount {
  postsAggregate: posts_aggregate {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __usePostsCountSubscription__
 *
 * To run a query within a React component, call `usePostsCountSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePostsCountSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsCountSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePostsCountSubscription(baseOptions?: Apollo.SubscriptionHookOptions<PostsCountSubscription, PostsCountSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PostsCountSubscription, PostsCountSubscriptionVariables>(PostsCountDocument, options);
      }
export type PostsCountSubscriptionHookResult = ReturnType<typeof usePostsCountSubscription>;
export type PostsCountSubscriptionResult = Apollo.SubscriptionResult<PostsCountSubscription>;