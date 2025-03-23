import React, { useState, useEffect } from "react";
import { Alert } from "react-native";

const initialScore = 0;

const questions = [
  "Ти, як правило, завжди буваєш всім задоволений?",
  "Тобі іноді заважають заснути різні думки?",
  "Чи було коли-небудь так, що тобі довірили таємницю, а ти з яких-небудь причин не зміг її зберегти?",
  "Чи було коли-небудь так, що тобі стає сумно без особливої причини?",
  "Чи любиш ти жартувати над ким-небудь?",
  "Чи можеш ти сказати про себе, що ти взагалі весела людина?",
  "Чи часто ти потребуєш допомоги інших людей?",
  "Чи часто у тебе міняється настрій?",
  "Якщо ти хочеш познайомитися з іншою людиною, ти завжди першим починаєш розмову?",
  "Якщо ти опиняєшся в незручній ситуації, ти потім довго переживаєш?"
];

interface TestProps {
  onQuizEnd: (result: string) => void;
}

export default function Test({ onQuizEnd }: TestProps) {
  const [score, setScore] = useState(initialScore);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (answer: "Так" | "Іноді" | "Ні") => {
    let points = 0;
    if (answer === "Так") points = 1;
    else if (answer === "Іноді") points = 0.5;
    
    setScore((prevScore) => prevScore + points);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      showResult(score + points);
    }
  };

  const askQuestion = (index: number) => {
    Alert.alert("Питання", questions[index], [
      { text: "Так", onPress: () => handleAnswer("Так") },
      { text: "Іноді", onPress: () => handleAnswer("Іноді") },
      { text: "Ні", onPress: () => handleAnswer("Ні") },
    ]);
  };

  const showResult = (finalScore: number) => {
    let result = "";
    if (finalScore <= 3) result = "Інтроверт";
    else if (finalScore <= 6) result = "Флегматик-інтроверт";
    else if (finalScore <= 8) result = "Холерик-інтроверт";
    else result = "Меланхолік-інтроверт";

    Alert.alert("Результат", `Ваш темперамент: ${result}`, [
      { text: "OK", onPress: () => onQuizEnd(result) },
    ]);
  };

  useEffect(() => {
    if (currentQuestion < questions.length) {
      askQuestion(currentQuestion);
    }
  }, [currentQuestion]);

  return null;
}
