import { LightningElement } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import FullcalendarJS from '@salesforce/resourceUrl/FullCalenderV3';

export default class GoogleCalender extends LightningElement {
    API_KEY = 'AIzaSyCnj253kW0TCtreF_7m_GbcZTvIv2ACu5o';
    CALENDER_ID = 'jagayogi36@gmail.com';

    fullCalendarJsInitialised = false;

    renderedCallback() {

        // Performs this operation only on first render
        if (this.fullCalendarJsInitialised) {
        return;
        }
        this.fullCalendarJsInitialised = true;

        // Executes all loadScript and loadStyle promises
        // and only resolves them once all promises are done
        Promise.all([
        loadScript(this, FullcalendarJS + '/fullcalendarV3/jquery.min.js'),
        loadScript(this, FullcalendarJS + '/fullcalendarV3/moment.min.js'),
        loadScript(this, FullcalendarJS + '/fullcalendarV3/fullcalendar.js'),
        loadStyle(this, FullcalendarJS + '/fullcalendarV3/fullcalendar.css')
        // loadStyle(this, FullCalendarJS + '/fullcalendar.print.min.css')
        ])
        .then(() => {
            console.log('static resource Loaded');
        // Initialise the calendar configuration
            this.initializeCalendar();
        })
        .catch(error => {
        // eslint-disable-next-line no-console
        console.error({
            message: 'Error occured on FullCalendarJS',
            error
        });
        })
    }

    initializeCalendar() {
        const calendarEl = this.template.querySelector('.calendar-container');
        $(calendarEl).fullCalendar({
            plugins: ['googleCalendar'],
            defaultView: 'month',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'googleCalendarButton'
            },
            googleCalendarApiKey: 'AIzaSyCnj253kW0TCtreF_7m_GbcZTvIv2ACu5o',
            eventSources: [
                {
                    googleCalendarId: 'jagayogi36@gmail.com',
                    color: 'blue',
                    textColor: 'white',
                    className: 'gcal-event'
                }
            ]
            });
    }    
}