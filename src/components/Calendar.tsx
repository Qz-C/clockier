import React, { useState } from "react";
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
interface Props {

}

const Calendar: React.FC<Props> = (props) => {

    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    const onToogle = ():any => ({
        backgroundColor: "red",
        borderRadius: 50
    })

    const genarteMonth = (firstDay: Date): date[] => {
        const month: number = firstDay.getMonth();
        const pastMonthLastDay: Date = new Date(firstDay.getTime() - oneDayInMs);

        const pastMonthDays: date[] = [];
        for (let i = (pastMonthLastDay.getDate() - firstDay.getDay()) + 1; i <= pastMonthLastDay.getDate(); i++)
            pastMonthDays.push({
                day: i,
                toggle: false,
                date: new Date(year, month, i, 0,0,0),
                styles:{
                    color:"#C0C0C0",
                    fontFamily: "Nunito-Bold",
                    fontSize: 16,
                }
            })

        const currentMonthDays: date[] = [];
        let newDay = firstDay;
        while (newDay.getMonth() === month) {
            currentMonthDays.push({
                day: newDay.getDate(),
                toggle: false,
                date: newDay,
                styles:{
                    color: "#000000",
                    fontFamily: "Nunito-Bold",
                    fontSize: 16,
                }
            });
            newDay = new Date(newDay.getTime() + oneDayInMs);
        }

        const nextMonthDays: date[] = [];
        for (let i = 0; i < daysPerPage - (currentMonthDays.length + pastMonthDays.length); i++)
            nextMonthDays.push({
                day: i+1,
                toggle: false,
                date: new Date(year, month, i + 1, 0,0,0),
                styles: {
                    color:"#C0C0C0",
                    fontFamily: "Nunito-Bold",
                    fontSize: 16,
                }
            });

        return pastMonthDays.concat(currentMonthDays, nextMonthDays);
    }

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

    const calendarLayout = (dates: date[]): any => {
        const rows = 6;
        const columns = 7;
        const layout: any = [];
        for (let i = 1; i < rows; i++) {
            const currentRow = [];
            for (let j = (i * columns) - columns; j < i * columns; j++) {
                const component = (<Col style={styles.cell}>
                                        <TouchableHighlight>
                                            <Text style={dates[j].styles}> {dates[j].day} </Text>
                                        </TouchableHighlight>
                                </Col>);
                currentRow.push(component);
            }
            layout.push(currentRow);
        }
        return (layout);
    }

        const dates: date[] = genarteMonth(new Date(year, month, 1, 0, 0, 0));

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
                        {weekDays.map(day => (
                            <Col style={styles.cell}>
                                <Text style={styles.weekDaysText}>{day.short}</Text>
                            </Col>
                        ))}
                    </Row>
                    {calendarLayout(dates).map((day: date, index: any) => (
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
        width: "100%",
        height: "100%",
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
        borderColor: "black",
        borderWidth: 1
    },
    weekDaysText: {
        fontFamily: "Nunito-Black",
        fontSize: 16,
        backgroundColor: "red"
    },

})

export default Calendar;