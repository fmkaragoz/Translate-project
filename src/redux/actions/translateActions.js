import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { languageOptions } from "../../constants";

// asenkron thunk aksiyonları
export const getLanguages = createAsyncThunk(
  "language/getLanguages",
  async () => {
    // api'dan dil verilerini al
    const res = await axios.request(languageOptions);

    // aksiyonun payload'ını belirle
    return res.data.data.languages;
  }
);

// api'ın çeviri uç noktasına istek at
export const translateText = createAsyncThunk(
  "translate/translateText",
  async (action_params) => {
    // aksiyonu dispatfch ederken gönderilen parameterlere erişme
    const { sourceLang, targetLang, text } = action_params;

    // gönderilecek parametreleri berlirle
    const params = new URLSearchParams();
    params.set("source_language", sourceLang.value);
    params.set("target_language", targetLang.value);
    params.set("text", text);

    // axios isstek ayarlarını belirle
    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "386ce52a71msh4a443d37e22d4d3p1c029fjsneb7976560c98",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: params,
    };

    // isteği at
    const res = await axios.request(options);

    return res.data.data.translatedText;
  }
);
