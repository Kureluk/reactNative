import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import AddTodoForm from "./AddTodoForm";
import { NewTodo } from "../models/task";

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get<{ todos: Todo[] }>("https://dummyjson.com/todos")
      .then(response => {
        setTodos(response.data.todos);
      })
      .catch(error => {
        console.error("Error fetching todos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAddTodo = (data: NewTodo) => {
    const newTodo = {
      id: Math.max(0, ...todos.map(t => t.id)) + 1,
      todo: data.title,
      completed: data.status === "done",
      userId: 1
    };
    
    setTodos([newTodo, ...todos]);
    Alert.alert("Success", "Task added successfully!");
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  const currentDate = new Date().toLocaleDateString();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>To do list</Text>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>
      
      {!showForm ? (
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => setShowForm(true)}
        >
          <Text style={styles.addButtonText}>+ Add New Task</Text>
        </TouchableOpacity>
      ) : (
        <AddTodoForm 
          onSubmit={handleAddTodo} 
          onCancel={() => setShowForm(false)} 
        />
      )}
      
      <View style={styles.listContainer}>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.text}>{item.todo}</Text>
              <Text style={styles.statusText}>
                {item.completed ? "Done" : "To Do"}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

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

export default TodoList;