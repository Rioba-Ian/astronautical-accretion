import React from "react";
import { InlineWidget } from "react-calendly";

const CalendlyWidget = ({ url }: { url?: string }) => {
  return (
    <div className="h-[700px] w-full">
      <InlineWidget
        url={url || "https://calendly.com/your-link-here"}
        styles={{
          height: "100%",
          width: "100%",
        }}
      />
    </div>
  );
};

export default CalendlyWidget;
