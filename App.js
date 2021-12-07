import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Keyboard, Alert} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const [task, setTask] = useState([])
  const [newTask, setNewTask] = useState('')

async function addTask() {
  if (newTask == ""){
    Alert.alert('Atenção', 'Digite uma tarefa')
    return;
  }

  const filter = task.filter(task => task == newTask)

  if(filter.length != 0){
    Alert.alert('Atenção', 'Tarefa ja existente')
    return;
  }
  setTask([ ...task, newTask])
  setNewTask('')
  Keyboard.dismiss()
}

async function deleteTask(item) {
  Alert.alert('Deletar Tarefa', 'Tem certeza que deseja remover essa tarefa?',
  [
    {
      text: "Não", 
      onPress: ()=> {
      return;
      },
      style: 'cancel'
    },
    {
      text: "Sim", 
      onPress: ()=> setTask(task.filter(tasks => tasks != item))
    }
  ],
  { cancelable: false }
  )

}

return (
  <>
  <KeyboardAvoidingView
  keyboardVerticalOffset={0}
  behavior='padding'
  style={{ flex: 1 }}
  enabled= { Platform.OS == 'ios'}
  >
    <View style={styles.container}>
      <View style={styles.body}>
        <FlatList style={styles.flatlist}
        data={task}
        keyExtractor={item => item.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.containerView}>
            <Text style={styles.text}>{item}</Text>
            <TouchableOpacity onPress={() => deleteTask(item)}>
              <MaterialIcons name='delete-forever' size={30} color='#d3222a'/>
            </TouchableOpacity>
          </View>
        )}
        />
      </View>
      <View style={styles.form}>
        <TextInput style={styles.input}
        placeholderTextColor='#999'
        autoCorrect={true}
        placeholder='Adicione uma tarefa'
        maxLength={25}
        onChangeText={text => setNewTask(text)}
        value={newTask}
        />
        <TouchableOpacity style={styles.button} onPress={() => addTask()}>
        <Ionicons name="add" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  </KeyboardAvoidingView>
  </>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20
  },

  body: {
    flex: 1
  },

  form: {
    padding: 0,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingTop: 13,
    borderTopWidth: 2,
    borderColor: '#eee'
  },
  
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#eee'
  },

  button: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a4c639',
    borderRadius: 4,
    marginLeft: 10
  },

  flatlist: {
    flex: 1,
    marginTop: 5,
  },
  
  containerView: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#eee',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#eee'
  },

  text: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center'
  }

});
