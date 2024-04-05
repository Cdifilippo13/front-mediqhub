import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.sass'
})
export class CalendarComponent {

  @Output() dateAppointment = new EventEmitter<Date>();

  initialHour = [
    7,8,9,10,11,14,15,16,17,18,19
  ];

  currentYear = "2024"

  currentMonth = 0;


  currentDay: number = 0;

  currentNameDayPosition: number = 0;


  daysOfWeek = [
    'LUN',
    'MAR',
    'MIE',
    'JUE',
    'VIE',
    'SAD',
    'DOM'
  ]


  months = [
    {
      initialDay: 0,
      id: 1,
      days: 31,
      name: "Enero"
    },
    {
      initialDay: 3,
      id: 2,
      days: 29,
      name: "Febrero"
    },
    {
      initialDay: 4,
      id: 3,
      days: 31,
      name: "Marzo"
    },
    {
      initialDay: 0,
      id: 4,
      days: 30,
      name: "Abril"
    },
    {
      initialDay: 2,
      id: 5,
      days: 31,
      name: "Mayo"
    },
    {
      initialDay: 5,
      id: 6,
      days: 30,
      name: "Junio"
    },
    {
      initialDay: 0,
      id: 7,
      days: 31,
      name: "Julio"
    },
    {
      initialDay: 3,
      id: 8,
      days: 31,
      name: "Agosto"
    },
    {
      initialDay: 6,
      id: 9,
      days: 29,
      name: "Septiembre"
    },
    {
      initialDay: 1,
      id: 10,
      days: 31,
      name: "Octubre"
    },
    {
      initialDay: 4,
      id: 11,
      days: 30,
      name: "Noviembre"
    },
    {
      initialDay: 6,
      id: 12,
      days: 31,
      name: "Diciembre"
    }
  ]


  get arraydaysOfTheCurrentMonth() {
    const array: any = Array.from({ length: this.months[this.currentMonth].days + this.months[this.currentMonth].initialDay });
    let sum = {
      consecutive: 1,
      indexDay: this.months[this.currentMonth].initialDay
    }

    for (let index = 0; index < array.length; index++) {
      if (index >= this.months[this.currentMonth].initialDay) {

        array[index] = sum
        sum = {
          consecutive: sum.consecutive + 1,
          indexDay: (sum.indexDay == 6) ? 0 : sum.indexDay + 1
        };
      }
    }
    return array;

  }

  get nameOfCurrentMonth() {
    return this.months[this.currentMonth].name;
  }

  get dayName() {

    return this.daysOfWeek[this.currentNameDayPosition];
  }

  selectDay(day: number, currentNameDayPosition: number) {
    this.currentDay = day;
    this.currentNameDayPosition = currentNameDayPosition;
    console.log(this.currentNameDayPosition);
    
  }


  nextMonth() {
    if (this.currentMonth == 11) {
      this.currentMonth = 0
    }
    else {
      this.currentMonth = this.currentMonth + 1;
    }

  }

  backMonth() {
    if (this.currentMonth == 0) {
      this.currentMonth = 11
    }
    else {
      this.currentMonth = this.currentMonth - 1;
    }

  }

  getDateAndHour(hour:number){


    let month = (this.currentMonth+1 < 10) ? `0${this.currentMonth+1}` : this.currentMonth+1;
    let day = (this.currentDay < 10) ? `0${this.currentDay}` : this.currentDay;
    let newHour = (hour < 10) ? `0${hour}` : hour;

    const date = new Date(`${this.currentYear}-${month}-${day}T${newHour}:00:00`);

    this.dateAppointment.emit(date);

    
  }






}
