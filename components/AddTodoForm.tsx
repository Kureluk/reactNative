import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { NewTodo } from "../models/task";
import DateTimePicker from '@react-native-community/datetimepicker';


interface AddTodoFormProps {
  onSubmit: (data: NewTodo) => void;
  onCancel: () => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onSubmit, onCancel }) => {
  const { control, handleSubmit, reset } = useForm<NewTodo>({
    defaultValues: {
      title: "",
      date: new Date().toISOString().split('T')[0],
      priority: "medium",
      status: "to-do"
    }
  });

  const handleFormSubmit = (data: NewTodo) => {
    onSubmit(data);
    reset();
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Add New Task</Text>
      
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Task title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="title"
        rules={{ required: 'Title is required' }}
      />
      
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Date (YYYY-MM-DD)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="numbers-and-punctuation"
          />
        )}
        name="date"
      />
      
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.priorityContainer}>
            {(["low", "medium", "high"] as const).map((priority) => (
              <TouchableOpacity
                key={priority}
                style={[
                  styles.priorityButton,
                  value === priority && styles.priorityButtonSelected
                ]}
                onPress={() => onChange(priority)}
              >
                <Text style={styles.priorityButtonText}>{priority}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        name="priority"
      />
      
      <View style={styles.formButtons}>
        <TouchableOpacity 
          style={[styles.formButton, styles.submitButton]}
          onPress={handleSubmit(handleFormSubmit)}
        >
          <Text style={styles.formButtonText}>Add Task</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.formButton, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.formButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "white",
    marginHorizontal: "8%",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  priorityButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ddd",
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  priorityButtonSelected: {
    backgroundColor: "blue",
  },
  priorityButtonText: {
    color: "#333",
  },
  formButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formButton: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "green",
  },
  cancelButton: {
    backgroundColor: "red",
  },
  formButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddTodoForm;