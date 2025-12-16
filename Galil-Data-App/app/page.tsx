import {Button} from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
        <Image
          src="/GalileeKnowledgeLogo.png"
          alt="Galilee Knowledge Logo"
          width={60}
          height={40}
        />
        <h1 className="text-2xl font-bold text-blue-700 mb-2">מערכת DATA - גליל</h1>
        <p className="text-center text-gray-700 mb-4">
          ברוכים הבאים למערכת הנתונים של מרכז הידע האזורי - גליל מזרחי.
          <br />
          מערכת המיועדת לאפשר לכל תושבי האזור אורח גליל בריא,
          <br />
          לגשת למידע מהימן ומעודכן, להפיק דוחות, ולהשוות נתונים על פי נושאים שונים.
          <br />
          <br />
          המידע במערכת נאסף ממקורות מגוונים, ומעודכן באופן שוטף.
          <br />
          <br />
          אנו מזמינים אתכם להיעזר במערכת לצורך קבלת החלטות, תכנון, מחקר, ולשיפור איכות החיים בגליל
          המזרחי.
        </p>
        <Button className="w-full text-lg py-6 mt-2 mb-4" asChild>
          <a href="/authorities">כניסה למערכת</a>
        </Button>
        <div className="flex justify-center items-center gap-4 mt-6 w-full">
          <Image src="/RonaldRoadbergLogo.png" alt="Ronald Roadberg Logo" width={60} height={40} />
          <Image src="/TelHaiLogo.png" alt="Tel Hai Logo" width={60} height={40} />
          <Image src="/UiaLogo.png" alt="UIA Logo" width={60} height={40} />
          <Image src="/GalilMizrahiLogo.png" alt="Galil Mizrahi Logo" width={60} height={40} />
        </div>
      </div>
    </div>
  );
}
