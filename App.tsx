import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert, TextInput, TouchableHighlight, SafeAreaView, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList, menuDetails } from './types';
import { SetStateAction, useState } from 'react';
import React from 'react';

// import Home from './Pages/Home';
// import Add from './Pages/Add';




// const Stack = createNativeStackNavigator<RootStackParamList>(); 
// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Add" component={Add} />
//         </Stack.Navigator>
//         </NavigationContainer>
//         );
//         };

//         export default App;

        
 export default function App() {
   const Stack = createNativeStackNavigator<RootStackParamList>();
  const [Menu, setMenu] = useState<menuDetails[]>([]); // Lifted state
  
   return (
     <NavigationContainer>
       <Stack.Navigator>

       <Stack.Screen name="Start" component={Start} />

         <Stack.Screen name='Screen2'>
           {props => <Screen2 {...props} Menu={Menu} setMenu={setMenu} />}
         </Stack.Screen>


         <Stack.Screen name='Screen1'>
           {props => <Screen1 {...props} Menu={Menu} setMenu={setMenu}  />}
         </Stack.Screen>

      
       </Stack.Navigator>
     </NavigationContainer>
   );
 };

 type StartProp = NativeStackScreenProps<RootStackParamList, 'Start'>;


const Start: React.FC<StartProp>  = (props) => { 
  const { Menu, setMenu } = props;
  const [DishToDelete, setDishToDelete] = useState<string>('');
  const [selectedCourseType, setSelectedCourseType] =  useState<string | null>(null);

  const handleDeleteItem = () => {
    const updatedItems = Menu.filter((item: { dish_Name: string; }) => item.dish_Name !== DishToDelete);
    setMenu(updatedItems); // Update Menu state
    setDishToDelete(''); // Clear the input after deletion
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Home</Text>
        <Text style={styles.trackerName}>Menu Items</Text>
      </View>
      <View style={styles.listView}>
        <FlatList
          style={styles.ListStyle}
          data={Menu}
          keyExtractor={(_item: any, index: { toString: () => any; }) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Text style={styles.dishName}>Dish Name: {item.dish_Name}</Text>
              <Text style={styles.OtherDetails}>Description: {item.dish_Discription}</Text>
              <Text style={styles.OtherDetails}>Course: {item.course_Type}</Text>
              <Text style={styles.OtherDetails}>R{item.price}</Text>
            </View>
          )}
        />
            <View>
        <Text style={styles.OtherDetails}>Total Dishes: </Text> 
        <Text style={styles.OtherDetails}>Total Price: R</Text>
        <Text style={styles.OtherDetails}>Average Price: R</Text>
        
    </View>

        <View style={styles.userInputView}>

        
          <TouchableHighlight
            style={styles.DishButton}
            onPress={() => setSelectedCourseType(null)} // Show all dishes
          >

            <Text style={styles.buttonText}>Show All Dishes</Text>
          </TouchableHighlight>
<View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.AppetizerButton}
            onPress={() => setSelectedCourseType('Appetizer')} // Filter for Appetizer
          >
            <Text style={styles.buttonText}>Show Appetizers</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.MainButton}
            onPress={() => setSelectedCourseType('Main')} // Filter for Main
          >
            <Text style={styles.buttonText}>Show Main Dishes</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.DessertButton}
            onPress={() => setSelectedCourseType('Dessert')} // Filter for Dessert
          >
            <Text style={styles.buttonText}>Show Desserts</Text>
          </TouchableHighlight>
        </View>

     

          <TouchableHighlight
          style={styles.button}
          onPress={() => props.navigation.navigate('Screen2')}
        >
          <Text style={styles.buttonText}>Add/Remove Dish</Text>
        </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
          };



/* Start of Screen 1 definition */
type Screen1Prop = NativeStackScreenProps<RootStackParamList, 'Screen1'>;

const Screen1: React.FC<Screen1Prop & { Menu: menuDetails[], setMenu: (menu: menuDetails []) => void }> = (props) => {
  const { Menu, setMenu } = props;
  const { dish_Name, course_Type, dish_Discription, price } = props.route.params; 
  const [DishToDelete, setDishToDelete] = useState<string>('');
  const [selectedCourseType, setSelectedCourseType] =  useState<string | null>(null);


  const totalDish = Menu.length; //holds the total amount of dishes in the list
  const totalPrice = Menu.reduce((acc, current) => acc + current.price, 0);
  const AvgPrice = totalDish > 0 ? Math.ceil(totalPrice / totalDish): 0;


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Home</Text>
        <Text style={styles.trackerName}>Menu Items</Text>
      </View>
      <View style={styles.listView}>
        <FlatList
          style={styles.ListStyle}
          data={selectedCourseType ? Menu.filter(item  => item.course_Type === selectedCourseType) : Menu}
          keyExtractor={(_item: any, index: { toString: () => any; }) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Text style={styles.dishName}>Dish Name: {item.dish_Name}</Text>
              <Text style={styles.OtherDetails}>Description: {item.dish_Discription}</Text>
              <Text style={styles.OtherDetails}>Course: {item.course_Type}</Text>
              <Text style={styles.OtherDetails}>R{item.price}</Text>
            </View>
          )}
        />
            <View>
        <Text style={styles.OtherDetails}>Total Dishes: {totalDish}</Text> 
        <Text style={styles.OtherDetails}>Total Price: R{totalPrice}</Text>
        <Text style={styles.OtherDetails}>Average Price: R{AvgPrice}</Text>
        
    </View>

    

        <View style={styles.userInputView}>
          
        
          <TouchableHighlight
            style={styles.DishButton}
            onPress={() => setSelectedCourseType(null)} // Show all dishes
          >

            <Text style={styles.buttonText}>Show All Dishes</Text>
          </TouchableHighlight>

          <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.AppetizerButton}
            onPress={() => setSelectedCourseType('Appetizer')} // Filter for Appetizer
          >
            <Text style={styles.buttonText}>Show Appetizers</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.MainButton}
            onPress={() => setSelectedCourseType('Main')} // Filter for Main
          >
            <Text style={styles.buttonText}>Show Main Dishes</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.DessertButton}
            onPress={() => setSelectedCourseType('Dessert')} // Filter for Dessert
          >
            <Text style={styles.buttonText}>Show Desserts</Text>
          </TouchableHighlight>
        </View>

          <TouchableHighlight
          style={styles.button}
          onPress={() => props.navigation.navigate('Screen2')}
        >
          <Text style={styles.buttonText}>Add/Remove Dish</Text>
        </TouchableHighlight>
       

    
        </View>
      </View>
    </SafeAreaView>
  );
          };
/** Start Screen 2 definition **/
type Screen2Prop = NativeStackScreenProps<RootStackParamList, 'Screen2'>;

const Screen2: React.FC<Screen2Prop & { Menu: menuDetails[], setMenu: (menu: menuDetails[]) => void }> = (props) => {
  const { Menu, setMenu } = props;

  const [DishName, setDishName] = useState<string>('');
  const [Discription, setDiscription] = useState<string>(''); 
  const [courseType, setType] = useState<string>(''); 
  const [Price, setPrice] = useState<string>(''); 
  const [DishToDelete, setDishToDelete] = useState<string>('');
  const CourseType = ['Appetizer', 'Main', 'Dessert'];


  const handleAdd = () => {
    if (DishName && Discription && courseType && Price) {
      const newDish: menuDetails = { 
        dish_Name: DishName, 
        dish_Discription: Discription,
        course_Type: courseType,
        price: parseInt(Price)
      }
      
    
      setMenu([...Menu, newDish]); // Update Menu state
      setDishName('');
      setDiscription('');
      setType('');
      setPrice('');
    } else {
      Alert.alert("Insufficient Information", "Please fill in all the fields.", [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
    }
  };

  const handleDeleteItem = () => {
        const updatedItems = Menu.filter(item => item.dish_Name !== DishToDelete);
        setMenu(updatedItems); // Update Menu state
        setDishToDelete(''); // Clear the input after deletion
      }
  return (
    <SafeAreaView style={styles.itemContainer}>
      <View style={styles.userInputView}> 
        <Text style={styles.EnterDish2}>Enter New Dish Here</Text>
        <TextInput
          style={styles.input}
          placeholder='Dish name'
          value={DishName}
          onChangeText={setDishName}
        />
        <TextInput
          style={styles.input}
          placeholder='Description...'
          value={Discription}
          onChangeText={setDiscription}
        />
        <Picker
          selectedValue={courseType}
          onValueChange={(itemValue: SetStateAction<string>) => setType(itemValue)}
          style={styles.input}
        >
          {CourseType.map((courseType) => (
            <Picker.Item label={courseType} value={courseType} key={courseType} />
          ))}
          
        </Picker>
        <TextInput
          style={styles.input}
          placeholder='Dish Price'
          value={Price}
          onChangeText={setPrice}
          keyboardType='numeric'
        />
        <TouchableHighlight onPress={handleAdd} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>

                 {/* Input for deleting a dish */}
          <TextInput
            style={styles.input}
            placeholder='Dish name to delete'
            value={DishToDelete}
            onChangeText={setDishToDelete}
          />
          <TouchableHighlight onPress={handleDeleteItem} style={styles.DeleteButton}>
            <Text style={styles.DelButtonText}>Delete</Text>
          </TouchableHighlight>

        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('Screen1', { 
            dish_Name: DishName, 
            dish_Discription: Discription,
            course_Type: courseType,
            price: Price 
          })}
        >
          <Text style={styles.buttonText}>View Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
/** End of Screen 2 definition **/ 



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
buttonContainer: {
  flexDirection: 'row', // Arrange buttons in a row
  justifyContent: 'space-around', // Space buttons evenly
  alignItems: 'center', // Center buttons vertically
  marginVertical: 10, // Add some vertical margin
  paddingHorizontal: 10, // Add horizontal padding for better touch area
},

  headingContainer: {
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    width: '100%'
  },

  trackerName: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#5B3E96'
  },
  EnterDish:{
    fontSize: 23,
    fontWeight: 'bold',
    backgroundColor: 'blue',
    color: 'white',
    padding: 5,
    borderRadius: 5
  },

  EnterDish2:{
    fontSize: 35,
    fontWeight: 'bold',
    backgroundColor: 'blue',
    color: 'white',
    padding: 5,
    borderRadius: 20
  },

  summaryContent: {
   flexDirection: 'row',
   justifyContent: 'space-between',
  },

  listView: {
    marginTop: -20,
    width: '100%',
    height: 830,
    borderRadius: 10,
    backgroundColor: '#ECECEC'
  },

  summaryHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },

  summaryText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#583E96',
  },
    //npm install @reactnavigation/buttontabs
  summaryContainer: {
    backgroundColor: '#ECECEC',
    padding: 15,
    borderRadius: 10,
    marginTop: -50,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  
  dishImage: {
    width: 60,
    height: 60,
    marginLeft: 250,
    marginTop: -90,
    marginStart: 250
  },

  
  ListStyle: {
    maxHeight: "100%"
  },

  itemContainer: {
    flex: 1,
    padding: 20,
    marginVertical: 5,
    marginBottom: -40,
    backgroundColor: 'white',
  },
  
  dishName:{
    fontSize: 23,
    fontWeight: "bold",
    color: '#5B3E96'
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "purple"
  },

  OtherDetails: {
    color: '#5B3E96',
    fontSize: 20,
    fontWeight: "bold",
  },

  separator: {
    height: 20,
  },

  userInputView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 5,
    backgroundColor: 'green',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
  },
  
  
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginVertical: -15,
    borderRadius: 5,
    color: 'black',
    marginTop: 30,
    fontSize: 25,
  },

  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 40, //for rounded corner
    marginVertical: 10,
    
    marginTop: 25,
  },

  DelButtonText:{
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },

  DeleteButton:{
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 40, //for rounded corner
    marginVertical: 10,
    
    marginTop: 25,
  },

  DishButton:{
    backgroundColor: '#fff',
    borderRadius: 3, //for rounded corner
    marginVertical: 10,
   
    marginTop: 15,
    marginLeft: 20
  },

  AppetizerButton:{
    backgroundColor: 'yellow',
    borderRadius: 3, //for rounded corner
    marginVertical: 10,
    
    marginTop: 15,
    marginRight: 25
  },

  MainButton:{
    backgroundColor: 'orange',
    borderRadius: 3, //for rounded corner
    marginVertical: 10,
   
    marginTop: 15,
    justifyContent: 'center'
    
  },

  DessertButton:{
    backgroundColor: 'pink',
    borderRadius: 3, //for rounded corner
    marginVertical: 10,
   
    marginTop: 15,
    marginLeft: 25
   
  },

  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },

});
