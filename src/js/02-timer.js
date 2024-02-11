import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

class CountdownTimer {
  constructor() {
    this.startButton = document.querySelector('[data-start]');
    this.daysElement = document.querySelector('[data-days]');
    this.hoursElement = document.querySelector('[data-hours]');
    this.minutesElement = document.querySelector('[data-minutes]');
    this.secondsElement = document.querySelector('[data-seconds]');
    this.selectedDate = null;

    this.setupFlatpickr();
    this.setupEventListeners();
  }

  setupFlatpickr() {
    const options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose: (selectedDates) => {
        this.selectedDate = selectedDates[0];
        const currentDate = new Date();

        if (this.selectedDate <= currentDate) {
          alert("Please choose a date in the future");
          this.startButton.disabled = true;
        } else {
          this.startButton.disabled = false;
        }
      },
    };

    flatpickr("#datetime-picker", options);
  }

  setupEventListeners() {
    this.startButton.addEventListener('click', () => this.startCountdown());
  }

  startCountdown() {
    if (!this.selectedDate) return;

    const updateCountdown = () => {
      const currentDate = new Date();
      const timeDifference = Math.floor((this.selectedDate - currentDate) / 1000); 

      if (timeDifference <= 0) {
        clearInterval(this.countdownInterval);
        return alert("Countdown finished!");
      }

      const { days, hours, minutes, seconds } = this.convertSeconds(timeDifference);

      this.daysElement.textContent = this.addLeadingZero(days);
      this.hoursElement.textContent = this.addLeadingZero(hours);
      this.minutesElement.textContent = this.addLeadingZero(minutes);
      this.secondsElement.textContent = this.addLeadingZero(seconds);
    };

    updateCountdown();
    this.countdownInterval = setInterval(updateCountdown, 1000);
  }

  convertSeconds(seconds) {
    const day = Math.floor(seconds / (3600 * 24));
    const hour = Math.floor((seconds % (3600 * 24)) / 3600);
    const minute = Math.floor((seconds % 3600) / 60);
    const second = Math.floor(seconds % 60);

    return { days: day, hours: hour, minutes: minute, seconds: second };
  }

  addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
  }
}

new CountdownTimer();


