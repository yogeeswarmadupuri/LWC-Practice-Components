import { LightningElement,track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import CHART_JS from '@salesforce/resourceUrl/ChartJs_New';

export default class StaticResourceLoader extends LightningElement {

    @track isrendered = false;

    renderedCallback(){
      let data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [{
          label: "Dataset #1",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [65, 59, 20, 81, 56, 55, 40],
        }]
      };
      
      let options = {
        maintainAspectRatio: false,
        scales: {
          y: {
            stacked: true,
            grid: {
              display: true,
              color: "rgba(255,99,132,0.2)"
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      };
        if(this.isrendered){
            return;
        }
        this.isrendered = true;
        loadScript(this,CHART_JS).then(() => {
            console.log('resource loaded');
            const ctx = this.template.querySelector('.myChart');
            console.log(ctx);
            new Chart(ctx, {
                type: 'bar',
                data: data,
                options: options
              });



        }).catch((error) => {
            console.log(error);
        });

    }

}