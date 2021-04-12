import React from "react";
import { ChatbotJS } from "../../components/Chatbotx";
import { useSteps } from "../../utils/stepts";

export const HomeTemplate = () => {
  const { steps } = useSteps();
  return (
    <div className="flex items-center justify-center h-full">
      <ChatbotJS
        headerTitle="Chatbox Erickson"
        botAvatar="https://www.bluefish.ai/wp-content/uploads/2020/03/Chatbot_02_resized.png"
        steps={steps}
      />
    </div>
  );
};
