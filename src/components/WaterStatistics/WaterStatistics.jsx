import s from './WaterStatistics.module.css';
import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useSelector } from 'react-redux';
import { selectIsRefreshing } from '../../redux/auth/selectors.js';
import { authAPI } from '../../redux/auth/operations.js';
import { selectWaterRecords } from '../../redux/water/selectors.js';
import { useTranslation } from 'react-i18next';

const WaterStatistics = () => {
  const { i18n } = useTranslation();
  const [data, setData] = useState([]); // Створюємо стан data для збереження даних про споживання води

  const token = useSelector(state => state.auth.token); // Отримуємо токен авторизації з Redux
  const isRefreshing = useSelector(selectIsRefreshing); // Отримуємо статус оновлення авторизації
  const records = useSelector(selectWaterRecords); // Отримуємо записи про споживання води

  useEffect(() => {
    if (!token || isRefreshing) return; // Якщо немає токена або авторизація оновлюється, виходимо з функції

    const fetchWeeklyWaterData = async () => {
      const today = new Date(); // Отримуємо поточну дату
      const sevenDaysAgo = new Date(); // Створюємо новий об'єкт дати
      sevenDaysAgo.setDate(today.getDate() - 6); // Визначаємо дату 7 днів тому

      try {
        const response = await authAPI.get('/water/month', {
          params: { year: today.getFullYear(), month: today.getMonth() + 1 }, // Передаємо параметри для запиту
          headers: { Authorization: `Bearer ${token}` }, // Передаємо токен у заголовку
        });

        const daysMap = new Map(); // Створюємо Map для збереження даних по днях
        for (let i = 0; i < 7; i++) {
          // Проходимо по 7 днях
          const date = new Date(sevenDaysAgo);
          date.setDate(sevenDaysAgo.getDate() + i);

          daysMap.set(date.getDate(), {
            // Заповнюємо Map нульовими значеннями
            day: date.getDate(),
            fullDate: date.toISOString().split('T')[0],
            volume: 0,
            volumeMl: 0,
          });
        }

        response.data.data.forEach(entry => {
          const entryDate = new Date(entry.date);
          if (daysMap.has(entryDate.getDate())) {
            const prevData = daysMap.get(entryDate.getDate());
            daysMap.set(entryDate.getDate(), {
              day: entryDate.getDate(),
              fullDate: entryDate.toISOString().split('T')[0],
              volume: prevData.volume + entry.volume / 1000, // Суммируем объем воды
              volumeMl: prevData.volumeMl + entry.volume,
            });
          }
        });

        setData(Array.from(daysMap.values())); // Оновлюємо стан data
      } catch (error) {
        console.error(error.message); // Логуємо помилку, якщо запит не вдався
      }
    };

    fetchWeeklyWaterData(); // Викликаємо функцію для отримання даних
  }, [records, token, isRefreshing]); // Запускаємо ефект при зміні цих залежностей

  const maxVolume = Math.max(...data.map(d => d.volume), 0); // Визначаємо максимальний обсяг води
  const roundedMax = Math.ceil(maxVolume * 2) / 2; // Округлюємо максимальне значення до найближчих 0.5
  const yTicks = Array.from(
    { length: Math.ceil(roundedMax / 0.5) + 1 },
    (_, i) => i * 0.5
  ); // Генеруємо мітки для осі Y з кроком 0.5

  return (
    <div className={s.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        {' '}
        {/* Контейнер, що підлаштовується під розмір */}
        <AreaChart data={data} margin={{ top: 15, right: 20 }}>
          {' '}
          {/* Областьова діаграма */}
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              {' '}
              {/* Градієнт для заливки */}
              <stop offset="0%" stopColor="var(--accent)" stopOpacity={1} />
              <stop offset="100%" stopColor="#66CDAA" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="0"
            vertical={false}
            horizontal={false}
          />{' '}
          {/* Сітка */}
          <XAxis
            dataKey="day"
            tick={{ fill: '#666', textAnchor: 'middle' }} // Текст по центру
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd" // Оставляем только крайние подписи
          />
          <YAxis
            tick={{ fill: '#666', textAnchor: 'start', dx: -40 }}
            axisLine={false}
            tickLine={false}
            domain={[0, roundedMax]}
            ticks={yTicks}
            tickFormatter={value =>
              value === 0
                ? `0%`
                : `${value} ${i18n.language === 'ua' ? 'Л' : 'L'}`
            } // Переключаем L <-> Л
          />{' '}
          {/* Вісь Y */}
          <Tooltip
            cursor={false}
            contentStyle={{ backgroundColor: '#fff' }}
            itemStyle={{ color: '#000' }}
            formatter={(value, name, props) => {
              return [
                `${props.payload.volumeMl}${
                  i18n.language === 'ua' ? 'мл' : 'ml'
                }`,
              ];
            }}
            labelFormatter={() => ''}
          />{' '}
          {/* Спливаючий підказка */}
          <Area
            type="linear"
            dataKey="volume"
            stroke="#87d28d"
            strokeWidth={3}
            fill="url(#gradient)"
            activeDot={{
              r: 10.5,
              stroke: '#87d28d',
              strokeWidth: 3,
              fill: '#fff',
            }}
          />{' '}
          {/* Графік */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WaterStatistics; // Експортуємо компонент
