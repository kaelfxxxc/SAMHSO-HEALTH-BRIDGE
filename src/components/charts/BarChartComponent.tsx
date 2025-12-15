import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface BarChartData {
  name: string;
  value: number;
}

interface BarChartComponentProps {
  data: BarChartData[];
  title?: string;
  dataKey?: string;
  nameKey?: string;
  color?: string;
  height?: number;
}

/**
 * Reusable Bar Chart Component
 * Encapsulates Recharts BarChart functionality
 * 
 * @param data - Array of data objects with name and value properties
 * @param title - Optional title for the chart
 * @param dataKey - Key for the data values (default: 'value')
 * @param nameKey - Key for the category names (default: 'name')
 * @param color - Bar color (default: '#4f46e5')
 * @param height - Chart height in pixels (default: 300)
 */
export function BarChartComponent({ 
  data, 
  title, 
  dataKey = 'value', 
  nameKey = 'name',
  color = '#4f46e5',
  height = 300 
}: BarChartComponentProps) {
  return (
    <div className="w-full">
      {title && <h4 className="text-gray-900 mb-4">{title}</h4>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={nameKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
