# pereplan server side
Server side solution for Pereplan company

# architecture

## pereplan api js
https://cdn.jsdelivr.net/gh/DamirMakhmudov/pereplan/engine.js
- Склонение : перевод в дательный падеж
- ИНН : все данные по ИНН
- Код подразделения : адрес выдачи паспорта по коду подразделения
- Фамилия И. О. : короткое ФИО
- БИК : данные банка по БИК

## pereplan api gs
https://script.google.com/macros/s/AKfycbw0kKa-yHVMcrWyihYHaqNQh1FvvdG5hHqmZyjvJEddZxwtJwoTc4EzHBNsiW_5neu4/exec
- Проверка и создание папки на сервере

## pereplan library gs
- getData: получает данные записанные в JSON по ключу и листу
- grabRange: возвращает диапазон из таблицы по листу и заголовку
- checkFolder: проверяет папку на диске и в Таблице, создат если нет. Возвращает url папки
- createFolder: создает папку на диске и подпапки