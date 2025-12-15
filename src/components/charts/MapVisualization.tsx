import { MapPin } from 'lucide-react';

interface RegionData {
  name: string;
  value: number;
  color: string;
}

interface MapVisualizationProps {
  data: RegionData[];
  title?: string;
}

/**
 * Reusable Map Visualization Component
 * Displays geographic distribution data in a simplified visual format
 * 
 * @param data - Array of region data with name, value, and color
 * @param title - Optional title for the visualization
 */
export function MapVisualization({ data, title }: MapVisualizationProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="w-full">
      {title && <h4 className="text-gray-900 mb-4">{title}</h4>}
      
      {/* Simplified region visualization */}
      <div className="grid grid-cols-2 gap-4">
        {data.map((region) => {
          const intensity = (region.value / maxValue) * 100;
          
          return (
            <div
              key={region.name}
              className="relative p-6 rounded-lg border-2 transition-all hover:shadow-lg"
              style={{
                borderColor: region.color,
                backgroundColor: `${region.color}${Math.floor(intensity * 0.4).toString(16).padStart(2, '0')}`
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" style={{ color: region.color }} />
                  <h5 className="text-gray-900">{region.name}</h5>
                </div>
                <span className="text-gray-900">{region.value}</span>
              </div>
              
              {/* Visual indicator bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${intensity}%`,
                    backgroundColor: region.color
                  }}
                />
              </div>
              
              <p className="text-gray-600 mt-2">
                {intensity.toFixed(0)}% of total activity
              </p>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-700 mb-2">Regional Distribution</p>
        <div className="flex flex-wrap gap-4">
          {data.map(region => (
            <div key={region.name} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: region.color }}
              />
              <span className="text-gray-600">{region.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
