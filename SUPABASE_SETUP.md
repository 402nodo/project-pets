# Настройка Supabase для Project Pets

## Шаг 1: Создай проект на Supabase

1. Зайди на [supabase.com](https://supabase.com)
2. Зарегистрируйся/войди
3. Нажми "New Project"
4. Заполни:
   - **Name**: `project-pets` (или любое имя)
   - **Database Password**: придумай надежный пароль (сохрани его!)
   - **Region**: выбери ближайший
5. Нажми "Create new project"
6. Подожди 2-3 минуты, пока проект создается

## Шаг 2: Создай таблицы

1. В проекте Supabase перейди в **SQL Editor** (левое меню)
2. Нажми "New query"
3. Скопируй весь код из файла `supabase-setup.sql`
4. Вставь в редактор
5. Нажми "Run" (или F5)
6. Должно появиться сообщение "Success. No rows returned"

## Шаг 3: Получи API ключи

1. В проекте Supabase перейди в **Settings** → **API**
2. Найди:
   - **Project URL** (например: `https://xxxxx.supabase.co`) — **ОБЯЗАТЕЛЬНО нужен!**
   - **anon/public key** или **publishable key** (может быть в формате `sb_publishable_...` или `eyJ...`)

## Шаг 4: Добавь переменные окружения

### Для локальной разработки:

Добавь в файл `.env`:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Для деплоя на Vercel:

1. Зайди в свой проект на Vercel
2. Перейди в **Settings** → **Environment Variables**
3. Добавь:
   - `VITE_SUPABASE_URL` = твой Project URL
   - `VITE_SUPABASE_ANON_KEY` = твой anon key
4. Нажми "Save"
5. Перезапусти деплой (Settings → Deployments → Redeploy)

## Шаг 5: Проверь работу

1. Запусти проект локально: `npm run dev`
2. Создай питомца
3. Проверь, что он появился в галерее
4. Открой чат с питомцем и отправь сообщение
5. Обнови страницу — чат должен сохраниться

## Что работает:

✅ **Общая галерея** — все питомцы видны всем пользователям  
✅ **Персональные чаты** — каждый пользователь видит только свои чаты  
✅ **Автоматический fallback** — если Supabase не настроен, работает через localStorage

## Важно:

- **Бесплатный тариф**: 500MB база данных, 2GB трафика
- **Безопасность**: API ключи можно хранить в `.env` (они публичные, но защищены RLS)
- **Масштабирование**: при росте проекта можно перейти на платный тариф

## Troubleshooting:

**Ошибка "relation does not exist"**:
- Проверь, что SQL скрипт выполнился успешно
- Проверь, что таблицы созданы в SQL Editor → Table Editor

**Чаты не сохраняются**:
- Проверь, что RLS policies созданы
- Проверь консоль браузера на ошибки

**Галерея пустая**:
- Проверь, что `VITE_SUPABASE_URL` и `VITE_SUPABASE_ANON_KEY` правильно указаны
- Проверь Network tab в DevTools — должны быть запросы к Supabase

