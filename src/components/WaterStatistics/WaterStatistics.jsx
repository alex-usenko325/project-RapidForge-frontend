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
import { useDispatch, useSelector } from 'react-redux';
import { refreshAccessToken } from '../../redux/auth/operations.js';
import {
  selectIsRefreshing,
  selectIsLoggedIn,
} from '../../redux/auth/selectors.js';

const WaterStatistic = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!token && isLoggedIn) {
      dispatch(refreshAccessToken());
    }
  }, [token, isLoggedIn, dispatch]);

  useEffect(() => {
    if (!token || isRefreshing) return;

    const fetchWeeklyWaterData = async () => {
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 6);

      try {
        const BASE_URL = 'http://localhost:3000';
        const response = await axios.get(`${BASE_URL}/water/month`, {
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
            daysMap.set(entryDate.getDate(), {
              day: entryDate.getDate(),
              fullDate: entryDate.toISOString().split('T')[0],
              volume: entry.volume / 1000,
              volumeMl: entry.volume,
            });
          }
        });

        setData(Array.from(daysMap.values()));
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchWeeklyWaterData();
  }, [token, isRefreshing]);

  const maxVolume = Math.max(...data.map(d => d.volume), 0);
  const roundedMax = Math.ceil(maxVolume * 2) / 2;
  const yTicks = Array.from(
    { length: Math.ceil(roundedMax / 0.5) + 1 },
    (_, i) => i * 0.5
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#66CDAA" stopOpacity={0.8} />
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
          tick={{ fill: '#666' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#666', textAnchor: 'start', dx: -30 }}
          axisLine={false}
          tickLine={false}
          domain={[0, roundedMax]}
          ticks={yTicks}
          tickFormatter={value => (value === 0 ? `0%` : `${value} L`)}
        />
        <Tooltip
          cursor={false}
          contentStyle={{ backgroundColor: '#fff' }}
          itemStyle={{ color: '#000' }}
          formatter={(value, name, props) => {
            return [`${props.payload.volumeMl} ml`, props.payload.fullDate];
          }}
          labelFormatter={() => ''}
        />
        <Area
          type="linear"
          dataKey="volume"
          stroke="#66CDAA"
          strokeWidth={3}
          fill="url(#gradient)"
          activeDot={{
            r: 6,
            stroke: '#66CDAA',
            strokeWidth: 3,
            fill: '#66CDAA',
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default WaterStatistic;
