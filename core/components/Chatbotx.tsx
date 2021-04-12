import ChatBot from "react-simple-chatbot";

import React from "react";

export interface IStepItem {
  id: string;
  message?: string;
  end?: boolean;
  trigger?: string;
  user?: boolean;
  options?: IOptionStep[];
  validator?: (value: string) => void;
  component?: React.ReactElement | React.FC;
  asMessage?: boolean;
}

export interface IOptionStep {
  value: string | number;
  label: string;
  trigger?: string;
}

interface ChatbotJSProps {
  botAvatar?: string;
  steps: IStepItem[];
  headerTitle?: string;
}

export const ChatbotJS: React.FC<ChatbotJSProps> = ({ headerTitle, botAvatar, steps }) => {
  return <ChatBot headerTitle={headerTitle} botAvatar={botAvatar} steps={steps} />;
};
