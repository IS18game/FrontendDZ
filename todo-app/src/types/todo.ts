export interface ITodoItem {
  идентификатор: number;
  название: string;
  выполнена: boolean;
  датаСоздания: string;
}

export type ТипФильтраЗадач = 'все' | 'активные' | 'выполненные';
export type СоздатьЗадачуЗапрос = Pick<ITodoItem, 'название'>;
export type ОбновитьЗадачуЗапрос = Pick<ITodoItem, 'идентификатор' | 'название'>;
