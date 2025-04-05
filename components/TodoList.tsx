import { db, initDB } from "../store/database";
import { todos } from "../store/schema";
import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AddTodoForm from "./AddTodoForm";
import { useDispatch } from 'react-redux';
import { setTodos } from '../store/todoSlice';

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    initDB();
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const result = await db.select().from(todos).all();
      setTodosList(result); 
      dispatch(setTodos(result)); 
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (data: { title: string; status: string }) => {
    try {
      await db.insert(todos).values({
        todo: data.title,
        completed: data.status === "done",
      }).run();

      fetchTodos(); 
      Alert.alert("Success", "Task added successfully!");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={todosList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.todo}</Text>
            <Text>{item.completed ? "Done" : "To Do"}</Text>
          </View>
        )}
      />
      <TouchableOpacity onPress={() => setShowForm(!showForm)} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add New Task</Text>
      </TouchableOpacity>
      {showForm && <AddTodoForm onSubmit={handleAddTodo} onCancel={() => setShowForm(false)} />}
    </View>
  );
};

export default TodoList;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "yellow", 
  },
  header: {
    backgroundColor: "blue",
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 16,
    color: "white",
    marginTop: 10,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "white", 
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: "8%", 
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#f9c2ff",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
  },
  statusText: {
    fontSize: 16,
    color: "#555",
    fontStyle: "italic",
  },
  addButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: "8%",
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

