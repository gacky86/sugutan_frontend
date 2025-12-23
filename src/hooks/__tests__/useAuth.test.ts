import { getCurrentUser } from "@/api/auth";
import { renderHook, waitFor } from "@testing-library/react";
import { useAuth } from "@/hooks/useAuth";
import { describe, it, beforeEach, expect, vi } from "vitest";
import type { Mock } from "vitest";

vi.mock("@/api/auth", () => ({
  getCurrentUser: vi.fn(),
}));

describe("useAuth", () => {
  // vitestのMockの状態をテストごとにリセットする
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("set user=currentUser, loading=false, isSignedIn=true when logged in successfully(success: true)", async () => {
    // mock関数の戻り値にログイン成功時の値を定義
    (getCurrentUser as Mock).mockResolvedValue({
      data: {
        success: true,
        data: { id: 1, name: "Taro" },
      },
    });

    // React hooksはReactComponentもしくはhooksの中でしか呼べない
    // そのためテスト用にhooksを実行するためにrenderHookを使う
    const { result } = renderHook(() => useAuth());

    // 初期状態
    expect(result.current.loading).toBe(true);
    expect(result.current.isSignedIn).toBe(false);

    // 非同期処理完了を待つ
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.isSignedIn).toBe(true);
    expect(result.current.currentUser).toEqual({
      id: 1,
      name: "Taro",
    });
  });

  it("set loading=false, isSignedIn=false when it is unsuccessfull(success: false)", async () => {
    (getCurrentUser as Mock).mockResolvedValue({
      data: {
        success: false,
      },
    });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.isSignedIn).toBe(false);
    expect(result.current.currentUser).toBeUndefined();
  });

  it("set loading=false, isSignedIn=false when it gets API error", async () => {
    (getCurrentUser as Mock).mockRejectedValue(new Error("Unauthorized"));

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.isSignedIn).toBe(false);
    expect(result.current.currentUser).toBeUndefined();
  });
});
