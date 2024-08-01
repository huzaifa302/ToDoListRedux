import {
  View,
  Text,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addTask, editTask, removeTask} from '../../source/redux/action';

const {width} = Dimensions.get('window');

const TodoApp = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDetail, setTaskDetail] = useState('');
  const [editTaskid, setEditTaskid] = useState(null);

  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);

  const handleAddTask = () => {
    if (taskTitle && taskDetail) {
      const newTask = {
        id: (tasks.length + 1).toString(),
        title: taskTitle,
        detail: taskDetail,
      };
      if (editTaskid) {
        dispatch(editTask({...newTask, id: editTaskid}));
        setEditTaskid(null);
      } else {
        dispatch(addTask(newTask));
      }
      setTaskTitle('');
      setTaskDetail('');
    }
  };

  const handleRemoveTask = id => {
    dispatch(removeTask(id));
  };

  const handleEditTask = task => {
    setTaskTitle(task.title),
      setTaskDetail(task.detail),
      setEditTaskid(task.id);
  };

  const renderdata = ({item}) => {
    return (
      <View style={styles.renderItemContainer}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>{item.title} </Text>
          <View style={styles.itemImageView}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleEditTask(item)}>
              <Image
                source={require('../Icons/edit.png')}
                tintColor={'white'}
                resizeMode="contain"
                style={styles.EditImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleRemoveTask(item.id)}>
              <Image
                source={require('../Icons/delete.png')}
                tintColor={'white'}
                resizeMode="contain"
                style={styles.deletImage}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.itemText}>{item.detail} </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TODO LIST</Text>
      </View>
      <TextInput
        placeholder="Enter Title  here"
        placeholderTextColor={'black'}
        value={taskTitle}
        onChangeText={setTaskTitle}
        style={styles.InputField}
      />
      <TextInput
        placeholder="Enter Your Details  here"
        placeholderTextColor={'black'}
        value={taskDetail}
        onChangeText={setTaskDetail}
        style={styles.InputField}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.saveButton}
        onPress={handleAddTask}>
        <Text style={styles.ButtonText}>{editTaskid ? 'Upate' : 'Save'}</Text>
      </TouchableOpacity>
      <View style={styles.listContainer}>
        <FlatList
          keyboardDismissMode="on-drag"
          data={tasks}
          renderItem={renderdata}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    backgroundColor: '#91caa7',
    padding: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    borderBlockColor: 'black',
  },
  headerText: {
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    textDecorationLine: 'underline',
  },
  InputField: {
    backgroundColor: '#f7dbab',
    marginTop: 10,
    borderRadius: 15,
    paddingHorizontal: 20,
    borderColor: '#91caa7',
    borderWidth: 2,
  },
  saveButton: {
    marginTop: 10,
    height: 40,
    width: width,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: '#f7dbab',
    borderWidth: 1,
  },
  ButtonText: {
    textAlign: 'center',
    justifyContent: 'center',
    color: '#f7dbab',
  },

  listContainer: {
    flex: 1,
    backgroundColor: '#4c9a82',
    marginTop: 10,
    borderRadius: 15,
  },

  renderItemContainer: {
    backgroundColor: 'black',
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {color: 'white', padding: 10, width: width/2},
  itemImageView: {flexDirection: 'row', paddingTop: 10, paddingRight: 10},
  EditImage: {height: 20, width: 25, marginLeft: 100},
  deletImage: {height: 20, width: 25},
  itemText: {
    color: 'white',
    padding: 10,
  },
});

export default TodoApp;
