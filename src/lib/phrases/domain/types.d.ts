export interface Phrase {
  id: bigint;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: uuid;
  user: User;
  likes: Like[];
}

export interface Like {
  phrase_id: number;
  user_id: uuid;
  created_at: string;
  user: User;
}

export interface User {
  id: uuid;
  name: string;
  nickname: string;
}
