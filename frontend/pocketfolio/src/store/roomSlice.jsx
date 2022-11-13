import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {http} from '../api/axios';

// 마이룸 목록 조회
export const getRoomList = createAsyncThunk(
  'getRoomList',
  async (data, {rejectWithValue}) => {
    try {
      const res = await http.get(`rooms`);

      if (res.status === 200) return res.data;
    } catch (error) {
      console.log('마이룸 목록 조회에러', error);
      return rejectWithValue(error);
    }
  },
);

// 마이룸 생성
/**
  {
    "room": {
      "name": "string",
      "theme": 0,
      "isMain": "string",
      "privacy": "string",
      "created": "2022-11-09T13:34:30.302Z",
      "updated": "2022-11-09T13:34:30.302Z"
    },
    "thumbnail": "string"
  }
 */
export const createRoom = createAsyncThunk(
  'createRoom',
  async (data, {rejectWithValue}) => {
    try {
      const res = await http.post(`rooms`, data);

      if (res.status === 201) return res.data;
    } catch (error) {
      console.log('마이룸 생성에러', error);
      return rejectWithValue(error);
    }
  },
);

// 마이룸 조회
export const getRoomInfo = createAsyncThunk(
  'getRoomInfo',
  async (room_id, {rejectWithValue}) => {
    try {
      const res = await http.get(`rooms/${room_id}`);

      if (res.status === 200) return res.data;
    } catch (error) {
      console.log('마이룸조회에러', error);
      return rejectWithValue(error);
    }
  },
);

// 마이룸 삭제
export const delRoom = createAsyncThunk(
  'delRoom',
  async (room_id, {rejectWithValue}) => {
    try {
      const res = await http.delete(`rooms/${room_id}`);

      if (res.status === 200) return res.data;
    } catch (error) {
      console.log('마이룸삭제에러', error);
      return rejectWithValue(error);
    }
  },
);

// 마이룸 수정
/**
  {  
    "room": {
      "name": "string",
      "theme": 0,
      "isMain": "string",
      "privacy": "string",
      "created": "2022-11-09T13:36:26.614Z",
      "updated": "2022-11-09T13:36:26.614Z"
    },
    "thumbnail": "string"
  }
 */
export const updateRoom = createAsyncThunk(
  'updateRoom',
  async (data, {rejectWithValue}) => {
    try {
      const res = await http.patch(`rooms/info/${data.room_id}`, data);

      if (res.status === 201) return res.data;
    } catch (error) {
      console.log('마이룸 수정 에러', error);
      return rejectWithValue(error);
    }
  },
);

// 마이룸 좋아요 순 목록 조회
export const getRoomBest = createAsyncThunk(
  'getRoomBest',
  async (data, {rejectWithValue}) => {
    try {
      const res = await http.get(`rooms/best`);

      if (res.status === 201) return res.data;
    } catch (error) {
      console.log('마이룸 좋아요 순 목록 조회 에러', error);
      return rejectWithValue(error);
    }
  },
);

// 마이룸 좋아요 목록 조회
export const getRoomLike = createAsyncThunk(
  'getRoomLike',
  async (data, {rejectWithValue}) => {
    try {
      const res = await http.get(`rooms/like`);

      if (res.status === 200) return res.data;
    } catch (error) {
      console.log('마이룸 좋아요 목록 조회 에러', error);
      return rejectWithValue(error);
    }
  },
);

// 마이룸 좋아요
export const roomLike = createAsyncThunk(
  'roomLike',
  async (room_id, {rejectWithValue}) => {
    try {
      const res = await http.post(`rooms/like/${room_id}`);

      if (res.status === 201) return res.data;
    } catch (error) {
      console.log('마이룸 좋아요 에러', error);
      return rejectWithValue(error);
    }
  },
);

// 마이룸 좋아요 취소
export const roomDislike = createAsyncThunk(
  'roomDislike',
  async (room_id, {rejectWithValue}) => {
    try {
      const res = await http.delete(`rooms/like/${room_id}`);

      if (res.status === 200) return res.data;
    } catch (error) {
      console.log('마이룸 좋아요 취소 에러', error);
      return rejectWithValue(error);
    }
  },
);



const initialState = {};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: {},
});

// export const {} = roomSlice.actions;
export default roomSlice.reducer;
