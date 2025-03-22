// import { Injectable } from '@nestjs/common';
// import { TransactionService } from './transaction.service';
// import * as TelegramBot from 'node-telegram-bot-api';
// import { CategoriesService } from '../categories/categories.service';

// @Injectable()
// export class TelegramBotService {
//   private bot: TelegramBot;
//   private userStates: Map<number, {
//     step: string;
//     spaceId?: string;
//     amount?: number;
//     description?: string;
//     categoryId?: string;
//     type?: 'expense' | 'income';
//   }> = new Map();

//   constructor(
//     private transactionService: TransactionService,
//     private spaceService: SpaceService,
//     private categoriesService: CategoriesService,
//   ) {
//     const token = '7871274777:AAGUBKJyCiR-ue3XbdURfExQUjk2U18_W5Q';
//     this.bot = new TelegramBot(token, { polling: true });
//     this.setupCommands();
//   }

//   private setupCommands() {
//     this.bot.onText(/\/start/, async (msg) => {
//       const chatId = msg.chat.id;
//       this.userStates.set(chatId, { step: 'initial' });

//       const opts = {
//         reply_markup: {
//           inline_keyboard: [[
//             { text: '💰 Cargar un gasto', callback_data: 'new_expense' }
//           ]]
//         }
//       };

//       this.bot.sendMessage(chatId, '¡Bienvenido! ¿Qué deseas hacer?', opts);
//     });

//     this.bot.on('callback_query', async (callbackQuery) => {
//       const chatId = callbackQuery.message.chat.id;
//       const data = callbackQuery.data;
//       const state = this.userStates.get(chatId);

//       if (data === 'new_expense') {
//         const spaces = await this.spaceService.findUserSpaces('user_id'); // You'll need to handle user identification
//         const keyboard = spaces.map(space => ([{
//           text: space.name,
//           callback_data: `space_${space._id}`
//         }]));

//         this.bot.sendMessage(chatId, 'Selecciona el espacio:', {
//           reply_markup: { inline_keyboard: keyboard }
//         });
//       }
//       else if (data.startsWith('space_')) {
//         const spaceId = data.replace('space_', '');
//         this.userStates.set(chatId, { ...state, step: 'amount', spaceId });
//         this.bot.sendMessage(chatId, 'Ingresa el monto del gasto:');
//       }
//     });

//     this.bot.on('message', async (msg) => {
//       const chatId = msg.chat.id;
//       const state = this.userStates.get(chatId);

//       if (!state) return;

//       switch (state.step) {
//         case 'amount':
//           const amount = parseFloat(msg.text);
//           if (isNaN(amount)) {
//             this.bot.sendMessage(chatId, '❌ Por favor ingresa un monto válido');
//             return;
//           }

//           this.userStates.set(chatId, { ...state, step: 'description', amount });
//           this.bot.sendMessage(chatId, 'Ingresa una descripción:');
//           break;

//         case 'description':
//           const categories = await this.categoryService.findAll();
//           const keyboard = categories.map(cat => ([{
//             text: cat.name,
//             callback_data: `category_${cat._id}`
//           }]));

//           this.userStates.set(chatId, { ...state, step: 'category', description: msg.text });
//           this.bot.sendMessage(chatId, 'Selecciona una categoría:', {
//             reply_markup: { inline_keyboard: keyboard }
//           });
//           break;
//       }
//     });
//   }
// }
