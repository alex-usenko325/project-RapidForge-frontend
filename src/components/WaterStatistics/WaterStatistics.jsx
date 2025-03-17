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
  const [data, setData] = useState([]);

  const token = useSelector(state => state.auth.token);
  const isRefreshing = useSelector(selectIsRefreshing);
  const records = useSelector(selectWaterRecords);

  useEffect(() => {
    if (!token || isRefreshing) return;

    const fetchWeeklyWaterData = async () => {
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 6);

      try {
        const response = await authAPI.get('/water/month', {
          params: { year: today.getFullYear(), month: today.getMonth() + 1 },
          headers: { Authorization: `Bearer ${token}` },
        });

        const daysMap = new Map();
        for (let i = 0; i < 7; i++) {
          const date = new Date(sevenDaysAgo);
          date.setDate(sevenDaysAgo.getDate() + i);

          daysMap.set(date.getDate(), {
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
              volume: prevData.volume + entry.volume / 1000,
              volumeMl: prevData.volumeMl + entry.volume,
            });
          }
        });

        setData(Array.from(daysMap.values()));
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchWeeklyWaterData();
  }, [records, token, isRefreshing]);

  const maxVolume = Math.max(...data.map(d => d.volume), 0);
  const roundedMax = Math.ceil(maxVolume * 2) / 2;
  const yTicks = Array.from(
    { length: Math.ceil(roundedMax / 0.5) + 1 },
    (_, i) => i * 0.5
  );

  return (
    <div className={s.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 15, right: 20 }}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity={1} />
              <stop offset="100%" stopColor="#66CDAA" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="0"
            vertical={false}
            horizontal={false}
          />
          <XAxis
            dataKey="day"
            tick={{ fill: '#666', textAnchor: 'middle' }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
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
            }
          />
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
          />
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
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WaterStatistics; // Експортуємо компонент
