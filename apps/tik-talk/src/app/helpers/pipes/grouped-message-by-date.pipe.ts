import { Pipe, PipeTransform } from '@angular/core';
import { IMessage } from '../../data/interfaces/chats.interface';

@Pipe({
  name: 'groupedMessageByDate',
})
export class GroupedMessageByDatePipe implements PipeTransform {
  transform(messages: IMessage[]): { date: string; messages: IMessage[] }[] {
    if (!messages || !messages.length) {
      return [];
    }

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const messagesByDate = messages.reduce(
      (acc, message) => {
        const messageDate = new Date(message.createdAt);
        let dateKey: string;

        if (messageDate.toDateString() === today.toDateString()) {
          dateKey = 'Сегодня';
        } else if (messageDate.toDateString() === yesterday.toDateString()) {
          dateKey = 'Вчера';
        } else {
          dateKey = messageDate.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });
        }

        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(message);
        return acc;
      },
      {} as { [key: string]: IMessage[] },
    );

    return Object.keys(messagesByDate)
      .map((date) => ({
        date,
        messages: messagesByDate[date],
      }))
      .sort((a, b) => {
        const dateA =
          a.date === 'Сегодня'
            ? today
            : a.date === 'Вчера'
              ? yesterday
              : new Date(a.messages[0].createdAt);
        const dateB =
          b.date === 'Сегодня'
            ? today
            : b.date === 'Вчера'
              ? yesterday
              : new Date(b.messages[0].createdAt);
        return dateA.getTime() - dateB.getTime();
      });
  }
}
