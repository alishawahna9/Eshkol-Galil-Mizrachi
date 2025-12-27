"use client";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      {/* Main Container - Expanded to max-w-4xl for a bigger feel */}
      <div className="bg-card rounded-xl shadow-lg p-12 md:p-20 max-w-4xl w-full flex flex-col items-center">
        {/* Top Image - Made significantly bigger */}
        <div className="mb-10">
          <Image
            src="/GalileeKnowledgeLogo.png"
            alt="Galilee Knowledge Logo"
            width={350} // Increased from 60
            height={250}
            priority
          />
        </div>

        {/* Title - Kept your blue-700 color */}
        <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">מערכת DATA - גליל</h1>

        {/* Text Content - Kept your gray-700 color and bigger text scale */}
        <div className="text-center text-gray-700 mb-10 text-xl leading-relaxed max-w-2xl">
          <p className="mb-4">ברוכים הבאים למערכת הנתונים של מרכז הידע האזורי - גליל מזרחי.</p>
          <p className="mb-4">
            מערכת המיועדת לאפשר לכל תושבי האזור אורח גליל בריא, לגשת למידע מהימן ומעודכן, להפיק
            דוחות, ולהשוות נתונים על פי נושאים שונים.
          </p>
          <p className="mb-6">המידע במערכת נאסף ממקורות מגוונים, ומעודכן באופן שוטף.</p>
          <p className="font-medium">
            אנו מזמינים אתכם להיעזר במערכת לצורך קבלת החלטות, תכנון, מחקר, ולשיפור איכות החיים בגליל
            המזרחי.
          </p>
        </div>

        {/* Button - Kept text-lg and increased padding for size */}
        <Button className="w-full md:w-72 text-lg py-8 mb-10" asChild>
          <Link href="/authorities">כניסה למערכת</Link>
        </Button>

        {/* Footer Logos - Increased spacing and sizes to match the bigger container */}
        <div className="flex flex-wrap justify-center items-center gap-10 mt-6 w-full">
          <Image src="/RonaldRoadbergLogo.png" alt="Ronald Roadberg Logo" width={90} height={60} />
          <Image src="/TelHaiLogo.png" alt="Tel Hai Logo" width={90} height={60} />
          <Image src="/UiaLogo.png" alt="UIA Logo" width={90} height={60} />
          <Image src="/GalilMizrahiLogo.png" alt="Galil Mizrahi Logo" width={90} height={60} />
        </div>
      </div>
    </div>
  );
}
