import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import * as Icon from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";

import { Level } from "../../components/Level";
import { Header } from "../../components/Header";
import { QuizCard } from "../../components/QuizCard";

import { styles } from "./styles";
import { QUIZZES } from "../../data/quizzes";

export function Home() {
  const [quizzes, setQuizzes] = useState(QUIZZES);
  const [levels, setLevels] = useState([1, 2, 3]);

  const { navigate } = useNavigation();

  function handleLevelFilter(level: number) {
    const levelAlreadySelected = levels.includes(level);

    if (levelAlreadySelected) {
      if (levels.length > 0) {
        setLevels((prevState) => prevState.filter((item) => item !== level));
      }
    } else {
      setLevels((prevState) => [...prevState, level]);
    }
  }

  useEffect(() => {
    setQuizzes(QUIZZES.filter((quiz) => levels.includes(quiz.level)));
  }, [levels]);

  return (
    <View style={styles.container}>
      <Header
        icon={Icon.FloppyDisk}
        title="QUIZ SD"
        subtitle="Soal Pelajaran Kelas 1 Sampai 6"
        onPress={() => navigate("history")}
      />

      {/* <View style={styles.levels}>
        <Level
          title="Mudah"
          type="EASY"
          onPress={() => handleLevelFilter(1)}
          isChecked={levels.includes(1)}
        />
        <Level
          title="Sulit"
          type="MEDIUM"
          onPress={() => handleLevelFilter(2)}
          isChecked={levels.includes(2)}
        />
        <Level
          title="Sangat Sulit"
          type="HARD"
          onPress={() => handleLevelFilter(3)}
          isChecked={levels.includes(3)}
        />
      </View> */}

      <FlatList
        data={quizzes}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <QuizCard
            index={index}
            data={item}
            onPress={() => navigate("quiz", { id: item.id })}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cards}
      />
    </View>
  );
}
