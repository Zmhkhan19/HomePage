import React from "react"

export type menuDetails = {
    //id: number;
    dish_Name: string;
    dish_Discription: string;
    course_Type: string;
    price: number;
}

export type RootStackParamList = {
    Start: undefined;
    Screen1: {dish_Name :string; 
        dish_Discription: string;
        course_Type: string;
        price: string;}; //parameter that screen 2 is structured to receive   
         Screen2: undefined;
         Screen3: {dish_Name :string; 
            dish_Discription: string;
            course_Type: string;
            price: string;};
    }