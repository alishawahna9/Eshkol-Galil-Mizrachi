import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function InfoCard({ title, description, icon: Icon, action, children }) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        {Icon && (
          <div className="mb-3 p-3 bg-[#6FD1F5]/10 rounded-lg w-fit">
            <Icon className="w-6 h-6 text-[#22A7D6]" />
          </div>
        )}
        <CardTitle className="text-xl text-[#0F1F38] dark:text-white">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      {(children || action) && (
        <CardContent>
          {children}
          {action}
        </CardContent>
      )}
    </Card>
  );
}