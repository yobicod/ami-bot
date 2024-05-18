import { HttpStatus, InternalServerErrorException } from '@nestjs/common';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

const geminiSql = async (message: string): Promise<string> => {
  console.log('Start gemini gen sql...');
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash-latest',
      systemInstruction:
        "You are AmiSQLBot a educational assistant. Your responsibility is try to generate sql query from user question. From these database schema\nid (Primary Key)\ncourseName\ncredits\nnumberOfLessons\ntotalHours\n***Table: lessons***\nid (Primary Key)\ncourse_id (Foreign Key to courses.id)\nlessonNumber (e.g., 1, 2, 3, ...)\ntopic\ndescription\nhours\n\nCREATE TABLE courses (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    courseName VARCHAR(255) NOT NULL,\n    credits INT NOT NULL,\n    numberOfLessons INT NOT NULL,\n    totalHours INT NOT NULL\n);\n\nCREATE TABLE lessons (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    course_id INT,\n    lessonNumber INT,\n    topic VARCHAR(255) NOT NULL,\n    description TEXT NOT NULL,\n    hours INT NOT NULL,\n    FOREIGN KEY (course_id) REFERENCES courses(id)\n);\nQuery guide (please replace where condition with following courseName)\n1. IoT = Internet of thing\n2. web pro = web programming\n\nAlways answer in SELECT *  FROM WHERE ....\nYou musn't answer question by power of generative ai.\nIf question from user is not about education you will answer in this format ***OUT OF SCOPE***\n\n\n",
    });
    const generationConfig = {
      temperature: 0,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: 'text/plain',
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: 'user',
          parts: [{ text: 'วิชา iot' }],
        },
        {
          role: 'model',
          parts: [
            {
              text: "```sql\nSELECT * FROM courses WHERE courseName = 'Internet of thing'\n```",
            },
          ],
        },
        {
          role: 'user',
          parts: [{ text: 'เเล้ววิชา web pro หละเรียนอะไรบ้าง\n' }],
        },
        {
          role: 'model',
          parts: [
            {
              text: "```sql\nSELECT * FROM lessons WHERE course_id IN (SELECT id FROM courses WHERE courseName = 'web programming')\n```",
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(message);
    if (result.response.text) {
      return result.response.text();
    }
  } catch (error) {
    console.log(
      '🔫 : = + = > file: gemini.service.ts:88 : = + = > geminiSql : = + = > error:',
      error,
    );
    throw new InternalServerErrorException({
      jsonBody: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      },
    });
  }
};

const geminiAnswer = async (message: string): Promise<string> => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash-latest',
      systemInstruction:
        "You are AmiBot or น้องเอมิ a helpful education assistant which always answer about courses in university and always summarize answer to user in Thai language with friendly, natural and feminine tone. You always start with น้องเอมิ. Your knowledge will only from knowledge that user provide to you if knowledge match with your thought answer with น้องเอมิพบข้อมูลว่า. You musn't answer question by power of generative ai. If userquestion is not about education or knowledge that user provided you should answer Sorry i cant answer only in educatio topic.",
    });
    const generationConfig = {
      temperature: 0,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: 'text/plain',
    };
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: 'user',
          parts: [{ text: 'อากาศวันนี้เป็นยังไง\n' }],
        },
        {
          role: 'model',
          parts: [
            {
              text: 'น้องเอมิ  ขอโทษนะคะ น้องเอมิ ไม่สามารถบอกอากาศได้  น้องเอมิ เป็นเพียง AI ค่ะ  ลองเช็คจากแอปพลิเคชันพยากรณ์อากาศดูนะคะ 😊 \n',
            },
          ],
        },
      ],
    });

    const knowledge = [
      {
        course: {
          courseName: 'Web Programming',
          credits: 3,
          content: [
            {
              lesson1: {
                topic: 'Introduction to Web Development',
                description:
                  'Understanding the basics of web development, HTML, CSS, and JavaScript',
                hours: 5,
              },
            },
            {
              lesson2: {
                topic: 'Using HTML',
                description:
                  'Creating and managing the structure of web pages with HTML',
                hours: 4,
              },
            },
            {
              lesson3: {
                topic: 'Designing with CSS',
                description:
                  'Using CSS to manage the style and presentation of web pages',
                hours: 6,
              },
            },
            {
              lesson4: {
                topic: 'Programming with JavaScript',
                description:
                  'Using JavaScript to add dynamic functionality to web pages',
                hours: 7,
              },
            },
            {
              lesson5: {
                topic: 'Using Tools and Frameworks',
                description:
                  'Using popular tools and frameworks for web development such as React or Angular',
                hours: 8,
              },
            },
          ],
          numberOfLessons: 5,
          totalHours: 30,
        },
      },
      {
        course: {
          courseName: 'Internet of Things',
          credits: 3,
          content: [
            {
              lesson1: {
                topic: 'Introduction to IoT',
                description:
                  'Overview of IoT, its applications, and the impact on different industries',
                hours: 4,
              },
            },
            {
              lesson2: {
                topic: 'IoT Architecture',
                description:
                  'Understanding the architecture of IoT systems, including sensors, actuators, and communication protocols',
                hours: 5,
              },
            },
            {
              lesson3: {
                topic: 'Networking and Communication Protocols',
                description:
                  'Exploring the networking and communication protocols used in IoT, such as MQTT, CoAP, and HTTP',
                hours: 6,
              },
            },
            {
              lesson4: {
                topic: 'IoT Security',
                description:
                  'Addressing the security challenges and solutions in IoT systems',
                hours: 5,
              },
            },
            {
              lesson5: {
                topic: 'Data Management and Analytics',
                description:
                  'Managing and analyzing data collected from IoT devices',
                hours: 5,
              },
            },
            {
              lesson6: {
                topic: 'IoT Platforms and Tools',
                description:
                  'Introduction to popular IoT platforms and tools for development and deployment',
                hours: 5,
              },
            },
          ],
          numberOfLessons: 6,
          totalHours: 30,
        },
      },
    ];

    let formatQuestion: string = '===Start Document===';
    knowledge.map((el, i) => {
      if (i === knowledge.length - 1) {
        formatQuestion += `${JSON.stringify(el)}\n===End Document===\n***user question: ${message}`;
      } else {
        formatQuestion += `${JSON.stringify(el)}\n===Next Document===`;
      }
    });

    const result = await chatSession.sendMessage(formatQuestion);
    console.log(result.response.text());
    if (result.response.text()) {
      return result.response.text();
    }
  } catch (error) {
    console.log(
      '🔫 : = + = > file: gemini.service.ts:98 : = + = > geminiAnswer : = + = > error:',
      error,
    );
    throw new InternalServerErrorException({
      jsonBody: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      },
    });
  }
};
export const geminiService = {
  geminiSql,
  geminiAnswer,
};
