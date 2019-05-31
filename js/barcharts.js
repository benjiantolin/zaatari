Promise.all([
  //d3.csv('assets/SurveyData_Shelter.csv'),
  d3.csv('assets/SurveyData_HealthDist.csv'),
]).then(function(datasets) {

  var dist = ["dist"];
  var caravan = ["Caravan"];
  var tent = ["Tent"];
  var tandc = ["Tent_and_caravan"];
  var gt = ["Grand_Total"];
  var age_brackets = ["age_brackets"];
  var length1 = ["0_99m"];
  var length2 = ["100_199m"];
  var length3 = ["200_399m"];
  var length4 = ["400_799m"];
  var length5 = ["800+m"];
  var total = ["Total"];

  datasets[0].forEach(function(d) {
    dist.push(+d["dist"])         //X axis
    caravan.push(+d["caravan"])
    tent.push(+d["tent"])
    tandc.push(+d["tandc"])
    gt.push(+d["gt"])
    age_brackets.push(+d["age_brackets"])   //X axis
    length1.push(+d["length1"])
    length2.push(+d["length2"])
    length3.push(+d["length3"])
    length4.push(+d["length4"])
    length5.push(+d["length5"])
    total.push(+d["total"])

  });

  var shelter_bar = c3.generate({
      title: {
        text: 'Shelter Count by District'
      },
      data: {
        //url: 'assets/SurveyData_Shelter.csv',
        x: 'dist',
        columns: [dist, caravan, tent, tandc, gt],
        type: 'bar',
      },
      axis: {
        x: {
          tick: {
              format: ''
          }
        },
        y: {
          tick: {
              format: ''
          },
          label: {
            text: '# of People in Different Shelter Types',
            position: 'outer-middle'
          }
        },
      },
      bar: {
        width: {
          ratio: 0.5
        },
      },
      bindto: '#shelter_bar',
  });

  var agehealth_bar = c3.generate({
          data: {
            //url: 'assets/SurveyData_HealthDist.csv',
            x: 'age_brackets',
            columns: [age_brackets, length1, length2, length3, length4, length5],
            type: 'bar'
          },
          axis: {
            x: {
              tick: {
                format: ''
              }
            },
            y: {
              tick: {
                  format: ''
              },
              label: {
                text: '# of People by Age Group',
                position: 'outer-middle'
              }
            }
          },
          bar: {
            width: {
              ratio: 0.5
            }
          },
          bindto: '#agehealth_bar'
      });

});
