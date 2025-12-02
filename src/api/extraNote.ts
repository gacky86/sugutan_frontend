import client from "./client";
import type { ExtraNoteParams } from "@/types/index";

// 一覧(cardに属するextra_notesの取得)
export const getExtraNotesList = (card_id: number) => {
  return client.get(`/cards/${card_id}/extra_notes`);
};

// 新規作成
export const createExtraNote = (card_id: number, params: ExtraNoteParams) => {
  return client.post(`/cards/${card_id}/extra_notes`, params);
};

// 更新
export const updateExtraNote = (
  card_id: number,
  id: number,
  params: ExtraNoteParams
) => {
  return client.patch(`/cards/${card_id}/extra_notes/${id}`, params);
};

// 削除
export const deleteExtraNote = (card_id: number, id: number) => {
  return client.delete(`/cards/${card_id}/extra_notes/${id}`);
};
