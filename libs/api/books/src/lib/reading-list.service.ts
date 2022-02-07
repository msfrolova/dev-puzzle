import { Injectable } from '@nestjs/common';
import { StorageService } from '@tmo/shared/storage';
import { Book } from '@tmo/shared/models';

const KEY = '[okreads API] Reading List';

@Injectable()
export class ReadingListService {
  private readonly storage = new StorageService<Book[]>(KEY, []);

  async getList(): Promise<Book[]> {
    return this.storage.read();
  }

  async addBook(b: Book): Promise<void> {
    this.storage.update(list => {
      const { id, ...rest } = b;
      list.push({
        id,
        ...rest
      });
      return list;
    });
  }

  async removeBook(id: string): Promise<void> {
    this.storage.update(list => {
      return list.filter(x => x.id !== id);
    });
  }

  async markBookAsRead(b: Book): Promise<void> {
    this.removeBook(b.id);
    this.storage.update(list => {
      list.push(b);
      return list;
    });
  }
}
