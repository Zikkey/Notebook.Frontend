# Используем официальный образ Node.js в качестве базового
FROM node:16

# Создаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта в рабочую директорию контейнера
COPY . .

# Собираем проект для production
RUN npm run build

# Устанавливаем сервер для статических файлов (например, serve)
RUN npm install -g serve

# Указываем команду по умолчанию для запуска приложения на порту 80
CMD ["serve", "-s", "build", "-l", "80"]

# Открываем порт 80 для доступа к приложению
EXPOSE 80