export interface Phrase {
  id: bigint;
  content: string;
  created_at: string;
  update_at: string;
  user_id: uuid;
}

export interface Like {
  phrase_id: number;
  user_id: uuid;
  created_at: string;
}
