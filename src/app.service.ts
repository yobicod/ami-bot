import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ILineRequest } from './interfaces/interface';
import 'dotenv/config';

import { geminiService } from './gemini/gemini.service';
@Injectable()
export class AppService {
  async handleReply(reqBody: any) {
    const replyToken: string = reqBody.events[0].replyToken;
    console.log(replyToken);
    const message: string = reqBody.events[0].message.text;
    console.log(message);

    let answer: string = '';
    if (message.toLowerCase().includes('sql')) {
      answer = await geminiService.geminiSql(message);
    } else {
      answer = await geminiService.geminiAnswer(message);
    }

    // await geminiService.geminiSql(message);
    this.reply(answer, replyToken);
  }

  async reply(answer: string, replyToken) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.LINE_CHANNEL_SECRET}`,
    };

    const body: ILineRequest = {
      replyToken: replyToken,
      messages: [
        {
          type: 'text',
          text: answer,
        },
      ],
    };

    const response = await axios.post(
      process.env.LINE_URL,
      JSON.stringify(body),
      { headers },
    );

    if (response.data) {
      return response;
    }
  }
}
