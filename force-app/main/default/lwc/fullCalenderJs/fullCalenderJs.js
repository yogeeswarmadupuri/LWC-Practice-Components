import { LightningElement,track } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import FullcalendarJS from '@salesforce/resourceUrl/FullcalenderJS';
import fetchAllEvents from '@salesforce/apex/FullCalendarService.fetchAllEvents';
import { NavigationMixin } from 'lightning/navigation';

export default class FullCalenderJs extends NavigationMixin(LightningElement) {

    fullCalendarJsInitialised = false;
    @track allEvents = [];
    @track selectedEvent = undefined;
    /**
     * @description Standard lifecyle method 'renderedCallback'
     *              Ensures that the page loads and renders the 
     *              container before doing anything else
     */
    renderedCallback() {

        // Performs this operation only on first render
        if (this.fullCalendarJsInitialised) {
        return;
        }
        this.fullCalendarJsInitialised = true;

        // Executes all loadScript and loadStyle promises
        // and only resolves them once all promises are done
        Promise.all([
        loadScript(this, FullcalendarJS + '/FullCalendarJS/jquery.min.js'),
        loadScript(this, FullcalendarJS + '/FullCalendarJS/moment.min.js'),
        loadScript(this, FullcalendarJS + '/FullCalendarJS/theme.js'),
        loadScript(this, FullcalendarJS + '/FullCalendarJS/fullcalendar.min.js'),
        loadStyle(this, FullcalendarJS + '/FullCalendarJS/fullcalendar.min.css'),
        // loadStyle(this, FullCalendarJS + '/fullcalendar.print.min.css')
        ])
        .then(() => {
        // Initialise the calendar configuration
        this.getAllEvents();
        })
        .catch(error => {
        // eslint-disable-next-line no-console
        console.error({
            message: 'Error occured on FullCalendarJS',
            error
        });
        })
    }

    /**
     * @description Initialise the calendar configuration
     *              This is where we configure the available options for the calendar.
     *              This is also where we load the Events data.
     */
    initialiseFullCalendarJs() {
        const ele = this.template.querySelector('div.fullcalendarjs');
        // eslint-disable-next-line no-undef
        $(ele).fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay,listWeek'
        },
        themeSystem : 'standard',
        defaultDate: new Date(), 
        navLinks: true,
        editable: true,
        eventLimit: true,
        events: this.allEvents,
        dragScroll : true,
        droppable: true,
        weekNumbers : true,
        eventDrop: function(event, delta, revertFunc) {
            alert(event.title + " was dropped on " + event.start.format());
            if (!confirm("Are you sure about this change? ")) {
            revertFunc();
            }
        },
        eventClick: function(event, jsEvent, view) {
            // Generate a URL to a User record page
            this.selectedEvent =  event;
        },
        dayClick :function(date, jsEvent, view) {
            jsEvent.preventDefault();
            
        },
        eventMouseover : function(event, jsEvent, view) {
        }
        });
    }

    getAllEvents(){
        fetchAllEvents()
        .then(result => {
            this.allEvents = result.map(item => {
            return {
                id : item.Id,
                editable : true,
                title : item.Subject,
                start : item.ActivityDate,
                end : item.EndDateTime,
                description : item.Description,
                allDay : false,
                extendedProps : {
                whoId : item.WhoId,
                whatId : item.WhatId
                },
                backgroundColor: "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")",
                borderColor: "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")"
            };
            });
            // Initialise the calendar configuration
            this.initialiseFullCalendarJs();
        })
        .catch(error => {
            window.console.log(' Error Occured ', error)
        })
        .finally(()=>{
            //this.initialiseFullCalendarJs();
        })
    }

    closeModal(){
        this.selectedEvent = undefined;
    }
}