// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import { curveCardinal } from 'd3-shape';

// const WaterStatistic = () => {
//   const [data, setData] = useState([]);
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const persistedAuth = localStorage.getItem('persist:auth');
//     if (persistedAuth) {
//       const parsedAuth = JSON.parse(persistedAuth);
//       const retrievedToken = JSON.parse(parsedAuth.token);

//       if (retrievedToken) {
//         setToken(retrievedToken);

//         const fetchWeeklyWaterData = async () => {
//           const today = new Date();
//           const sevenDaysAgo = new Date();
//           sevenDaysAgo.setDate(today.getDate() - 6);

//           try {
//             const BASE_URL = 'http://localhost:3000';
//             const response = await axios.get(`${BASE_URL}/water/month`, {
//               params: {
//                 year: today.getFullYear(),
//                 month: today.getMonth() + 1,
//               },
//               headers: { Authorization: `Bearer ${retrievedToken}` },
//             });

//             const daysMap = new Map();
//             for (let i = 0; i < 7; i++) {
//               const date = new Date(sevenDaysAgo);
//               date.setDate(sevenDaysAgo.getDate() + i);

//               daysMap.set(date.getDate(), {
//                 day: date.getDate(),
//                 fullDate: date.toISOString().split('T')[0],
//                 volume: 0,
//               });
//             }

//             response.data.data.forEach(entry => {
//               const entryDate = new Date(entry.date);
//               if (daysMap.has(entryDate.getDate())) {
//                 daysMap.set(entryDate.getDate(), {
//                   day: entryDate.getDate(),
//                   fullDate: entryDate.toISOString().split('T')[0],
//                   volume: entry.volume,
//                 });
//               }
//             });

//             setData(Array.from(daysMap.values()));
//           } catch (error) {
//             console.error(error.message);
//           }
//         };

//         fetchWeeklyWaterData();
//       }
//     }
//   }, [token]);

//   const cardinal = curveCardinal.tension(0.2);

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <AreaChart
//         data={data}
//         margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//       >
//         <CartesianGrid strokeDasharray="0" />{' '}
//         <XAxis
//           dataKey="day"
//           tick={{ fill: '#666' }}
//           axisLine={false}
//           tickLine={false}
//         />
//         <YAxis tick={{ fill: '#666' }} axisLine={false} tickLine={false} />
//         <Tooltip
//           formatter={(value, name, props) => {
//             const fullDate = props.payload.fullDate
//               ? new Date(props.payload.fullDate).toLocaleDateString()
//               : 'Unknown date';
//             return [`${value} ml`, fullDate];
//           }}
//           labelFormatter={() => ''}
//         />
//         <Area
//           type={cardinal}
//           dataKey="volume"
//           stroke="#66CDAA"
//           strokeWidth={3}
//           fill="#66CDAA"
//           fillOpacity={0.2}
//           activeDot={{
//             r: 6,
//             stroke: '#66CDAA',
//             strokeWidth: 3,
//             fill: '#66CDAA',
//           }}
//         />
//       </AreaChart>
//     </ResponsiveContainer>
//   );
// };

// export default WaterStatistic;
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { curveCardinal } from 'd3-shape';

const WaterStatistic = () => {
  const [data, setData] = useState([]); // Стейт для хранения данных о потреблении воды
  const [token, setToken] = useState(null); // Стейт для хранения токена аутентификации

  useEffect(() => {
    // Получаем токен из localStorage
    const persistedAuth = localStorage.getItem('persist:auth');
    if (persistedAuth) {
      const parsedAuth = JSON.parse(persistedAuth); // Парсим JSON
      const retrievedToken = JSON.parse(parsedAuth.token); // Извлекаем сам токен
      setToken(retrievedToken); // Сохраняем токен в стейте
    }
  }, []); // Хук выполняется один раз при монтировании компонента

  useEffect(() => {
    if (!token) return; // Если токена нет, не выполняем запрос

    const fetchWeeklyWaterData = async () => {
      const today = new Date(); // Текущая дата
      const sevenDaysAgo = new Date(); // Дата 7 дней назад
      sevenDaysAgo.setDate(today.getDate() - 6); // Отнимаем 6 дней

      try {
        const BASE_URL = 'http://localhost:3000';
        const response = await axios.get(`${BASE_URL}/water/month`, {
          params: { year: today.getFullYear(), month: today.getMonth() + 1 }, // Запрашиваем данные за текущий месяц
          headers: { Authorization: `Bearer ${token}` }, // Передаём токен в заголовке
        });

        const daysMap = new Map();
        for (let i = 0; i < 7; i++) {
          const date = new Date(sevenDaysAgo);
          date.setDate(sevenDaysAgo.getDate() + i);

          // Создаём структуру данных, чтобы гарантированно иметь 7 значений
          daysMap.set(date.getDate(), {
            day: date.getDate(), // Отображаем только день на оси X
            fullDate: date.toISOString().split('T')[0], // Полная дата в формате "год-месяц-день"
            volume: 0, // По умолчанию 0, если нет данных
          });
        }

        response.data.data.forEach(entry => {
          const entryDate = new Date(entry.date);
          if (daysMap.has(entryDate.getDate())) {
            daysMap.set(entryDate.getDate(), {
              day: entryDate.getDate(), // Обновляем день, если есть данные
              fullDate: entryDate.toISOString().split('T')[0], // Форматируем дату в "год-месяц-день"
              volume: entry.volume, // Записываем объем воды
            });
          }
        });

        const weeklyData = Array.from(daysMap.values()); // Преобразуем Map в массив
        setData(weeklyData); // Сохраняем данные в стейт
      } catch (error) {
        console.error('❌ Ошибка получения данных:', error.message);
      }
    };

    fetchWeeklyWaterData();
  }, [token]); // Хук зависит от `token`, выполняется при его изменении

  const cardinal = curveCardinal.tension(0.2); // Определяем тип сглаживания линии

  return (
    <ResponsiveContainer width="100%" height={300}>
      {' '}
      {/* Контейнер адаптируется под размер экрана */}
      <AreaChart
        data={data} // Передаём данные в график
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }} // Отступы
      >
        <CartesianGrid strokeDasharray="0" />{' '}
        {/* ❗ Убираем пунктирные линии внутри графика */}
        <XAxis
          dataKey="day" // Используем только день в качестве подписи оси X
          tick={{ fill: '#666' }} // Цвет подписей оси X
          axisLine={false} // ❗ Убираем саму линию оси X
          tickLine={false} // ❗ Убираем маленькие черточки на оси X
        />
        <YAxis
          tick={{ fill: '#666' }} // Цвет подписей оси Y
          axisLine={false} // ❗ Убираем линию оси Y
          tickLine={false} // ❗ Убираем маленькие черточки на оси Y
        />
        <Tooltip
          formatter={(value, name, props) => {
            // Форматируем данные для всплывающей подсказки
            const fullDate = props.payload.fullDate || 'Unknown date'; // Берём полную дату из данных
            return [`${value} ml`, fullDate]; // Показываем объем в мл + полную дату в формате "год-месяц-день"
          }}
          labelFormatter={() => ''} // Убираем заголовок в тултипе
        />
        <Area
          type={cardinal} // Используем сглаженную линию
          dataKey="volume" // Данные для построения графика (объем воды)
          stroke="#66CDAA" // Цвет линии графика (светло-мятный)
          strokeWidth={3} // ❗ Делаем линию графика толще
          fill="#66CDAA" // ❗ Цвет заливки (светло-мятный)
          fillOpacity={0.2} // ❗ Делаем заливку почти прозрачной
          activeDot={{
            r: 6,
            stroke: '#66CDAA',
            strokeWidth: 3,
            fill: '#66CDAA',
          }} // ❗ Увеличенные точки при наведении
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default WaterStatistic;
