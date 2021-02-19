import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Months, WeekDays } from "../types";
import { Col, Row, Grid } from "react-native-easy-grid";

const oneDayInMs: number = 1000 * 60 * 60 * 24;
const daysPerPage: number = 42;

const months: Months[] = [
    { month: "January", short: "Jan" },
    { month: "February", short: "Feb" },
    { month: "March", short: "Mar" },
    { month: "April", short: "Apr" },
    { month: "May", short: "May" },
    { month: "June", short: "Jun" },
    { month: "July", short: "Jul" },
    { month: "August", short: "Aug" },
    { month: "September", short: "Sep" },
    { month: "October", short: "Oct" },
    { month: "November", short: "Nov" },
    { month: "December", short: "Dec" },
]

const weekDays: WeekDays[] = [
    { day: "Sunday", short: "Sun" },
    { day: "Monday", short: "Mon" },
    { day: "Tuesday", short: "Tue" },
    { day: "Wednesday", short: "Wed" },
    { day: "Thursday", short: "Thu" },
    { day: "Friday", short: "Fri" },
    { day: "Saturday", short: "Sat" },
]

interface date {
    day: number,
    toggleable: boolean,
    toggled: boolean,
    date: Date,
    defaultStyles: any,
    textStyle: any,
    toggleStyle?: any,   
}


interface Props {

}

const Calendar: React.FC<Props> = (props) => {

    const [month, setMonth] = useState<number>(new Date().getMonth());
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [toogled, setToogled] = useState<boolean>(false);

    const generateMonth = (): date[] => {
        const firstDay = new Date(year, month, 1, 0, 0, 0)
        const pastMonthLastDay: Date = new Date(firstDay.getTime() - oneDayInMs);

        const pastMonthDays: date[] = [];
        for (let i = (pastMonthLastDay.getDate() - firstDay.getDay()) + 1; i <= pastMonthLastDay.getDate(); i++)
            pastMonthDays.push({
                day: i,
                toggleable: false,
                toggled: false,
                date: new Date(year, month, i, 0, 0, 0),
                defaultStyles: {
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: '#ffffff',
                },
                textStyle:{
                    color: "#808080",
                    fontFamily: "Nunito-Regular",
                    fontSize: 16,
                }
            })

        const currentMonthDays: date[] = [];
        let newDay = firstDay;
        while (newDay.getMonth() === month) {
            currentMonthDays.push({
                day: newDay.getDate(),
                toggled: false,
                toggleable: true,
                date: newDay,
                defaultStyles: {
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: '#ffffff',
                },
                textStyle:{
                    color: "#000000",
                    fontFamily: "Nunito-Bold",
                    fontSize: 16,
                },
                toggleStyle:{
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                    backgroundColor: "red"
                }
            });
            newDay = new Date(newDay.getTime() + oneDayInMs);
        }

        const nextMonthDays: date[] = [];
        for (let i = 0; i < daysPerPage - (currentMonthDays.length + pastMonthDays.length); i++)
            nextMonthDays.push({
                day: i + 1,
                toggled: false,
                toggleable: false,
                date: new Date(year, month, i + 1, 0, 0, 0),
                defaultStyles: {
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: '#ffffff',
                },
                textStyle:{
                    color: "#808080",
                    fontFamily: "Nunito-Regular",
                    fontSize: 16,
                }
            });
        return (pastMonthDays.concat(currentMonthDays, nextMonthDays));
    }

    const [dates, setDates] = useState<date[]>(generateMonth());

    useEffect(() => {
        setDates(generateMonth());
        console.log("UseEffect");
    }, [year, month]);



    const nextMonth = (): void => {
        if (month === 11) {
            setYear(year + 1);
            setMonth(0);
        } else
            setMonth(month + 1);
    }

    const previousMonth = (): void => {
        if (month === 0) {
            setYear(year - 1);
            setMonth(11);
        } else
            setMonth(month - 1);
    }

    const onToggle = (toggleIndex: any) => {

        //Spread syntax creates a new array, 
        //it does not only passes by reference, 
        //without it the state wouldn't update, 
        //once the memory address is would be the very same.
        let temp: date[] = [...dates];
    
        temp.map((date:date, index) => {
            if(index === toggleIndex){
                if(date.toggleable)
                    date.toggled ? date.toggled = false : date.toggled = true;
            }else{
                if(date.toggled)
                    date.toggled = false
            }

            return date;
        })

        setDates(temp);
    }

    const calendarLayout = (): any => {
        generateMonth();
        //const dates = generateMonth();
        const rows = 6;
        const columns = 7;
        const layout: any = [];
        for (let i = 1; i < rows; i++) {
            const currentRow = [];
            for (let j = (i * columns) - columns; j < i * columns; j++) {

                const background = dates[j].toggled ? dates[j].toggleStyle : dates[j].defaultStyles; 
                const component = (<Col key={j} style={background}>
                    <TouchableHighlight onPress={()=>onToggle(j)}>
                            <Text style={dates[j].textStyle}> {dates[j].day} </Text>
                    </TouchableHighlight>
                </Col>);
                currentRow.push(component);
            }
            layout.push(currentRow);
        }

        return (layout);
    }

    
    //const dates: date[] = generateMonth(new Date(year, month, 1, 0, 0, 0));

    return (
        <View style={styles.calendar}>
            <View style={styles.header}>
                <TouchableHighlight onPress={previousMonth}>
                    <Icon name="navigate-before" size={30} color="#000000" />
                </TouchableHighlight>
                <View style={styles.title}>
                    <Text style={styles.titleText}> {months[month].month} </Text>
                    <Text style={styles.titleText}> {year} </Text>
                </View>
                <TouchableHighlight onPress={nextMonth}>
                    <Icon name="navigate-next" size={30} color="#000000" />
                </TouchableHighlight>
            </View>
            <Grid>
                <Row>
                    {weekDays.map((day, index) => (
                        <Col key={index} style={styles.cell}>
                            <Text style={styles.weekDaysText}>{day.short}</Text>
                        </Col>
                    ))}
                </Row>
                {calendarLayout().map((day: date, index: any) => (
                    <Row key={index}>
                        {day}
                    </Row>
                ))}
            </Grid>
        </View>
    )
}

const styles = StyleSheet.create({
    calendar: {
        width: "90%",
        height: "50%",
        backgroundColor: "#ffffff"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        flexDirection: "row"
    },
    titleText: {
        fontFamily: "Nunito-Bold",
        fontSize: 26,
    },
    weekDays: {
        display: "flex",
    },
    cell: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    weekDaysText: {
        fontFamily: "Nunito-Black",
        fontSize: 16,
    },

})

export default Calendar;