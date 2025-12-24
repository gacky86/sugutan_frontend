import { getCurrentUser, signIn, signUp } from "@/api/auth";
import type {
  SignInParams,
  SignUpParams,
  User,
  RailsErrorResponse,
} from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// 認証情報取得 AsynkThunk
export const fetchCurrentUser = createAsyncThunk<
  User, // 成功時の返り値
  void, // 引数
  { rejectValue: string }
>("auth/fetchCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const res = await getCurrentUser();

    if (res?.data.success === true) {
      return res.data.data;
    } else {
      return rejectWithValue("Not signed in");
    }
  } catch {
    return rejectWithValue("Failed to fetch current user");
  }
});

// サインイン処理 AsynkThunk
export const signInThunk = createAsyncThunk<
  User,
  SignInParams,
  { rejectValue: string }
>("auth/signIn", async (params, { rejectWithValue }) => {
  try {
    const res = await signIn(params);
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError<RailsErrorResponse>;
    return rejectWithValue(
      error.response?.data?.error || "ログインに失敗しました"
    );
  }
});

// サインアップ処理 AsynkThunk
export const signUpThunk = createAsyncThunk<
  User,
  SignUpParams,
  { rejectValue: string }
>("auth/signUp", async (params, { rejectWithValue }) => {
  try {
    const res = await signUp(params);
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError<RailsErrorResponse>;
    return rejectWithValue(
      error.response?.data?.error || "ユーザー登録に失敗しました"
    );
  }
});

interface AuthState {
  loading: boolean;
  isSignedIn: boolean;
  currentUser?: User;
}
const initialState: AuthState = {
  loading: true,
  isSignedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isSignedIn = true;
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.isSignedIn = false;
        state.currentUser = undefined;
      })
      .addCase(signInThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isSignedIn = true;
        state.currentUser = action.payload;
      })
      .addCase(signInThunk.rejected, (state) => {
        state.loading = false;
        state.isSignedIn = false;
      });
  },
});

export default authSlice.reducer;
