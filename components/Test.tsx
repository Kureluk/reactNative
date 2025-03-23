import React, { useState, useEffect } from "react";
import { Alert } from "react-native";

const initialAnswers = {
  сангвінік: 0,
  меланхолік: 0,
  холерик: 0,
  флегматик: 0,
} as const;

type TemperamentType = keyof typeof initialAnswers;

const questions: { question: string; type: TemperamentType }[] = [
  { question: "Вам легко заводити нові знайомства?", type: "сангвінік" },
  { question: "Часто перебуваєте в задумливому стані?", type: "меланхолік" },
  { question: "Швидко виходите з себе?", type: "холерик" },
  { question: "Вам складно змінювати звички?", type: "флегматик" },
];

interface TestProps {
  onQuizEnd: () => void;
}

export default function Test({ onQuizEnd }: TestProps) {
  const [answers, setAnswers] = useState<Record<TemperamentType, number>>(initialAnswers);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (answer: "Так" | "Ні") => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].type]: prev[questions[currentQuestion].type] + (answer === "Так" ? 1 : 0),
    }));

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      askQuestion(currentQuestion + 1);
    } else {
      showResult();
    }
  };

  const askQuestion = (index: number) => {
    Alert.alert("Питання", questions[index].question, [
      { text: "Так", onPress: () => handleAnswer("Так") },
      { text: "Ні", onPress: () => handleAnswer("Ні") },
    ]);
  };

  const showResult = () => {
    const maxType = (Object.keys(answers) as TemperamentType[]).reduce((a, b) =>
      answers[a] > answers[b] ? a : b
    );

    Alert.alert("Результат", `Ваш темперамент: ${maxType}`, [{ text: "OK", onPress: onQuizEnd }]);
  };

  useEffect(() => {
    askQuestion(0);
  }, []);

  return null;
}
