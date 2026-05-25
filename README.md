# Инструкция по добавлению статей
1. Напишите статью в формате `.md` (желательно с форматированием и картинками)
2. Клонируйте репозиторий (`git clone https://github.com/SGPG-Team/IvenTutorial.git`)
3. Статью закиньте в `/public/wiki/`
4. В список внутри `/src/WikiPages.tsx` добавьте строку для вставки статьи по типу:
```ts
{ id: 'polaris', title: '🎶 Rust In Peace...Polaris', path: '/wiki/polaris.md' }
```
где id - идентификатор статьи, title - заголовок статьи и path - путь до вашего `.md` файла

5. Создайте коммит (`git commit -m "Добавил статью X"`)
6. Запушьте изменения (`git push`)