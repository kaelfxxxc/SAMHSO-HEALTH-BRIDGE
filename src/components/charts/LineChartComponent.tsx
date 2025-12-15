import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface LineChartData {
  name: string;
  value: number;
}

interface LineChartComponentProps {
  data: LineChartData[];
  title?: string;
  dataKey?: string;
  nameKey?: string;
  color?: string;
  height?: number;
}

/**
 * Reusable Line Chart Component
 * Encapsulates Recharts LineChart functionality
 * 
 * @param data - Array of data objects with name and value properties
 * @param title - Optional title for the chart
 * @param dataKey - Key for the data values (default: 'value')
 * @param nameKey - Key for the category names (default: 'name')
 * @param color - Line color (default: '#4f46e5')
 * @param height - Chart height in pixels (default: 300)
 */
export function LineChartComponent({ 
  data, 
  title, 
  dataKey = 'value', 
  nameKey = 'name',
  color = '#4f46e5',
  height = 300 
}: LineChartComponentProps) {
  return (
    <div className="w-full">
      {title && <h4 className="text-gray-900 mb-4">{title}</h4>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={nameKey} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
