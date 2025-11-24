import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsCard({ title, value, subtitle, trend, icon: Icon, color = "bg-[#22A7D6]" }) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 ${color} rounded-lg`}>
            {Icon && <Icon className="w-6 h-6 text-white" />}
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm font-medium ${
              trend > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(trend)}%
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-[#0F1F38] dark:text-white">
            {value}
          </p>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}